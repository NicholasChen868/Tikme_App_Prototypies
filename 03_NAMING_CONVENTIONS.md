\# System Architecture - TikMe Prototype Management



\## High-Level Architecture

┌─────────────────────────────────────────────────────────────────┐

│                    TIKME ECOSYSTEM FLOW                         │

└─────────────────────────────────────────────────────────────────┘

\[Sếp Lê Long Sơn]

│

├─→ Creates AI Prompt Specifications (36-page PDFs)

│

↓

\[Claude Mobile/Chat]

│

├─→ Reads AI Prompt Specs

├─→ Generates HTML/React prototypes

│

↓

\[Share via Signal]

│

↓

\[WEBAPP\_TRACKING System]

│

├─→ Receives artifacts

│

↓

\[TIKME\_AUTOMATION\_BOT]

│

├─→ Organizes files

├─→ Commits to Github

│

↓

┌─────────────────────────────────────────────────────────────────┐

│              PM SYSTEM (YOU ARE HERE)                           │

├─────────────────────────────────────────────────────────────────┤

│                                                                 │

│  Layer 1: SOURCE MANAGEMENT                                    │

│  ├─ Git Repository (Source of Truth)                           │

│  ├─ Naming Convention Engine                                   │

│  └─ File Organization System                                   │

│                                                                 │

│  Layer 2: TRACKING \& AUTOMATION                                │

│  ├─ Notion Database (TIKME\_Artifact)                           │

│  ├─ Python Automation Scripts (5 scripts)                      │

│  └─ Data Quality Validation                                    │

│                                                                 │

│  Layer 3: MERGE ENVIRONMENT                                    │

│  ├─ Component Extraction System                                │

│  ├─ React App Shell (Router + State)                           │

│  ├─ Navigation Configuration                                   │

│  └─ Build Pipeline                                             │

│                                                                 │

│  Layer 4: HANDOFF PIPELINE                                     │

│  ├─ Technical Spec Generator                                   │

│  ├─ Package Builder                                            │

│  └─ Documentation Automation                                   │

│                                                                 │

└─────────────────────────────────────────────────────────────────┘

│

↓

\[CTO Sandeep Kumar]

│

├─→ Reviews handoff package

│

↓

\[India Development Team (15 devs)]

│

├─→ Implements production app

│

↓

\[TikMe Production App]



\## Directory Structure - Chi Tiết

D:\\TECH\_BOX\\TIKME\_PRODUCTION

│

├── 📁 prototypes/                      # Prototype files

│   ├── raw/                            # Original files từ Signal

│   │   ├── tikme-v5-ultimate.html

│   │   ├── tikme-pre-class-ultimate-v14.html

│   │   └── \[other raw prototypes]

│   │

│   └── standardized/                   # Renamed theo convention

│       ├── PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14.html

│       ├── PROTO\_SM6.1\_WF4\_B3\_InClassTeaching\_V5.html

│       └── \[other standardized prototypes]

│

├── 📁 merge\_workspace/                 # Merge environment

│   ├── components/                     # Extracted components

│   │   ├── shared/                     # Shared across prototypes

│   │   │   ├── Button.jsx

│   │   │   ├── Card.jsx

│   │   │   └── StudentAvatar.jsx

│   │   │

│   │   ├── preclass/                   # Pre-class specific

│   │   │   ├── PreClassDashboard.jsx

│   │   │   ├── AttendancePanel.jsx

│   │   │   └── ReadinessIndicator.jsx

│   │   │

│   │   └── inclass/                    # In-class specific

│   │       ├── InClassTeaching.jsx

│   │       ├── ChopChepTimer.jsx

│   │       └── VocabCard.jsx

│   │

│   ├── app\_shell/                      # Main application

│   │   ├── src/

│   │   │   ├── App.jsx                 # Main app component

│   │   │   ├── Router.jsx              # Navigation config

│   │   │   ├── StateContext.jsx        # Global state

│   │   │   ├── Navigation.jsx          # Nav component

│   │   │   └── index.html              # Entry point

│   │   │

│   │   ├── package.json

│   │   ├── vite.config.js

│   │   └── README.md

│   │

│   ├── builds/                         # Build outputs

│   │   ├── dev/                        # Development builds

│   │   └── production/                 # Production builds

│   │

│   └── navigation\_map.json             # Navigation configuration

│

├── 📁 tracking/                        # Automation \& tracking

│   ├── scripts/                        # Python automation

│   │   ├── standardize\_names.py        # Auto rename files

│   │   ├── extract\_components.py       # Component extraction

│   │   ├── sync\_to\_notion.py          # Notion integration

│   │   ├── build\_merged\_app.py        # Merge builder

│   │   ├── build\_handoff\_package.py   # Handoff packager

│   │   ├── check\_merge\_readiness.py   # Readiness checker

