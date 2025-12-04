# Notion Database Schema - TIKME_Artifact

## Database Information

**Database Name:** TIKME_Artifact  
**Database ID:** `2a92b641bddd80769ba8e711fbefd9d6`  
**Type:** Database  
**Access:** Via Notion API (notion-client Python library)  
**Created:** 28/11/2025  
**Updated:** 01/12/2025 (Added Task Brief property)  
**Owner:** Hoàng Kha

---

## Complete Property Definitions (29 properties)

### 1. Core Identification Properties

[... giữ nguyên 6 properties ...]

---

### 2. File Management Properties

[... giữ nguyên 5 properties ...]

---

### 3. URLs & References Properties

#### **Claude Chat URL** (URL)
[... giữ nguyên ...]

#### **Artifact URL** (URL)
[... giữ nguyên ...]

#### **Github Commit** (URL)
[... giữ nguyên ...]

#### **Task Brief** (Files) 👈 NEW

```yaml
Type: files
Description: Task brief file (.md) cho ClaudeCode DEV
Auto-generated: Yes (by organize_prototypes.py v2.0)
Upload Time: When Status = "Review" (ngay sau khi organize)
Format: Markdown (.md)
Naming: YYYYMMDD_Integrate_[Module]_[Feature]_V[XX].md
Required: No
Max Size: 5 MB per file
Example: "20251201_Integrate_B2_PreClassDashboard_V14.md"

Purpose:
- Chứa task brief chi tiết cho ClaudeCode integrate prototype
- Auto-generated khi organize_prototypes.py chạy
- Anh có thể download và share với ClaudeCode DEV
- Includes: objective, input files, tasks, acceptance criteria

Workflow:
1. Anh save file → iterations/
2. Em run organize_prototypes.py
3. Script auto-generates brief
4. Script uploads brief to Notion Files
5. Anh review prototype + brief
6. Nếu approve → Anh download brief → Share ClaudeCode
```

---

### 4. Status Tracking Properties

[... giữ nguyên 3 properties: Status, Merge Status, Priority ...]

---

### 5. Technical Details Properties

[... giữ nguyên 3 properties ...]

---

### 6. Flags (Checkboxes)

[... giữ nguyên 2 properties ...]

---

### 7. Metadata Properties

[... giữ nguyên 4 properties ...]

---

### 8. Relations

[... giữ nguyên 1 property ...]

---

### 9. Notes Properties

[... giữ nguyên 3 properties ...]

---

## Sample Records (UPDATED)

### **Record 1: Pre-Class Dashboard (with Task Brief)**

```json
{
  "Name": "PROTO_SM6.1_WF4_B2_PreClassDashboard_V14",
  "Module": "SM6.1",
  "Sitemap Block": "B2",
  "Wireframe Version": "WF4",
  "Feature Name": "PreClassDashboard",
  "Version": 14,
  "Status": "Approved",
  "Merge Status": "Ready",
  "Priority": "High",
  
  "Local Path": "file://D:/TECH_BOX/Tikme_App_Prototypies/iterations/B2_PreClassDashboard/PROTO_SM6.1_WF4_B2_PreClassDashboard_V14.html",
  "Raw Filename": "tikme-pre-class-ultimate-v14.html",
  "File Size": "107 KB",
  "Line Count": 1841,
  "Component Count": 8,
  
  "Claude Chat URL": "https://claude.ai/chat/c40b006e-37d0-4cdf-873c-659702ed402c",
  "Artifact URL": "",
  "Github Commit": "",
  
  "Task Brief": {
    "files": [{
      "name": "20251201_Integrate_B2_PreClassDashboard_V14.md",
      "type": "file"
    }]
  },
  
  "Main Component": "PreClassDashboard",
  "Dependencies": "StudentCard, AttendancePanel, ReadinessIndicator",
  "API Endpoints": "GET /api/students, POST /api/attendance",
  
  "Components Extracted": true,
  "Navigation Mapped": false,
  
  "Created Date": "2025-11-28",
  "Last Modified": "2025-11-29",
  "Tags": ["PreClass", "Coach", "Dashboard", "B2"],
  "Assigned To": "Hoàng Kha",
  
  "Description": "Pre-Class preparation dashboard with readiness tracking and attendance management.",
  "Technical Notes": "Uses Context API for student data. Custom hooks: useReadiness, useAttendance.",
  "Issues": ""
}
```

---

## Python Integration Code

### **Upload Task Brief to Notion Files**

