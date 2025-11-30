# TikMe System Architecture - R&D Workflow

## Tổng Quan Hệ Thống

**Version:** 2.0  
**Updated:** 29/11/2025  
**Location:** `D:\TECH_BOX\Tikme_App_Prototypies`  
**Purpose:** Quản lý R&D workflow từ ý tưởng CPO → Prototype APPROVED

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
│  PHASE 2: PRODUCT DEVELOPMENT (Repo riêng)                 │
│  ├─ Prototypes APPROVED only                               │
│  ├─ Merge to complete app                                  │
│  ├─ Technical documentation                                │
│  └─ Handoff to CTO → Team DEV                             │
└─────────────────────────────────────────────────────────────┘
```

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
├── 📁 merge_workspace/               # Merge APPROVED prototypes
│   ├── components/                   # Extracted components
│   │   ├── shared/                   # Cross-module components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Avatar.jsx
│   │   │
│   │   ├── preclass/                 # B2 specific
│   │   │   ├── PreClassDashboard.jsx
│   │   │   └── ReadinessPanel.jsx
│   │   │
│   │   └── inclass/                  # B3 specific
│   │       ├── InClassTeaching.jsx
│   │       └── ChopChepTimer.jsx
│   │
│   ├── app_shell/                    # Merged app
│   │   ├── src/
│   │   │   ├── App.jsx               # Main app
│   │   │   ├── Router.jsx            # Navigation
│   │   │   └── StateContext.jsx      # Global state
│   │   ├── package.json
│   │   └── vite.config.js
│   │
│   └── builds/                       # Build outputs
│       ├── dev/                      # Dev builds
│       └── production/               # Prod builds
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
│   ├── merge_approved.py             # Merge APPROVED only
│   ├── build_handoff.py              # Package handoff
│   │
│   ├── create_new_notion_pages.py    # ✅ Đã có
│   ├── verify_database.py            # ✅ Đã có
│   └── list_database_pages.py        # ✅ Đã có
│
├── 📁 data/                          # Configuration
│   ├── modules.json                  # Module registry
│   ├── approved_versions.json        # Approved log
│   ├── component_map.json            # Component dependencies
│   └── navigation_map.json           # Route config
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
│   ├── 01_PROJECT_CHARTER.md         # ✅ Updated
│   ├── 02_SYSTEM_ARCHITECTURE.md     # This file
│   ├── 03_NAMING_CONVENTIONS.md
│   ├── 04_DATABASE_SCHEMA.md
│   ├── 05_WORKFLOW_SPECIFICATIONS.md
│   ├── 06_API_REFERENCE.md
│   ├── 07_QUALITY_STANDARDS.md
│   ├── 08_DECISION_LOG.md
│   ├── 09_TROUBLESHOOTING.md
│   ├── 10_HE_THONG_QUAN_LY_NGHIEP_VU.md
│   └── 11_NOTION_3TIER_ARCHITECTURE.md
│
├── .env                              # Credentials (gitignored)
├── .gitignore                        # Git ignore rules
├── README.md                         # Repo overview
└── INTRUCTION.md                     # PM instructions

```

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

### Flow 3: Merge APPROVED Prototypes

```
[Filter: Get all Status="Approved"]
           ↓
[Run: merge_approved.py]
  - Read all files from approved/
  - Extract components
  - Generate App.jsx with routes
  - Generate Router.jsx
  - Generate StateContext.jsx
           ↓
[merge_workspace/app_shell/ created]
  - src/App.jsx
  - src/Router.jsx
  - Components imported
           ↓
[Build & Test]
  - npm install
  - npm run dev
  - PM QC testing
           ↓
[Production Build]
  - npm run build
  - Output: merge_workspace/builds/production/
```

### Flow 4: Handoff Preparation

```
[APPROVED prototypes merged successfully]
           ↓
[Run: build_handoff.py]
  - Copy production build
  - Generate technical specs
  - Create deployment guide
  - Package screenshots/demos
           ↓
[handoff_staging/ populated]
  ├── source_code/ (merged app)
  ├── specs/ (tech docs)
  ├── demos/ (screenshots)
  └── README_HANDOFF.md
           ↓
[Create separate handoff repo]
  - Git init new repo
  - Commit ONLY handoff_staging contents
  - NO iterations, NO drafts
           ↓
[Share with CTO]
  - Email: Git repo URL
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
- Notion: Version tracking, Status management
- Python scripts: Automation
- JSON configs: Module/version registry

**Tools:**
- Claude Mobile (CPO prototyping)
- Desktop Commander (file operations)
- Notion API (status sync)

### Merge Phase

**Frontend:**
- React 18.x
- React Router 6.x
- Context API
- Vite 5.x

**Styling:**
- Tailwind CSS

**Components:**
- Functional components
- Hooks (useState, useContext)

### Handoff Phase

**Documentation:**
- Markdown specs
- Auto-generated from templates

**Packaging:**
- Separate Git repo
- Clean structure (no iterations)
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

# Handoff repo (separate)
cd /path/to/handoff-repo
git init
git add .
git commit -m "handoff: Package for PHASE1 MVP"
git push origin main
```

---

## Security & Access

### Credentials (.env)

```env
NOTION_TOKEN=secret_xxx
NOTION_DATABASE_ID=2a92b641bddd80769ba8e711fbefd9d6
CTO_EMAIL=sandeep@tikme.com
TELEGRAM_BOT_TOKEN=xxx
```

### File Permissions

- ✅ Desktop Commander: Full access to `D:\TECH_BOX\Tikme_App_Prototypies`
- ❌ OneDrive: KHÔNG dùng (avoid conflicts)
- ✅ Git: Version control local

---

## Disaster Recovery

### Backup Strategy

**Primary:** Git commits
- Every version saved
- Full history

**Secondary:** backups/ folder
- Daily copy iterations/
- Weekly Notion export

**Tertiary:** Manual
- Important versions → External drive
- APPROVED versions → Cloud backup

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

**Last Updated:** 29/11/2025  
**Version:** 2.0  
**Owner:** ClaudeK (PM)
