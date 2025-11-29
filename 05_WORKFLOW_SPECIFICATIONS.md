\# Workflow Specifications - TikMe PM System



\## Overview



Tài liệu này định nghĩa chi tiết 4 workflows chính trong TikMe Prototype Management System.



---



\## Workflow 1: New Prototype Intake



\*\*Trigger:\*\* New HTML file nhận được qua Signal từ Sếp Sơn  

\*\*Owner:\*\* PM (ClaudeK)  

\*\*Executor:\*\* Dev (ClaudeCode)  

\*\*Duration:\*\* ~30 minutes  

\*\*Frequency:\*\* 2-3 times per week



\### \*\*Process Flow:\*\*

\[New Prototype via Signal]

↓

\[PM: Save to raw/] ← Manual

↓

\[PM: Create batch config] ← Manual

↓

\[Dev: Standardize filename] ← Auto

↓

\[Dev: Extract components] ← Auto

↓

\[PM: Prepare Notion data] ← Manual

↓

\[Dev: Sync to Notion] ← Auto

↓

\[PM: Add URLs] ← Manual

↓

\[Dev: Git commit] ← Auto

↓

\[Complete]



\### \*\*Step-by-Step Instructions:\*\*



\#### \*\*Step 1: Save File (PM - Manual)\*\*



\*\*Action:\*\*



Download file từ Signal

Save to: D:\\TECH\_BOX\\TIKME\_PRODUCTION\\prototypes\\raw\\

Keep original filename





\*\*Verification:\*\*

```powershell

\# Check file exists

Test-Path "D:\\TECH\_BOX\\TIKME\_PRODUCTION\\prototypes\\raw\\\[filename].html"

```



\*\*Quality Gate:\*\*

\- \[ ] File exists in raw/

\- \[ ] File is readable

\- \[ ] File size > 0 KB



---



\#### \*\*Step 2: Create Batch Config (PM - Manual)\*\*



\*\*Action:\*\*

Edit `tracking/data/batch\_standardize.json`:

```json

{

&nbsp; "files": \[

&nbsp;   {

&nbsp;     "raw\_path": "prototypes/raw/tikme-new-feature.html",

&nbsp;     "sitemap": "6.1",

&nbsp;     "wireframe": "4",

&nbsp;     "block": "B2.1",

&nbsp;     "feature": "NewFeature"

&nbsp;   }

&nbsp; ]

}

```



\*\*Mapping Rules:\*\*

\- \*\*sitemap:\*\* From AI Prompt Spec filename (e.g., SM6.1)

\- \*\*wireframe:\*\* Current wireframe version (check with Sếp)

\- \*\*block:\*\* From feature description

\- \*\*feature:\*\* Main component name (PascalCase)



\*\*Verification:\*\*

```bash

\# Validate JSON

python -m json.tool tracking/data/batch\_standardize.json

```



\*\*Quality Gate:\*\*

\- \[ ] JSON is valid

\- \[ ] All required fields present

\- \[ ] Feature name in PascalCase



---



\#### \*\*Step 3: Standardize Filename (Dev - Auto)\*\*



\*\*Task Brief to ClaudeCode:\*\*

```markdown

TASK: Standardize prototype filename



INPUT: tracking/data/batch\_standardize.json

OUTPUT: Standardized file in prototypes/standardized/



COMMANDS:

1\. Preview:

&nbsp;  python tracking/scripts/standardize\_names.py --dry-run



2\. Execute:

&nbsp;  python tracking/scripts/standardize\_names.py



EXPECTED OUTPUT:

✅ Copied: PROTO\_SM6.1\_WF4\_B2.1\_NewFeature\_V1.html

Results saved to: tracking/data/standardization\_results.json



ACCEPTANCE:

\- \[ ] File copied to standardized/

\- \[ ] Filename matches convention

\- \[ ] Results JSON created

\- \[ ] No errors

```



\*\*Quality Gate:\*\*

\- \[ ] Standardized file exists

\- \[ ] Filename follows PROTO\_SM\[X]\_WF\[X]\_\[BLOCK]\_\[FEATURE]\_V\[XX]

\- \[ ] File size matches original

\- \[ ] Results logged



---



\#### \*\*Step 4: Extract Components (Dev - Auto)\*\*



\*\*Task Brief to ClaudeCode:\*\*

```markdown

TASK: Extract components from prototype



INPUT: prototypes/standardized/\[PROTO\_NAME].html

OUTPUT: tracking/data/component\_map.json (updated)



COMMAND:

python tracking/scripts/extract\_components.py --input-dir prototypes/standardized



EXPECTED OUTPUT:

🔍 Analyzing: PROTO\_SM6.1\_WF4\_B2.1\_NewFeature\_V1.html

&nbsp;  Found 5 components

&nbsp;  Found 3 utilities

✅ Component map saved



ACCEPTANCE:

\- \[ ] component\_map.json updated

\- \[ ] Component count matches manual count

\- \[ ] Shared components identified

\- \[ ] No errors

```



\*\*Quality Gate:\*\*

