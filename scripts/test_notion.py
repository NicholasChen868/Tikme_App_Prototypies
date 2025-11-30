import os
from dotenv import load_dotenv
from notion_client import Client

# Load credentials
load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 60)
print("NOTION CONNECTION TEST")
print("=" * 60)
print(f"Token: {NOTION_TOKEN[:20]}..." if NOTION_TOKEN else "Token: Not found")
print(f"Database ID: {NOTION_DATABASE_ID}")
print("")

try:
    # Initialize client
    notion = Client(auth=NOTION_TOKEN)
    
    # Test: Retrieve database
    print("Testing database access...")
    database = notion.databases.retrieve(database_id=NOTION_DATABASE_ID)
    
    print("✅ SUCCESS! Connected to Notion database")
    print("")
    print("Database Info:")
    print(f"  Title: {database.get('title', [{}])[0].get('plain_text', 'N/A')}")
    print(f"  Created: {database.get('created_time', 'N/A')}")
    print(f"  Last Edited: {database.get('last_edited_time', 'N/A')}")
    print("")
    
    # Test: Query database (FIXED - use correct method)
    print("Querying database (first 3 items)...")
    response = notion.databases.query(
        **{"database_id": NOTION_DATABASE_ID, "page_size": 3}
    )
    
    results = response.get("results", [])
    print(f"  Found {len(results)} items")
    print("")
    
    if results:
        print("Sample items:")
        for i, page in enumerate(results, 1):
            props = page.get('properties', {})
            title = "N/A"
            
            for prop_name, prop_value in props.items():
                if prop_value.get('type') == 'title':
                    title_list = prop_value.get('title', [])
                    if title_list:
                        title = title_list[0].get('plain_text', 'N/A')
                    break
            
            print(f"  {i}. {title}")
    
    print("")
    print("=" * 60)
    print("✅ CONNECTION TEST PASSED")
    print("=" * 60)
    print("")
    print("Ready to sync conversations!")
    
except Exception as e:
    print("❌ ERROR: Connection failed")
    print(f"   {str(e)}")
    import traceback
    traceback.print_exc()
    exit(1)
