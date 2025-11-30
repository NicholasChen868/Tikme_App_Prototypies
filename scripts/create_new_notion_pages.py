"""
CREATE 2 NEW NOTION PAGES
For Pre-Class Dashboard V14 and In-Class Teaching V5
"""

import os
from dotenv import load_dotenv
from notion_client import Client
from datetime import datetime

# Load credentials
load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 70)
print("CREATE NEW NOTION PAGES - Pre-Class V14 & In-Class V5")
print("=" * 70)
print("")

# Page configurations
PAGES_CONFIG = [
    {
        "name": "PROTO_SM6.1_WF4_B2.1_PreClassDashboard_V14",
        "module": "SM6.1",
        "version": "V14",
        "sitemap": "B2.1",
        "local_path": "/PROTO_SM6.1_WF4_B2.1_PreClassDashboard_V14.html",
        "tags": ["PreClass", "Coach", "Dashboard"],
        "notes": "Pre-Class preparation dashboard with readiness tracking. Features: attendance, student status, can-start indicator. Component: PreClassDashboard. 1841 lines, 107KB.",
        "created_date": "2025-11-28"
    },
    {
        "name": "PROTO_SM6.1_WF4_B3_InClassTeaching_V5",
        "module": "SM6.1",
        "version": "V5",
        "sitemap": "B3",
        "local_path": "/PROTO_SM6.1_WF4_B3_InClassTeaching_V5.html",
        "tags": ["InClass", "Teaching", "ChopChep"],
        "notes": "In-Class teaching interface with ChopChep 90min method. Features: 11 teaching tools, student panel, 45+ vocab, 4C method. Component: App. 7274 lines, 475KB. Version 5.0.1 Optimized.",
        "created_date": "2025-11-28"
    }
]

try:
    notion = Client(auth=NOTION_TOKEN)
    
    # Get database info
    database = notion.databases.retrieve(database_id=NOTION_DATABASE_ID)
    db_title = database.get('title', [{}])[0].get('plain_text', 'N/A')
    
    print(f"Database: {db_title}")
    print(f"ID: {NOTION_DATABASE_ID}")
    print("")
    
    # Find parent database_id from existing pages to get the correct parent
    print("-" * 70)
    print("Finding correct parent (data source)...")
    print("-" * 70)
    
    # Search for existing pages to find data_source_id
    response = notion.search(
        filter={"property": "object", "value": "page"},
        page_size=5
    )
    
    all_pages = response.get("results", [])
    
    # Find a page with our database_id
    parent_data_source_id = None
    for page in all_pages:
        parent = page.get('parent', {})
        if parent.get('database_id', '').replace('-', '').lower() == NOTION_DATABASE_ID.replace('-', '').lower():
            parent_data_source_id = parent.get('data_source_id')
            if parent_data_source_id:
                print(f"✅ Found data source: {parent_data_source_id}")
                break
    
    if not parent_data_source_id:
        print("⚠️  Could not find data_source_id, using database_id directly")
        parent_config = {"database_id": NOTION_DATABASE_ID}
    else:
        parent_config = {"data_source_id": parent_data_source_id}
    
    print("")
    
    # Create each page
    created_pages = []
    
    for i, page_config in enumerate(PAGES_CONFIG, 1):
        print("-" * 70)
        print(f"Creating Page {i}/2: {page_config['name']}")
        print("-" * 70)
        
        try:
            # Prepare properties based on database schema
            properties = {
                "Name": {
                    "title": [
                        {
                            "text": {
                                "content": page_config['name']
                            }
                        }
                    ]
                }
            }
            
            # Add other properties if they exist in schema
            # Module Code (select)
            if page_config.get('sitemap'):
                properties["Sitemap"] = {
                    "select": {
                        "name": page_config['sitemap']
                    }
                }
            
            # Version (rich_text)
            if page_config.get('version'):
                properties["Version"] = {
                    "rich_text": [
                        {
                            "text": {
                                "content": page_config['version']
                            }
                        }
                    ]
                }
            
            # Local Path (rich_text)
            if page_config.get('local_path'):
                properties["Local Path"] = {
                    "rich_text": [
                        {
                            "text": {
                                "content": page_config['local_path']
                            }
                        }
                    ]
                }
            
            # Notes (rich_text)
            if page_config.get('notes'):
                properties["Notes"] = {
                    "rich_text": [
                        {
                            "text": {
                                "content": page_config['notes']
                            }
                        }
                    ]
                }
            
            # Created Date (date)
            if page_config.get('created_date'):
                properties["Ngày"] = {
                    "date": {
                        "start": page_config['created_date']
                    }
                }
            
            # Status (use existing status property from schema)
            properties["Status"] = {
                "status": {
                    "name": "Approved"
                }
            }
            
            print(f"  Name: {page_config['name']}")
            print(f"  Module: {page_config['module']}")
            print(f"  Version: {page_config['version']}")
            print(f"  Sitemap: {page_config['sitemap']}")
            print(f"  Tags: {', '.join(page_config.get('tags', []))}")
            print("")
            
            # Create the page
            new_page = notion.pages.create(
                parent=parent_config,
                properties=properties
            )
            
            page_id = new_page.get('id', 'N/A')
            page_url = new_page.get('url', 'N/A')
            
            print(f"✅ SUCCESS! Page created")
            print(f"  Page ID: {page_id}")
            print(f"  URL: {page_url}")
            print("")
            
            created_pages.append({
                "config": page_config,
                "id": page_id,
                "url": page_url
            })
            
        except Exception as e:
            print(f"❌ ERROR creating page: {e}")
            import traceback
            traceback.print_exc()
            print("")
    
    # Summary
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Pages created: {len(created_pages)}/2")
    print("")
    
    if created_pages:
        print("✅ Created pages:")
        for page_info in created_pages:
            print(f"\n  📄 {page_info['config']['name']}")
            print(f"     URL: {page_info['url']}")
            print(f"     ID: {page_info['id']}")
    
    print("")
    print("=" * 70)
    print("✅ NOTION PAGES CREATED SUCCESSFULLY!")
    print("=" * 70)
    print("")
    print("Next steps:")
    print("  1. ✅ Verify pages in Notion UI")
    print("  2. ⏭️  Rename HTML files to match Notion pages")
    print("  3. 🔗 Update Notion with Claude Chat URLs")
    print("  4. 🔗 Update Notion with Artifact URLs")
    print("  5. 📦 Archive old 10 pages (optional)")
    print("")

except Exception as e:
    print("")
    print("=" * 70)
    print("❌ ERROR: Failed to create pages")
    print("=" * 70)
    print(f"Error: {str(e)}")
    print("")
    import traceback
    traceback.print_exc()
    print("")
    print("💡 TROUBLESHOOTING:")
    print("   1. Check database schema has required properties")
    print("   2. Verify parent data_source_id is correct")
    print("   3. Check Notion API permissions")
    exit(1)