│   │   └── generate\_tech\_spec.py      # Spec generator

│   │

│   ├── data/                           # Configuration \& state

│   │   ├── batch\_standardize.json      # Batch rename config

│   │   ├── component\_map.json          # Component dependencies

│   │   ├── notion\_sync\_data.json       # Notion sync queue

│   │   ├── naming\_rules.json           # Naming validation

│   │   └── standardization\_results.json # Processing log

│   │

│   ├── logs/                           # Operation logs

│   │   ├── standardization.log

│   │   ├── extraction.log

│   │   ├── notion\_sync.log

│   │   └── merge\_build.log

│   │

│   └── .env                            # Credentials (gitignored)

│       # NOTION\_TOKEN=ntn\_...

│       # NOTION\_DATABASE\_ID=2a92b641...

│

├── 📁 specs/                           # Specifications

│   ├── ai\_prompts/                     # AI Prompt Specs từ Sếp

│   │   ├── SM6.1\_WF4\_B2\_PreClass\_Spec.pdf

│   │   ├── SM6.1\_WF4\_B3\_InClass\_Spec.pdf

│   │   └── \[other specs]

│   │

│   ├── wireframes/                     # Wireframe documents

│   │   └── \[wireframe PDFs]

│   │

│   └── technical/                      # Technical specs for CTO

│       ├── TECH\_SPEC\_TEMPLATE.md

│       └── \[generated tech specs]

│

├── 📁 handoff/                         # CTO handoff packages

│   ├── current/                        # Active handoff

│   │   ├── dist/                       # Built app

│   │   ├── TECH\_SPEC.md               # Technical specification

│   │   ├── README.md                   # Deployment guide

│   │   ├── navigation\_map.json         # Route configuration

│   │   └── component\_map.json          # Component dependencies

│   │

│   └── archive/                        # Historical handoffs

│       ├── handoff\_20251129/

│       ├── handoff\_20251206/

│       └── \[dated handoffs]

│

├── 📁 docs/                            # Documentation

│   ├── infrastructure.md               # This file

│   ├── workflow.md                     # Workflow guides

│   ├── merge\_guide.md                  # Merge procedures

│   ├── troubleshooting.md             # Common issues

│   └── api\_reference.md               # API docs

│

├── .gitignore

├── README.md

└── package.json                        # For npm scripts



\## Technology Stack



\### Layer 1: Source Management

```yaml

Tools:

&nbsp; - Git: Version control

&nbsp; - GitHub: Remote repository

&nbsp; - Python: File processing

&nbsp; - JSON: Configuration



Standards:

&nbsp; - Naming: PROTO\_SM\[X]\_WF\[X]\_\[BLOCK]\_\[FEATURE]\_V\[XX]

&nbsp; - Format: HTML, React (JSX), JSON

&nbsp; - Encoding: UTF-8

```



\### Layer 2: Tracking \& Automation

```yaml

Database:

&nbsp; Platform: Notion

&nbsp; Database ID: 2a92b641bddd80769ba8e711fbefd9d6

&nbsp; API: notion-client (Python)

&nbsp; Version: 2.7.0+



Automation:

&nbsp; Language: Python 3.x

&nbsp; Libraries:

&nbsp;   - notion-client

&nbsp;   - pathlib

&nbsp;   - json

&nbsp;   - re (regex)

&nbsp;   - datetime

&nbsp; 

Environment:

&nbsp; - Desktop Commander (ClaudeCode)

&nbsp; - .env for credentials

&nbsp; - JSON for configs

```



\### Layer 3: Merge Environment

```yaml

Frontend:

&nbsp; Framework: React 18.x

&nbsp; Router: react-router-dom 6.x

&nbsp; State: Context API (built-in)

&nbsp; Build Tool: Vite 5.x

&nbsp; 

Styling:

&nbsp; Framework: Tailwind CSS

&nbsp; Approach: Utility-first

&nbsp; 

Components:

&nbsp; Type: Functional components with hooks

&nbsp; State Management: useState, useContext, useReducer

```



\### Layer 4: Handoff Pipeline

```yaml

Documentation:

&nbsp; Format: Markdown

&nbsp; Templates: Predefined

&nbsp; Generation: Python scripts



Packaging:

&nbsp; Format: Zip / Git tag

&nbsp; Contents:

&nbsp;   - Built app (dist/)

&nbsp;   - Technical specs

&nbsp;   - Documentation

&nbsp;   - Configuration files

```



\## Data Flow



\### Flow 1: Prototype Intake

\[New Prototype Arrives via Signal]

↓

\[Manual: Save to prototypes/raw/]

↓

\[PM: Update batch\_standardize.json]

↓

\[Dev: Run standardize\_names.py]

↓

\[Output: Standardized file in prototypes/standardized/]

