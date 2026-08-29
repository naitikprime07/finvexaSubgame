# 📍 Complete Ad Placement Guide - All Locations Mapped

## 🎯 Summary: 7 Total Ad Placements

Your website has **7 different ad placements** across 2 main sections:

1. **Finance Website** (Home + Articles) - 2 placements
2. **Game Portal** (`/play` route) - 5 placements

---

## 📊 Ad Placement Breakdown

### **1. Finance Website Ads (2 Total)**

#### **Ad #1: Home Page Top Banner**
- **Location**: Finance homepage (`/` or `/en`)
- **Component**: `AdSlot` in `Shell` component
- **File**: `src/components.jsx:263`
- **Environment Variable**: `VITE_AD_BANNER_HOME_TOP`
- **Current Value**: `1234567890` ⚠️ PLACEHOLDER
- **Format**: Responsive display ad
- **When it shows**: On every page that uses `<Shell ad={true}>`

**How to get real ID:**
1. Go to AdSense Dashboard → **Ads** → **By ad unit** → **Display ads**
2. Click **New ad unit**
3. Name: `Finvexa Home Top Banner`
4. Type: **Display ad** (Responsive)
5. Copy the `data-ad-slot` number (10 digits)
6. Add to `.env`: `VITE_AD_BANNER_HOME_TOP=YOUR_REAL_ID`

---

#### **Ad #2: Interstitial / Full-Page Ad**
- **Location**: First visit + article detail pages
- **Component**: `InterstitialAd` in `main.jsx`
- **File**: `src/components.jsx:285-342`
- **Environment Variable**: `VITE_AD_INTERSTITIAL`
- **Current Value**: `7890123456` ⚠️ PLACEHOLDER
- **Format**: Full-screen overlay ad
- **When it shows**:
  - On first visit to the website (once per session)
  - When clicking into article detail pages (`/en/carFinance/*` or `/en/healthFinance/*`)

**How to get real ID:**
1. Go to AdSense Dashboard → **Ads** → **By ad unit** → **Display ads**
2. Click **New ad unit**
3. Name: `Finvexa Interstitial Ad`
4. Type: **Display ad** (Responsive) - Size: Large (can show full-screen)
5. Copy the `data-ad-slot` number
6. Add to `.env`: `VITE_AD_INTERSTITIAL=YOUR_REAL_ID`

---

### **2. Game Portal Ads (5 Total)**

#### **Ad #3: Game Catalog Top Banner**
- **Location**: Game list page (`/play`)
- **Component**: `GameAd` with `name="top"`
- **File**: `src/games.jsx:601`
- **Environment Variable**: `VITE_AD_BANNER_CATALOG_TOP`
- **Current Value**: `2345678901` ⚠️ PLACEHOLDER
- **Format**: Responsive banner
- **When it shows**: At the top of the game catalog page

**Create ad unit**: `Finvexa Catalog Top Banner`

---

#### **Ad #4: Game Catalog Bottom Banner**
- **Location**: Game list page (`/play`)
- **Component**: `GameAd` with `name="bottom"`
- **File**: `src/games.jsx:603`
- **Environment Variable**: `VITE_AD_BANNER_CATALOG_BOTTOM`
- **Current Value**: `3456789012` ⚠️ PLACEHOLDER
- **Format**: Responsive banner
- **When it shows**: At the bottom of the game catalog page

**Create ad unit**: `Finvexa Catalog Bottom Banner`

---

#### **Ad #5: Game Detail Top Banner**
- **Location**: Individual game pages (`/play/{game-name}.html`)
- **Component**: `GameAd` with `name="detail-top"`
- **File**: `src/games.jsx:516`
- **Environment Variable**: `VITE_AD_BANNER_GAME_TOP`
- **Current Value**: `4567890123` ⚠️ PLACEHOLDER
- **Format**: Large responsive ad (336x280 on mobile, 970x90 on desktop)
- **When it shows**: Above the game player area

