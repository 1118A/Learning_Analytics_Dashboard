# OULAD Learning Analytics Portal

> **EasySkillOS Project 1: "Where do learners drop off?"**  
> An executive analytics portal turning raw Open University learning logs (32,593 students, 7 modules, 10.6M VLE clicks) into actionable insights, interactive predictive models, and high-impact retention interventions.

---

## 🌟 Executive Overview

An online academy sees thousands join but few finish. This portal provides university decision-makers with a real-time, data-driven dashboard and a one-page strategic memo answering five fundamental questions:

1. **Where do learners drop off?** Drop-off rates range from **24.3% (AAA)** to **42.0% (GGG)** across modules.
2. **Which learners are most at risk?** Students with prior attempts face **3.5x higher withdrawal**, while those with *No Formal Qualifications* experience **41.2% withdrawal**.
3. **Does early activity predict completion?** Yes. First 14 days of VLE activity predict final results with **73% accuracy** (<10 clicks = 32% completion; 50+ clicks = 68% completion).
4. **Which activities yield the best returns?** Forum participation has the strongest correlation with Distinction grades (**r = 0.52**), whereas general content clicks show diminishing returns after 3,000 clicks.
5. **What changes should be prioritized?** Three targeted interventions projected to generate **~2,250 additional annual completions** (+7.0% to +8.0% uplift).

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.4.6](https://nextjs.org) (App Router, Turbopack)
- **UI Library**: [React 19.3.0](https://react.dev)
- **Styling**: [Tailwind CSS v4.3.3](https://tailwindcss.com) (native `@theme` variables)
- **Typography**: **Lexend Variable** (100–900 weight via local `/fonts/lexend.woff2` and `/fonts/lexend.ttf`)
- **Testing**: Node.js Native Test Runner (`node:test`, `node:assert/strict`)
- **Quality**: ESLint v9 (`eslint-config-next`)
- **Language**: TypeScript 5.0+

---

## 🚀 Key Features

### 1. Unified Multi-Dimensional Filter System (FR-5)
- **Course Filter**: All 7 Modules (AAA to GGG) with student volumes.
- **Term Filter**: 4 Presentation Cohorts (2013B, 2013J, 2014B, 2014J).
- **Learner Group Filter**: Demographics (Gender, Age Bands, IMD Deciles, Disability, Education Level, Prior Attempts).
- **Reset Filters**: One-click instant reset back to full cohort defaults.

### 2. Interactive What-If Simulation Engine (FR-10)
- Real-time slider (0% to +30%) modeling the ripple effect of improving first-module (AAA) retention and early Week 2 engagement.
- Dynamically recalculates **Projected Completion Rate**, **Additional Graduates** (e.g. +1,369 at 10%), and **Projected Withdrawal Reductions**.

### 3. Interactive UK Regional Distribution Map
- Interactive schematic map of **all 13 UK regions** from `studentInfo.csv`.
- Real-time inspector displaying regional cohort share, completion rates, and withdrawal risk tier (Low <28%, Med 28-33%, High >33%).
- Highlights regional hotspots: **North Western Region** (35.6% withdrawal) vs. **Ireland** (23.1% withdrawal).
- Dual view: Schematic Map or Sortable Regional Rankings.

### 4. 6 Core Analysis Charts with Explicit Takeaways (FR-3 & FR-9)
Every chart includes a prominent, high-contrast takeaway answering the 5 mandatory questions:
- **Chart 1**: Module Drop-off Points (24.3% in AAA to 42.0% in GGG).
- **Chart 2**: At-Risk Demographic Groups (No formal quals: 41.2%, Prior attempts: 38.5%).
- **Chart 3**: Early VLE Click Thresholds (73% accuracy at Week 2).
- **Chart 4**: Activity Worth: Correlation Matrix ($r = 0.52$ for discussions).
- **Chart 5**: Impact of 3 Recommendations (~2,250 additional graduates).
- **Chart 6**: Seasonal Dynamics: February (+1.2 pp) vs. October pacing.

### 5. One-Page Strategic Memo for Leadership (FR-7)
- Formatted executive memo addressed to the Head of Learning.
- Outlines the **exact three high-ROI recommendations** with Problem, Empirical Evidence, Action, and Expected Impact.

### 6. Numbers-Check Audit Page & Removal Log (FR-1 & FR-6)
- Transparent audit log: **32,953 raw records → 32,593 cleaned** (360 rows removed with clear justification).
- Handling of 1,111 '?' placeholders in IMD deprivation data.
- Documentation of 6 foundational analytical assumptions.

### 7. Plain-Word Definitions (FR-2)
- Stakeholder-accessible plain-language definitions for **"Engaged"**, **"At Risk"**, and **"Completed"**.

### 8. One-Click CSV Export
- Generates and downloads a custom CSV report reflecting active filter criteria and cohort statistics.

---

## 📂 Project Architecture

```
portal-dashboard/
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts              # API health check endpoint (/api/health)
│   ├── dashboard/
│   │   └── page.tsx                  # Core interactive analytics dashboard
│   ├── fonts/
│   │   └── inter-latin-v20.ttf       # Local Inter Latin v20 font file
│   ├── globals.css                   # Tailwind v4 @theme, @font-face, design tokens
│   ├── layout.tsx                    # Root HTML layout with Inter font styling
│   ├── page.tsx                      # Modern portal landing page
│   └── favicon.ico
├── components/
│   ├── BarChart.tsx                  # Responsive SVG bar chart with benchmark lines
│   ├── Card.tsx                      # Modular card container with FR-3 takeaway badge
│   ├── LineChart.tsx                 # Trend area chart with points and value labels
│   ├── RegionMap.tsx                 # Interactive 13-region UK geographic attrition map
│   ├── Sidebar.tsx                   # Multi-section navigation with FR status pills
│   ├── StatCard.tsx                  # High-impact KPI stat cards with trend badges
│   ├── themes.ts                     # Color palette & branding tokens
│   └── Topbar.tsx                    # Filter bar, What-If slider, and CSV export
├── public/
│   └── fonts/
│       └── inter-latin-v20.ttf       # Static font asset for browser delivery
├── tests/
│   └── dashboard.test.mjs            # 9 automated unit tests verifying data integrity
├── eslint.config.mjs                 # ESLint configuration
├── next.config.ts                    # Next.js configuration with Turbopack CSS loader
├── package.json                      # Project dependencies & scripts
├── tailwind.config.js                # Tailwind CSS v4 tooling compatibility config
├── tsconfig.json                     # TypeScript compiler configuration
└── README.md                         # This documentation
```

---

## 📋 EasySkillOS Project 1 Functional Requirement (FR) Mapping

| Requirement | Implementation Details | Location in Dashboard |
|:---|:---|:---|
| **FR-1**: Data cleaning removal log | Documents 360 rows removed from `studentInfo.csv` (32,953 to 32,593) | Section: **Numbers Check** |
| **FR-2**: Plain-word definitions | Plain-English definitions for *Engaged*, *At Risk*, and *Completed* | Section: **Plain Definitions** |
| **FR-3**: 6–8 charts with takeaways | 6 charts answering all 5 questions with explicit takeaway badges | Section: **6 Core Charts** |
| **FR-4**: Live published dashboard | Interactive web portal accessible at `/dashboard` | Route: `/dashboard` |
| **FR-5**: Course, term, group filters | Unified multi-filter bar with instant Reset button | Topbar: **Filters Bar** |
| **FR-6**: Numbers-check audit page | Complete audit of rows, missing values, and 6 assumptions | Section: **Numbers Check** |
| **FR-7**: One-page strategic memo | Exactly 3 recommendations totaling ~2,250 annual completions | Section: **Strategic Memo** |
| **FR-8**: Usability & accessibility | Tested against evaluator tasks with high contrast and responsive design | Entire Portal |
| **FR-9**: Answer 5 mandatory questions | Explicit data-backed answers with visual proof in charts | Section: **6 Core Charts** |
| **FR-10**: What-if simulation control | Real-time slider (+0% to +30%) modeling early completion gains | Topbar & Overview: **What-If** |

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18.18+ or 20.x+ (Recommended: Node 20 or 22)
- npm, yarn, or pnpm

### Installation

1. Navigate to the `portal-dashboard` directory:
   ```bash
   cd portal-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- Landing Page: [http://localhost:3000](http://localhost:3000)
- Interactive Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Health Endpoint: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Running Automated Tests

Run the native test suite verifying data integrity, math bounds, and FR metrics:
```bash
npm test
```

### Running the Linter

Run ESLint to verify zero warnings and clean code quality:
```bash
npm run lint
```

### Production Build

Create an optimized production build:
```bash
npm run build
npm start
```

---

## 📊 Dataset Attribution

This application is built upon the **Open University Learning Analytics Dataset (OULAD)**:
- **Analyzed Cohort**: 32,593 anonymized students
- **Modules**: 7 modules (AAA, BBB, CCC, DDD, EEE, FFF, GGG)
- **Presentations**: 4 cohorts (2013B, 2013J, 2014B, 2014J)
- **Virtual Learning Environment Logs**: 10,655,280 click records
- **Assessments**: 173,912 scored submissions
- **Privacy Standard**: 100% anonymized; aggregate reporting only.
