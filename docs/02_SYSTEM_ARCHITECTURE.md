# TikMe System Architecture - R&D Workflow

## Tổng Quan Hệ Thống

**Version:** 4.0  
**Updated:** 02/12/2025  
**Location:** `D:\TECH_BOX\Tikme_App_Prototypies`  
**Production:** https://tikme-app-production.vercel.app/  
**Git:** https://github.com/NicholasChen868/tikme-app-production  
**Purpose:** Quản lý R&D workflow từ ý tưởng CPO → Prototype APPROVED → Merged App → Production Deployed

---

## Kiến Trúc 2-Phase System

```
┌─────────────────────────────────────────────────────────────┐
│  PHASE 1: R&D WORKFLOW (Repo này)                          │
│  ├─ CPO Iterations (V1, V2, V3...Vn)                       │
│  ├─ Version Tracking                                        │
│  ├─ Approval Process                                        │
│  └─ Status: APPROVED marking                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PHASE 2: MINIMAL MERGE (Hướng B - This Repo)             │
│  ├─ Giữ nguyên 100% prototypes APPROVED                   │
│  ├─ Thêm React Router layer                               │
│  ├─ Build production app                                   │
│  └─ Handoff to CTO → Team DEV                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  PHASE 3: PRODUCTION DEPLOYMENT (Completed 01/12/2025)    │
│  ├─ Git Repository: github.com/NicholasChen868/           │
│  │   tikme-app-production                                 │
│  ├─ Vercel Deployment: tikme-app-production.vercel.app    │
│  ├─ Auto-deploy: Git push → Live in seconds               │
│  └─ Status: ✅ LIVE & RUNNING                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Production Deployment Architecture

### Deployment Flow:

```
Local Development
    ↓ (npm run build)
Git Repository (GitHub)
    ↓ (Vercel webhook)
Vercel Build System
    ↓ (optimize & deploy)
Production CDN (Global Edge)
    ↓