**Create ad unit**: `Finvexa Game Top Rectangle`

---

#### **Ad #6: Game Detail Mid Banner**
- **Location**: Individual game pages
- **Component**: `GameAd` with `name="detail-mid"`
- **File**: `src/games.jsx:536`
- **Environment Variable**: `VITE_AD_BANNER_GAME_MID`
- **Current Value**: `5678901234` ⚠️ PLACEHOLDER
- **Format**: Responsive banner
- **When it shows**: Between game player and game description

**Create ad unit**: `Finvexa Game Mid Banner`

---

#### **Ad #7: Game Detail Bottom Banner**
- **Location**: Individual game pages
- **Component**: `GameAd` with `name="detail-bottom"`
- **File**: `src/games.jsx:544`
- **Environment Variable**: `VITE_AD_BANNER_GAME_BOTTOM`
- **Current Value**: `6789012345` ⚠️ PLACEHOLDER
- **Format**: Responsive banner
- **When it shows**: After game description, before related games

**Create ad unit**: `Finvexa Game Bottom Banner`

---

## 📋 Quick Reference: Environment Variables

```env
# Finance Website
VITE_AD_BANNER_HOME_TOP=1234567890          # Home page banner
VITE_AD_INTERSTITIAL=7890123456             # Full-page overlay

# Game Portal
VITE_AD_BANNER_CATALOG_TOP=2345678901       # Catalog top
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012    # Catalog bottom
VITE_AD_BANNER_GAME_TOP=4567890123          # Game page top
VITE_AD_BANNER_GAME_MID=5678901234          # Game page mid
VITE_AD_BANNER_GAME_BOTTOM=6789012345       # Game page bottom
```

---

## 🔧 How Each Ad Checks Before Showing

All ads use this logic:

```javascript
const live =
  import.meta.env.VITE_ADS_ENABLED === "true" &&
  Boolean(import.meta.env.VITE_ADSENSE_PUBLISHER_ID) &&
  Boolean(slot);
```

**This means ads ONLY show when:**
1. ✅ `VITE_ADS_ENABLED=true`
2. ✅ `VITE_ADSENSE_PUBLISHER_ID` is set (your Publisher ID)
3. ✅ The specific slot ID for that placement is configured

**If any condition fails → ad space is hidden (returns `null`)**

---

## 🚀 Step-by-Step: Enable All Ads

### **Step 1: Create 7 Ad Units in AdSense Dashboard**

Go to: https://www.google.com/adsense → **Ads** → **By ad unit** → **Display ads**

Create these 7 ad units:

| #  | Ad Unit Name                    | Type         | Size/Format  |
|----|---------------------------------|--------------|--------------|
| 1  | Finvexa Home Top Banner         | Display ad   | Responsive   |
| 2  | Finvexa Interstitial Ad         | Display ad   | Responsive   |
| 3  | Finvexa Catalog Top Banner      | Display ad   | Responsive   |
| 4  | Finvexa Catalog Bottom Banner   | Display ad   | Responsive   |
| 5  | Finvexa Game Top Rectangle      | Display ad   | Responsive   |
| 6  | Finvexa Game Mid Banner         | Display ad   | Responsive   |
| 7  | Finvexa Game Bottom Banner      | Display ad   | Responsive   |

### **Step 2: Copy Each Slot ID**

For each ad unit, copy the **`data-ad-slot`** value:

```html
<!-- Example AdSense code -->
<ins class="adsbygoogle"
     data-ad-client="ca-pub-6947636494282386"
     data-ad-slot="1234567890">  ← Copy this 10-digit number
</ins>
```

### **Step 3: Update `.env` File**

Replace all placeholder IDs with real ones:

