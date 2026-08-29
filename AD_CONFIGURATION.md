# Ad Configuration Quick Reference

This document provides a clear overview of all ad-related environment variables and their usage.

## Environment Variables Overview

### Master Controls

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `VITE_ADS_ENABLED` | boolean | Master toggle for all ads | `true` or `false` |
| `VITE_ADSENSE_PUBLISHER_ID` | string | Your AdSense Publisher/Client ID | `ca-pub-6947636494282386` |

### Display Banner Ads

All banner ads use responsive display ad format that adapts to screen size.

| Variable | Placement | Desktop Size | Mobile Size | Where Used |
|----------|-----------|--------------|-------------|------------|
| `VITE_AD_BANNER_HOME_TOP` | Homepage top | 970x90 | 320x100 | Main site landing page |
| `VITE_AD_BANNER_CATALOG_TOP` | Catalog top | 970x90 | 320x100 | Game browse/catalog page (top) |
| `VITE_AD_BANNER_CATALOG_BOTTOM` | Catalog bottom | 970x90 | 320x100 | Game browse/catalog page (bottom) |
| `VITE_AD_BANNER_GAME_TOP` | Game detail top | 970x90 | 336x280 | Individual game page (above player) |
| `VITE_AD_BANNER_GAME_MID` | Game detail mid | 970x90 | 320x100 | Individual game page (below player) |
| `VITE_AD_BANNER_GAME_BOTTOM` | Game detail bottom | 970x90 | 320x100 | Individual game page (before related) |

## Ad Formats Explained

### Banner Ads (Currently Implemented)
- **Format**: Display banner ads
- **Type**: Standard responsive display units
- **Configuration**: Requires ad slot ID for each placement
- **Enable**: Set slot ID in environment variable

### Auto Ads (AdSense Dashboard Only)

These ad formats are managed entirely through your AdSense dashboard and do NOT require environment variables:

#### Anchor Ads
- **What**: Sticky banner at bottom of mobile screens
- **Enable**: AdSense Dashboard > Ads > By site > Auto ads > Anchor ads
- **No environment variable needed**

#### Interstitial Ads (Vignette)
- **What**: Full-screen ads between page navigations
- **Enable**: AdSense Dashboard > Ads > By site > Auto ads > Vignette ads
- **No environment variable needed**

### Not Currently Implemented

These ad formats would require additional code implementation:

- **In-Feed Native Ads**: Ads within content feeds/lists
- **In-Article Native Ads**: Ads embedded in article content
- **Rewarded Ads**: User watches ad to unlock content/features

## Setup Steps

### Step 1: Create Ad Units in AdSense Dashboard

