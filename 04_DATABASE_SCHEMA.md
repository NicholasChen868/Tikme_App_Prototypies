\# Notion Database Schema - TIKME\_Artifact



\## Database Information



\*\*Database Name:\*\* TIKME\_Artifact  

\*\*Database ID:\*\* `2a92b641bddd80769ba8e711fbefd9d6`  

\*\*Type:\*\* Database  

\*\*Access:\*\* Via Notion API (notion-client Python library)  

\*\*Created:\*\* 28/11/2025  

\*\*Owner:\*\* Hoàng Kha



---



\## Complete Property Definitions



\### 1. Core Identification Properties



\#### \*\*Name\*\* (Title - Required)

```yaml

Type: title

Description: Primary identifier cho prototype

Format: PROTO\_SM\[X.X]\_WF\[X]\_\[BLOCK]\_\[FEATURE]\_V\[XX]

Required: Yes

Unique: Yes (manually enforced)

Example: "PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14"

```



\#### \*\*Module\*\* (Select)

```yaml

Type: select

Description: Sitemap version number

Options:

&nbsp; - SM6.1

&nbsp; - SM6.2

&nbsp; - SM7.0

Required: Yes

Example: "SM6.1"

```



\#### \*\*Sitemap Block\*\* (Select)

```yaml

Type: select

Description: Block number trong sitemap

Options:

&nbsp; - B1 (Login/Auth)

&nbsp; - B2 (Pre-Class Workflow)

&nbsp; - B2.1 (Class Preparation)

&nbsp; - B2.2 (Material Setup)

&nbsp; - B3 (In-Class Teaching)

&nbsp; - B4 (Post-Class)

&nbsp; - B4.1 (Feedback)

&nbsp; - B4.2 (Analytics)

&nbsp; - B5 (Admin)

Required: Yes

Example: "B2.1"

```



\#### \*\*Wireframe Version\*\* (Select)

```yaml

Type: select

Description: Version của wireframe/prompt spec

Options:

&nbsp; - WF1

&nbsp; - WF2

&nbsp; - WF3

&nbsp; - WF4

&nbsp; - WF5

Required: Yes

Example: "WF4"

```



\#### \*\*Feature Name\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Tên feature trong PascalCase

Format: PascalCase, no spaces

Max Length: 100 characters

Required: Yes

Example: "PreClassDashboard"

```



\#### \*\*Version\*\* (Number)

```yaml

Type: number

Description: Version number của prototype

Format: Integer

Min: 1

Required: Yes

Example: 14

```



---



\### 2. File Management Properties



\#### \*\*Local Path\*\* (URL)

```yaml

Type: url

Description: Link đến file trong Git repository

Format: file:// or https://

Required: No

Example: "file://D:/TECH\_BOX/TIKME\_PRODUCTION/prototypes/standardized/PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14.html"

```



\#### \*\*Raw Filename\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Tên file gốc trước khi standardize

Max Length: 255 characters

Required: No

Example: "tikme-pre-class-ultimate-v14.html"

```



\#### \*\*File Size\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Kích thước file

Format: "\[number] KB" or "\[number] MB"

Required: No

Example: "107 KB"

```



\#### \*\*Line Count\*\* (Number)

```yaml

Type: number

Description: Tổng số dòng trong file

Format: Integer

Min: 0

Required: No

Example: 1841

```



\#### \*\*Component Count\*\* (Number)

```yaml

Type: number

Description: Số lượng React components trong file

Format: Integer

Min: 0

Required: No

Example: 8

```



---



\### 3. URLs \& References Properties



\#### \*\*Claude Chat URL\*\* (URL)

```yaml

Type: url

Description: Link đến conversation tạo ra prototype

Format: https://claude.ai/chat/\[uuid]

Required: No

Example: "https://claude.ai/chat/c40b006e-37d0-4cdf-873c-659702ed402c"

```



\#### \*\*Artifact URL\*\* (URL)

```yaml

Type: url

Description: Direct link đến artifact trong Claude

Format: https://claude.ai/...

Required: No

Example: "https://claude.ai/chat/xxx#artifact-id"

```



\#### \*\*Github Commit\*\* (URL)

```yaml

Type: url

Description: Link đến Git commit chứa file

Format: https://github.com/\[org]/\[repo]/commit/\[hash]

Required: No

Example: "https://github.com/esuhai/tikme-prototypes/commit/abc123"

```



---



\### 4. Status Tracking Properties



\#### \*\*Status\*\* (Select - Required)

```yaml

Type: select

Description: Trạng thái hiện tại của prototype trong R&D workflow

Options:

&nbsp; - Draft         # CPO đang tạo, chưa hoàn chỉnh (V1, V2...)

