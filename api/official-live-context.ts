/**
 * Vercel serverless function: Official Live Context
 * Fetches up to 3 recent official web updates from Montgomery city domains via Bright Data.
 * Credentials from env: BRIGHTDATA_API_KEY or BRIGHT_DATA_API_KEY
 * If missing: returns { items: [], unavailable: true } — never throws.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface OfficialLiveContextItem {
  id: string;
  title: string;
  source: string;
  publishedAt?: string;
  summary: string;
  url: string;
}

const ALLOWED_DOMAINS = [
  'montgomeryal.gov',
  'capture.montgomeryal.gov',
  'gis.montgomeryal.gov',
];

const MAX_ITEMS = 3;

function isAllowedUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return ALLOWED_DOMAINS.some((d) => host === d || host.endsWith('.' + d));
  } catch {
    return false;
  }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return 'montgomeryal.gov';
  }
}

function slug(id: string): string {
  return id.replace(/[^a-z0-9-]/gi, '-').slice(0, 50);
}

async function fetchViaBrightData(query: string): Promise<{ organic?: Array<{ link?: string; title?: string; description?: string }> } | null> {
  const apiKey = process.env.BRIGHTDATA_API_KEY || process.env.BRIGHT_DATA_API_KEY;
  if (!apiKey?.trim()) return null;

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us`;

  const res = await fetch('https://api.brightdata.com/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      zone: process.env.BRIGHT_DATA_SERP_ZONE || 'serp_api1',
      url: searchUrl,
      format: 'json',
    }),
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { organic?: Array<{ link?: string; title?: string; description?: string }> };
  return json;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const label = typeof req.query.label === 'string' ? req.query.label : '';
  const neighborhood = typeof req.query.neighborhood === 'string' ? req.query.neighborhood : '';

  const apiKey = process.env.BRIGHTDATA_API_KEY || process.env.BRIGHT_DATA_API_KEY;
  if (!apiKey?.trim()) {
    return res.status(200).json({
      items: [],
      unavailable: true,
    });
  }

  const queries: string[] = [];
  const baseTerms = ['Montgomery'];
  if (neighborhood) baseTerms.push(neighborhood);
  if (label) baseTerms.push(label.split(',')[0]?.trim() || '');

  queries.push(`site:montgomeryal.gov ${baseTerms.join(' ')} public notice`);
  queries.push(`site:montgomeryal.gov Montgomery permits update`);
  queries.push(`site:capture.montgomeryal.gov Montgomery`);

  const seenUrls = new Set<string>();
  const items: OfficialLiveContextItem[] = [];

  for (const q of queries) {
    if (items.length >= MAX_ITEMS) break;
    const data = await fetchViaBrightData(q);
    if (!data?.organic) continue;

    for (const o of data.organic) {
      const link = o.link?.trim();
      if (!link || seenUrls.has(link)) continue;
      if (!isAllowedUrl(link)) continue;

      const title = (o.title || o.description || 'Official page').trim();
      const summary = (o.description || '').trim().slice(0, 120);
      if (!title) continue;

      seenUrls.add(link);
      items.push({
        id: slug(link) || `item-${items.length}`,
        title: title.slice(0, 100),
        source: extractDomain(link),
        summary: summary || 'Official city page.',
        url: link,
      });

      if (items.length >= MAX_ITEMS) break;
    }
  }

  return res.status(200).json({ items });
}
