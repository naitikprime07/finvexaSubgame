# Environment Variables Quick Reference

## Ad Configuration Variables

Copy and paste this into your `.env` file and fill in your ad unit IDs:

```env
# ============================================
# MASTER CONTROLS
# ============================================

# Toggle ads on/off across entire site
VITE_ADS_ENABLED=false

# Your AdSense Publisher ID
# Find in: AdSense > Account > Settings
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# ============================================
# BANNER ADS - Create these in AdSense Dashboard
# Go to: Ads > By ad unit > Display ads
# ============================================

# Homepage top banner
VITE_AD_BANNER_HOME_TOP=

# Game catalog/browse page - top
VITE_AD_BANNER_CATALOG_TOP=

# Game catalog/browse page - bottom
VITE_AD_BANNER_CATALOG_BOTTOM=

# Individual game page - above game player
VITE_AD_BANNER_GAME_TOP=

# Individual game page - between player and description
VITE_AD_BANNER_GAME_MID=

# Individual game page - below description
VITE_AD_BANNER_GAME_BOTTOM=

# ============================================
# ANALYTICS (Optional)
# ============================================

VITE_GA_MEASUREMENT_ID=
```

## Variable Details

| Variable | Required | Description | Example Value |
|----------|----------|-------------|---------------|
| `VITE_ADS_ENABLED` | Yes | Master switch for all ads | `true` or `false` |
| `VITE_ADSENSE_PUBLISHER_ID` | Yes | Your AdSense Publisher/Client ID | `ca-pub-6947636494282386` |
| `VITE_AD_BANNER_HOME_TOP` | No* | Homepage top ad slot | `1234567890` |
| `VITE_AD_BANNER_CATALOG_TOP` | No* | Catalog page top ad slot | `0987654321` |
| `VITE_AD_BANNER_CATALOG_BOTTOM` | No* | Catalog page bottom ad slot | `1122334455` |
| `VITE_AD_BANNER_GAME_TOP` | No* | Game page top ad slot | `5544332211` |
| `VITE_AD_BANNER_GAME_MID` | No* | Game page middle ad slot | `6677889900` |
| `VITE_AD_BANNER_GAME_BOTTOM` | No* | Game page bottom ad slot | `9988776655` |
| `VITE_GA_MEASUREMENT_ID` | No | Google Analytics tracking ID | `G-XXXXXXXXXX` |

*Required only if `VITE_ADS_ENABLED=true`. Each ad slot not configured will simply not display.

## How to Get Your IDs

### Publisher ID
1. Go to [AdSense Dashboard](https://www.google.com/adsense/)
2. Click **Account** → **Settings** → **Account Information**
3. Copy your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
4. Add to `.env` as `VITE_ADSENSE_PUBLISHER_ID`
5. Add to `public/ads.txt` (replace the placeholder)

### Ad Unit Slot IDs
1. Go to [AdSense Dashboard](https://www.google.com/adsense/)
2. Click **Ads** → **By ad unit** → **Display ads**
3. Click **New ad unit**
4. Create a responsive display ad
5. Copy the **slot ID** (numbers only, not the full code)
6. Add to `.env` file

Repeat for each of the 6 ad placements.

## Enabling/Disabling Ads

### To Disable All Ads
```env
VITE_ADS_ENABLED=false
```
No ads will show anywhere on the site, regardless of other settings.

### To Enable Ads
```env
VITE_ADS_ENABLED=true
```
Ads will show in all placements where you've configured a slot ID.

## Common Patterns

### Enable ads only on certain pages
Simply don't provide slot IDs for pages you don't want ads:

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Only homepage and catalog ads
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=0987654321
VITE_AD_BANNER_CATALOG_BOTTOM=1122334455

# Leave game page ads empty - no ads on game pages
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
```

## Security Notes

### ⚠️ About Deployment Warnings

If your deployment platform warns about `VITE_` variables being exposed to the browser:

**This is EXPECTED and SAFE for this project.**

All variables in this project are intentionally public and NOT secrets. See [SECURITY_AND_ENVIRONMENT_VARIABLES.md](./SECURITY_AND_ENVIRONMENT_VARIABLES.md) for detailed explanation.

### ✅ Safe to Expose (Current Variables)

All `VITE_*` variables in this project are PUBLIC by design:

| What | Why It's Safe | How It's Used |
|------|---------------|---------------|
| Publisher IDs | Visible in every AdSense website's HTML | Browser loads AdSense script |
| Ad slot IDs | Visible in HTML `<ins>` tags | Browser requests specific ads |
| Analytics IDs | Visible in every GA website's HTML | Browser sends tracking data |
| Feature flags | Just boolean toggles | Browser enables/disables features |

**The `VITE_` prefix is REQUIRED** for this frontend-only application.

### ❌ Never Expose (Not in This Project)

Do NOT put these in `VITE_*` variables:
- Database credentials
- Private API keys (e.g., payment processors)
- Authentication secrets
- Encryption keys

**This project has NONE of these** because it's a static frontend with no backend.

### Why This Configuration is Correct

1. **This is a frontend-only app** - All code runs in the browser
2. **AdSense requires public IDs** - The browser needs them to load ads
3. **Every AdSense website works this way** - Check any major site's HTML source
4. **No actual secrets exist** - All values are intentionally public

For more details, read: [SECURITY_AND_ENVIRONMENT_VARIABLES.md](./SECURITY_AND_ENVIRONMENT_VARIABLES.md)

## Troubleshooting

### "Ads not showing"
1. Check `VITE_ADS_ENABLED=true`
2. Verify Publisher ID is correct
3. Verify slot IDs are correct (numbers only)
4. Build and deploy (`npm run build`)
5. Ads won't work on localhost - deploy to production
6. Wait 10-20 minutes after first deployment

### "Wrong ad in wrong place"
Check your slot IDs match the correct placement in `.env`

### "Build errors"
Run `npm run build` and check the console output

## Files Modified

These files were updated with the new variable names:

- ✅ `src/components.jsx` - Publisher ID and homepage ad
- ✅ `src/games.jsx` - Game page and catalog ads
- ✅ `.env` - Your actual configuration
- ✅ `.env.example` - Template with documentation
- ✅ `public/ads.txt` - Publisher ID for AdSense verification

## Next Steps

1. ✅ Publisher ID configured in `.env` and `ads.txt`
2. ⏳ Create 6 ad units in AdSense Dashboard
3. ⏳ Copy slot IDs to `.env`
4. ⏳ Set `VITE_ADS_ENABLED=true`
5. ⏳ Run `npm run build`
6. ⏳ Deploy to production
7. ⏳ Verify ads show correctly

See [AD_CONFIGURATION.md](./AD_CONFIGURATION.md) for detailed setup instructions.
