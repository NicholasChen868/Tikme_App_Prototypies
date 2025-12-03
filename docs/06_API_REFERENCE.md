\# API Reference - TikMe PM System



\## Notion API Integration



\### \*\*Client Setup\*\*

```python

from notion\_client import Client

import os

from dotenv import load\_dotenv



load\_dotenv()



client = Client(auth=os.getenv("NOTION\_TOKEN"))

database\_id = os.getenv("NOTION\_DATABASE\_ID")

```



\### \*\*Common Operations\*\*



\#### \*\*1. Search Pages\*\*

```python

def search\_database\_pages(database\_id):

&nbsp;   """Search all pages in a database."""

&nbsp;   results = client.search(

&nbsp;       filter={"property": "object", "value": "page"}

&nbsp;   )

&nbsp;   

&nbsp;   # Normalize IDs for comparison

&nbsp;   normalized\_db\_id = database\_id.replace("-", "").lower()

&nbsp;   

&nbsp;   db\_pages = \[

&nbsp;       p for p in results.get("results", \[])

&nbsp;       if p.get("parent", {}).get("database\_id", "").replace("-", "").lower() 

&nbsp;          == normalized\_db\_id

&nbsp;   ]

&nbsp;   

&nbsp;   return db\_pages

```



\#### \*\*2. Create Page\*\*

```python

def create\_prototype\_page(data):

&nbsp;   """Create a new prototype page in Notion."""

&nbsp;   properties = {

&nbsp;       "Name": {

&nbsp;           "title": \[{"text": {"content": data\['name']}}]

&nbsp;       },

&nbsp;       "Module": {

&nbsp;           "select": {"name": data\['module']}

&nbsp;       },

&nbsp;       "Status": {

&nbsp;           "select": {"name": data.get('status', 'Draft')}

&nbsp;       }

&nbsp;       # ... more properties

&nbsp;   }

&nbsp;   

&nbsp;   page = client.pages.create(

&nbsp;       parent={"database\_id": database\_id},

&nbsp;       properties=properties

&nbsp;   )

&nbsp;   

&nbsp;   return page\['id']

```



\#### \*\*3. Update Page\*\*

```python

def update\_page\_status(page\_id, status):

&nbsp;   """Update page status."""

&nbsp;   client.pages.update(

&nbsp;       page\_id=page\_id,

&nbsp;       properties={

&nbsp;           "Status": {"select": {"name": status}}

&nbsp;       }

&nbsp;   )

```



---



\## Desktop Commander API



\### \*\*File Operations\*\*

```python

\# Read file

content = read\_file(path="prototypes/raw/file.html")



\# Write file

write\_file(

&nbsp;   path="output.txt",

&nbsp;   content="Hello World",

&nbsp;   mode="rewrite"

)



\# List directory

files = list\_directory(

&nbsp;   path="prototypes",

&nbsp;   depth=2

)



\# Search files

results = start\_search(

&nbsp;   path="prototypes",

&nbsp;   pattern="\*.html",

&nbsp;   searchType="files"

)

```



---



\*\*Last Updated:\*\* 29/11/2025  

\*\*Version:\*\* 1.0  

\*\*Owner:\*\* ClaudeK (PM)

