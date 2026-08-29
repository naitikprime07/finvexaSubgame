# Fix Blank Ad Boxes - Quick Guide

## 🚨 Blank Ad Boxes? Follow These Steps

### Step 1: Update Your .env File (2 minutes)

Open `d:\Game Web\.env` and make sure it looks like this:

```env
# ENABLE ADS
VITE_ADS_ENABLED=true

# ENABLE DEBUG MODE (to see what's wrong)
VITE_ADS_DEBUG=true

# YOUR PUBLISHER ID (already set)
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# ADD AT LEAST ONE REAL SLOT ID
# Replace 1234567890 with YOUR actual slot ID from AdSense Dashboard
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=
```

**Important:**
- Change `VITE_ADS_ENABLED` from `false` to `true`
- Change `VITE_ADS_DEBUG` from `false` to `true`
- Replace `1234567890` with your REAL slot ID from AdSense

---

### Step 2: Restart Development Server

```bash
# Stop server (Ctrl+C)
# Start again:
npm run dev
```

**Why?** Environment variables only load at startup!

---

### Step 3: Open Browser Console

1. Open your site in browser
2. Press **F12** (or Ctrl+Shift+I on Windows / Cmd+Option+I on Mac)
3. Click **Console** tab
4. Look for messages starting with `[AdSense Debug]`

---

## What the Console Will Tell You

### ✅ If You See This - Configuration is Working

```
[AdSense Debug] AdSense Loader initialized
[AdSense Debug] AdSense script added to page
[AdSense Debug] AdSense script loaded successfully
[AdSense Debug] Initializing ad unit
[AdSense Debug] Ad unit push successful for slot: 1234567890
```

**If ads still blank:** This is normal! Reasons:
- Testing on localhost (AdSense doesn't work well here)
- Using example slot ID (1234567890 is not a real ad unit)
- Site not verified in AdSense yet
- New account (takes 24-48 hours for first ads)

**Solution:** Deploy to production domain and use real slot IDs

---

### ❌ If You See This - Ads Are Disabled

```
[AdSense Debug] Ads are disabled (VITE_ADS_ENABLED=false)
```

**Fix:** Change `.env` file:
```env
VITE_ADS_ENABLED=true  # Change false to true
```

Then restart: `npm run dev`

---

### ❌ If You See This - Publisher ID Missing

```
[AdSense] Publisher ID is missing
```

**Fix:** Add to `.env` file:
```env
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
```

Then restart: `npm run dev`

---

### ❌ If You See This - Slot ID Missing

```
[AdSense Debug] Ad unit not shown: {
  hasSlotId: false
}
```

**Fix:** Add slot ID to `.env`:
```env
VITE_AD_BANNER_HOME_TOP=1234567890
```

Then restart: `npm run dev`

---

### ❌ If You See This - AdSense Script Failed

```
[AdSense] Failed to load AdSense script
[AdSense] Check: 1) Internet connection 2) Ad blocker disabled 3) Publisher ID correct
```

**Possible causes:**

**A. Ad Blocker Active**
- Disable browser ad blocker
- Refresh page

**B. Incorrect Publisher ID**
```env
# Must be exactly:
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# NOT:
VITE_ADSENSE_PUBLISHER_ID=6947636494282386    # Missing ca-pub-
VITE_ADSENSE_PUBLISHER_ID=pub-6947636494282386 # Missing ca-
```

---

## Most Common Reasons for Blank Ads

### 1. Testing on Localhost (90% of cases)

**Problem:** You're viewing `http://localhost:5173`

**Why blank:** Google AdSense doesn't serve real ads on localhost

**Solutions:**
- **Option A:** Deploy to production (recommended)
- **Option B:** Accept that localhost won't show real ads

---

### 2. Using Example Slot IDs (5% of cases)

**Problem:** You copied example values from documentation

```env
# These are FAKE example IDs
VITE_AD_BANNER_HOME_TOP=1234567890  ← Not real!
```

**Solution:** Get REAL slot IDs:

1. Go to https://www.google.com/adsense/
2. **Ads** → **By ad unit** → **Display ads**
3. Click "Create ad unit"
4. Copy the actual slot ID (10 digits)
5. Replace in `.env`

---

### 3. Haven't Created Ad Units Yet (4% of cases)

**Problem:** No ad units created in AdSense Dashboard

**Solution:**
1. Log into AdSense
2. Create at least one ad unit
3. Copy the slot ID
4. Add to `.env`
5. Restart dev server

---

### 4. Site Not Verified (1% of cases)

**Problem:** AdSense hasn't verified your site yet

**Check:**
1. Go to AdSense Dashboard
2. **Sites** section
3. Look for your domain

**If not verified:**
- Wait 24-48 hours after uploading `ads.txt`
- Make sure `https://yourdomain.com/ads.txt` is accessible

---

## Production Deployment Test

If ads work locally (or you see the right debug messages), deploy to test:

### Build for Production

```bash
npm run build
```

### Deploy

Upload `dist` folder to your hosting.

### Verify

1. Visit `https://yourdomain.com`
2. Wait 10-20 minutes
3. Check if ads appear

**If still blank on production:**
- Site might not be approved yet
- Ad units might not be created
- ads.txt might not be verified (wait 24-48 hours)

---

## Quick Diagnosis Flowchart

```
Blank ad boxes?
  ↓
Check browser console (F12)
  ↓
See "[AdSense Debug]" messages?
  ├─ NO → VITE_ADS_DEBUG=true is not set
  │        Fix: Set VITE_ADS_DEBUG=true and restart
  │
  └─ YES → What does it say?
       ├─ "Ads are disabled"
       │  → Fix: VITE_ADS_ENABLED=true and restart
       │
       ├─ "Publisher ID is missing"
       │  → Fix: Add VITE_ADSENSE_PUBLISHER_ID
       │
       ├─ "hasSlotId: false"
       │  → Fix: Add slot ID to .env
       │
       ├─ "Failed to load AdSense script"
       │  → Fix: Disable ad blocker, check Publisher ID
       │
       └─ "Ad unit push successful"
          → Code is working!
             Problem is likely:
             - Testing on localhost (deploy to production)
             - Using fake slot IDs (use real ones)
             - Site not verified yet (wait 24-48 hours)
```

---

## Your Next Steps

1. **Update .env** with the template above
2. **Set VITE_ADS_ENABLED=true**
3. **Set VITE_ADS_DEBUG=true**
4. **Restart** dev server: `npm run dev`
5. **Open** browser console (F12)
6. **Read** the debug messages
7. **Follow** the specific fix for your error

---

## Need More Help?

**See detailed guide:**
[TROUBLESHOOTING_ADS.md](./TROUBLESHOOTING_ADS.md)

**Quick reference:**
- [PRODUCTION_SETUP_EXAMPLE.md](./PRODUCTION_SETUP_EXAMPLE.md) - How to set up
- [PRODUCTION_VALUES_GUIDE.md](./PRODUCTION_VALUES_GUIDE.md) - Value formats

---

## Summary

✅ **I've added:**
- Debug mode (`VITE_ADS_DEBUG=true`)
- Better error messages in console
- Script load verification
- Detailed logging

✅ **You need to:**
1. Set `VITE_ADS_ENABLED=true`
2. Set `VITE_ADS_DEBUG=true`
3. Add real slot IDs (not examples)
4. Restart dev server
5. Check browser console

✅ **Remember:**
- Ads won't show properly on localhost
- Need real slot IDs from AdSense Dashboard
- Need to deploy to production to see real ads
- Takes 24-48 hours for new sites to be verified

**Check your browser console now!** It will tell you exactly what's wrong. 🔍