&nbsp; - Review        # PM/CPO đang review iteration

&nbsp; - Approved      # 🔴 CPO CHỐT VERSION - Ready to merge (QUAN TRỌNG)

&nbsp; - Merged        # Đã merge với prototypes Approved khác

&nbsp; - Deployed      # Đã handoff cho CTO

&nbsp; - Archived      # Version cũ không dùng nữa

Colors:

&nbsp; - Draft: Gray

&nbsp; - Review: Yellow

&nbsp; - Approved: Green (🎯 Đây là checkpoint quan trọng)

&nbsp; - Merged: Blue

&nbsp; - Deployed: Purple

&nbsp; - Archived: Red

Required: Yes

Default: "Draft"

Example: "Approved"

Workflow Rule:

&nbsp; - CHỈ prototypes có Status="Approved" mới được merge

&nbsp; - Iterations (V1, V2, V3...) thường là Draft hoặc Review

&nbsp; - Khi CPO chốt version → Chuyển thành "Approved"

&nbsp; - Script merge_approved.py CHỈ lấy Status="Approved"

```



\#### \*\*Merge Status\*\* (Select)

```yaml

Type: select

Description: Trạng thái trong quá trình merge

Options:

&nbsp; - Not Started   # Chưa bắt đầu

&nbsp; - Extracting    # Đang extract components

&nbsp; - Ready         # Sẵn sàng merge

&nbsp; - Merged        # Đã merge xong

Colors:

&nbsp; - Not Started: Gray

&nbsp; - Extracting: Yellow

&nbsp; - Ready: Green

&nbsp; - Merged: Blue

Required: No

Default: "Not Started"

Example: "Ready"

```



\#### \*\*Priority\*\* (Select)

```yaml

Type: select

Description: Độ ưu tiên

Options:

&nbsp; - High

&nbsp; - Medium

&nbsp; - Low

Colors:

&nbsp; - High: Red

&nbsp; - Medium: Yellow

&nbsp; - Low: Gray

Required: No

Default: "Medium"

Example: "High"

```



---



\### 5. Technical Details Properties



\#### \*\*Main Component\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Tên React component chính

Format: PascalCase

Max Length: 100 characters

Required: No

Example: "PreClassDashboard"

```



\#### \*\*Dependencies\*\* (Rich Text)

```yaml

Type: rich\_text

Description: List các components/libraries dependencies

Format: Comma-separated list

Max Length: 500 characters

Required: No

Example: "StudentCard, AttendancePanel, react-router-dom"

```



\#### \*\*API Endpoints\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Documented API requirements

Format: Markdown list

Max Length: 1000 characters

Required: No

Example: |

&nbsp; - GET /api/students

&nbsp; - POST /api/attendance

&nbsp; - PUT /api/readiness

```



---



\### 6. Flags (Checkboxes)



\#### \*\*Components Extracted\*\* (Checkbox)

```yaml

Type: checkbox

Description: Đã extract components chưa

Default: false

Required: No

Example: true

```



\#### \*\*Navigation Mapped\*\* (Checkbox)

```yaml

Type: checkbox

Description: Đã map navigation chưa

Default: false

Required: No

Example: false

```



---



\### 7. Metadata Properties



\#### \*\*Created Date\*\* (Date)

```yaml

Type: date

Description: Ngày tạo prototype

Format: YYYY-MM-DD

Required: No

Example: "2025-11-28"

```



\#### \*\*Last Modified\*\* (Date)

```yaml

Type: date

Description: Ngày sửa đổi cuối

Format: YYYY-MM-DD

Auto-update: No (manual)

Required: No

Example: "2025-11-29"

```



\#### \*\*Tags\*\* (Multi-select)

```yaml

Type: multi\_select

Description: Tags để filter và search

Options:

&nbsp; - PreClass

&nbsp; - InClass

&nbsp; - PostClass

&nbsp; - Coach

&nbsp; - Student

&nbsp; - Dashboard

&nbsp; - Teaching

&nbsp; - Analytics

&nbsp; - B1, B2, B2.1, B2.2, B3, B4, B4.1, B4.2, B5

Colors: Auto-assigned

Required: No

Example: \["PreClass", "Coach", "Dashboard", "B2"]

```



\#### \*\*Assigned To\*\* (Person)

```yaml

Type: person

Description: Người chịu trách nhiệm

Options: Workspace members

Required: No

Example: Hoàng Kha

```



---



\### 8. Relations



\#### \*\*Merged Into\*\* (Relation)

```yaml

Type: relation

Description: Link đến merged build record (nếu có)

Related Database: TIKME\_Merged\_Builds (future)

Required: No

Example: \[Link to build record]