```python
from notion_client import Client
import os

client = Client(auth=NOTION_TOKEN)
database_id = "2a92b641bddd80769ba8e711fbefd9d6"

def upload_task_brief(page_id, brief_filepath):
    """
    Upload task brief file to Notion page.
    
    Note: Notion API v2023+ supports file uploads via external URL.
    For local files, need to upload to hosting first (e.g., Vercel, S3)
    or use Notion's internal file upload mechanism.
    """
    
    # Method 1: If file hosted externally
    client.pages.update(
        page_id=page_id,
        properties={
            "Task Brief": {
                "files": [{
                    "name": os.path.basename(brief_filepath),
                    "type": "external",
                    "external": {"url": f"https://your-host.com/{brief_filepath}"}
                }]
            }
        }
    )
    
    # Method 2: If using local file path (file:// protocol)
    # Note: This works for local Notion desktop app access
    client.pages.update(
        page_id=page_id,
        properties={
            "Task Brief": {
                "files": [{
                    "name": os.path.basename(brief_filepath),
                    "type": "external",
                    "external": {"url": f"file:///{brief_filepath.replace(chr(92), '/')}"}
                }]
            }
        }
    )
```

### **Create Page with Task Brief**

```python
def create_prototype_page_with_brief(data, brief_filepath):
    """Create prototype page and attach task brief."""
    
    # Create page first
    page = client.pages.create(
        parent={"database_id": database_id},
        properties={
            "Name": {
                "title": [{"text": {"content": data['name']}}]
            },
            "Module": {
                "select": {"name": data['module']}
            },
            "Status": {
                "select": {"name": "Review"}
            },
            # ... other properties
        }
    )
    
    page_id = page['id']
    
    # Upload task brief
    if brief_filepath and os.path.exists(brief_filepath):
        upload_task_brief(page_id, brief_filepath)
    
    return page_id
```

### **Generate Task Brief Content**

```python
def generate_task_brief_content(metadata):
    """Generate task brief markdown content."""
    
    brief = f"""# TASK BRIEF FOR CLAUDECODE

**Date:** {metadata['created_date']}
**Task ID:** TC-{metadata['version']:03d}
**Module:** {metadata['module']} - {metadata['feature']}
**Version:** V{metadata['version']}
**Priority:** {metadata.get('priority', 'High')}
**Estimated Time:** 1-2 hours

---

## 🎯 OBJECTIVE

Integrate {metadata['feature']} V{metadata['version']} vào merged app `tikme-app-minimal` theo Hướng B (Minimal Router Approach).

---

## 📥 INPUT FILES

**Source Prototype:**
- File: `approved/{metadata['filename']}`
- Location: `D:\\TECH_BOX\\Tikme_App_Prototypies\\approved\\`
- Size: {metadata['file_size']}
- Lines: {metadata['line_count']:,} lines
- Components: {metadata['component_count']}

**Reference Docs:**
- `docs/02_SYSTEM_ARCHITECTURE.md`
- `docs/08_DECISION_LOG.md` (Decision #25 - Hướng B)

---

## 🔨 TASKS

### Task 1: Setup Component File
- [ ] Create `src/pages/{metadata['feature']}.jsx`
- [ ] Copy HTML from approved prototype
- [ ] Convert to JSX syntax
- [ ] Preserve 100% logic

### Task 2: Extract CSS
- [ ] Extract to `src/styles/{metadata['feature'].lower()}.css`
- [ ] Import CSS in component
- [ ] Verify styling intact

### Task 3: Update Router
- [ ] Add route in `src/App.jsx`
- [ ] Update `Navigation.jsx`

### Task 4: Build & Test
- [ ] Run `npm run build` (0 errors)
- [ ] Test navigation working
- [ ] Test all features intact

---

## ✅ ACCEPTANCE CRITERIA

- [ ] Build successful
- [ ] 100% logic preserved
- [ ] All features working
- [ ] Navigation smooth
- [ ] Minimal changes only

---

**Generated by:** ClaudeK (PM)  
**Assigned to:** ClaudeCode (DEV)
"""
    
    return brief
```

---

## Summary of Changes (v2.0)

**Added:**
- ✅ New property: "Task Brief" (Files type)
- ✅ Python code for uploading files
- ✅ Task brief generation function
- ✅ Updated sample records with task brief

**Total Properties:** 29 (was 28)

**Updated:** 01/12/2025  
**Version:** 2.0  
**Owner:** ClaudeK (PM)