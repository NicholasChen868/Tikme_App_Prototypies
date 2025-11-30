"""
DEBUG: Check DatabasesEndpoint Available Methods
Find out what methods are available in notion-client 2.7.0
"""

import os
from dotenv import load_dotenv
from notion_client import Client

# Load credentials
load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 70)
print("DEBUGGING: notion-client DatabasesEndpoint Methods")
print("=" * 70)
print("")

try:
    # Initialize client
    notion = Client(auth=NOTION_TOKEN)
    
    # Check version
    try:
        import notion_client
        print(f"✅ notion-client version: {notion_client.__version__}")
    except:
        print("⚠️  Could not detect version")
    
    print("")
    print("-" * 70)
    print("1. CHECKING CLIENT STRUCTURE")
    print("-" * 70)
    
    # Check what's in notion object
    print(f"\nnotion object type: {type(notion)}")
    print(f"notion.databases type: {type(notion.databases)}")
    
    print("\n" + "-" * 70)
    print("2. ALL AVAILABLE METHODS IN notion.databases:")
    print("-" * 70)
    
    # List all methods
    all_methods = [method for method in dir(notion.databases) if not method.startswith('_')]
    
    if all_methods:
        for i, method in enumerate(all_methods, 1):
            print(f"  {i:2d}. {method}")
    else:
        print("  (No public methods found)")
    
    print("\n" + "-" * 70)
    print("3. TESTING DIFFERENT QUERY METHODS")
    print("-" * 70)
    
    # Try different possible method names
    possible_methods = [
        'query',
        'query_database', 
        'get_pages',
        'list',
        'search',
        'retrieve_pages',
        'get_items'
    ]
    
    for method_name in possible_methods:
        if hasattr(notion.databases, method_name):
            print(f"\n✅ Found: notion.databases.{method_name}()")
            method = getattr(notion.databases, method_name)
            print(f"   Type: {type(method)}")
            
            # Try to get signature
            try:
                import inspect
                sig = inspect.signature(method)
                print(f"   Signature: {sig}")
            except:
                print(f"   (Could not get signature)")
        else:
            print(f"❌ Not found: notion.databases.{method_name}()")
    
    print("\n" + "-" * 70)
    print("4. CHECKING PAGES ENDPOINT")
    print("-" * 70)
    
    print(f"\nnotion.pages type: {type(notion.pages)}")
    pages_methods = [method for method in dir(notion.pages) if not method.startswith('_')]
    
    if pages_methods:
        print("\nAvailable methods in notion.pages:")
        for i, method in enumerate(pages_methods, 1):
            print(f"  {i:2d}. {method}")
    
    print("\n" + "-" * 70)
    print("5. TRYING ALTERNATIVE: Using Search API")
    print("-" * 70)
    
    # Try search as alternative
    if hasattr(notion, 'search'):
        print("\n✅ Found: notion.search()")
        try:
            results = notion.search(
                filter={
                    "property": "object",
                    "value": "page"
                },
                page_size=3
            )
            print(f"   Search successful! Found {len(results.get('results', []))} items")
        except Exception as e:
            print(f"   Search failed: {e}")
    
    print("\n" + "=" * 70)
    print("DEBUG COMPLETE - Check results above")
    print("=" * 70)
    
except Exception as e:
    print(f"\n❌ ERROR: {e}")
    import traceback
    traceback.print_exc()