```



---



\### 9. Notes Properties



\#### \*\*Description\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Mô tả dễ hiểu về prototype

Format: Plain text or Markdown

Max Length: 2000 characters

Required: No

Example: "Pre-Class preparation dashboard with readiness tracking, attendance management, and can-start indicator. Features include student status panel, quick actions, and real-time sync."

```



\#### \*\*Technical Notes\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Ghi chú kỹ thuật cho developers

Format: Markdown

Max Length: 2000 characters

Required: No

Example: |

&nbsp; - Uses useState for local state

&nbsp; - Context API for global student data

&nbsp; - Custom hooks: useReadiness, useAttendance

&nbsp; - Dependencies: react-router-dom, lucide-react

```



\#### \*\*Issues\*\* (Rich Text)

```yaml

Type: rich\_text

Description: Known issues hoặc blockers

Format: Markdown list

Max Length: 1000 characters

Required: No

Example: |

&nbsp; - \[ ] Fix attendance sync delay

&nbsp; - \[ ] Add loading states

&nbsp; - \[x] Resolve navigation bug

```



---



\## Sample Records



\### \*\*Record 1: Pre-Class Dashboard\*\*

```json

{

&nbsp; "Name": "PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14",

&nbsp; "Module": "SM6.1",

&nbsp; "Sitemap Block": "B2.1",

&nbsp; "Wireframe Version": "WF4",

&nbsp; "Feature Name": "PreClassDashboard",

&nbsp; "Version": 14,

&nbsp; "Status": "Approved",

&nbsp; "Merge Status": "Ready",

&nbsp; "Priority": "High",

&nbsp; 

&nbsp; "Local Path": "file://D:/TECH\_BOX/TIKME\_PRODUCTION/prototypes/standardized/PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14.html",

&nbsp; "Raw Filename": "tikme-pre-class-ultimate-v14.html",

&nbsp; "File Size": "107 KB",

&nbsp; "Line Count": 1841,

&nbsp; "Component Count": 8,

&nbsp; 

&nbsp; "Claude Chat URL": "https://claude.ai/chat/c40b006e-37d0-4cdf-873c-659702ed402c",

&nbsp; "Artifact URL": "",

&nbsp; "Github Commit": "",

&nbsp; 

&nbsp; "Main Component": "PreClassDashboard",

&nbsp; "Dependencies": "StudentCard, AttendancePanel, ReadinessIndicator",

&nbsp; "API Endpoints": "GET /api/students, POST /api/attendance",

&nbsp; 

&nbsp; "Components Extracted": true,

&nbsp; "Navigation Mapped": false,

&nbsp; 

&nbsp; "Created Date": "2025-11-28",

&nbsp; "Last Modified": "2025-11-29",

&nbsp; "Tags": \["PreClass", "Coach", "Dashboard", "B2"],

&nbsp; "Assigned To": "Hoàng Kha",

&nbsp; 

&nbsp; "Description": "Pre-Class preparation dashboard with readiness tracking and attendance management. Features: student status panel, can-start indicator, quick actions.",

&nbsp; "Technical Notes": "Uses Context API for student data. Custom hooks: useReadiness, useAttendance.",

&nbsp; "Issues": ""

}

```



\### \*\*Record 2: In-Class Teaching\*\*

```json

{

&nbsp; "Name": "PROTO\_SM6.1\_WF4\_B3\_InClassTeaching\_V5",

&nbsp; "Module": "SM6.1",

&nbsp; "Sitemap Block": "B3",

&nbsp; "Wireframe Version": "WF4",

&nbsp; "Feature Name": "InClassTeaching",

&nbsp; "Version": 5,

&nbsp; "Status": "Approved",

&nbsp; "Merge Status": "Ready",

&nbsp; "Priority": "High",

&nbsp; 

&nbsp; "Local Path": "file://D:/TECH\_BOX/TIKME\_PRODUCTION/prototypes/standardized/PROTO\_SM6.1\_WF4\_B3\_InClassTeaching\_V5.html",

&nbsp; "Raw Filename": "tikme-v5-ultimate.html",

&nbsp; "File Size": "475 KB",

&nbsp; "Line Count": 7274,

&nbsp; "Component Count": 45,

&nbsp; 

&nbsp; "Claude Chat URL": "",

&nbsp; "Artifact URL": "",

&nbsp; "Github Commit": "",

&nbsp; 

&nbsp; "Main Component": "App",

&nbsp; "Dependencies": "ChopChepTimer, VocabCard, StudentPanel, ToolSelector",

&nbsp; "API Endpoints": "GET /api/lesson, POST /api/vocab, PUT /api/progress",

&nbsp; 

&nbsp; "Components Extracted": true,

&nbsp; "Navigation Mapped": false,

&nbsp; 

&nbsp; "Created Date": "2025-11-28",

&nbsp; "Last Modified": "2025-11-29",

&nbsp; "Tags": \["InClass", "Teaching", "ChopChep", "B3"],

&nbsp; "Assigned To": "Hoàng Kha",

&nbsp; 

&nbsp; "Description": "In-Class teaching interface với ChopChep 90min method. Features: 11 teaching tools, student engagement panel, 45+ vocab cards, 4C method integration.",

&nbsp; "Technical Notes": "Complex state management. Uses reducer pattern. 11 interactive teaching tools. Real-time student tracking.",

&nbsp; "Issues": "Performance optimization needed for 30+ students"

}