1. Log into [Google AdSense](https://www.google.com/adsense/)
2. Navigate to: **Ads** → **By ad unit** → **Display ads**
3. Click **New ad unit**
4. Choose **Display ad**
5. Name your ad unit clearly (e.g., "Home Top Banner")
6. Select **Responsive** ad size
7. Click **Create**
8. Copy the **Ad unit ID** (numbers only, e.g., `1234567890`)

Repeat this process for each ad placement:
- Home Top Banner
- Catalog Top Banner
- Catalog Bottom Banner
- Game Top Banner
- Game Mid Banner
- Game Bottom Banner

### Step 2: Configure Environment Variables

Open your `.env` file and add the slot IDs:

```env
# Enable ads
VITE_ADS_ENABLED=true

# Your Publisher ID (already configured)
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Add your ad unit slot IDs here
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=0987654321
VITE_AD_BANNER_CATALOG_BOTTOM=1122334455
VITE_AD_BANNER_GAME_TOP=5544332211
VITE_AD_BANNER_GAME_MID=6677889900
VITE_AD_BANNER_GAME_BOTTOM=9988776655
```

### Step 3: Enable Auto Ads (Optional)

For Anchor and Interstitial ads:

1. Go to: **AdSense Dashboard** → **Ads** → **By site**
2. Select your site
3. Click **Auto ads**
4. Toggle on **Anchor ads** and/or **Vignette ads**
5. Click **Apply to site**

No code changes needed - these work automatically!

## Code Reference

### Where Each Variable is Used

#### Homepage
```javascript
// src/components.jsx - AdSlot component
const slot = import.meta.env.VITE_AD_BANNER_HOME_TOP || "";
```

#### Game Catalog Page
```javascript
// src/games.jsx - GameAd component
"top": import.meta.env.VITE_AD_BANNER_CATALOG_TOP
"bottom": import.meta.env.VITE_AD_BANNER_CATALOG_BOTTOM
```

#### Game Detail Page
```javascript
// src/games.jsx - GameAd component
"detail-top": import.meta.env.VITE_AD_BANNER_GAME_TOP
"detail-mid": import.meta.env.VITE_AD_BANNER_GAME_MID
"detail-bottom": import.meta.env.VITE_AD_BANNER_GAME_BOTTOM
```

#### Publisher ID
```javascript
// src/components.jsx - Global constant
const adsensePublisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || "";
```

## Verification Checklist

Before enabling ads (`VITE_ADS_ENABLED=true`):

- [ ] AdSense account approved
- [ ] Publisher ID added to `.env` as `VITE_ADSENSE_PUBLISHER_ID`
- [ ] Publisher ID added to `public/ads.txt`
- [ ] 6 ad units created in AdSense Dashboard
- [ ] All 6 slot IDs added to `.env` file
- [ ] Website deployed to production
- [ ] `ads.txt` accessible at `https://yourdomain.com/ads.txt`
- [ ] AdSense verified `ads.txt` (wait 24 hours after deployment)
- [ ] Test with `VITE_ADS_ENABLED=true` in production

## Troubleshooting

### Ads Not Showing

1. **Check ads are enabled**:
   ```env
   VITE_ADS_ENABLED=true
   ```

2. **Verify Publisher ID is correct**:
   - Should be `ca-pub-6947636494282386`
   - Must match exactly in both `.env` and `public/ads.txt`

3. **Check slot IDs are correct**:
   - Should be numbers only (no `ca-pub-` prefix)
   - Must match the slot IDs from AdSense Dashboard

4. **Verify deployment**:
   - Run `npm run build`
   - Deploy the `dist` folder
   - Ads won't show properly on localhost

5. **Check browser console**:
   - Look for AdSense errors
   - Ensure no ad blockers are active

### Wrong Ad in Wrong Place

Check the mapping in `src/games.jsx`:

```javascript
const slots = {
  top: import.meta.env.VITE_AD_BANNER_CATALOG_TOP,           // Catalog top
  bottom: import.meta.env.VITE_AD_BANNER_CATALOG_BOTTOM,     // Catalog bottom
  "detail-top": import.meta.env.VITE_AD_BANNER_GAME_TOP,     // Game top
  "detail-mid": import.meta.env.VITE_AD_BANNER_GAME_MID,     // Game mid
  "detail-bottom": import.meta.env.VITE_AD_BANNER_GAME_BOTTOM // Game bottom
};
```

Ensure each variable points to the correct ad unit.

## Variable Naming Convention

All ad variables follow this pattern:

```
VITE_AD_{FORMAT}_{LOCATION}_{POSITION}
```

- **VITE**: Required prefix for Vite environment variables
- **AD**: Indicates this is an ad-related variable
- **FORMAT**: Ad format type (BANNER, NATIVE, REWARDED, etc.)
- **LOCATION**: Page location (HOME, CATALOG, GAME)
- **POSITION**: Position on page (TOP, MID, BOTTOM)

Examples:
- `VITE_AD_BANNER_HOME_TOP` - Banner ad on homepage at top
- `VITE_AD_BANNER_GAME_MID` - Banner ad on game page in middle

This makes it easy to identify which ad goes where without looking at code.

## Summary

✅ **6 banner ad placements** - All clearly named and documented
✅ **1 publisher ID** - Configured in both `.env` and `ads.txt`
✅ **Auto ads ready** - Anchor and Interstitial can be enabled in dashboard
✅ **No hardcoded IDs** - Everything configurable via environment variables
✅ **Clear naming** - Each variable describes its exact purpose and location

You can now easily add or update ad IDs without touching the codebase!
