# Troubleshooting: Blank Ad Boxes / Ads Not Loading

## Quick Diagnosis

If you see blank ad boxes instead of actual ads, follow this guide to fix the issue.

---

## Step 1: Enable Debug Mode

### 1.1 Update Your .env File

```env
# Enable debug mode
VITE_ADS_DEBUG=true

# Make sure ads are enabled
VITE_ADS_ENABLED=true

# Your Publisher ID
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Add at least ONE slot ID for testing
VITE_AD_BANNER_HOME_TOP=1234567890
```

### 1.2 Rebuild and Start Dev Server

```bash
npm run dev
```

### 1.3 Open Browser Console

1. Open your site in browser
2. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Click on **Console** tab
4. Look for messages starting with `[AdSense Debug]` or `[AdSense]`

---

## Step 2: Common Issues and Solutions

### Issue 1: "Ads are disabled (VITE_ADS_ENABLED=false)"

**Console shows:**
```
[AdSense Debug] Ads are disabled (VITE_ADS_ENABLED=false)
```

**Solution:**
```env
# Change this:
VITE_ADS_ENABLED=false

# To this:
VITE_ADS_ENABLED=true
```

**Then restart dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

### Issue 2: "Publisher ID is missing"

**Console shows:**
```
[AdSense] Publisher ID is missing. Set VITE_ADSENSE_PUBLISHER_ID in .env
```

**Solution:**
```env
# Add your Publisher ID
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
```

---

### Issue 3: "Ad unit not shown" - Missing Slot ID

**Console shows:**
```
[AdSense Debug] Ad unit not shown: {
  adsEnabled: true,
  hasPublisherId: true,
  hasSlotId: false,  ← This is false!
  slot: ""
}
```

**Problem:** Slot ID is empty

**Solution:**
```env
# Add slot IDs (get from AdSense Dashboard)
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
# etc...
```

---

### Issue 4: "Failed to load AdSense script"

**Console shows:**
```
[AdSense] Failed to load AdSense script: [error]
[AdSense] Check: 1) Internet connection 2) Ad blocker disabled 3) Publisher ID correct
```

**Possible causes:**

#### A. Ad Blocker is Active

**Solution:**
1. Disable browser ad blocker
2. Or add your localhost to ad blocker whitelist
3. Refresh page

#### B. Incorrect Publisher ID

**Check:**
```env
# Must be exactly this format
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
                         ↑
                    Must have hyphen between "pub" and numbers
```

#### C. Internet Connection Issue

**Test:**
1. Visit https://www.google.com
2. If loads, connection is OK
3. Try refreshing your site

---

### Issue 5: "AdSense script not loaded"

**Console shows:**
```
[AdSense] AdSense script not loaded. Possible causes:
1. Ad blocker is active
2. Internet connection issue
3. AdSense script failed to load
4. Publisher ID incorrect
```

**Solutions:**

1. **Check Network tab:**
   - Open DevTools → Network tab
   - Look for request to `pagead2.googlesyndication.com`
   - If it's red/failed, check ad blocker
   - If it's blocked, disable ad blocker

2. **Verify Publisher ID format:**
   ```env
   # Correct format:
   VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

   # Wrong formats:
   VITE_ADSENSE_PUBLISHER_ID=6947636494282386          # Missing ca-pub-
   VITE_ADSENSE_PUBLISHER_ID=pub-6947636494282386     # Missing ca-
   VITE_ADSENSE_PUBLISHER_ID="ca-pub-6947636494282386" # Has quotes
   ```

---

### Issue 6: Ads Show on Production but Not Localhost

**This is NORMAL!**

**Why:**
- Google AdSense doesn't serve ads well on `localhost`
- AdSense needs to verify your domain
- Some ad formats require HTTPS

**Solution:**
Test on actual deployed domain, not localhost.