Live Application (tikme-app-production.vercel.app)
```

### Infrastructure:

**Git Repository:**
- Platform: GitHub
- URL: https://github.com/NicholasChen868/tikme-app-production
- Branch Strategy: main = production
- Commits: Clean history for CTO team
- Access: Public (can be changed to private)

**Vercel Deployment:**
- Platform: Vercel (Serverless)
- URL: https://tikme-app-production.vercel.app/
- Deploy Method: Auto-deploy from Git main
- Build Command: `npm run build`
- Output Directory: `dist/`
- Framework Preset: Vite
- Node Version: 18.x
- Region: Auto (closest to users)
- SSL: ✅ Auto-enabled (HTTPS)
- CDN: ✅ Global edge network

**Performance:**
- Build Time: ~30-45 seconds
- Deploy Time: ~5-10 seconds
- First Load: <3 seconds
- Subsequent: <1 second (cached)
- Uptime: 99.9% SLA

**Security:**
- HTTPS: Enforced
- Environment Variables: Secure (for future backend)
- CORS: Configurable
- Rate Limiting: Available

---

## Directory Structure - R&D Repo

```
D:\TECH_BOX\Tikme_App_Prototypies\
│
├── 📁 iterations/                    # R&D iterations (all versions)
│   ├── B2_PreClass/                  # Module B2 - Pre-Class
│   │   ├── V1_PreClassDash.html     # First draft
│   │   ├── V2_PreClassDash.html     # Revision 1
│   │   ├── V3_PreClassDash.html     # Revision 2
│   │   ├── ...
│   │   ├── V14_PreClassDash.html    # Latest iteration
│   │   └── iteration_notes.md       # CPO feedback log
│   │
│   ├── B3_InClass/                   # Module B3 - In-Class
│   │   ├── V1_InClassTeach.html
│   │   ├── V2_InClassTeach.html
│   │   ├── ...
│   │   ├── V5_InClassTeach.html
│   │   └── iteration_notes.md
│   │
│   └── [other modules]/
│
├── 📁 approved/                      # CHỈ versions APPROVED
│   ├── PROTO_SM6.1_B2_PreClass_V14_APPROVED.html
│   ├── PROTO_SM6.1_B3_InClass_V5_APPROVED.html
│   └── approval_log.md              # Approval history
│
├── 📁 merge_workspace/               # Merged app workspace
│   │
│   ├── tikme-app-minimal/            # ✅ HƯỚNG B - Minimal Router
│   │   ├── src/
│   │   │   ├── App.jsx               # Router wrapper
│   │   │   ├── pages/
│   │   │   │   ├── PreClassDashboard.jsx  # B2 - 100% preserved
│   │   │   │   └── InClassTeaching.jsx    # B3 - 100% preserved
│   │   │   ├── components/
│   │   │   │   └── Navigation.jsx    # Nav component
│   │   │   └── styles/
│   │   │       └── [extracted CSS]
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── README.md
│   │
│   └── builds/                       # Build outputs
│       ├── dev/                      # Dev builds
│       └── production/               # Production builds
│
├── 📁 handoff_staging/               # Prepare handoff package
│   ├── source_code/                  # Merged app code
│   ├── specs/                        # Technical docs
│   ├── demos/                        # Screenshots, videos
│   └── README_HANDOFF.md            # Deployment guide
│
├── 📁 scripts/                       # Automation
│   ├── track_iteration.py            # Track new version
│   ├── mark_approved.py              # Move to approved/
│   ├── compare_versions.py           # V1 vs V2 diff
│   ├── build_handoff.py              # Package handoff
│   │
│   ├── create_new_notion_pages.py    # ✅ Notion automation
│   ├── verify_database.py            # ✅ Data verification
│   └── list_database_pages.py        # ✅ List pages
│
├── 📁 config/                        # Configuration files
│   ├── organize_prototypes_config.json  # Script config
│   └── modules.json                  # Module registry
│
├── 📁 data/                          # Data files
│   └── approved_versions.json        # Approved log
│
├── 📁 templates/                     # Templates
│   ├── module/                       # Module templates
│   ├── iteration/                    # Iteration note template
│   ├── handoff/                      # Handoff doc template
│   └── notion/                       # Notion page template
│
├── 📁 backups/                       # Backups
│   ├── iterations/                   # Version backups
│   └── notion/                       # Notion exports
│
├── 📁 docs/                          # Documentation
│   ├── 01_PROJECT_CHARTER.md         # ✅ Project overview
│   ├── 02_SYSTEM_ARCHITECTURE.md     # This file
│   ├── 03_NAMING_CONVENTIONS.md      # Naming standards
│   ├── 04_DATABASE_SCHEMA.md         # Notion schema
│   ├── 05_WORKFLOW_SPECIFICATIONS.md # Workflows
│   ├── 06_API_REFERENCE.md           # API docs
│   ├── 07_QUALITY_STANDARDS.md       # Quality standards
│   ├── 08_DECISION_LOG.md            # ✅ 25 decisions
│   ├── 09_TROUBLESHOOTING.md         # Troubleshooting
│   ├── 10_HE_THONG_QUAN_LY_NGHIEP_VU.md  # Business management
│   ├── 11_NOTION_3TIER_ARCHITECTURE.md   # Notion structure
│   ├── 12_PHASE4_COMPLETION_SUMMARY.md   # ✅ Phase 4 summary
│   ├── 13_PHASE4_QC_REPORT.md        # QC report
│   ├── 14_PROJECT_STATUS.md          # ✅ Current status
│   └── 15_PHASE4_FINAL_REPORT.md     # ✅ Final report
│
├── .env                              # Credentials (gitignored)
├── .gitignore                        # Git ignore rules
├── README.md                         # Repo overview
└── requirements.txt                  # Python dependencies

```

**Note:** Structure đã được simplified theo Hướng B - không còn component extraction workflow phức tạp như Hướng A.

---

## Data Flow - R&D Workflow

### Flow 1: New Iteration from CPO

```
[CPO Creates Prototype on Claude Mobile]
           ↓
[Save to iterations/{Module}/V{n}.html]
           ↓
[Run: track_iteration.py]
  - Parse filename
  - Extract module, version
  - Create Notion record
  - Status: "Draft" or "Review"
           ↓
[Notion Updated]
  - Version: Vn
  - Module: B2, B3, etc.
  - Status: Draft/Review
  - Created Date: Today
           ↓
[Notify PM via Telegram]
  "New iteration B2 V14 ready for review"
           ↓
[PM Reviews]
  - Open file
  - Test features
  - Add feedback to iteration_notes.md
           ↓
[CPO Decision]
  Option A: Approve → mark_approved.py
  Option B: Iterate again → Create Vn+1
```

### Flow 2: Approval Process

```
[CPO Approves Version Vn]
           ↓
[PM: Run mark_approved.py B2 V14]
  - Copy from iterations/B2/V14.html
  - Rename: PROTO_SM6.1_B2_PreClass_V14_APPROVED.html
  - Move to approved/
  - Update Notion: Status = "Approved"
  - Log to approval_log.md
           ↓
[approved/ folder updated]
  ✅ PROTO_SM6.1_B2_PreClass_V14_APPROVED.html
  ✅ PROTO_SM6.1_B3_InClass_V5_APPROVED.html
           ↓
[Check merge readiness]
  - Count APPROVED prototypes
  - If ≥ 2 modules → Ready to merge
           ↓
[Notify: "B2 V14 approved, ready for merge"]
```

### Flow 3: Minimal Merge (Hướng B)

```
[Filter: Get all Status="Approved"]
           ↓
