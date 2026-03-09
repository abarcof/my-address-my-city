# Post-GitHub Steps — Ready for Submission

After the code is on GitHub, follow these steps to complete the hackathon submission.

---

## 1. Bright Data (Optional Bonus)

To enable the "Official Live Context" section in What's Happening Nearby:

1. **Get API key** from [Bright Data](https://brightdata.com/cp/setting/users)
2. **Create SERP zone** at [Bright Data Zones](https://brightdata.com/cp/zones) (use `serp_api`)
3. **Set environment variable:**
   - `BRIGHTDATA_API_KEY` = your API key
   - Optional: `BRIGHT_DATA_SERP_ZONE` = your zone ID (default: `serp_api`)
4. **Enable in code:** Set `BRIGHT_DATA_ENABLED = true` in `src/config/feature-flags.ts`
5. **Deploy:** Bright Data works server-side; the Vercel API route (`api/official-live-context.ts`) needs the env var in Vercel's dashboard

See `docs/bright-data-scaffold.md` for full details.

---

## 2. Vercel Deployment (Prototype URL)

To get the working prototype URL for the submission form:

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project** → **Import** your `my-address-my-city` repo
3. Vercel auto-detects Vite — keep default settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: (leave empty)
4. **Environment variables** (if using Bright Data): Add `BRIGHTDATA_API_KEY` in Project Settings → Environment Variables
5. Click **Deploy**
6. When done, copy the URL (e.g. `https://my-address-my-city-xxxx.vercel.app`) — this is your **working prototype URL**

---

## 3. Submission Form Fields

Use the content below to fill the hackathon submission form.

### Briefly describe your solution. (Required)

> My Address, My City is a resident-facing civic web app for Montgomery, Alabama. Enter any address or click the map — instantly see zoning, flood risk, neighborhood, council district, property record, trash schedule, nearest parks and hospitals, and recent code violations and permits nearby. All in plain language, from official city data. One tab connects residents to report issues, apply for permits, and request alerts. Built for the World Wide Vibes Hackathon 2026 — Civic Access & Community Communication.

### Working prototype URL (Required)

> *(Paste your Vercel URL here after deployment, e.g. https://my-address-my-city.vercel.app)*

### Pitch video URL (Required)

> *(Paste your video URL — max 5 minutes, public access)*

### Slide deck (Optional)

> *(Paste link if you have one — ensure public access)*

### Code repository (Optional)

> https://github.com/abarcof/my-address-my-city

### Supplementary document (Optional)

> *(Paste link to submission brief or PDF — max 8 pages, public access)*  
> Example: Google Drive or Notion link to `docs/submission-brief.md` exported as PDF

---

## Checklist Before Submit

- [ ] Code pushed to GitHub
- [ ] Vercel deployment live and tested
- [ ] Working prototype URL copied
- [ ] Pitch video recorded and uploaded (public)
- [ ] Form fields filled
- [ ] (Optional) Bright Data enabled and env var set in Vercel
- [ ] (Optional) Slide deck or supplementary doc linked
