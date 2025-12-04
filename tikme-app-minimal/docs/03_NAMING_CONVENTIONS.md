# Naming Conventions - TikMe Standards

## Core Principle

**Consistency is key.** Mọi files, folders, variables, commits đều follow naming convention để:
- ✅ Dễ search và filter
- ✅ Tránh confusion
- ✅ Automation-friendly
- ✅ Professional appearance

---

## 1. Prototype Files

### **Format Chuẩn:**
PROTO_SM[SITEMAP]WF[WIREFRAME][BLOCK]_[FEATURE]_V[VERSION].[RETRY]

### **Components:**

| Part | Description | Example | Rules |
|------|-------------|---------|-------|
| `PROTO` | Fixed prefix | PROTO | Always uppercase |
| `SM[X.X]` | Sitemap version | SM6.1 | Dot notation |
| `WF[X]` | Wireframe/Spec version | WF4 | Integer |
| `[BLOCK]` | Sitemap block | B2.1, B3 | B + number |
| `[FEATURE]` | Feature name | PreClassDashboard | PascalCase |
| `V[XX]` | Version | V14 | Integer |
| `.[RX]` | Optional retry | .R0, .R1 | Optional |

### **Examples:**

✅ **CORRECT:**
PROTO_SM6.1_WF4_B2.1_PreClassDashboard_V14.html
PROTO_SM6.1_WF4_B3_InClassTeaching_V5.html
PROTO_SM6.1_WF4_B4.2_StudentProfile_V3.R1.html
PROTO_SM7.0_WF5_B1_Login_V1.html

❌ **INCORRECT:**
tikme-v5-ultimate.html                    # No structure
pre-class-dashboard-final.html            # Kebab-case
PreClassDashboard_v14.html                # Missing SM, WF, BLOCK
PROTO_Module6_Feature_V14.html            # Wrong format
proto_sm6.1_wf4_b2.1_preclassdashboard_v14.html  # Lowercase

### **Parsing Logic:**
```python
import re

pattern = r'PROTO_SM(\d+\.\d+)_WF(\d+)_([A-Z]\d+(?:\.\d+)?)_([A-Za-z]+)_V(\d+)(?:\.R(\d+))?\.html'

filename = "PROTO_SM6.1_WF4_B2.1_PreClassDashboard_V14.html"
match = re.match(pattern, filename)

if match:
    sitemap = match.group(1)      # "6.1"
    wireframe = match.group(2)     # "4"
    block = match.group(3)         # "B2.1"
    feature = match.group(4)       # "PreClassDashboard"
    version = match.group(5)       # "14"
    retry = match.group(6)         # None or "0", "1", etc.
```

---

## 2. Component Names

### **React Components: PascalCase**

✅ **CORRECT:**
```jsx
PreClassDashboard
InClassTeaching
StudentCard
AttendancePanel
ReadinessIndicator
ChopChepTimer
VocabCard
```

❌ **INCORRECT:**
```jsx
preclassdashboard      # lowercase
pre_class_dashboard    # snake_case
pre-class-dashboard    # kebab-case
PreClass_Dashboard     # mixed
```

### **Utility Functions: camelCase**

✅ **CORRECT:**
```javascript
formatDate
calculateReadiness
sortStudents
getAttendanceStatus
validateEmail
```

❌ **INCORRECT:**
```javascript
FormatDate            # PascalCase
format_date           # snake_case
format-date           # kebab-case
FORMATDATE            # UPPERCASE
```

### **Constants: UPPER_SNAKE_CASE**

✅ **CORRECT:**
```javascript
const MAX_STUDENTS = 30;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = "https://api.tikme.com";
const LESSON_DURATION_MINUTES = 90;
```

❌ **INCORRECT:**
```javascript
const maxStudents = 30;           # camelCase
const Max_Students = 30;          # Mixed
const MAX-STUDENTS = 30;          # kebab-case
```

---

## 3. Git Commit Messages

### **Format:**
[TYPE] Brief description (max 50 chars)
Detailed explanation (if needed):

Change 1
Change 2
Change 3

Refs: #issue-number (optional)

### **Types:**

| Type | Usage | Example |
|------|-------|---------|
| `feat:` | New feature | `feat: Add PreClassDashboard V14` |
| `fix:` | Bug fix | `fix: Correct naming in sync script` |
| `docs:` | Documentation | `docs: Update workflow guide` |
| `refactor:` | Code refactoring | `refactor: Simplify component extraction` |
| `test:` | Testing | `test: Add unit tests for standardize_names` |
| `chore:` | Maintenance | `chore: Update dependencies` |
| `style:` | Formatting | `style: Fix indentation in Python scripts` |

### **Examples:**

✅ **CORRECT:**
feat: Add PROTO_SM6.1_WF4_B2.1_PreClassDashboard_V14
Added new pre-class dashboard prototype:

Attendance tracking
Readiness indicator
Student status panel

File: PROTO_SM6.1_WF4_B2.1_PreClassDashboard_V14.html
Size: 107 KB
Components: 8

fix: Correct notion sync for multi-select fields
Fixed bug where Tags property wasn't syncing correctly.
Now properly formats as array of {"name": "tag"} objects.

docs: Add troubleshooting guide for Notion API errors

❌ **INCORRECT:**
updated files                          # No type, too vague
Added new prototype                    # No type prefix
FIX: bug in script                     # Uppercase type
feat:add dashboard (no space)          # Missing space after colon