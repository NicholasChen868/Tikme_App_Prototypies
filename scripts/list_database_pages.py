"""
FIXED: Correctly filter pages by database_id from nested parent object
"""

import os
from dotenv import load_dotenv
from notion_client import Client

load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 70)
print("FIXED: Correctly Extract Pages from TIKME_Artifact")
print("=" * 70)
print("")

try:
    notion = Client(auth=NOTION_TOKEN)
    
    # Get database info
    database = notion.databases.retrieve(database_id=NOTION_DATABASE_ID)
    db_title = database.get('title', [{}])[0].get('plain_text', 'N/A')
    
    print(f"Database: {db_title}")
    print(f"ID: {NOTION_DATABASE_ID}")
    print("")
    
    # Search all pages
    response = notion.search(
        filter={"property": "object", "value": "page"},
        page_size=100
    )
    
    all_pages = response.get("results", [])
    print(f"Total pages in workspace: {len(all_pages)}")
    print("")
    
    # FIXED: Correctly extract database_id from nested parent object
    our_db_normalized = NOTION_DATABASE_ID.replace('-', '').lower()
    database_pages = []
    
    for page in all_pages:
        parent = page.get('parent', {})
        
        # Check if parent has database_id (can be nested)
        parent_db_id = None
        
        # Method 1: Check nested database_id (for data_source_id type)
        if 'database_id' in parent:
            parent_db_id = parent['database_id']
        
        # Method 2: Check if parent type is database_id directly
        elif parent.get('type') == 'database_id':
            parent_db_id = parent.get('database_id')
        
        if parent_db_id:
            parent_db_normalized = parent_db_id.replace('-', '').lower()
            
            if parent_db_normalized == our_db_normalized:
                database_pages.append(page)
    
    print("=" * 70)
    print("RESULTS")
    print("=" * 70)
    print(f"✅ Found {len(database_pages)} pages in TIKME_Artifact database")
    print("")
    
    if database_pages:
        print("Pages in TIKME_Artifact:")
        print("-" * 70)
        
        for i, page in enumerate(database_pages, 1):
            props = page.get('properties', {})
            
            # Extract title
            title = "N/A"
            for prop_name, prop_value in props.items():
                if prop_value.get('type') == 'title':
                    title_list = prop_value.get('title', [])
                    if title_list:
                        title = title_list[0].get('plain_text', 'N/A')
                    break
            
            # Extract metadata
            page_id = page.get('id', 'N/A')
            created = page.get('created_time', 'N/A')
            parent_info = page.get('parent', {})
            data_source_id = parent_info.get('data_source_id', 'N/A')
            
            print(f"\n{i}. {title}")
            print(f"   Page ID: {page_id}")
            print(f"   Created: {created}")
            print(f"   Data Source: {data_source_id}")
            
            # Show all properties
            if props:
                print(f"   Properties:")
                for prop_name, prop_value in props.items():
                    prop_type = prop_value.get('type', 'unknown')
                    print(f"     - {prop_name}: {prop_type}")
    else:
        print("(No pages found - database might be empty)")
    
    print("")
    print("=" * 70)
    
except Exception as e:
    print(f"❌ ERROR: {e}")
    import traceback
    traceback.print_exc()