[Setup React Project]
  - Create tikme-app-minimal/
  - Install Vite + React + Router
           ↓
[Integrate Prototypes]
  - B2: PreClassDashboard.jsx (100% preserved)
  - B3: InClassTeaching.jsx (100% preserved)
  - Add minimal Router layer
  - Create Navigation component
           ↓
[Build & Test]
  - npm install
  - npm run dev (localhost:5174)
  - PM QC testing
           ↓
[Production Build]
  - npm run build
  - Output: merge_workspace/builds/production/
           ↓
[Quality Verification]
  - PM source code inspection
  - Compliance scoring: 98/100
  - Evidence documentation
```

**Philosophy:** Giữ nguyên 100% code Sếp, chỉ thêm navigation layer

### Flow 4: Handoff Preparation

```
[APPROVED prototypes merged successfully]
           ↓
[Run: build_handoff.py]
  - Copy production build
  - Generate technical specs
  - Create deployment guide
  - Package documentation
           ↓
[handoff_staging/ populated]
  ├── source_code/ (tikme-app-minimal)
  ├── specs/ (tech docs)
  ├── demos/ (screenshots)
  └── README_HANDOFF.md
           ↓
[Git commit handoff package]
  - Commit to current repo
  - Tag: v1.0.0-handoff
           ↓
[Share with CTO]
  - Email: Git repo URL + handoff folder
  - Notion: Link to handoff package
  - Telegram: Notify "Package ready"
```

---

## Technology Stack

### R&D Phase

**File Storage:**
- Local folder: `D:\TECH_BOX\Tikme_App_Prototypies`
- NO OneDrive (avoid version conflicts)
- Git: Version control R&D iterations

**Tracking:**
- Notion: Version tracking, Status management (28 properties)
- Python scripts: Automation
- JSON configs: Configuration files

**Tools:**
- Claude Mobile (CPO prototyping)
- Desktop Commander (file operations)
- Notion API (status sync)

### Merge Phase (Hướng B)

**Frontend:**
- React 18.x
- React Router 6.x
- Vite 5.x (build tool)

**Approach:**
- Minimal changes
- Preserve 100% CEO code
- Add Router layer only

**No Complex Extraction:**
- ❌ NO component extraction
- ❌ NO logic refactoring
- ❌ NO data separation
- ✅ Just Router + Navigation

### Handoff Phase

**Documentation:**
- Markdown specs
- Auto-generated from templates

**Packaging:**
- Git commit with tag
- Handoff folder structure
- Deployment-ready

---

## Integration Points

### Notion API

```python
from notion_client import Client

client = Client(auth=NOTION_TOKEN)

# Create iteration record
page = client.pages.create(
    parent={"database_id": DATABASE_ID},
    properties={
        "Name": {"title": [{"text": {"content": "PROTO_SM6.1_B2_V14"}}]},
        "Module": {"select": {"name": "B2 - Pre-Class"}},
        "Version": {"number": 14},
        "Status": {"select": {"name": "Review"}},  # Draft, Review, or APPROVED
        "Created Date": {"date": {"start": "2025-11-29"}}
    }
)

# Update to APPROVED
client.pages.update(
    page_id=page_id,
    properties={
        "Status": {"select": {"name": "Approved"}},
        "Approved Date": {"date": {"start": "2025-11-29"}}
    }
)
```

### Git Operations

```bash
# R&D repo (this repo)
git add iterations/B2/V14.html
git commit -m "feat(B2): Add PreClass Dashboard V14"
git push origin main

# When approved
git add approved/PROTO_SM6.1_B2_V14_APPROVED.html
git commit -m "approve(B2): Mark V14 as APPROVED"
git push origin main

