/**
 * Feature flags — optional features that can be enabled/disabled
 */

/** Bright Data bonus: "Official Live Context" section in What's Happening Nearby.
 * When true, shows up to 3 recent official web updates from city domains (Bright Data SERP).
 * Requires BRIGHTDATA_API_KEY (or BRIGHT_DATA_API_KEY) in server env.
 * Disabled by default to protect core app stability.
 */
export const BRIGHT_DATA_ENABLED = true;
