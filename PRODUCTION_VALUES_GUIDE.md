# Production Values: What Goes Where

This guide shows exactly what values to use for each environment variable with real examples.

---

## Publisher ID vs Slot IDs

### Understanding the Difference

| Type | What It Is | Format | Example | Where Used |
|------|------------|--------|---------|------------|
| **Publisher ID** | Your AdSense account ID | `ca-pub-` + 16 digits | `ca-pub-6947636494282386` | Once per account |
| **Slot ID** | Individual ad unit ID | 10 digits | `1234567890` | Once per ad placement |

### Visual Example

```
Your AdSense Account
├── Publisher ID: ca-pub-6947636494282386  ← ONE for entire account
│
└── Ad Units (you create these):
    ├── Home Top Banner → Slot: 1234567890  ← ONE for this ad
    ├── Catalog Top → Slot: 2345678901      ← ONE for this ad
    ├── Catalog Bottom → Slot: 3456789012   ← ONE for this ad
    ├── Game Top → Slot: 4567890123         ← ONE for this ad
    ├── Game Mid → Slot: 5678901234         ← ONE for this ad
    └── Game Bottom → Slot: 6789012345      ← ONE for this ad
```

---

## Perfect .env Configuration

### Minimum Required (Test Mode)

```env
# Minimal configuration for testing
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=
```

**Result:** Only homepage top ad shows

---

### Full Production (Recommended)

```env
# Complete configuration for maximum monetization
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# All ad placements configured
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012
VITE_AD_BANNER_GAME_TOP=4567890123
VITE_AD_BANNER_GAME_MID=5678901234
VITE_AD_BANNER_GAME_BOTTOM=6789012345

# Optional: Google Analytics
VITE_GA_MEASUREMENT_ID=G-ABC123XYZ
```

**Result:** Ads show on all pages

---

### Partial Deployment (Selective)

```env
# Show ads only on specific pages
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Homepage and catalog - yes
VITE_AD_BANNER_HOME_TOP=1234567890
VITE_AD_BANNER_CATALOG_TOP=2345678901
VITE_AD_BANNER_CATALOG_BOTTOM=3456789012

# Game pages - no ads (leave empty)
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=

VITE_GA_MEASUREMENT_ID=
```

**Result:** Ads only on homepage and catalog pages

---

## Real-World Examples

### Example 1: New Site (Just Approved)

```env
# First day after AdSense approval
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

# Created only 1 ad unit so far
VITE_AD_BANNER_HOME_TOP=1111111111

# Will create others later
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=
```

---

### Example 2: Gradual Rollout

```env
# Week 1: Homepage only
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
VITE_AD_BANNER_HOME_TOP=2222222222
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=

# Week 2: Add catalog
VITE_AD_BANNER_CATALOG_TOP=3333333333
VITE_AD_BANNER_CATALOG_BOTTOM=4444444444

# Week 3: Add game pages
VITE_AD_BANNER_GAME_TOP=5555555555
VITE_AD_BANNER_GAME_MID=6666666666
VITE_AD_BANNER_GAME_BOTTOM=7777777777
```

---

### Example 3: Full Setup with Analytics

```env
# Complete professional setup
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386

VITE_AD_BANNER_HOME_TOP=8888888888
VITE_AD_BANNER_CATALOG_TOP=9999999999
VITE_AD_BANNER_CATALOG_BOTTOM=1010101010
VITE_AD_BANNER_GAME_TOP=2020202020
VITE_AD_BANNER_GAME_MID=3030303030
VITE_AD_BANNER_GAME_BOTTOM=4040404040

# With Google Analytics tracking
VITE_GA_MEASUREMENT_ID=G-WXYZ123456
```

---

## Value Format Reference

### Publisher ID Format

```
Pattern: ca-pub-XXXXXXXXXXXXXXXX
         └─┬─┘ └──────┬────────┘
         prefix   16 digits

Examples:
✅ ca-pub-6947636494282386
✅ ca-pub-1234567890123456
✅ ca-pub-9999999999999999

❌ pub-6947636494282386     (missing "ca-")
❌ 6947636494282386         (missing "ca-pub-")
❌ ca-pub-123456            (too short)
```

### Slot ID Format

```
Pattern: XXXXXXXXXX
         └────┬────┘
          10 digits

Examples:
✅ 1234567890
✅ 9876543210
✅ 5555555555
✅ 1010101010

❌ ca-pub-1234567890        (has ca-pub prefix)
❌ "1234567890"             (has quotes)
❌ 123456                   (too short)
❌ abc1234567               (has letters)
```

### Google Analytics ID Format

```
Pattern: G-XXXXXXXXXX
         │ └────┬────┘
         │   10 chars
       prefix

Examples:
✅ G-ABC123XYZ
✅ G-1234567890
✅ G-WXYZ123456

❌ GA-ABC123XYZ             (wrong prefix)
❌ G-123                    (too short)
❌ ABC123XYZ                (missing "G-")
```

---

## Where to Find Each Value

### Publisher ID

**Location in AdSense:**
```
AdSense Dashboard
  └── Account (gear icon)
      └── Settings
          └── Account Information
              └── Publisher ID: ca-pub-XXXXXXXXXXXXXXXX
```