↓

\[Dev: Run extract\_components.py]

↓

\[Output: component\_map.json updated]

↓

\[PM: Prepare notion\_sync\_data.json]

↓

\[Dev: Run sync\_to\_notion.py]

↓

\[Output: New page in Notion database]

↓

\[PM: Manually add URLs (Claude Chat, Artifact)]

↓

\[Dev: Git commit + push]

↓

\[Complete: Prototype tracked]



\### Flow 2: Component Extraction

\[Standardized Prototype File]

↓

\[extract\_components.py]

│

├─→ Parse HTML/JSX

├─→ Find function components

├─→ Find const declarations

├─→ Identify dependencies

│

↓

\[Generate component\_map.json]

│

├─ shared: \[]

├─ preclass: \[]

├─ inclass: \[]

└─ utilities: \[]

│

↓

\[Output: Components categorized]



\### Flow 3: Merge Build

\[Multiple Standardized Prototypes]

↓

\[PM: Create navigation\_map.json]

↓

\[Dev: Setup merge\_workspace/app\_shell/]

↓

\[Dev: npm install dependencies]

↓

\[Dev: Run build\_merged\_app.py]

│

├─→ Extract components to merge\_workspace/components/

├─→ Generate App.jsx with routes

├─→ Generate Router.jsx

├─→ Generate StateContext.jsx

│

↓

\[Dev: npm run dev → Test locally]

↓

\[PM: QC Testing]

↓

\[Dev: npm run build → Production build]

↓

\[Output: dist/ folder]

↓

\[Dev: Copy to handoff/current/]

↓

\[Complete: Merged app ready]



\### Flow 4: Handoff

\[Merged App in handoff/current/dist/]

↓

\[PM: Generate technical spec]

↓

\[Dev: Run build\_handoff\_package.py]

│

├─→ Include dist/

├─→ Include TECH\_SPEC.md

├─→ Include README.md

├─→ Include configs (navigation\_map, component\_map)

│

↓

\[Dev: Archive previous handoff]

↓

\[Dev: Git commit + push]

↓

\[PM: Email notification to CTO Sandeep]

│

├─ Git repo link

├─ Tech spec highlights

├─ Deployment notes

│

↓

\[PM: Update Notion (mark as "Deployed")]

↓

\[Complete: Handoff delivered]



\## Integration Points



\### Notion API

```python

from notion\_client import Client



client = Client(auth=NOTION\_TOKEN)



\# Search for pages

results = client.search(

&nbsp;   filter={"property": "object", "value": "page"}

)



\# Create page

page = client.pages.create(

&nbsp;   parent={"database\_id": DATABASE\_ID},

&nbsp;   properties={...}

)

```



\### Git Operations

```bash

\# Add files

git add .



\# Commit

git commit -m "feat: Add PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14"



\# Push

git push origin main

```



\### File System (ClaudeCode)

```python

\# Desktop Commander tools

\- read\_file(path)

\- write\_file(path, content)

\- list\_directory(path, depth)

\- search\_files(path, pattern)

\- move\_file(source, destination)

```



\## Security \& Access Control



\### Credentials Management

.env file (gitignored):

NOTION\_TOKEN=secret\_xxx

NOTION\_DATABASE\_ID=xxx

Never commit:



API tokens

Database IDs

Passwords

Personal data





\### File Permissions

Desktop Commander has access to:

✅ D:\\TECH\_BOX\\TIKME\_PRODUCTION

❌ System files

❌ Other user directories



\### API Rate Limits

Notion API:



Rate limit: ~3 requests/second

Strategy: Batch operations

Error handling: Retry with backoff





\## Scalability Considerations



\### Current Capacity

\- \*\*Prototypes:\*\* ~100 files

\- \*\*Components:\*\* ~500 components

\- \*\*Notion Pages:\*\* ~200 pages

\- \*\*Merge Builds:\*\* ~10 builds



\### Growth Planning

\- \*\*Year 1:\*\* 200+ prototypes

\- \*\*Strategy:\*\* Pagination, caching

\- \*\*Database:\*\* Consider archiving old versions



\## Disaster Recovery



\### Backup Strategy

Primary: Git repository



All files version controlled

Remote backup on GitHub



Secondary: Notion export



Weekly manual export

Stored in handoff/archive/



Tertiary: Local backups



Desktop Commander snapshots

External drive backup





\### Recovery Procedures

Lost Notion data:



Restore from Git commit history

Re-run sync\_to\_notion.py



Lost Git data:



Clone from GitHub remote

Restore from local backup



Lost files:



Re-download from Signal (if recent)

Request from Sếp Sơn

Restore from Git history





---

\*\*Last Updated:\*\* 29/11/2025  

\*\*Version:\*\* 1.0  

\*\*Owner:\*\* ClaudeK (PM)

