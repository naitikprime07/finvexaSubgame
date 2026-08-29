# Google AdSense Setup Guide for Finvexa

This guide explains how to properly configure Google AdSense for your website.

## Important: Understanding ads.txt

**The `ads.txt` file is REQUIRED by Google AdSense** - it's not optional and cannot be removed. This is an industry-standard requirement, not a limitation of this code.

### Why ads.txt is Required

1. **Prevents Ad Fraud**: Ensures only authorized sellers can serve ads on your domain
2. **AdSense Policy**: Google requires it for all publisher accounts
3. **Revenue Protection**: Protects your ad revenue from unauthorized use
4. **Account Safety**: Without it, your AdSense account may face issues or suspension

---

## Current Setup

Your project is configured to work in **two modes**:

### Mode 1: Ads Disabled (Current - Default)
- ✅ No ads are shown anywhere on the website
- ✅ No AdSense scripts are loaded
- ✅ No third-party connections
- ✅ Website works perfectly without AdSense
- ✅ `ads.txt` file exists but is not used until you enable ads

### Mode 2: Ads Enabled (After AdSense Approval)
- ✅ Google AdSense ads displayed in designated areas
- ✅ All ads from third-party advertisers only
- ✅ No static/placeholder ads shown
- ✅ Proper `ads.txt` file configured with your Publisher ID

---

## Step-by-Step Setup Instructions

### Step 1: Get AdSense Approval

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up with your Google account
3. Submit your website for review
4. Wait for Google's approval (typically 1-7 days)

### Step 2: Configure ads.txt File

After approval, Google will provide you with a **Publisher ID** (format: `pub-XXXXXXXXXXXXXXXX`)

1. Open: `public/ads.txt`
2. Find the line:
   ```
   google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
   ```
3. Replace `pub-0000000000000000` with YOUR actual Publisher ID:
   ```
   google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
   ```
4. Save the file

### Step 3: Create Ad Units in AdSense Dashboard

1. Log into your [AdSense Dashboard](https://www.google.com/adsense/)
2. Go to: **Ads** → **By ad unit** → **Display ads**
3. Create **6 responsive ad units** with these names:
   - Main Top Slot (for homepage)
   - Game Top Slot
   - Game Bottom Slot
   - Game Detail Top Slot
   - Game Detail Mid Slot
   - Game Detail Bottom Slot
4. For each ad unit, copy the **slot ID** (numbers only, e.g., `1234567890`)

### Step 4: Configure Environment Variables

1. Open your `.env` file
2. Find your Publisher ID in AdSense Dashboard:
   - Go to: **Account** → **Settings** → **Account Information**
   - Copy your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
3. Update `.env` file:

```env
# Enable ads
VITE_ADS_ENABLED=true

# Your Publisher ID
VITE_ADSENSE_CLIENT=ca-pub-1234567890123456

# Ad slot IDs (from Step 3)
VITE_ADSENSE_MAIN_TOP_SLOT=1234567890
VITE_ADSENSE_GAME_TOP_SLOT=0987654321
VITE_ADSENSE_GAME_BOTTOM_SLOT=1122334455
VITE_ADSENSE_GAME_DETAIL_TOP_SLOT=5544332211
VITE_ADSENSE_GAME_DETAIL_MID_SLOT=6677889900
VITE_ADSENSE_GAME_DETAIL_BOTTOM_SLOT=9988776655
```

### Step 5: Deploy Your Website

1. Build your project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your web server
3. Ensure `ads.txt` is accessible at: `https://yourdomain.com/ads.txt`

### Step 6: Verify ads.txt

1. Visit: `https://yourdomain.com/ads.txt` in your browser
2. You should see your Publisher ID in the file
3. Check in AdSense Dashboard:
   - Go to: **Sites** → **Your Site** → **View site info**
   - Look for ads.txt status (may take 24 hours to update)

---

## Verification Checklist

Before enabling ads, ensure:

- [ ] Website is approved by Google AdSense
- [ ] Publisher ID obtained from AdSense
- [ ] `public/ads.txt` updated with correct Publisher ID
- [ ] 6 ad units created in AdSense Dashboard
- [ ] All slot IDs copied and added to `.env`
- [ ] `VITE_ADS_ENABLED=true` in `.env`
- [ ] Website deployed to production
- [ ] `ads.txt` accessible at `https://yourdomain.com/ads.txt`
- [ ] AdSense dashboard shows ads.txt verified (wait 24 hours)

---

## Testing

### Test Ads Disabled Mode (Current)
```bash
# Ensure in .env:
VITE_ADS_ENABLED=false

npm run dev
```
- Visit `http://localhost:5173`
- Verify NO ads are shown
- Website should work perfectly

### Test Ads Enabled Mode (After Setup)
```bash
# Ensure in .env:
VITE_ADS_ENABLED=true
VITE_ADSENSE_CLIENT=ca-pub-YOUR_ACTUAL_ID

npm run dev
```
- Visit `http://localhost:5173`
- Ads may show as blank (normal in dev mode)
- Deploy to production to see actual ads

---

## Common Issues

### "ads.txt file not found"
- Ensure `public/ads.txt` exists
- Verify file is deployed with your website
- Check `https://yourdomain.com/ads.txt` is accessible

### "Invalid Publisher ID in ads.txt"
- Verify Publisher ID in `ads.txt` matches your AdSense account
- Format must be: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
- Wait 24 hours for Google to re-crawl

### "Ads not showing on website"
- Verify `VITE_ADS_ENABLED=true` in `.env`
- Check all slot IDs are correct
- Ensure website is deployed (ads don't show in localhost properly)
- Wait 10-20 minutes after deployment for ads to start showing
- Check browser console for errors

### "AdSense account suspended"
- Ensure `ads.txt` is properly configured
- Verify your website complies with [AdSense policies](https://support.google.com/adsense/answer/48182)
- Contact AdSense support

---

## Important Notes

1. **ads.txt is REQUIRED** - There is no way to use Google AdSense without it
2. **Development vs Production**: Ads may not display correctly on localhost
3. **Approval Time**: Google can take 1-7 days (or longer) to approve your site
4. **Policy Compliance**: Ensure your content follows [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
5. **Revenue Threshold**: You need to earn $100 before Google pays out

---

## Support Resources

- [Google AdSense Help Center](https://support.google.com/adsense/)
- [ads.txt Guide](https://support.google.com/adsense/answer/7532444)
- [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- [AdSense Community](https://support.google.com/adsense/community)

---

## Summary

✅ Your code is **already configured** to work with or without AdSense
✅ The `ads.txt` file is **ready to use** - just add your Publisher ID
✅ When ads are disabled, **zero ads** are shown (current state)
✅ When ads are enabled, **only Google AdSense ads** from third parties are shown
✅ All ad placement, loading, and management is **properly handled**

**You don't need to change any code** - just follow the setup steps above when you're ready to enable AdSense!
