# Environment Variables & Deployment Guide

## Quick Start

1. Copy `.env.example` to `.env`
2. Add your AdSense Publisher ID and ad slot IDs
3. Set `VITE_ADS_ENABLED=true` when ready
4. Run `npm run build` and deploy

## 🚨 About Deployment Warnings

If you see a warning about `VITE_` variables being exposed to the browser:

**This is EXPECTED and SAFE.** Read: [DEPLOYMENT_WARNINGS_EXPLANATION.md](./DEPLOYMENT_WARNINGS_EXPLANATION.md)

**TL;DR:**
- ✅ All variables are PUBLIC by design (not secrets)
- ✅ This is how AdSense works on ALL websites
- ✅ The `VITE_` prefix is REQUIRED for browser access
- ✅ Your configuration is correct and secure

## Documentation Files

| File | Purpose |
|------|---------|
| **[DEPLOYMENT_WARNINGS_EXPLANATION.md](./DEPLOYMENT_WARNINGS_EXPLANATION.md)** | Why the VITE_ warning is safe (START HERE) |
| **[SECURITY_AND_ENVIRONMENT_VARIABLES.md](./SECURITY_AND_ENVIRONMENT_VARIABLES.md)** | Detailed security explanation |
| **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** | Variable reference and examples |
| **[AD_CONFIGURATION.md](./AD_CONFIGURATION.md)** | AdSense setup instructions |
| **[ADSENSE_SETUP.md](./ADSENSE_SETUP.md)** | Step-by-step AdSense guide |

## Environment Variables

### Required

```env
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386  # Your AdSense ID
```

### Optional (Add when creating ad units)

```env
VITE_AD_BANNER_HOME_TOP=        # Homepage top banner
VITE_AD_BANNER_CATALOG_TOP=     # Catalog page top
VITE_AD_BANNER_CATALOG_BOTTOM=  # Catalog page bottom
VITE_AD_BANNER_GAME_TOP=        # Game detail top
VITE_AD_BANNER_GAME_MID=        # Game detail middle
VITE_AD_BANNER_GAME_BOTTOM=     # Game detail bottom
```

### Feature Toggles

```env
VITE_ADS_ENABLED=false          # Master toggle for all ads
VITE_GA_MEASUREMENT_ID=         # Google Analytics (optional)
```

## Security Summary

### ✅ What's Public (Safe to Expose)

All current environment variables:

- `VITE_ADSENSE_PUBLISHER_ID` - Public by design
- `VITE_AD_BANNER_*` - Public by design
- `VITE_GA_MEASUREMENT_ID` - Public by design
- `VITE_ADS_ENABLED` - Just a boolean

**These MUST be public for the browser to access them.**

### ❌ What Would Be Private (Not in This Project)

- Database credentials
- Private API keys
- Authentication secrets
- Encryption keys

**This is a static frontend app with NO backend**, so no private variables exist.

## Common Questions

**Q: Why does deployment warn about VITE_ variables?**
A: It's reminding you these are exposed to browser. This is expected and safe for AdSense IDs.

**Q: Should I remove the VITE_ prefix to hide my Publisher ID?**
A: No. The browser NEEDS this ID to load ads. It's public by design.

**Q: Is my Publisher ID a secret?**
A: No. It's visible in the HTML source of EVERY AdSense website.

**Q: How do I verify this is safe?**
A: Visit any major news site, view source, search for `ca-pub-`. You'll see their Publisher ID.

**Q: What prevents someone from using my Publisher ID?**
A: The `ads.txt` file. Ads won't serve on domains you don't control.

## Build & Deploy

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

After deploying, verify:
- ✅ `https://yourdomain.com/ads.txt` is accessible
- ✅ Contains your Publisher ID
- ✅ AdSense dashboard shows ads.txt verified (wait 24 hours)

## File Structure

```
d:\Game Web/
├── .env                          # Your actual config (not committed)
├── .env.example                  # Template with documentation
├── public/
│   └── ads.txt                   # AdSense verification (REQUIRED)
├── src/
│   ├── components.jsx            # AdSense loader & ad components
│   └── games.jsx                 # Game pages with ad placements
└── docs/
    ├── DEPLOYMENT_WARNINGS_EXPLANATION.md
    ├── SECURITY_AND_ENVIRONMENT_VARIABLES.md
    ├── ENVIRONMENT_VARIABLES.md
    ├── AD_CONFIGURATION.md
    └── ADSENSE_SETUP.md
```

## Need Help?

1. **Deployment warning about VITE_**: Read [DEPLOYMENT_WARNINGS_EXPLANATION.md](./DEPLOYMENT_WARNINGS_EXPLANATION.md)
2. **Security concerns**: Read [SECURITY_AND_ENVIRONMENT_VARIABLES.md](./SECURITY_AND_ENVIRONMENT_VARIABLES.md)
3. **AdSense setup**: Read [ADSENSE_SETUP.md](./ADSENSE_SETUP.md)
4. **Variable reference**: Read [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)

---

**Key Takeaway:** Your environment variable configuration is correct. The `VITE_` prefix is required for this frontend-only application, and all values are intentionally public (not secrets). Deploy with confidence!
