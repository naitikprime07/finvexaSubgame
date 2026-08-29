# 🔄 Google Ad Manager Migration Required

## ⚠️ CRITICAL ISSUE IDENTIFIED

Your ad units are from **Google Ad Manager** (GAM), but your website code is built for **Google AdSense**. These are completely different platforms that require different implementations.

---

## 🆚 The Difference

### **Google AdSense** (Current Code)
- Publisher ID: `ca-pub-6947636494282386`
- Slot IDs: `1234567890` (10 digits)
- Script: `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`
- HTML: `<ins class="adsbygoogle">`

### **Google Ad Manager** (Your Ad Units)
- Network Code: `23338698373`
- Ad Unit Paths: `/23338698373/finvexa_top`
- Script: `securepubads.g.doubleclick.net/tag/js/gpt.js`
- API: `googletag` (Google Publisher Tag)

---

## 📋 Your Ad Units Mapping

You provided these Google Ad Manager ad units:

| GAM Ad Unit Path | Website Placement | Environment Variable |
|------------------|-------------------|---------------------|
| `/23338698373/finvexa_top` | Home page banner, Game catalog top, Game detail top | `VITE_AD_BANNER_HOME_TOP`<br>`VITE_AD_BANNER_CATALOG_TOP`<br>`VITE_AD_BANNER_GAME_TOP` |
| `/23338698373/finvexa_mid1` | Game detail middle section | `VITE_AD_BANNER_GAME_MID` |
| `/23338698373/finvexa_mid2` | Game catalog bottom, Game detail bottom | `VITE_AD_BANNER_CATALOG_BOTTOM`<br>`VITE_AD_BANNER_GAME_BOTTOM` |
| `/23338698373/finvexa_anchor` | Sticky anchor ad (bottom/top of page) | `VITE_AD_ANCHOR` |
| `/23338698373/finvexa_interstitial` | Full-page interstitial overlay | `VITE_AD_INTERSTITIAL` |
| `/23338698373/finvexa_reward` | Rewarded video ad (optional) | `VITE_AD_REWARD` |

---

## 🛠️ Required Code Changes

### **1. Replace AdSense Script with GPT**

**Current** (`src/components.jsx:15-64`):
```javascript
// Loads AdSense script
export function AdSenseLoader() {
  // ...loads pagead2.googlesyndication.com...
}
```

**Needs to be**:
```javascript
// Load Google Publisher Tag
export function GPTLoader() {
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    document.head.appendChild(script);

    script.onload = () => {
      googletag.cmd.push(() => {
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
      });
    };
  }, []);
  return null;
}
```

---

### **2. Replace AdSenseUnit with GPT Ad Slot**

**Current** (`src/components.jsx:66-161`):
```javascript
export function AdSenseUnit({ slot }) {
  // ...uses <ins class="adsbygoogle">...
}
```

**Needs to be**:
```javascript
export function GAMAdUnit({ adUnitPath, slotId, sizes }) {
  useEffect(() => {
    if (!adUnitPath) return;

    googletag.cmd.push(() => {
      googletag
        .defineSlot(adUnitPath, sizes || [[728, 90], [970, 90], [320, 50]], slotId)
        .addService(googletag.pubads());
      googletag.display(slotId);
    });

    return () => {
      googletag.cmd.push(() => {
        googletag.destroySlots([googletag.getSlots().find(s => s.getSlotElementId() === slotId)]);
      });
    };
  }, [adUnitPath, slotId]);

  return <div id={slotId}></div>;
}
```

---

### **3. Update CSP Headers**

**Current CSP** blocks GAM scripts. Need to add:
- `script-src`: `https://securepubads.g.doubleclick.net`
- `frame-src`: `https://tpc.googlesyndication.com`

---

### **4. Update ads.txt**

**Current** (`public/ads.txt`):
```
google.com, pub-6947636494282386, DIRECT, f08c47fec0942fa0
```

**Should be** (for Google Ad Manager):
```
google.com, pub-6947636494282386, DIRECT, f08c47fec0942fa0
google.com, 23338698373, DIRECT, f08c47fec0942fa0
```

---

## 🚨 Why Ads Aren't Loading

1. ❌ **Wrong Script**: Code loads AdSense script, but needs GPT script
2. ❌ **Wrong API**: Code uses `window.adsbygoogle.push()`, but needs `googletag.defineSlot()`
3. ❌ **Wrong Ad Format**: Code uses `<ins class="adsbygoogle">`, but needs `<div id="gpt-slot">`
4. ❌ **Wrong Validation**: Code checks for `VITE_ADSENSE_PUBLISHER_ID`, but needs `VITE_GAM_NETWORK_CODE`

---

## ✅ Solution Options

### **Option 1: Keep Using AdSense** (Easiest)
If you want to use the current code:
1. Go to Google AdSense Dashboard (not Ad Manager)
2. Create 7 new ad units
3. Get the 10-digit slot IDs
4. Replace the Ad Manager paths with AdSense slot IDs

### **Option 2: Migrate to Google Ad Manager** (Recommended if you need GAM features)
1. Rewrite all ad components to use GPT API
2. Update environment variables with GAM ad unit paths
3. Update CSP headers
4. Test extensively

---

## 🎯 Immediate Action Required

**Tell me which option you prefer:**

**A)** Keep current code, switch to AdSense (you'll need to create new ad units in AdSense)

**B)** Migrate code to Google Ad Manager (I'll rewrite all ad components to use your existing GAM ad units)

**Note**: Google Ad Manager is typically used by large publishers with complex needs. AdSense is simpler and works for most websites.

---

## 📞 Next Steps

Once you decide, I'll:
1. Update all ad components
2. Fix environment variables
3. Update CSP headers
4. Create complete testing guide
5. Ensure ads load properly

**Current Status**: ❌ Code mismatch - AdSense code trying to load Ad Manager ads (will never work)

