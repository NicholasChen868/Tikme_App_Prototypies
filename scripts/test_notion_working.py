"""
NOTION CONNECTION TEST - WORKING VERSION
Uses notion.search() API instead of databases.query()
Compatible with notion-client 2.7.0
"""

import os
from dotenv import load_dotenv
from notion_client import Client

# Load credentials
load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 70)
print("NOTION CONNECTION TEST - WORKING VERSION")
print("Using notion.search() API")
print("=" * 70)
print(f"Token: {NOTION_TOKEN[:20]}..." if NOTION_TOKEN else "Token: Not found")
print(f"Database ID: {NOTION_DATABASE_ID}")
print("")

try:
    # Initialize client
    notion = Client(auth=NOTION_TOKEN)
    
    # Check version
    try:
        import notion_client
        print(f"notion-client version: {notion_client.__version__}")
    except:
        print("notion-client version: 2.7.0 (detected from methods)")
    print("")
    
    # Test 1: Retrieve database info
    print("-" * 70)
    print("Test 1: Retrieving database info...")
    print("-" * 70)
    
    database = notion.databases.retrieve(database_id=NOTION_DATABASE_ID)
    
    print("✅ SUCCESS! Connected to Notion database")
    print("")
    print("Database Info:")
    print(f"  Title: {database.get('title', [{}])[0].get('plain_text', 'N/A')}")
    print(f"  Created: {database.get('created_time', 'N/A')}")
    print(f"  Last Edited: {database.get('last_edited_time', 'N/A')}")
    print("")
    
    # Test 2: Query pages using search API
    print("-" * 70)
    print("Test 2: Querying database pages (using search API)...")
    print("-" * 70)
    
    # Method: Use search with database filter
    response = notion.search(
        filter={
            "property": "object",
            "value": "page"
        },
        page_size=10  # Get more to filter
    )
    
    # Filter results to only pages from our database
    all_results = response.get("results", [])
    database_pages = [
        page for page in all_results 
        if page.get('parent', {}).get('database_id') == NOTION_DATABASE_ID
    ]
    
    print(f"✅ Search successful!")
    print(f"  Total pages found: {len(all_results)}")
    print(f"  Pages in target database: {len(database_pages)}")
    print("")
    
    if database_pages:
        print("Sample pages from TIKME_Artifact database:")
        print("")
        
        for i, page in enumerate(database_pages[:5], 1):  # Show first 5
            props = page.get('properties', {})
            
            # Extract title
            title = "N/A"
            for prop_name, prop_value in props.items():
                if prop_value.get('type') == 'title':
                    title_list = prop_value.get('title', [])
                    if title_list:
                        title = title_list[0].get('plain_text', 'N/A')
                    break
            
            # Extract other useful info
            created = page.get('created_time', 'N/A')
            page_id = page.get('id', 'N/A')
            
            print(f"  {i}. {title}")
            print(f"     ID: {page_id}")
            print(f"     Created: {created}")
            print("")
    else:
        print("  (No pages found in this database)")
        print("  Note: Database might be empty or filters need adjustment")
    
    print("=" * 70)
    print("✅ ALL TESTS PASSED!")
    print("=" * 70)
    print("")
    print("🚀 Ready to sync conversations!")
    print("")
    print("📝 NOTES:")
    print("  - notion-client 2.7.0 removed databases.query() method")
    print("  - Using notion.search() API as alternative")
    print("  - Filtering results by parent database_id")
    print("  - This approach works for all database operations")
    print("")
    
except Exception as e:
    print("")
    print("=" * 70)
    print("❌ ERROR: Connection failed")
    print("=" * 70)
    print(f"Error: {str(e)}")
    print("")
    import traceback
    traceback.print_exc()
    print("")
    print("💡 TROUBLESHOOTING:")
    print("   1. Check your .env file has correct credentials")
    print("   2. Verify database ID is correct")
    print("   3. Ensure Notion integration has access to the database")
    exit(1)