**To test locally:**
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Visit http://localhost:4173
```

Even this may not show real ads - deploy to production to see actual ads.

---

### Issue 7: Site Not Verified in AdSense

**Symptoms:**
- Ads show blank boxes
- No errors in console
- ads.txt is accessible

**Check in AdSense Dashboard:**
1. Go to **Sites**
2. Find your site
3. Look for verification status

**If not verified:**
- Wait 24-48 hours after adding ads.txt
- Make sure ads.txt contains correct Publisher ID
- Verify ads.txt is accessible at `https://yourdomain.com/ads.txt`

---

### Issue 8: Ad Units Not Created in AdSense

**Console shows:**
```
[AdSense Debug] Initializing ad unit: {
  slot: "1234567890",
  publisherId: "ca-pub-6947636494282386",
  element: <ins>
}
[AdSense Debug] Ad unit push successful for slot: 1234567890
```

But ads still blank.

**Problem:** You haven't created ad units in AdSense Dashboard yet.

**Solution:**
1. Go to [AdSense Dashboard](https://www.google.com/adsense/)
2. Click **Ads** → **By ad unit** → **Display ads**
3. Create ad units
4. Copy the slot IDs
5. Add to .env file

---

### Issue 9: Using Test/Example Slot IDs

**Problem:**
```env
# You're using example values from documentation
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
```

These are **placeholder examples**, not real slot IDs!

**Solution:**
1. Create real ad units in AdSense Dashboard
2. Copy **your actual** slot IDs
3. Replace example values

---

### Issue 10: Build Not Updated

**Problem:** Made changes to .env but ads still not working

**Solution:**
```bash
# Stop dev server (Ctrl+C)

# Restart to pick up new env values
npm run dev

# OR for production:
npm run build
```

Environment variables are loaded at build time, not runtime!

---

## Complete Debugging Checklist

Use this to diagnose your issue:

### Environment Configuration

- [ ] `VITE_ADS_ENABLED=true` in .env
- [ ] `VITE_ADS_DEBUG=true` for testing
- [ ] `VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386` (your actual ID)
- [ ] At least one slot ID configured (e.g., `VITE_AD_BANNER_HOME_TOP=1234567890`)
- [ ] No quotes around values
- [ ] No spaces around `=` sign
- [ ] Dev server restarted after changing .env

### AdSense Dashboard

- [ ] Account approved by Google AdSense
- [ ] Site added to AdSense
- [ ] Site verified (check Sites section)
- [ ] At least one ad unit created
- [ ] Slot IDs copied correctly (10 digits, numbers only)

### Browser

- [ ] Ad blocker disabled
- [ ] Browser console open (F12)
- [ ] No errors in Console tab
- [ ] Network tab shows successful request to `pagead2.googlesyndication.com`

### Deployment

- [ ] ads.txt file accessible at `https://yourdomain.com/ads.txt`
- [ ] ads.txt contains correct Publisher ID
- [ ] Testing on deployed site, not localhost
- [ ] Waited 10-20 minutes after first deployment

---

## Debug Mode Output Examples

### ✅ Working Configuration

**Console should show:**
```
[AdSense Debug] AdSense Loader initialized {
  adsEnabled: true,
  publisherId: "ca-pub-6947636494282386",
  scriptExists: false
}
[AdSense Debug] AdSense script added to page
[AdSense Debug] AdSense script loaded successfully
[AdSense Debug] Initializing ad unit: {
  slot: "1234567890",
  publisherId: "ca-pub-6947636494282386",
  element: <ins class="adsbygoogle">
}
[AdSense Debug] Ad unit push successful for slot: 1234567890
```

**Then:** Ad should appear (or blank box if testing conditions not met)

---

### ❌ Not Working - Ads Disabled

**Console shows:**
```
[AdSense Debug] AdSense Loader initialized {
  adsEnabled: false,  ← Problem!
  publisherId: "ca-pub-6947636494282386",
  scriptExists: false
}
[AdSense Debug] Ads are disabled (VITE_ADS_ENABLED=false)
```

**Fix:** Set `VITE_ADS_ENABLED=true`

---

### ❌ Not Working - No Slot ID

**Console shows:**
```
[AdSense Debug] AdSense script loaded successfully
[AdSense Debug] Ad unit not shown: {
  adsEnabled: true,
  hasPublisherId: true,
  hasSlotId: false,  ← Problem!
  slot: ""
}
```

**Fix:** Add slot ID to .env

---

## Testing Workflow

### Step-by-Step Testing

1. **Enable Debug Mode**
   ```env
   VITE_ADS_DEBUG=true
   VITE_ADS_ENABLED=true
   VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
   VITE_AD_BANNER_HOME_TOP=1234567890
   ```

2. **Restart Dev Server**
   ```bash
   npm run dev
   ```

3. **Open Browser Console**
   - Press F12
   - Go to Console tab

4. **Check Debug Messages**
   - Look for `[AdSense Debug]` messages
   - Follow any error messages

5. **Check Network Tab**
   - Look for request to `pagead2.googlesyndication.com`
   - Should show status 200 (success)

6. **Disable Debug Mode for Production**
   ```env
   VITE_ADS_DEBUG=false
   ```

---

## Still Not Working?

### If Ads Are Still Blank

**Likely reasons:**

1. **Testing on localhost** → Deploy to production domain
2. **AdSense not approved yet** → Wait for approval email
3. **Site not verified** → Wait 24-48 hours after adding ads.txt
4. **Using example slot IDs** → Create real ad units and use actual IDs
5. **Ad blocker active** → Disable completely
6. **New AdSense account** → Can take 24-48 hours for first ads to show

### What Blank Boxes Mean

Blank ad boxes can mean:

1. ✅ **Code is working** - AdSense script loaded, ad unit initialized
2. ⏳ **Waiting for ads** - AdSense deciding which ad to show
3. 🚫 **Not approved** - Site/ad unit not approved yet
4. 🏠 **Testing locally** - AdSense doesn't work well on localhost

**Don't panic!** If console shows no errors, your code is probably fine.

---

## Production Deployment Checklist

Before expecting ads to work:

1. [ ] **AdSense Account**
   - Account created and approved
   - Site added and verified
   - ads.txt uploaded and verified (24-48 hour wait)

2. [ ] **Ad Units**
   - Created in AdSense Dashboard
   - Slot IDs copied correctly
   - Added to .env file

3. [ ] **Build & Deploy**
   - `npm run build` successful
   - Deployed to production domain (not localhost)
   - ads.txt accessible

4. [ ] **Wait Time**
   - Waited 10-20 minutes after first deployment
   - Checked on real domain, not localhost
   - Disabled ad blockers

5. [ ] **Verification**
   - No errors in browser console
   - AdSense script loaded (check Network tab)
   - Ad containers present in HTML

---

## Quick Fix Commands

```bash
# 1. Update .env with correct values
# (Edit .env file)

# 2. Restart dev server
# Press Ctrl+C to stop, then:
npm run dev

# 3. Or build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Get More Help

**Check these files:**
- [PRODUCTION_SETUP_EXAMPLE.md](./PRODUCTION_SETUP_EXAMPLE.md) - Setup guide
- [QUICK_START_PRODUCTION.md](./QUICK_START_PRODUCTION.md) - Quick start
- [PRODUCTION_VALUES_GUIDE.md](./PRODUCTION_VALUES_GUIDE.md) - Value formats

**Common issues:**
- 90% of problems: `.env` not configured correctly
- 9% of problems: Testing on localhost instead of production
- 1% of problems: Actual code issues

**Your code is now enhanced with:**
- ✅ Better error messages
- ✅ Debug logging
- ✅ Script load verification
- ✅ Detailed troubleshooting info

Enable `VITE_ADS_DEBUG=true` and check your console!
