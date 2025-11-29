"""
VERIFY: Check if TIKME_Artifact database is empty or filter issue
"""

import os
from dotenv import load_dotenv
from notion_client import Client

load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 70)
print("VERIFY: TIKME_Artifact Database Content")
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
    
    # Check database properties (schema)
    print("-" * 70)
    print("Database Schema (Properties):")
    print("-" * 70)
    
    properties = database.get('properties', {})
    if properties:
        for prop_name, prop_info in properties.items():
            prop_type = prop_info.get('type', 'unknown')
            print(f"  • {prop_name}: {prop_type}")
    else:
        print("  (No properties defined)")
    
    print("")
    
    # Search ALL pages (no filter)
    print("-" * 70)
    print("Searching ALL pages in workspace...")
    print("-" * 70)
    
    response = notion.search(
        filter={
            "property": "object",
            "value": "page"
        },
        page_size=100
    )
    
    all_pages = response.get("results", [])
    print(f"Total pages in workspace: {len(all_pages)}")
    print("")
    
    # Debug: Show parent info of all pages
    print("-" * 70)
    print("Debugging: Parent info of all pages")
    print("-" * 70)
    
    database_pages = []
    
    for i, page in enumerate(all_pages, 1):
        parent = page.get('parent', {})
        parent_type = parent.get('type', 'unknown')
        
        # Get page title
        props = page.get('properties', {})
        title = "N/A"
        for prop_name, prop_value in props.items():
            if prop_value.get('type') == 'title':
                title_list = prop_value.get('title', [])
                if title_list:
                    title = title_list[0].get('plain_text', 'N/A')
                break
        
        print(f"\n{i}. {title}")
        print(f"   Parent type: {parent_type}")
        
        if parent_type == 'database_id':
            parent_db_id = parent.get('database_id', 'N/A')
            print(f"   Parent DB ID: {parent_db_id}")
            
            # Check if matches our database
            # Need to normalize IDs (remove dashes for comparison)
            our_db_normalized = NOTION_DATABASE_ID.replace('-', '')
            parent_db_normalized = parent_db_id.replace('-', '')
            
            if our_db_normalized == parent_db_normalized:
                print(f"   ✅ MATCH! This page is in TIKME_Artifact")
                database_pages.append(page)
            else:
                print(f"   ❌ Different database")
        elif parent_type == 'page_id':
            parent_page_id = parent.get('page_id', 'N/A')
            print(f"   Parent Page ID: {parent_page_id}")
        elif parent_type == 'workspace':
            print(f"   Parent: Workspace (root level)")
        else:
            print(f"   Parent: {parent}")
    
    print("")
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total pages in workspace: {len(all_pages)}")
    print(f"Pages in TIKME_Artifact: {len(database_pages)}")
    print("")
    
    if len(database_pages) == 0:
        print("✅ TIKME_Artifact database is EMPTY")
        print("   Ready to sync conversations!")
    else:
        print(f"✅ Found {len(database_pages)} pages in TIKME_Artifact:")
        for i, page in enumerate(database_pages, 1):
            props = page.get('properties', {})
            title = "N/A"
            for prop_name, prop_value in props.items():
                if prop_value.get('type') == 'title':
                    title_list = prop_value.get('title', [])
                    if title_list:
                        title = title_list[0].get('plain_text', 'N/A')
                    break
            print(f"   {i}. {title}")
    
except Exception as e:
    print(f"❌ ERROR: {e}")
    import traceback
    traceback.print_exc()
