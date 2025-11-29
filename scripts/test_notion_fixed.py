"""
NOTION CONNECTION TEST - FIXED VERSION
Compatible with notion-client >= 1.0.0
"""

import os
from dotenv import load_dotenv
from notion_client import Client

# Load credentials
load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 60)
print("NOTION CONNECTION TEST - FIXED")
print("=" * 60)
print(f"Token: {NOTION_TOKEN[:20]}..." if NOTION_TOKEN else "Token: Not found")
print(f"Database ID: {NOTION_DATABASE_ID}")
print("")

try:
    # Initialize client
    notion = Client(auth=NOTION_TOKEN)
    
    # Test 1: Retrieve database
    print("Test 1: Retrieving database info...")
    database = notion.databases.retrieve(database_id=NOTION_DATABASE_ID)
    
    print("✅ SUCCESS! Connected to Notion database")
    print("")
    print("Database Info:")
    print(f"  Title: {database.get('title', [{}])[0].get('plain_text', 'N/A')}")
    print(f"  Created: {database.get('created_time', 'N/A')}")
    print(f"  Last Edited: {database.get('last_edited_time', 'N/A')}")
    print("")
    
    # Test 2: Query database - FIXED SYNTAX
    print("Test 2: Querying database (first 3 items)...")
    
    # Method 1: Direct parameters (recommended for latest version)
    try:
        response = notion.databases.query(
            database_id=NOTION_DATABASE_ID,
            page_size=3
        )
        print("  ✅ Query method 1 successful")
    except Exception as e1:
        print(f"  ⚠️  Method 1 failed: {e1}")
        
        # Method 2: Dictionary unpacking (fallback)
        try:
            response = notion.databases.query(
                **{
                    "database_id": NOTION_DATABASE_ID,
                    "page_size": 3
                }
            )
            print("  ✅ Query method 2 successful")
        except Exception as e2:
            raise Exception(f"Both query methods failed. Method 1: {e1}, Method 2: {e2}")
    
    results = response.get("results", [])
    print(f"  Found {len(results)} items")
    print("")
    
    if results:
        print("Sample items:")
        for i, page in enumerate(results, 1):
            props = page.get('properties', {})
            title = "N/A"
            
            # Find title property
            for prop_name, prop_value in props.items():
                if prop_value.get('type') == 'title':
                    title_list = prop_value.get('title', [])
                    if title_list:
                        title = title_list[0].get('plain_text', 'N/A')
                    break
            
            print(f"  {i}. {title}")
    else:
        print("  (Database is empty)")
    
    print("")
    print("=" * 60)
    print("✅ ALL TESTS PASSED!")
    print("=" * 60)
    print("")
    print("🚀 Ready to sync conversations!")
    print("")
    
    # Show version info
    try:
        import notion_client
        print(f"notion-client version: {notion_client.__version__}")
    except:
        print("(Could not detect notion-client version)")
    
except Exception as e:
    print("")
    print("=" * 60)
    print("❌ ERROR: Connection failed")
    print("=" * 60)
    print(f"Error: {str(e)}")
    print("")
    import traceback
    traceback.print_exc()
    print("")
    print("💡 TROUBLESHOOTING:")
    print("   1. Run: pip install --upgrade notion-client")
    print("   2. Check your .env file has correct credentials")
    print("   3. Verify database ID is correct")
    exit(1)