\- \[ ] component\_map.json exists

\- \[ ] Component count > 0

\- \[ ] Main component identified

\- \[ ] Dependencies listed



---



\#### \*\*Step 5: Prepare Notion Data (PM - Manual)\*\*



\*\*Action:\*\*

Create `tracking/data/notion\_sync\_data.json`:

```json

\[

&nbsp; {

&nbsp;   "name": "PROTO\_SM6.1\_WF4\_B2.1\_NewFeature\_V1",

&nbsp;   "module": "SM6.1",

&nbsp;   "sitemap\_block": "B2.1",

&nbsp;   "wireframe\_version": "WF4",

&nbsp;   "feature\_name": "NewFeature",

&nbsp;   "version": "1",

&nbsp;   "status": "Approved",

&nbsp;   "raw\_filename": "tikme-new-feature.html",

&nbsp;   "local\_path": "file://D:/TECH\_BOX/TIKME\_PRODUCTION/prototypes/standardized/PROTO\_SM6.1\_WF4\_B2.1\_NewFeature\_V1.html",

&nbsp;   "file\_size": "125 KB",

&nbsp;   "line\_count": 2000,

&nbsp;   "component\_count": 5,

&nbsp;   "main\_component": "NewFeature",

&nbsp;   "tags": \["NewTag", "B2"],

&nbsp;   "merge\_status": "Not Started"

&nbsp; }

]

```



\*\*Data Sources:\*\*

\- \*\*name:\*\* From standardization results

\- \*\*file\_size, line\_count, component\_count:\*\* From extraction results

\- \*\*main\_component, tags:\*\* Manual assignment

\- \*\*status:\*\* "Approved" if tested, "Draft" if not



\*\*Quality Gate:\*\*

\- \[ ] JSON valid

\- \[ ] All required fields present

\- \[ ] Values match actual file



---



\#### \*\*Step 6: Sync to Notion (Dev - Auto)\*\*



\*\*Task Brief to ClaudeCode:\*\*

```markdown

TASK: Sync prototype to Notion



INPUT: tracking/data/notion\_sync\_data.json

OUTPUT: New page(s) in Notion database



COMMANDS:

1\. Preview:

&nbsp;  python tracking/scripts/sync\_to\_notion.py --dry-run



2\. Execute:

&nbsp;  python tracking/scripts/sync\_to\_notion.py



EXPECTED OUTPUT:

🔍 Would create page: PROTO\_SM6.1\_WF4\_B2.1\_NewFeature\_V1

✅ Synced: PROTO\_SM6.1\_WF4\_B2.1\_NewFeature\_V1



SYNC SUMMARY

Total: 1

Success: 1

Failed: 0



ACCEPTANCE:

\- \[ ] Page created in Notion

\- \[ ] All properties populated

\- \[ ] No sync errors

```



\*\*Quality Gate:\*\*

\- \[ ] Page visible in Notion

\- \[ ] Name matches exactly

\- \[ ] Status set correctly

\- \[ ] Tags applied



---



\#### \*\*Step 7: Add URLs (PM - Manual)\*\*



\*\*Action:\*\*

1\. Open Notion page

2\. Add \*\*Claude Chat URL\*\*:

&nbsp;  - Open Claude conversation that created prototype

&nbsp;  - Copy URL from browser

&nbsp;  - Paste into Notion field

3\. Add \*\*Artifact URL\*\* (if available):

&nbsp;  - Click artifact in Claude

&nbsp;  - Copy direct link

&nbsp;  - Paste into Notion field



\*\*Quality Gate:\*\*

\- \[ ] Claude Chat URL added

\- \[ ] URL is clickable

\- \[ ] Opens correct conversation



---



\#### \*\*Step 8: Git Commit (Dev - Auto)\*\*



\*\*Task Brief to ClaudeCode:\*\*

```markdown

TASK: Commit prototype to Git



FILES TO COMMIT:

\- prototypes/raw/\[original].html

\- prototypes/standardized/\[PROTO\_NAME].html

\- tracking/data/batch\_standardize.json

\- tracking/data/component\_map.json

\- tracking/data/standardization\_results.json



COMMANDS:

git add prototypes/ tracking/data/

git commit -m "feat: Add PROTO\_SM6.1\_WF4\_B2.1\_NewFeature\_V1"

git push



COMMIT MESSAGE FORMAT:

feat: Add \[PROTO\_NAME]



\- Feature: \[Feature description]

\- Size: \[XX] KB

\- Components: \[N]

\- Status: Approved



ACCEPTANCE:

\- \[ ] All files committed

\- \[ ] Pushed to remote

\- \[ ] No conflicts

```



\*\*Quality Gate:\*\*

\- \[ ] Commit successful

\- \[ ] Pushed to GitHub

\- \[ ] Commit message follows format



---



\### \*\*Workflow 1 Checklist\*\*

New Prototype Intake - Complete Checklist

□ Step 1: File saved to raw/

□ Step 2: Batch config created

□ Step 3: Filename standardized

□ Step 4: Components extracted

