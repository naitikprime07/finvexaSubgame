# Production Setup Example - Step by Step

This guide shows you exactly how to configure your environment variables for production with real examples.

## Step 1: Get Your AdSense Publisher ID

### Where to Find It

1. Log into [Google AdSense](https://www.google.com/adsense/)
2. Click on **Account** → **Settings** → **Account Information**
3. Look for **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### Example

```
Your Publisher ID: ca-pub-6947636494282386
```

**You already have this!** It's in your `.env` file.

---

## Step 2: Create Ad Units in AdSense

### Creating Your First Ad Unit

1. Go to **Ads** → **By ad unit**
2. Click **Display ads** → **Create new ad unit**
3. Configure as follows:

#### Ad Unit 1: Homepage Top Banner

**Settings:**
- **Ad unit name:** `Finvexa Home Top Banner`
- **Ad type:** Display ad
- **Ad size:** Responsive
- **Ad format:** Horizontal (recommended for banners)

**After creation, you'll get:**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6947636494282386"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6947636494282386"
     data-ad-slot="1234567890"    ← THIS IS YOUR SLOT ID
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

**Copy only the numbers from `data-ad-slot`:**
```
1234567890
```

### Repeat for All 6 Ad Units

Create these ad units with these suggested names:

| Ad Unit Name | Purpose | Slot ID (example) |
|--------------|---------|-------------------|
| `Finvexa Home Top Banner` | Homepage top | `1234567890` |
| `Finvexa Catalog Top Banner` | Game catalog top | `2345678901` |
| `Finvexa Catalog Bottom Banner` | Game catalog bottom | `3456789012` |
| `Finvexa Game Top Rectangle` | Game detail top | `4567890123` |
| `Finvexa Game Mid Banner` | Game detail middle | `5678901234` |
| `Finvexa Game Bottom Banner` | Game detail bottom | `6789012345` |

**Note:** These are example numbers. Your actual slot IDs will be different - use the ones AdSense generates for you.

---

## Step 3: Configure Your .env File

### Complete Production Example

Copy this into your `.env` file and replace the slot IDs with your actual ones:

```env
# ============================================
# PRODUCTION CONFIGURATION
# ============================================

# Master toggle - Set to true when ready to show ads
VITE_ADS_ENABLED=true

# Your AdSense Publisher ID
# This is your actual ID - keep it
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# ============================================
# AD SLOT IDs
# Replace these example values with YOUR actual slot IDs
# from AdSense dashboard (numbers only, no quotes)
# ============================================

# Homepage top banner
VITE_AD_BANNER_HOME_TOP=1234567890

# Game catalog page - top banner
VITE_AD_BANNER_CATALOG_TOP=2345678901

# Game catalog page - bottom banner
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012

# Game detail page - top (large on mobile)
VITE_AD_BANNER_GAME_TOP=4567890123

# Game detail page - middle
VITE_AD_BANNER_GAME_MID=5678901234

# Game detail page - bottom
VITE_AD_BANNER_GAME_BOTTOM=6789012345

# ============================================
# OPTIONAL: Google Analytics
# ============================================

# Leave empty if not using Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Step 4: Update ads.txt File

Your `public/ads.txt` file should contain:

```txt
google.com, pub-6947636494282386, DIRECT, f08c47fec0942fa0
```

✅ **This is already configured correctly in your project!**

---

## Step 5: Build for Production

```bash
# Clean build
npm run build

# Test locally (optional)
npm run preview
```

---

## Step 6: Deploy

Upload the `dist` folder to your hosting provider.

### Deployment Checklist

Before deploying:

- [ ] All 6 ad units created in AdSense dashboard
- [ ] All slot IDs copied to `.env` file
- [ ] `VITE_ADS_ENABLED=true` in `.env`
- [ ] Production build completed (`npm run build`)
- [ ] `ads.txt` file in `public` folder (already there)

After deploying:

- [ ] Visit `https://yourdomain.com/ads.txt` (should show your Publisher ID)
- [ ] Wait 10-20 minutes for ads to start showing
- [ ] Check AdSense dashboard: Sites → Your Site → Verify ads.txt status

---

## Real-World Production Examples

### Example 1: All Ads Enabled

**Perfect for maximum monetization:**

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012
VITE_AD_BANNER_GAME_TOP=4567890123
VITE_AD_BANNER_GAME_MID=5678901234
VITE_AD_BANNER_GAME_BOTTOM=6789012345
VITE_GA_MEASUREMENT_ID=G-ABC123XYZ
```

**Result:** Ads show on all pages in all positions

---

### Example 2: Homepage & Catalog Only

**Good for keeping game pages clean:**

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Only these ads will show
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012

# Leave these empty - no ads on game detail pages
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=
```

**Result:** Ads only on homepage and catalog pages

---

### Example 3: Testing Phase

**Start with one ad to test:**

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Test with just one ad first
VITE_AD_BANNER_HOME_TOP=1234567890

# Add others later
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=
```

**Result:** Only homepage top ad shows - good for testing

---

### Example 4: Development (No Ads)

**Perfect for testing without ads:**

```env
# Ads disabled - good for development/testing
VITE_ADS_ENABLED=false

# Publisher ID can stay
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Slot IDs don't matter when ads are disabled
VITE_AD_BANNER_HOME_TOP=
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=
```

**Result:** No ads anywhere - clean testing

---

## Common Slot ID Formats

AdSense slot IDs are always:
- ✅ 10 digits (e.g., `1234567890`)
- ✅ Numbers only (no letters)
- ✅ No `ca-pub-` prefix
- ✅ No quotes needed in `.env` file

### ✅ Correct Examples

```env
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_HOME_TOP=9876543210
VITE_AD_BANNER_HOME_TOP=5555555555
```

### ❌ Incorrect Examples

```env
# Wrong - includes ca-pub prefix
VITE_AD_BANNER_HOME_TOP=ca-pub-1234567890

# Wrong - has quotes
VITE_AD_BANNER_HOME_TOP="1234567890"

# Wrong - has letters
VITE_AD_BANNER_HOME_TOP=abc1234567

# Wrong - too short
VITE_AD_BANNER_HOME_TOP=123456
```

---

## Google Analytics Setup (Optional)

### Getting Your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Under **Property**, click **Data Streams**
4. Click your web stream
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Example

```env
VITE_GA_MEASUREMENT_ID=G-ABC123XYZ
```

**Leave empty if not using Analytics:**
```env
VITE_GA_MEASUREMENT_ID=
```

---

## Troubleshooting

### Ads Not Showing After Deployment

**Check:**

1. **Wait Time:** Ads can take 10-20 minutes to appear after first deployment
2. **ads.txt:** Verify `https://yourdomain.com/ads.txt` is accessible
3. **Slot IDs:** Make sure they're numbers only (no `ca-pub-` prefix)
4. **AdSense Dashboard:** Check if site is verified
5. **Browser:** Disable ad blockers for testing

### Wrong Format Errors

If build fails or ads don't work:

```env
# ❌ Wrong - has extra spaces
VITE_AD_BANNER_HOME_TOP= 1234567890

# ✅ Correct - no spaces
VITE_AD_BANNER_HOME_TOP=1234567890

# ❌ Wrong - has quotes
VITE_AD_BANNER_HOME_TOP="1234567890"

# ✅ Correct - no quotes
VITE_AD_BANNER_HOME_TOP=1234567890
```

### Testing Locally

Ads won't show properly on `localhost`. To test:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Then visit `http://localhost:4173` (or port shown)

**Still won't show ads perfectly** - ads work best on actual domain deployment.

---

## Quick Copy-Paste Template

**For your .env file (replace slot IDs with your actual ones):**

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

---

## Summary

### What You Need to Do

1. ✅ **Publisher ID:** `ca-pub-6947636494282386` (you already have this)
2. ⏳ **Create 6 ad units** in AdSense dashboard
3. ⏳ **Copy slot IDs** (10-digit numbers)
4. ⏳ **Paste into .env** (numbers only, no quotes)
5. ⏳ **Set `VITE_ADS_ENABLED=true`**
6. ⏳ **Build:** `npm run build`
7. ⏳ **Deploy** the `dist` folder
8. ⏳ **Verify** `https://yourdomain.com/ads.txt` works
9. ⏳ **Wait** 10-20 minutes for ads to appear

### Perfect Production Values

- **Publisher ID:** Your actual `ca-pub-XXXXXXXXXXXXXXXX` (already configured)
- **Slot IDs:** 10-digit numbers from AdSense (copy from dashboard)
- **Format:** Numbers only, no spaces, no quotes
- **Enabled:** `VITE_ADS_ENABLED=true`

You're ready for production! 🚀