```



---



\## Python Integration Code



\### \*\*Create Page:\*\*

```python

from notion\_client import Client



client = Client(auth=NOTION\_TOKEN)

database\_id = "2a92b641bddd80769ba8e711fbefd9d6"



properties = {

&nbsp;   "Name": {

&nbsp;       "title": \[{"text": {"content": "PROTO\_SM6.1\_WF4\_B2.1\_PreClassDashboard\_V14"}}]

&nbsp;   },

&nbsp;   "Module": {

&nbsp;       "select": {"name": "SM6.1"}

&nbsp;   },

&nbsp;   "Sitemap Block": {

&nbsp;       "select": {"name": "B2.1"}

&nbsp;   },

&nbsp;   "Wireframe Version": {

&nbsp;       "select": {"name": "WF4"}

&nbsp;   },

&nbsp;   "Feature Name": {

&nbsp;       "rich\_text": \[{"text": {"content": "PreClassDashboard"}}]

&nbsp;   },

&nbsp;   "Version": {

&nbsp;       "number": 14

&nbsp;   },

&nbsp;   "Status": {

&nbsp;       "select": {"name": "Approved"}

&nbsp;   },

&nbsp;   "File Size": {

&nbsp;       "rich\_text": \[{"text": {"content": "107 KB"}}]

&nbsp;   },

&nbsp;   "Line Count": {

&nbsp;       "number": 1841

&nbsp;   },

&nbsp;   "Tags": {

&nbsp;       "multi\_select": \[

&nbsp;           {"name": "PreClass"},

&nbsp;           {"name": "Coach"},

&nbsp;           {"name": "Dashboard"}

&nbsp;       ]

&nbsp;   },

&nbsp;   "Components Extracted": {

&nbsp;       "checkbox": True

&nbsp;   }

}



page = client.pages.create(

&nbsp;   parent={"database\_id": database\_id},

&nbsp;   properties=properties

)



print(f"Created page: {page\['id']}")

```



\### \*\*Query Pages:\*\*

```python

\# Search all pages in database

results = client.search(

&nbsp;   filter={"property": "object", "value": "page"}

)



\# Filter by database

db\_pages = \[

&nbsp;   p for p in results.get("results", \[])

&nbsp;   if p.get("parent", {}).get("database\_id", "").replace("-", "").lower() 

&nbsp;      == database\_id.replace("-", "").lower()

]



print(f"Found {len(db\_pages)} pages")

```



\### \*\*Update Page:\*\*

```python

page\_id = "xxx-xxx-xxx"



client.pages.update(

&nbsp;   page\_id=page\_id,

&nbsp;   properties={

&nbsp;       "Status": {"select": {"name": "Merged"}},

&nbsp;       "Components Extracted": {"checkbox": True},

&nbsp;       "Navigation Mapped": {"checkbox": True}

&nbsp;   }

)

```



---



\## Views Configuration



\### \*\*View 1: All Prototypes (Table)\*\*

Sort: Created Date (descending)

Filters: None

Visible Properties: All

Group By: None



\### \*\*View 2: Ready to Merge (Filtered Table)\*\*

Sort: Priority (High first), Created Date

Filters:



Status = "Approved"

Merge Status = "Ready"

Components Extracted = true

Visible Properties: Name, Sitemap Block, Feature Name, Version, Tags





\### \*\*View 3: Timeline (Timeline)\*\*

Timeline Property: Created Date

Group By: Module

Filters: Status != "Archived"



\### \*\*View 4: By Module (Board)\*\*

Group By: Sitemap Block

Sort: Priority, Version

Filters: Status != "Archived"

Card Preview: Name, Tags, Status



\### \*\*View 5: By Assignee (Board)\*\*

Group By: Assigned To

Sort: Priority, Created Date

Filters: Status != "Deployed" AND Status != "Archived"



---

\*\*Last Updated:\*\* 29/11/2025  

\*\*Version:\*\* 1.0  

\*\*Owner:\*\* ClaudeK (PM)