□ Step 5: Notion data prepared

□ Step 6: Synced to Notion

□ Step 7: URLs added

□ Step 8: Git committed

Final Verification:

□ File in standardized/ folder

□ Page in Notion database

□ Claude Chat URL present

□ Git pushed successfully

□ No errors in logs



---



\## Workflow 2: Merge Prototypes



\*\*Trigger:\*\* Multiple prototypes với Status="Approved" và Merge Status="Ready"  

\*\*Owner:\*\* PM (ClaudeK)  

\*\*Executor:\*\* Dev (ClaudeCode)  

\*\*Duration:\*\* ~2 hours  

\*\*Frequency:\*\* Once per sprint (1-2 weeks)



\### \*\*Process Flow:\*\*

\[Check Merge Readiness]

↓

\[PM: Create Navigation Map] ← Manual

↓

\[Dev: Setup Merge Workspace] ← Auto

↓

\[Dev: Extract Components] ← Auto

↓

\[Dev: Generate App Shell] ← Auto

↓

\[Dev: Test Locally] ← Auto

↓

\[PM: QC Testing] ← Manual

↓

\[Dev: Build Production] ← Auto

↓

\[Dev: Copy to Handoff] ← Auto

↓

\[Complete]



\### \*\*Step-by-Step Instructions:\*\*



\#### \*\*Step 1: Check Merge Readiness (PM)\*\*



\*\*Action:\*\*

```bash

python tracking/scripts/check\_merge\_readiness.py

```



\*\*Expected Output:\*\*

MERGE READINESS CHECK

Ready to Merge (2):

✅ PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14



Components: Extracted ✓

Navigation: Not mapped ✗



✅ PROTO\_SM6.1\_WF4\_B3\_InClassTeaching\_V5



Components: Extracted ✓

Navigation: Not mapped ✗



Blockers:



Navigation mapping needed for 2 prototypes



Recommendation: Create navigation map before proceeding.



\*\*Quality Gate:\*\*

\- \[ ] All prototypes have Status="Approved"

\- \[ ] All prototypes have Components Extracted=true

\- \[ ] No blocking issues



---



\#### \*\*Step 2: Create Navigation Map (PM - Manual)\*\*



\*\*Action:\*\*

Edit `merge\_workspace/navigation\_map.json`:

```json

{

&nbsp; "routes": \[

&nbsp;   {

&nbsp;     "path": "/pre-class",

&nbsp;     "component": "PreClassDashboard",

&nbsp;     "source\_file": "PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14.html",

&nbsp;     "sitemap\_block": "B2.1",

&nbsp;     "title": "Pre-Class Dashboard",

&nbsp;     "description": "Class preparation and readiness check",

&nbsp;     "next\_routes": \["/in-class"]

&nbsp;   },

&nbsp;   {

&nbsp;     "path": "/in-class",

&nbsp;     "component": "InClassTeaching",

&nbsp;     "source\_file": "PROTO\_SM6.1\_WF4\_B3\_InClassTeaching\_V5.html",

&nbsp;     "sitemap\_block": "B3",

&nbsp;     "title": "In-Class Teaching",

&nbsp;     "description": "Active teaching with ChopChep method",

&nbsp;     "prev\_routes": \["/pre-class"]

&nbsp;   }

&nbsp; ],

&nbsp; 

&nbsp; "shared\_state": \[

&nbsp;   "currentClass",

&nbsp;   "students",

&nbsp;   "sessionData"

&nbsp; ],

&nbsp; 

&nbsp; "navigation\_triggers": {

&nbsp;   "pre-class-to-in-class": {

&nbsp;     "button\_text": "Bắt Đầu Lớp Học",

&nbsp;     "condition": "readiness === 'ready'",

&nbsp;     "action": "navigate('/in-class')"

&nbsp;   }

&nbsp; }

}

```



\*\*Quality Gate:\*\*

\- \[ ] JSON valid

\- \[ ] All routes defined

\- \[ ] Shared state identified

\- \[ ] Navigation triggers specified



---



\#### \*\*Step 3: Setup Merge Workspace (Dev - Auto)\*\*



\*\*Task Brief:\*\*

```markdown

TASK: Setup merge workspace



COMMANDS:

cd merge\_workspace/app\_shell

npm install



EXPECTED OUTPUT:

added 245 packages in 30s



ACCEPTANCE:

\- \[ ] node\_modules/ exists

\- \[ ] package-lock.json created

\- \[ ] No dependency errors

```



---



\#### \*\*Step 4-8:\*\* \[Similar detailed specs for remaining steps...]



---



\## Workflow 3: CTO Handoff



\[Detailed workflow similar to above...]



---



\## Workflow 4: Version Updates



\*\*Trigger:\*\* Sếp Sơn sends updated version of existing prototype  

\*\*Duration:\*\* ~20 minutes



\[Detailed workflow...]



---



\*\*Last Updated:\*\* 29/11/2025  

\*\*Version:\*\* 1.0  

\*\*Owner:\*\* ClaudeK (PM)