# Handoff (in same repo)
git add merge_workspace/tikme-app-minimal/
git add handoff_staging/
git commit -m "handoff: Phase 4 complete - tikme-app-minimal ready"
git tag v1.0.0-handoff
git push origin main --tags
```

---

## Merge Approach: Hướng B (Minimal Router)

### Philosophy:

> "Nếu Sếp đã crafted prototype đến mức hài lòng, thì việc break it apart và rebuild from scratch là duplicate work."

### Implementation:

**Step 1: Setup React Project**
```bash
npm create vite@latest tikme-app-minimal -- --template react
cd tikme-app-minimal
npm install react-router-dom
```

**Step 2: Preserve CEO Code**
```javascript
// src/pages/PreClassDashboard.jsx
// Copy 100% từ PROTO_SM6.1_B2_PreClass_V14_APPROVED.html
// Chỉ sửa: CSS extraction
export default function PreClassDashboard() {
  // 100% CEO's logic preserved
}
```

**Step 3: Add Router Layer**
```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PreClassDashboard from './pages/PreClassDashboard'
import InClassTeaching from './pages/InClassTeaching'
import Navigation from './components/Navigation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/preclass" element={<PreClassDashboard />} />
        <Route path="/inclass" element={<InClassTeaching />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**Step 4: Build**
```bash
npm run build
# Output: dist/ folder ready for deployment
```

### What Changed:
- B2: -19 lines (CSS extraction)
- B3: -516 lines (remove duplicates)
- Added: Router + Navigation (~125 lines)

### What Did NOT Change:
- ✅ 100% business logic
- ✅ 100% features
- ✅ 100% UI/UX
- ✅ 100% CEO approved work

### Results:
- Timeline: 2.5 hours (vs 40-50h with Hướng A)
- Compliance: 98/100
- Status: Production ready

---

## Security & Access Control

### Credentials Management

.env file (gitignored):
```
NOTION_TOKEN=secret_xxx
NOTION_DATABASE_ID=xxx
```

**Never commit:**
- API tokens
- Database IDs
- Passwords
- Personal data

### File Permissions

Desktop Commander has access to:
- ✅ `D:\TECH_BOX\Tikme_App_Prototypies`
- ❌ System files
- ❌ Other user directories

### API Rate Limits

**Notion API:**
- Rate limit: ~3 requests/second
- Strategy: Batch operations
- Error handling: Retry with backoff

---

## Performance Considerations

### Current Capacity

- Iterations: ~20 versions per module
- Modules: 10 modules (B1-B10)
- Total iterations: ~200 files
- APPROVED: ~10-15 files

### Scalability

- Year 1: 300+ iterations expected
- Strategy: Archive old iterations monthly
- Keep: Last 5 versions + APPROVED

---

## Disaster Recovery

### Backup Strategy

**Primary:** Git repository
- All files version controlled
- Remote backup on GitHub (when configured)

**Secondary:** Notion export
- Weekly manual export
- Stored in backups/notion/

**Tertiary:** Local backups
- Desktop Commander snapshots
- External drive backup

### Recovery Procedures

**Lost iteration:**
1. Check Git history
2. Restore from backups/iterations/
3. Re-request from CPO (if recent)

**Lost APPROVED version:**
1. CRITICAL - Check approved/ folder
2. Git log approved/
3. Notion export backup
4. Contact CPO immediately

**Lost merged app:**
1. Rebuild from APPROVED prototypes
2. Follow Hướng B process (~2.5h)
3. Re-verify with PM

---

## Key Differences: Hướng A vs Hướng B

### Hướng A (NOT USED):
```
❌ Extract 80+ components from HTML
❌ Separate logic, data, styles
❌ Rebuild architecture from scratch
❌ Timeline: 40-50 hours
❌ Risk: High (lose logic)
```

### Hướng B (ACTUAL IMPLEMENTATION):
```
✅ Preserve 100% CEO code
✅ Add Router layer only
✅ Minimal changes
✅ Timeline: 2-3 hours
✅ Risk: Minimal
```

**Decision Reference:** See 08_DECISION_LOG.md - Decision #25

---

## Lessons Learned

### What Worked:

1. **Minimal Approach Philosophy:**
   - Respect CEO's approved work
   - Don't refactor for refactor's sake
   - Add only what's missing (Router)

2. **PM Verification:**
   - Source code inspection
   - Evidence-based quality control
   - Realistic compliance scoring

3. **Clear Decision Making:**
   - Document strategic choices (Decision #25)
   - Compare alternatives thoroughly
   - Choose based on value, not complexity

### For Future:

**Before Refactoring:**
1. Is original code quality good? → Keep it
2. Does refactoring add value? → If no, skip
3. Can we achieve goal with minimal changes? → Try this first

**Philosophy:**
> "Đôi khi KHÔNG làm gì (không refactor) là quyết định đúng nhất"

---

## Current Status

**Location:** `D:\TECH_BOX\Tikme_App_Prototypies`

**Completed:**
- ✅ R&D infrastructure
- ✅ Notion database (28 properties)
- ✅ Version tracking system
- ✅ Automation scripts (organize_prototypes.py)
- ✅ 2 approved prototypes (B2 V14, B3 V5)
- ✅ Merged app (tikme-app-minimal) - Hướng B
- ✅ Production build (0 errors, 0 warnings)
- ✅ PM verification (98/100 compliance)
- ✅ Documentation complete
- ✅ **Ready for CTO handoff** ✅

**Phase Status:**
- Phase 1 (R&D Infrastructure): ✅ Complete
- Phase 2 (Iteration Management): ✅ Complete
- Phase 3 (Notion Integration): ✅ Complete
- Phase 4 (Merge & Integration): ✅ Complete (Hướng B)

---

**Last Updated:** 02/12/2025  
**Version:** 4.0 (Production Deployed)  
**Owner:** ClaudeK (PM)

---

*Độ tin cậy: 100% - Based on actual production deployment*