```env
VITE_ADS_ENABLED=true
VITE_ADS_DEBUG=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Replace these with REAL slot IDs ↓
VITE_AD_BANNER_HOME_TOP=YOUR_REAL_ID_1
VITE_AD_INTERSTITIAL=YOUR_REAL_ID_2
VITE_AD_BANNER_CATALOG_TOP=YOUR_REAL_ID_3
VITE_AD_BANNER_CATALOG_BOTTOM=YOUR_REAL_ID_4
VITE_AD_BANNER_GAME_TOP=YOUR_REAL_ID_5
VITE_AD_BANNER_GAME_MID=YOUR_REAL_ID_6
VITE_AD_BANNER_GAME_BOTTOM=YOUR_REAL_ID_7
```

### **Step 4: Rebuild and Deploy**

```bash
npm run build
```

Upload `dist/` folder to your hosting.

### **Step 5: Wait for AdSense Verification**

- **Timeline**: 24-48 hours
- Google verifies your site and `ads.txt` file
- Ads start showing after approval

---

## 🐛 Why Ads Aren't Showing Currently

### **Issue #1: Placeholder Slot IDs** ⚠️
All slot IDs (`1234567890`, `2345678901`, etc.) are fake placeholders, not real IDs from AdSense.

**Fix**: Replace with real slot IDs from AdSense Dashboard

---

### **Issue #2: Interstitial Ad Was Returning NULL** ✅ FIXED
The `InterstitialAd` component had `return null;` at the end, preventing it from ever showing.

**Fixed in**: `src/components.jsx:326-342`

---

### **Issue #3: Missing Publisher ID Check** ✅ FIXED
`GameAd` component had the publisher ID check commented out.

**Fixed in**: `src/games.jsx:123`

---

### **Issue #4: Missing Interstitial Slot Variable** ✅ FIXED
No environment variable existed for the interstitial ad.

**Fixed in**: `.env:90` - Added `VITE_AD_INTERSTITIAL`

---

## ✅ What Was Fixed

1. ✅ **Interstitial Ad Component** - Now actually renders the ad instead of returning null
2. ✅ **Publisher ID Validation** - Re-enabled in `GameAd` component
3. ✅ **Interstitial Slot ID** - Added `VITE_AD_INTERSTITIAL` to `.env`
4. ✅ **Complete Documentation** - This guide maps all 7 ad placements

---

## 🎯 Expected Behavior After Fixes

### **Finance Website (`/` and `/en/*` routes)**
- ✅ Banner ad at top of every page
- ✅ Full-page interstitial ad on first visit
- ✅ Interstitial ad when clicking into car/health articles

### **Game Portal (`/play` route)**
- ✅ Banner ad at top of game catalog
- ✅ Banner ad at bottom of game catalog
- ✅ 3 ads on each game detail page (top, mid, bottom)

---

## 📊 Testing Checklist

After adding real slot IDs and deploying:

- [ ] Visit `/` - See home banner ad
- [ ] Visit `/en/carFinance` - See article listing
- [ ] Click an article - See interstitial ad popup
- [ ] Visit `/play` - See top banner ad
- [ ] Scroll to bottom of `/play` - See bottom banner ad
- [ ] Click any game - See 3 ads on game page (top, mid, bottom)

---

## 🔍 Debug Mode

With `VITE_ADS_DEBUG=true`, console will show:

```
[AdSense Debug] AdSense script loaded successfully
[AdSense Debug] Initializing ad unit: { slot: "1234567890", ... }
[AdSense Debug] ✓ Ad unit push successful for slot: 1234567890
```

If you see:
- ❌ "Ad unit not shown" → Check that slot ID exists in `.env`
- ❌ No logs at all → Ads are disabled (`VITE_ADS_ENABLED=false`)

---

## 📞 Summary

**Total Ads**: 7 placements
**Placeholder IDs**: All 7 need to be replaced
**Files Modified**:
- `src/components.jsx` (InterstitialAd fixed)
- `src/games.jsx` (Publisher ID check fixed)
- `.env` (Interstitial variable added)

**Next Step**: Create 7 ad units in AdSense Dashboard and replace placeholder IDs.

**Generated**: 2026-08-29
**Status**: Code Fixed ✅ | Needs Real Slot IDs ⚠️
