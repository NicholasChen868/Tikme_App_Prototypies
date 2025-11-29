\# Troubleshooting Guide - TikMe PM System



\## Common Issues \& Solutions



---



\### \*\*Issue 1: Notion Sync Fails\*\*



\*\*Symptoms:\*\*

Error: notion\_client.errors.APIResponseError

Status: 400

Message: "body failed validation"



\*\*Possible Causes:\*\*

1\. Invalid property values

2\. Missing required fields

3\. Wrong property types

4\. Database schema mismatch



\*\*Solutions:\*\*



✅ \*\*Step 1: Validate JSON\*\*

```bash

python -m json.tool tracking/data/notion\_sync\_data.json

```



✅ \*\*Step 2: Check Required Fields\*\*

```python

required = \["name", "module", "sitemap\_block", "wireframe\_version", 

&nbsp;           "feature\_name", "version", "status"]



for field in required:

&nbsp;   if field not in data:

&nbsp;       print(f"Missing: {field}")

```



✅ \*\*Step 3: Verify Database Schema\*\*

\- Open Notion database

\- Check property names match exactly

\- Verify property types (select, number, text, etc.)



✅ \*\*Step 4: Test with Minimal Data\*\*

```python

\# Minimal test

properties = {

&nbsp;   "Name": {"title": \[{"text": {"content": "TEST"}}]},

&nbsp;   "Status": {"select": {"name": "Draft"}}

}

```



---



\### \*\*Issue 2: File Standardization Produces Wrong Name\*\*



\*\*Symptoms:\*\*

Expected: PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14.html

Got: PROTO\_SM6.1\_WF4\_B21\_PreClassDashboard\_V14.html



\*\*Cause:\*\* Typo in batch config (B21 instead of B2.1)



\*\*Solution:\*\*

```json

{

&nbsp; "block": "B2.1"  // ← Must include decimal for sub-blocks

}

```



---



\### \*\*Issue 3: Component Extraction Finds 0 Components\*\*



\*\*Symptoms:\*\*

Found 0 components

Found 0 utilities



\*\*Possible Causes:\*\*

1\. File is not React/JSX

2\. Components use different syntax

3\. File encoding issue



\*\*Solutions:\*\*



✅ \*\*Check File Content:\*\*

```bash

\# First 50 lines

head -n 50 prototypes/standardized/\[FILE].html

```



✅ \*\*Look for Patterns:\*\*

```python

\# Should find:

\# - function ComponentName()

\# - const ComponentName = 

\# - class ComponentName extends

```



✅ \*\*Manual Verification:\*\*

Open file in editor and count components manually.



---



\### \*\*Issue 4: Merge Build Fails\*\*



\*\*Symptoms:\*\*

npm run build

Error: Cannot find module 'react-router-dom'



\*\*Solutions:\*\*



✅ \*\*Install Dependencies:\*\*

```bash

cd merge\_workspace/app\_shell

npm install

```



✅ \*\*Clear Cache:\*\*

```bash

rm -rf node\_modules package-lock.json

npm install

```



✅ \*\*Check package.json:\*\*

```json

{

&nbsp; "dependencies": {

&nbsp;   "react": "^18.2.0",

&nbsp;   "react-dom": "^18.2.0",

&nbsp;   "react-router-dom": "^6.20.0"

&nbsp; }

}

```



---



\### \*\*Issue 5: Git Push Rejected\*\*



\*\*Symptoms:\*\*

! \[rejected] main -> main (fetch first)



\*\*Cause:\*\* Remote has commits not in local



\*\*Solution:\*\*

```bash

\# Fetch and merge

git pull --rebase origin main



\# Resolve conflicts if any

\# Then push

git push origin main

```



---



\### \*\*Issue 6: Desktop Commander Access Denied\*\*



\*\*Symptoms:\*\*

Error: Permission denied

Path: D:\\TECH\_BOX...



\*\*Solutions:\*\*



✅ \*\*Check Allowed Directories:\*\*

```bash

\# In Desktop Commander settings

list\_allowed\_directories

```



✅ \*\*Add Directory if Needed:\*\*

Update Desktop Commander config to allow access.



✅ \*\*Use Absolute Paths:\*\*

```python

\# Not: "prototypes/raw/file.html"

\# Use: "D:/TECH\_BOX/TIKME\_PRODUCTION/prototypes/raw/file.html"

```



---



\### \*\*Issue 7: Slow Notion API\*\*



\*\*Symptoms:\*\*

\- Sync takes >2 minutes

\- Timeout errors



\*\*Cause:\*\* Rate limiting or network issues



\*\*Solutions:\*\*



✅ \*\*Batch Operations:\*\*

```python

\# Instead of: create page by page

\# Do: batch create with delay



for page in pages:

&nbsp;   create\_page(page)

&nbsp;   time.sleep(0.5)  # Rate limit buffer

```



✅ \*\*Check Rate Limits:\*\*

Notion API: ~3 requests/second



---



\## Emergency Procedures



\### \*\*If Notion Database is Corrupted\*\*



1\. \*\*Export current data:\*\*

Notion UI → ... → Export → Markdown \& CSV



2\. \*\*Restore from Git:\*\*

```bash

&nbsp;  # Re-run sync script

&nbsp;  python tracking/scripts/sync\_to\_notion.py

```



3\. \*\*Manual verification:\*\*

&nbsp;  Check sample pages manually



---



\### \*\*If Git Repository Lost\*\*



1\. \*\*Clone from GitHub:\*\*

```bash

&nbsp;  git clone https://github.com/\[org]/\[repo]

```



2\. \*\*Restore from backup:\*\*

Copy from external drive



3\. \*\*Re-run scripts:\*\*

&nbsp;  Regenerate derived files



---



\## Contact \& Escalation



\*\*For Technical Issues:\*\*

\- Check this guide first

\- Search Decision Log

\- Test with minimal example

\- Document the issue



\*\*For Process Issues:\*\*

\- Review Workflow Specifications

\- Check Quality Standards

\- Consult with PM (ClaudeK)



\*\*For Blocking Issues:\*\*

\- Document clearly

\- Note what was tried

\- Escalate to Anh Kha



---



\*\*Last Updated:\*\* 29/11/2025  

\*\*Version:\*\* 1.0  

\*\*Owner:\*\* ClaudeK (PM)

