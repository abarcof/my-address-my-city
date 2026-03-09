# Bright Data Bonus — Official Live Context

**Status:** Enabled. Zone `serp_api1` created, `BRIGHTDATA_API_KEY` in Vercel, feature flag on.

---

## What It Does

The **Official Live Context** module shows up to 3 recent official web updates from Montgomery city-owned domains. It appears as a compact section below "What's Happening Nearby" when enabled.

- Uses Bright Data SERP API to search `site:montgomeryal.gov` and `site:capture.montgomeryal.gov`
- Displays title, source domain, short summary, and link to official page
- Clearly labeled as "Recent updates from official city websites"

---

## Activation

1. Set `BRIGHT_DATA_ENABLED = true` in `src/config/feature-flags.ts`
2. Create a SERP API zone in [Bright Data Control Panel](https://brightdata.com/cp/zones)
3. Add environment variables (Vercel project settings or `.env`):
   - `BRIGHTDATA_API_KEY` or `BRIGHT_DATA_API_KEY` — Your Bright Data API key
   - `BRIGHT_DATA_SERP_ZONE` (optional) — Zone name, default `serp_api`

---

## Architecture

| Component | Location | Purpose |
|-----------|----------|---------|
| API route | `api/official-live-context.ts` | Vercel serverless function; never exposes token |
| Feature | `src/features/official-live-context/` | Hook + card component |
| Integration | `WhatsHappeningNearby.tsx` | Renders card when flag enabled |
| Flag | `src/config/feature-flags.ts` | `BRIGHT_DATA_ENABLED` (default: false) |

---

## Allowed Domains

- montgomeryal.gov
- capture.montgomeryal.gov
- gis.montgomeryal.gov

Only these domains are shown. All other results are filtered out.

---

## Graceful Degradation

- Token missing → API returns `{ items: [], unavailable: true }`; UI shows "Official live web context is not available in this environment."
- Flag false → Module not rendered
- API error or no results → Shows empty state message
- Core app continues to work in all cases

---

## Local Development

- **`npm run dev`** (Vite only): API calls 404; module shows unavailable state
- **`vercel dev`**: Runs Vercel serverless functions locally; full integration works with env vars set

---

## Claims

The app can optionally show recent official website context from city-owned public webpages using Bright Data. This is supplemental; it is not presented as official city GIS/dataset data.
