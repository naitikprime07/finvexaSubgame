# Quick Start: Production Setup (5 Minutes)

## ✅ What You Already Have

- ✅ Publisher ID: `ca-pub-6947636494282386` (configured)
- ✅ ads.txt file (configured)
- ✅ Environment file structure (ready)

## ⏳ What You Need to Do

Create 6 ad units and add their IDs to your `.env` file.

---

## Step 1: Create Ad Units (One Time Setup)

### 1.1 Go to AdSense Dashboard

Visit: https://www.google.com/adsense/

### 1.2 Navigate to Ad Units

**Ads** → **By ad unit** → **Display ads**

### 1.3 Click "New ad unit"

### 1.4 Create First Ad Unit

**Fill in:**
```
Ad unit name: Finvexa Home Top Banner
Ad type: Display ad
Ad size: Responsive
```

**Click "Create"**

### 1.5 Get the Slot ID

You'll see code like this:
```html
<ins class="adsbygoogle"
     data-ad-slot="1234567890"    ← COPY THIS NUMBER
     ...>
</ins>
```

**Copy only the 10-digit number**

### 1.6 Repeat for Remaining 5 Ad Units

Create with these names:
1. ✅ `Finvexa Home Top Banner`
2. `Finvexa Catalog Top Banner`
3. `Finvexa Catalog Bottom Banner`
4. `Finvexa Game Top Rectangle`
5. `Finvexa Game Mid Banner`
6. `Finvexa Game Bottom Banner`

---

## Step 2: Update .env File

### 2.1 Open Your .env File

Location: `d:\Game Web\.env`

### 2.2 Add Your Slot IDs

Replace the empty values with your actual slot IDs:

**Before:**
```env
VITE_ADS_ENABLED=false
VITE_AD_BANNER_HOME_TOP=
VITE_AD_BANNER_CATALOG_TOP=
```

**After:**
```env
VITE_ADS_ENABLED=true
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
```

### 2.3 Complete Example

Your `.env` should look like this (with YOUR actual slot IDs):

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012
VITE_AD_BANNER_GAME_TOP=4567890123
VITE_AD_BANNER_GAME_MID=5678901234
VITE_AD_BANNER_GAME_BOTTOM=6789012345

VITE_GA_MEASUREMENT_ID=
```

**Format Rules:**
- ✅ Numbers only (10 digits)
- ✅ No quotes
- ✅ No spaces
- ✅ No `ca-pub-` prefix

---

## Step 3: Build & Deploy

### 3.1 Build for Production

```bash
npm run build
```

### 3.2 Deploy

Upload the `dist` folder to your hosting.

### 3.3 Verify

1. Visit `https://yourdomain.com/ads.txt`
2. Should show: `google.com, pub-6947636494282386, DIRECT, f08c47fec0942fa0`
3. Wait 10-20 minutes for ads to appear

---

## Perfect Production Values

### Format Guide

| Variable | Format | Example | Your Value |
|----------|--------|---------|------------|
| Publisher ID | `ca-pub-` + 16 digits | `ca-pub-6947636494282386` | ✅ Already set |
| Slot IDs | 10 digits | `1234567890` | Get from AdSense |
| Analytics | `G-` + 10 chars | `G-ABC123XYZ` | Optional |

### Checklist

- [ ] Created 6 ad units in AdSense
- [ ] Copied 6 slot IDs
- [ ] Pasted into `.env` file
- [ ] Set `VITE_ADS_ENABLED=true`
- [ ] Ran `npm run build`
- [ ] Deployed `dist` folder
- [ ] Verified `ads.txt` is accessible

---

## Common Mistakes & Fixes

### ❌ Mistake 1: Including ca-pub- prefix

**Wrong:**
```env
VITE_AD_BANNER_HOME_TOP=ca-pub-1234567890
```

**Correct:**
```env
VITE_AD_BANNER_HOME_TOP=1234567890
```

### ❌ Mistake 2: Adding quotes

**Wrong:**
```env
VITE_AD_BANNER_HOME_TOP="1234567890"
```

**Correct:**
```env
VITE_AD_BANNER_HOME_TOP=1234567890
```

### ❌ Mistake 3: Wrong ID type

**Wrong:**
```env
VITE_AD_BANNER_HOME_TOP=ca-pub-6947636494282386
```

**Correct:**
```env
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386  ← Publisher ID
VITE_AD_BANNER_HOME_TOP=1234567890                ← Slot ID
```

### ❌ Mistake 4: Forgetting to enable

**Wrong:**
```env
VITE_ADS_ENABLED=false  ← Ads won't show!
```

**Correct:**
```env
VITE_ADS_ENABLED=true  ← Ads will show
```

---

## Testing Before Production

### Test with One Ad First

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
VITE_AD_BANNER_HOME_TOP=1234567890

# Leave others empty for now
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
```

**Deploy and verify homepage ad shows correctly**

Then add remaining ads:
```env
VITE_AD_BANNER_CATALOG_TOP=2345678901
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012
# etc...
```

---

## Real Slot ID Examples

These are what real AdSense slot IDs look like:

```
Valid examples from different websites:
1234567890
9876543210
1111111111
5555555555
8421098765
```

Your slot IDs will be different - use the ones AdSense generates for you.

---

## After Deployment

### Timeline

- **0 minutes:** Deploy completed
- **10-20 minutes:** Ads start appearing
- **24 hours:** AdSense verifies ads.txt
- **Ongoing:** Ads optimize based on performance

### Verification

**Check these:**
1. `https://yourdomain.com` - See ads on homepage
2. `https://yourdomain.com/ads.txt` - Shows your Publisher ID
3. AdSense Dashboard - Shows impressions

---

## Need Help?

### Reference Documents

- **[PRODUCTION_SETUP_EXAMPLE.md](./PRODUCTION_SETUP_EXAMPLE.md)** - Detailed examples
- **[AD_CONFIGURATION.md](./AD_CONFIGURATION.md)** - Complete guide
- **[DEPLOYMENT_WARNINGS_EXPLANATION.md](./DEPLOYMENT_WARNINGS_EXPLANATION.md)** - About VITE_ warnings

### Quick Support

**Ads not showing?**
1. Wait 20 minutes after deployment
2. Check `VITE_ADS_ENABLED=true`
3. Verify slot IDs are 10-digit numbers
4. Disable ad blockers
5. Check browser console for errors

**Build errors?**
1. Check `.env` format (no quotes, no spaces)
2. Run `npm run build` again
3. Check console output for specific errors

---

## Summary

### Your Current Status

✅ **Publisher ID:** Configured (`ca-pub-6947636494282386`)
✅ **ads.txt:** Configured
✅ **Environment:** Ready

### Next Steps

1. ⏳ Create 6 ad units in AdSense (5 minutes)
2. ⏳ Copy slot IDs to `.env` (1 minute)
3. ⏳ Set `VITE_ADS_ENABLED=true`
4. ⏳ Build: `npm run build`
5. ⏳ Deploy

**Total time:** About 10 minutes

You're almost there! 🚀