**Your Value:** `ca-pub-6947636494282386` ✅ Already configured

---

### Slot IDs

**Location in AdSense:**
```
AdSense Dashboard
  └── Ads
      └── By ad unit
          └── Display ads
              └── [Your Ad Unit Name]
                  └── Get code
                      └── data-ad-slot="XXXXXXXXXX"  ← Copy this
```

**You need to create 6 ad units to get 6 slot IDs**

---

### Google Analytics ID

**Location in Google Analytics:**
```
Google Analytics
  └── Admin (gear icon)
      └── Data Streams
          └── [Your Web Stream]
              └── Measurement ID: G-XXXXXXXXXX
```

**Optional:** Only if you want analytics tracking

---

## Mapping: Ad Unit Name → Environment Variable

| Ad Unit Name (Create in AdSense) | Variable in .env | Where It Shows |
|-----------------------------------|------------------|----------------|
| Finvexa Home Top Banner | `VITE_AD_BANNER_HOME_TOP` | Homepage top |
| Finvexa Catalog Top Banner | `VITE_AD_BANNER_CATALOG_TOP` | Catalog page top |
| Finvexa Catalog Bottom Banner | `VITE_AD_BANNER_CATALOG_BOTTOM` | Catalog page bottom |
| Finvexa Game Top Rectangle | `VITE_AD_BANNER_GAME_TOP` | Game detail top |
| Finvexa Game Mid Banner | `VITE_AD_BANNER_GAME_MID` | Game detail middle |
| Finvexa Game Bottom Banner | `VITE_AD_BANNER_GAME_BOTTOM` | Game detail bottom |

---

## Copy-Paste Templates

### Template 1: Quick Test

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
VITE_AD_BANNER_HOME_TOP=[YOUR_10_DIGIT_SLOT_ID]
VITE_AD_BANNER_CATALOG_TOP=
VITE_AD_BANNER_CATALOG_BOTTOM=
VITE_AD_BANNER_GAME_TOP=
VITE_AD_BANNER_GAME_MID=
VITE_AD_BANNER_GAME_BOTTOM=
VITE_GA_MEASUREMENT_ID=
```

**Replace:** `[YOUR_10_DIGIT_SLOT_ID]` with actual slot ID from AdSense

---

### Template 2: Full Production

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
VITE_AD_BANNER_HOME_TOP=[SLOT_ID_1]
VITE_AD_BANNER_CATALOG_TOP=[SLOT_ID_2]
VITE_AD_BANNER_CATALOG_BOTTOM=[SLOT_ID_3]
VITE_AD_BANNER_GAME_TOP=[SLOT_ID_4]
VITE_AD_BANNER_GAME_MID=[SLOT_ID_5]
VITE_AD_BANNER_GAME_BOTTOM=[SLOT_ID_6]
VITE_GA_MEASUREMENT_ID=
```

**Replace all** `[SLOT_ID_X]` with actual slot IDs from AdSense

---

### Template 3: With Analytics

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_PUBLISHER_ID=ca-pub-6947636494282386
VITE_AD_BANNER_HOME_TOP=[SLOT_ID_1]
VITE_AD_BANNER_CATALOG_TOP=[SLOT_ID_2]
VITE_AD_BANNER_CATALOG_BOTTOM=[SLOT_ID_3]
VITE_AD_BANNER_GAME_TOP=[SLOT_ID_4]
VITE_AD_BANNER_GAME_MID=[SLOT_ID_5]
VITE_AD_BANNER_GAME_BOTTOM=[SLOT_ID_6]
VITE_GA_MEASUREMENT_ID=[YOUR_GA_ID]
```

**Replace:**
- `[SLOT_ID_X]` with slot IDs
- `[YOUR_GA_ID]` with Google Analytics ID (e.g., `G-ABC123XYZ`)

---

## Quick Reference Card

**Bookmark this:**

| What | Format | Example | Your Value |
|------|--------|---------|------------|
| Publisher ID | `ca-pub-` + 16 digits | `ca-pub-6947636494282386` | ✅ Set |
| Slot ID #1 | 10 digits | `1234567890` | Get from AdSense |
| Slot ID #2 | 10 digits | `2345678901` | Get from AdSense |
| Slot ID #3 | 10 digits | `3456789012` | Get from AdSense |
| Slot ID #4 | 10 digits | `4567890123` | Get from AdSense |
| Slot ID #5 | 10 digits | `5678901234` | Get from AdSense |
| Slot ID #6 | 10 digits | `6789012345` | Get from AdSense |
| Analytics ID | `G-` + 10 chars | `G-ABC123XYZ` | Optional |

---

## Final Checklist

Before deploying:

- [ ] Publisher ID in `.env` matches `ads.txt`
- [ ] All slot IDs are 10 digits (no letters, no quotes)
- [ ] `VITE_ADS_ENABLED=true`
- [ ] No typos in variable names
- [ ] No extra spaces around `=` sign
- [ ] File saved

---

## Need Help?

**See:** [QUICK_START_PRODUCTION.md](./QUICK_START_PRODUCTION.md) for step-by-step setup

**Got errors?** Check format - most common issues:
- Using Publisher ID instead of Slot ID
- Adding quotes around numbers
- Including `ca-pub-` prefix in slot IDs
- Typos in variable names
