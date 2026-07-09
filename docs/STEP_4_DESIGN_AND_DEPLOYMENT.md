# Step 4: Visualization & Website - Design and Deployment Guide

**Date**: July 9, 2026 (updated from June 27, 2026)  
**Project**: KBR × Google Books Digitization Analysis  
**Deadline**: July 2026

---

## Table of Contents

1. [Chart Color Schemes](#chart-color-schemes)
2. [Website Design System](#website-design-system)
3. [Website Architecture](#website-architecture)
4. [Deployment Strategy](#deployment-strategy)
5. [Development Workflow](#development-workflow)
6. [Timeline and Deliverables](#timeline-and-deliverables)

---

## Chart Color Schemes

### KBR Brand Color Palette (Derived from Official Website, Adapted for Thesis)

```css
/* Primary Brand Colors */
--kbr-dark-green: #172D20;        /* Deepened green for text contrast (original KBR: #3D6B52) */
--kbr-navy-blue: #1A3A5C;         /* Deep navy blue */

/* Accent Colors */
--kbr-bright-yellow: #F4D547;     /* Bright yellow (high contrast) */
--kbr-rose-pink: #D4A4A0;         /* Rose pink */
--kbr-warm-orange: #E8956E;       /* Warm orange */
--kbr-magenta: #A64E7C;           /* Magenta / purple-red */
--kbr-bright-blue: #4BA3D6;       /* Bright blue */

/* Neutral & Surface Colors */
--kbr-black: #1A1A1A;             /* Deep black (header/footer) */
--kbr-white: #FFFFFF;             /* White (base reference) */
--kbr-light-gray: #F5F5F5;        /* Light gray (subtle background) */
--kbr-dark-gray: #333333;         /* Dark gray (text) */

/* Surface Colors (not in CSS variables, applied directly) */
Content area background: #D6D3C6;
Sidebar background: #E5E3D7;
Chart description background: #E5E3D7;
Active sidebar link: #BDA999;
```

---

### Chart 1: Year Distribution (Line Chart)

**Purpose**: Visualize temporal trends of publication activity (1602-1901)

**Color Configuration**:
```
Main line:         Dark green (#3D6B52)
Area fill:         Light green gradient (semi-transparent)
Highlight points:  Bright yellow (#F4D547)
Grid lines:        Light gray (#F5F5F5)
Background:        White (#FFFFFF)
```

**Typography**:
```
Title:
  - Font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
  - Size: 18-20px
  - Weight: Bold (700)
  - Color: Dark green (#3D6B52)

Axis labels (Years):
  - Font: Same as above
  - Size: 12-14px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)

Value labels:
  - Font: Same as above
  - Size: 12-14px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)
```

**Key Insight**: 
- 1860-1890 period represents publishing apex (39.1% of collection)
- Strong temporal concentration demonstrates historical significance of 19th century European publication

---

### Chart 2: Language Distribution (Pie Chart)

**Purpose**: Show linguistic diversity of KBR collection on Google Books

**Color Assignment** (ordered by frequency):
```
French (65.5%):         Dark green (#3D6B52)
German:                 Navy blue (#1A3A5C)
Dutch:                  Rose pink (#D4A4A0)
English:                Warm orange (#E8956E)
Italian:                Magenta (#A64E7C)
Others (7 languages):   Bright blue (#4BA3D6), Yellow (#F4D547), Light variations
```

**Typography**:
```
Title:
  - Font: Same as Chart 1
  - Size: 18-20px
  - Weight: Bold (700)
  - Color: Dark green (#3D6B52)

Legend labels:
  - Font: Same as above
  - Size: 12px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)

Percentage labels (on pie):
  - Font: Same as above
  - Size: 11px
  - Weight: Bold (600)
  - Color: White (#FFFFFF) for high-contrast segments, Dark gray otherwise
```

**Key Insight**:
- Dominance of French (65.5%) reflects KBR's primary collection language
- Germanic and Romance languages (German, Dutch, Italian, Spanish) constitute 18.2%
- Multilingual collection demonstrates European intellectual exchange

---

### Chart 3: Country Distribution (Horizontal Bar Chart)

**Purpose**: Visualize geographic scope of publication network

**Color Configuration**:
```
Bar color:          Gradient from Navy blue (#1A3A5C) to Dark green (#3D6B52)
                    (left to right, representing data magnitude)
Highest value (highlight): Bright yellow (#F4D547)
Grid lines:         Light gray (#F5F5F5)
Background:         White (#FFFFFF)
```

**Typography**:
```
Title:
  - Font: Same as Chart 1
  - Size: 18-20px
  - Weight: Bold (700)
  - Color: Dark green (#3D6B52)

Country labels (Y-axis):
  - Font: Same as above
  - Size: 12px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)

Value labels (at bar end):
  - Font: Same as above
  - Size: 11px
  - Weight: Bold (600)
  - Color: Dark gray (#333333)
```

**Key Insight**:
- Belgium and France dominate (expected, given KBR location and collection focus)
- 26 countries represented demonstrates broad European publishing network
- Co-publications preserved in data visualization (14 books with multiple countries)

---

### Chart 4: Publisher Treemap

**Purpose**: Visualize market share and diversity of publishing houses

**Color Strategy** (Period-based):
```
1600-1750:      Light gray (#E8E8E8)
1751-1800:      Light blue (#D4E6F1)
1801-1830:      Navy blue (#1A3A5C)
1831-1860:      Rose pink (#D4A4A0)
1861-1890:      Bright yellow (#F4D547) ← Publishing apex, high emphasis
1891-1901:      Warm orange (#E8956E)

Border:         White (#FFFFFF) with 2px width
```

**Typography**:
```
Title:
  - Font: Same as Chart 1
  - Size: 18-20px
  - Weight: Bold (700)
  - Color: Dark green (#3D6B52)

Publisher labels (in tiles):
  - Font: Same as above
  - Size: 11-13px (adaptive to tile size)
  - Weight: Bold (600)
  - Color: Dark gray (#333333) for light backgrounds, 
           White (#FFFFFF) for dark backgrounds

Value labels (book count):
  - Font: Same as above
  - Size: 12-14px
  - Weight: Regular (400)
  - Color: Same color logic as above
```

**Key Insight**:
- Top publishers concentrated in 1861-1890 period (bright yellow tiles)
- 374 unique standardized publisher names reflects diverse commercial ecosystem
- Market concentration in high-production eras (dark tiles vs light)
- Tile size correlates with publication volume

---

### Chart 5: Publisher Language Distribution (Stacked Horizontal Bar)

**Purpose**: Visualize the linguistic profile of core historic publishers — distinguishing single-language specialists from multilingual/international publishers

**Rationale for replacing the original Heatmap design**: The publisher dataset is highly fragmented (374 unique publishers, most active in a single time period with a maximum of 6 books). A temporal density heatmap produced an almost entirely sparse, low-contrast grid with minimal analytical value once filtered to publishers active across multiple periods (only 1 publisher qualified). The stacked bar chart instead reuses the same Treemap-derived publisher subset (period-level count ≥ 2, top 30 segments) and visualizes a genuinely distinct dimension — language — avoiding redundancy with the Treemap's temporal framing while remaining statistically defensible.

**Color Assignment** (consistent with Chart 2 Language Pie Chart):
```
French:                  Dark green (#3D6B52)
German:                  Navy blue (#1A3A5C)
Dutch:                   Rose pink (#D4A4A0)
English:                 Warm orange (#E8956E)
Italian:                 Magenta (#A64E7C)
Latin:                   Bright blue (#4BA3D6)
Spanish:                 Bright yellow (#F4D547)
Portuguese:              Light pink (#FFB6C1)
Multiple languages:      Dark gray (#333333)

Border:                  White (#FFFFFF), 0.5px width
```

**Typography**:
```
Title:
  - Font: Same as Chart 1
  - Size: 18-20px
  - Weight: Bold (700)
  - Color: Dark green (#3D6B52)

Axis labels (Publisher names, Y-axis):
  - Font: Same as above
  - Size: 12px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)

Axis title (Number of Publications, X-axis):
  - Font: Same as above
  - Size: 12-14px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)

Legend (Language, sorted by volume):
  - Font: Same as above
  - Size: 12-14px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)

Footnote annotation:
  - Font: Same as above (italic)
  - Size: 12px
  - Color: Medium gray (#666666)
```

**Data Scope**: Publishers are filtered to match the Treemap's exact subset — period-level publication count ≥ 2, top 30 period-publisher segments — ensuring both Publisher Analysis charts draw from a consistent, academically justified population (29 unique publishers after deduplication across periods).

**Key Insight**:
- French-language specialists dominate the core publisher subset (e.g., H. Manceaux, Baillière, Bruylant-Christophe — exclusively French output)
- A subset of publishers shows multilingual output, indicating cross-regional or international distribution (e.g., Librairie Hachette & Cie: French + Latin; A. Siffer: Dutch + French)
- German-language specialists (J. F. Richter, C. G. Lüderitz'sche Verlagsbuchhandlung) appear as fully monolingual outliers within the otherwise French-dominant core
- This chart complements the Treemap by adding a linguistic/cultural dimension to the temporal market-share view, without duplicating its informational content

---

### Chart 6: Cities Map (Folium Interactive Map)

**Purpose**: Geospatial visualization of publication centers

**Color Configuration**:
```
Circle markers:     Dark green (#3D6B52) fill
Circle border:      Bright yellow (#F4D547) stroke (2px)
Circle size:        Proportional to number of publications
                    (radius = book_count)

Popup/Hover box:    White background (#FFFFFF)
Popup text:         Dark gray (#333333)
Popup border:       Light gray (#E8E8E8)

Base map:          OpenStreetMap (neutral gray/beige tones)
```

**Typography**:
```
Popup window:
  - Font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
  - Size: 14px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)

City name:
  - Font: Same as above
  - Size: 14px
  - Weight: Bold (600)
  - Color: Dark green (#3D6B52)

Book count:
  - Font: Same as above
  - Size: 12px
  - Weight: Regular (400)
  - Color: Dark gray (#333333)
```

**Key Statistics**:
- 189 unique cities mapped
- 1,052 records with valid coordinates (98.0% geospatial coverage)
- Largest publishers: Paris (264 books), Brussels, Amsterdam visible as largest circles
- Regional distribution reveals European publishing centers

---

## Website Design System

### Typography System

**Heading Font** (headings, navigation section titles, header):
```css
font-family: "Jost", sans-serif;  /* via Google Fonts */
font-weight: 500;
/* Rationale: Geometric sans-serif with academic clarity; free alternative to Futura, suitable for thesis repo sharing */
```

**Body Font** (descriptive text, paragraphs):
```css
font-family: "Source Serif 4", Georgia, serif;  /* via Google Fonts */
font-weight: 400;
/* Rationale: Contemporary serif for readability and academic tone; free alternative suitable for repo sharing */
```

Google Fonts loaded in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Source+Serif+4:wght@400;500;700&display=swap" rel="stylesheet">
```

### Typography Scale

```
H1 (Main page title):
  - Font: Jost
  - Size: 40px (desktop), 24px (mobile), 20px (small mobile)
  - Weight: 500
  - Color: Dark green (#172D20)

H2 (Section titles):
  - Font: Jost
  - Size: 23px (desktop), 18px (mobile), 16px (small mobile)
  - Weight: 500
  - Color: Dark green (#172D20)

H3 (Chart description titles):
  - Font: Jost
  - Size: 23px
  - Weight: 500
  - Color: Dark green (#172D20)

Body text (Chart descriptions):
  - Font: Source Serif 4
  - Size: 18px (desktop), 16px (mobile)
  - Weight: 400
  - Color: Dark gray (#333333)
  - Line-height: 1.8

Header title:
  - Font: Jost
  - Size: 20px (desktop), 14px (mobile), 12px (small mobile)
  - Weight: 500
  - Color: White (#FFFFFF)

Sidebar section titles:
  - Font: Jost
  - Size: 16px
  - Weight: 500
  - Color: Dark green (#172D20)
  - Text-transform: uppercase

Navigation links:
  - Font: Source Serif 4 (inherits body)
  - Size: 15px
  - Weight: 400 (600 when active)
  - Color: Dark gray (#333333), White (#FFFFFF) when active
```

### Color Usage Guidelines

```
Headings & section titles:    Dark green (#172D20)
Text (default):               Dark gray (#333333)
Text (on dark background):    White (#FFFFFF)
Content area background:      #D6D3C6
Sidebar background:           #E5E3D7
Chart description background: #E5E3D7
Active sidebar link:          #BDA999 (set via inline style in navigation.js)
Header/footer:                Near-black (#1A1A1A)
Sidebar border:               #E5E3D7
```

---

## Website Architecture

### Directory Structure

```
thesis-kbr-google-books/
├── website/                          ← Vercel Root Directory
│   ├── index.html                    ← Main entry point (loads Google Fonts)
│   ├── css/
│   │   ├── variables.css             ← CSS custom properties (colors, fonts, layout)
│   │   ├── style.css                 ← Desktop-first styles
│   │   └── responsive.css            ← Media queries (tablet, mobile, small mobile)
│   ├── js/
│   │   └── navigation.js             ← Page switching, banner mapping, Plotly resize
│   ├── assets/
│   │   └── images/                   ← Banner images (desktop + mobile)
│   │       ├── banner-1.jpg          ← Desktop banners (1620×400px)
│   │       ├── banner-2.jpg
│   │       ├── ...
│   │       ├── m-banner-1.jpg        ← Mobile banners (1620×400px)
│   │       ├── m-banner-2.jpg
│   │       └── ...
│   ├── data/
│   │   └── visualizations/           ← Plotly/Folium HTML charts (copied from data/)
│   │       ├── year_distribution.html
│   │       ├── language_distribution.html
│   │       ├── country_distribution.html
│   │       ├── publisher_treemap.html
│   │       ├── publisher_language_bar.html
│   │       └── cities_map.html
│   └── content/                      ← Additional content assets
├── data/
│   └── visualizations/               ← Original generated HTML charts
├── notebooks/
│   └── 4_visualize_step4.ipynb       ← Chart generation notebook
└── docs/                             ← Project documentation
```

### Navigation Menu Structure

**Sidebar Navigation** (left-aligned, sticky on desktop, collapsible hamburger menu on mobile):

```
1. INTRODUCTION
   - Project Overview

2. TEMPORAL FRAMEWORK
   - Year Distribution
   
3. LINGUISTIC DIVERSITY
   - Language Distribution

4. PUBLISHER ANALYSIS
   - Market Share
   - Language Profile

5. GEOSPATIAL SCOPE
   - Country Distribution
   - Publishing Hubs

6. METHODOLOGY
   - Data Pipeline & Explanation
```

### Page Layout (All Pages)

```
┌─────────────────────────────────────────────────────┐
│  "KU Leuven DH Thesis Dashboard: KBR × Google Books"│  ← Header (Jost 500, #1A1A1A bg)
│                              [Hamburger on mobile]   │
├──────┬──────────────────────────────────────────────┤
│      │                                              │
│      │  [Banner Image — <picture> element]          │  ← Full-width, desktop 1620×400
│      │  [desktop + mobile srcset via <source>]      │     mobile 800×200
│      │                                              │
│ SIDE │                                              │
│ BAR  │  [Interactive Chart (Plotly/Folium iframe)]  │  ← Content bg: #D6D3C6
│ (300 │  ├── overflow-x: auto on mobile              │
│ px)  │  │   min-width: 800px for horizontal scroll  │
│      │                                              │
│ bg:  │  [Chart Description]                         │  ← bg: #E5E3D7
│#E5E3 │  ├── Source Serif 4, 18px                    │
│ D7   │  └── Key findings + methodology notes        │
│      │                                              │
└──────┴──────────────────────────────────────────────┘
│  © Yung-En Wong, 2026. KU Leuven. Illustrations by  │  ← Footer (#1A1A1A bg)
│  Yung-Heng Wong.                                     │
└─────────────────────────────────────────────────────┘
```

### Responsive Design Breakpoints

```
Desktop:        ≥ 1024px
  - Sidebar visible (300px), sticky
  - Banner width: calc(100vw - 300px)
  - Chart iframe height: 600px

Tablet:         768px - 1023px
  - Sidebar visible but narrower (200px)
  - Banner width: calc(100vw - 200px)
  - Content padding: 30px

Mobile:         < 768px
  - Sidebar hidden, toggle via hamburger menu (max-width: 250px)
  - Banner width: 100vw
  - Chart iframe height: 400px, min-width: 800px (horizontal scroll)
  - Content padding: 20px
  - Body font: 16px

Small mobile:   < 480px
  - Chart iframe height: 300px
  - Header title: 12px
  - H1: 20px, H2: 16px

Testing device: iPhone 16e (375px, 2x Retina)
```

---

## Deployment Strategy

### Platform: Vercel

**Why Vercel**:
- ✅ Direct GitHub integration (automatic deployment on push)
- ✅ Hobby plan (free) sufficient for this project
- ✅ Fast CDN, automatic HTTPS
- ✅ Zero build configuration for static sites

**Configuration**:
- Team workspace: `2026KULDH` (Hobby plan)
- Root Directory: `website/`
- Application Preset: Other (static HTML/CSS/JS)
- Connected repo: `swmiu/thesis-kbr-google-books`

### Deployment Steps

1. **Initial Setup (completed)**
   - Sign up at https://vercel.com with GitHub
   - Import `thesis-kbr-google-books` repository
   - Set Root Directory to `website/`
   - Deploy

2. **Production URL**
   ```
   https://thesis-kbr-google-books.vercel.app
   ```

3. **Ongoing Updates**
   - Every `git push` to `main` triggers automatic redeployment
   - Git local `user.email` must match the Vercel account email (Hobby plan blocks commits from unrecognised authors)
   - For large file pushes (~23MB+), set `git config http.postBuffer 524288000`

4. **Troubleshooting**
   - If deployment shows "Blocked": verify `git log -1 --format="%ae"` matches Vercel account email; if not, run `git config --local user.email` to correct, then `git commit --amend --reset-author --no-edit` and `git push --force`
   - If force push does not trigger deployment, use `git commit --allow-empty -m "chore: trigger deployment"` followed by `git push`

---

## Development Workflow

### Phase 1: Chart Generation (Step 4a)

**Duration**: 2-3 days

**Tasks**:
1. Write `4_visualize_step4.ipynb`
   - Import cleaned analytical CSVs from Step 3
   - Configure Plotly charts with KBR color schemes
   - Configure Folium map
   - Export 6 HTML files to `data/visualizations/`

2. Review generated charts
   - Verify colors match design spec
   - Check responsiveness (desktop + mobile browser zoom)
   - Validate data accuracy

3. Optional: Adjust color schemes if needed
   - Modify color variables in ipynb
   - Regenerate charts
   - Commit: `refactor: adjust chart colors per design review`

**Deliverable**: 6 interactive HTML files + ipynb notebook

---

### Phase 2: Chart Descriptions (Step 4c)

**Duration**: 1-1.5 days

**Tasks**:
1. For each chart, write 200-300 word description including:
   - Main findings (2-3 bullet points)
   - Data statistics (e.g., percentages, counts)
   - Methodology notes (why this visualization?)
   - Implications for KBR × Google Books partnership

2. Save descriptions in documentation file or web pages

**Deliverable**: Text descriptions for all 6 charts

---

### Phase 3: Website Framework (Step 4d)

**Duration**: 2-3 days

**Tasks**:
1. Receive framework from Claude:
   - `index.html` (sidebar + content container)
   - `css/variables.css` (KBR design tokens)
   - `css/style.css` (desktop styles)
   - `css/responsive.css` (mobile media queries)
   - `js/navigation.js` (page switching logic)
   - Sample page structure

2. Test locally
   ```bash
   # In VS Code: Open index.html → Right-click → Open with Live Server
   # Browser opens at http://localhost:5500
   ```

3. Customize as needed
   - Adjust colors if desired
   - Modify layout, spacing
   - Add custom images/logos

4. Commit: `feat: Step 4d - website framework with KBR branding`

**Deliverable**: Complete website framework ready for chart integration

---

### Phase 4: Integration (Step 4e)

**Duration**: 1-1.5 days

**Tasks**:
1. Embed charts into pages via `<iframe>`
   ```html
   <iframe src="../data/visualizations/year_distribution.html"
           width="100%" height="600" frameborder="0"></iframe>
   ```

2. Add chart descriptions below each chart

3. Test all pages
   - Navigation menu works
   - Charts load and display correctly
   - Responsive design on mobile (use browser DevTools)
   - Links function properly

4. Commit: `feat: integrate visualizations into website + final testing`

**Deliverable**: Complete functional website with all charts and descriptions

---

### Phase 5: Deployment (Final)

**Duration**: 0.5 days

**Tasks**:
1. Final GitHub push
2. Verify Vercel deployment
3. Test live URL
4. Share final URL

**Deliverable**: Live website at `https://thesis-kbr-google-books.vercel.app`

---

## Timeline and Deliverables

### Overall Timeline

```
Week 1 (June 27 - July 3):
  - Thu 6/27: Design review & confirmation ✓
  - Fri 6/28 - Wed 7/3: Phase 1 (Charts) + Phase 2 (Descriptions)

Week 2 (July 4 - July 10):
  - Thu 7/4 - Fri 7/5: Phase 3 (Website Framework)
  - Mon 7/8 - Tue 7/9: Phase 4 (Integration + Testing)
  - Wed 7/10: Phase 5 (Deployment)

Buffer: 2 weeks before July deadline
  - Ample time for thesis writing and final revisions
```

### Git Commit Messages

```
Step 4a Completion:
git commit -m "feat: Step 4a - generate 6 interactive visualizations with KBR branding
- Year distribution (line chart): temporal framework
- Language distribution (pie): linguistic diversity
- Country distribution (bar): geographic scope
- Publisher treemap: market share by period
- Publisher language bar chart: linguistic diversity
- Cities map (Folium): geospatial centers
All charts exported to data/visualizations/"

Step 4c Completion:
git commit -m "docs: add chart descriptions and key insights
- 200-300 word descriptions for each visualization
- Data statistics and findings
- Methodology context for academic rigor"

Step 4d Completion:
git commit -m "feat: Step 4d - responsive website framework with sidebar navigation
- KBR brand color system & typography
- Desktop/mobile responsive design
- Sidebar navigation with 6 main sections
- Template structure for all 6 pages"

Step 4e Completion:
git commit -m "feat: integrate visualizations + launch website
- Embed Plotly/Folium charts via iframes
- Add chart descriptions to each page
- Responsive testing complete (desktop/mobile)
- Ready for Vercel deployment"

Final Deployment:
git commit -m "deploy: launch thesis visualization website to Vercel
- Production URL: https://thesis-kbr-google-books.vercel.app
- All visualizations interactive
- Full documentation in place"
```

---

## Design Rationale

### Why These Colors?

1. **Dark Green (#172D20)**: Derived from KBR's official brand green (#3D6B52), deepened for improved text contrast against the warm content background
2. **Content background (#D6D3C6)**: Warm neutral that complements the institutional green and reduces glare on extended reading
3. **Sidebar (#E5E3D7)**: Slightly lighter warm tone to differentiate navigation from content
4. **Active link (#BDA999)**: Muted warm accent that harmonises with the overall palette without competing with chart colours
5. **Chart accent palette**: KBR-derived colours (navy, yellow, rose, orange, magenta, blue) maintained for data encoding consistency across all six visualisations

### Why This Navigation Structure?

1. **Introduction**: Project overview and research context
2. **Temporal Framework**: Establishes the 1602-1901 chronological scope
3. **Linguistic Diversity**: Language distribution as core collection characteristic
4. **Publisher Analysis**: Two complementary views (market share + linguistic profile)
5. **Geospatial Scope**: Two complementary views (country + city level)
6. **Methodology**: Pipeline transparency and academic rigour

### Why Sidebar Navigation?

- Traditional for academic dashboards
- Desktop-friendly (300px sticky sidebar), space-efficient
- Mobile-responsive via hamburger menu with slide-in overlay
- Sticky navigation supports long pages with chart + description pairs

---

## Technical Notes

### Chart Generation (Python)

- **Plotly**: Interactive charts with hover tooltips, zooming, legend
- **Folium**: Leaflet-based map with custom markers
- **Output**: Standalone HTML files (no backend required)

### Website Technology Stack

- **HTML5**: Semantic markup with `<picture>` element for responsive banners, `<main>` landmark for accessibility
- **CSS3**: CSS custom properties for design tokens, Flexbox for layout, Media Queries for 4 breakpoints
- **JavaScript**: Page switching, Plotly.Plots.resize() on iframe load, sidebar toggle
- **Google Fonts**: Jost + Source Serif 4 (free, suitable for thesis repo sharing)
- **No build tools**: Pure HTML/CSS/JS, no framework dependencies

### Deployment

- **Vercel (Hobby)**: Automatic deployments from GitHub pushes to `main`
- **CDN**: Global edge network for fast load times
- **HTTPS**: Automatic SSL certificates

---

## References

- KBR Official Website: https://www.kbr.be/en/
- Thesis Deadline: July 2026
- GitHub Repository: https://github.com/swmiu/thesis-kbr-google-books (Private)

---

**Document Version**: 2.0  
**Last Updated**: July 9, 2026  
**Status**: Deployed — https://thesis-kbr-google-books.vercel.app
