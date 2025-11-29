"""
SETUP NOTION DATABASE SCHEMA for TIKME_Artifact
Define properties before syncing data
"""

import os
from dotenv import load_dotenv
from notion_client import Client

load_dotenv()

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print("=" * 70)
print("SETUP: TIKME_Artifact Database Schema")
print("=" * 70)
print("")

# Define the schema we need for tracking prototypes
SCHEMA = {
    # Title property (required)
    "Name": {
        "title": {}
    },
    
    # Module tracking
    "Module": {
        "rich_text": {}
    },
    
    "Version": {
        "rich_text": {}
    },
    
    # Status tracking
    "Status": {
        "select": {
            "options": [
                {"name": "Draft", "color": "gray"},
                {"name": "In Progress", "color": "yellow"},
                {"name": "Review", "color": "blue"},
                {"name": "Approved", "color": "green"},
                {"name": "Archived", "color": "red"}
            ]
        }
    },
    
    # Links
    "Claude Chat URL": {
        "url": {}
    },
    
    "Github URL": {
        "url": {}
    },
    
    # Dates
    "Created Date": {
        "date": {}
    },
    
    "Last Updated": {
        "date": {}
    },
    
    # Owner/Creator
    "Owner": {
        "rich_text": {}
    },
    
    # Notes
    "Notes": {
        "rich_text": {}
    },
    
    # Tags
    "Tags": {
        "multi_select": {
            "options": [
                {"name": "PreClass", "color": "blue"},
                {"name": "InClass", "color": "green"},
                {"name": "Coach", "color": "purple"},
                {"name": "Student", "color": "pink"},
                {"name": "Admin", "color": "orange"},
                {"name": "Prototype", "color": "yellow"},
                {"name": "Production", "color": "red"}
            ]
        }
    }
}

try:
    notion = Client(auth=NOTION_TOKEN)
    
    # Get current database
    print("Fetching current database...")
    database = notion.databases.retrieve(database_id=NOTION_DATABASE_ID)
    db_title = database.get('title', [{}])[0].get('plain_text', 'N/A')
    
    print(f"Database: {db_title}")
    print(f"ID: {NOTION_DATABASE_ID}")
    print("")
    
    # Show current properties
    current_props = database.get('properties', {})
    print("-" * 70)
    print("Current Properties:")
    print("-" * 70)
    
    if current_props:
        for prop_name, prop_info in current_props.items():
            prop_type = prop_info.get('type', 'unknown')
            print(f"  • {prop_name}: {prop_type}")
    else:
        print("  (No properties defined)")
    
    print("")
    
    # Ask for confirmation
    print("=" * 70)
    print("PROPOSED SCHEMA:")
    print("=" * 70)
    
    for prop_name, prop_config in SCHEMA.items():
        prop_type = list(prop_config.keys())[0]
        print(f"  • {prop_name}: {prop_type}")
        
        # Show options for select/multi_select
        if prop_type in ['select', 'multi_select']:
            options = prop_config[prop_type].get('options', [])
            if options:
                print(f"    Options: {', '.join([opt['name'] for opt in options])}")
    
    print("")
    print("=" * 70)
    print("⚠️  WARNING: This will UPDATE the database schema")
    print("=" * 70)
    print("")
    print("This script will:")
    print("  1. Add the properties listed above")
    print("  2. Keep existing properties (if any)")
    print("  3. NOT delete or modify existing data")
    print("")
    
    confirmation = input("Proceed with schema setup? (yes/no): ").strip().lower()
    
    if confirmation != 'yes':
        print("\n❌ Setup cancelled by user")
        exit(0)
    
    print("")
    print("-" * 70)
    print("Updating database schema...")
    print("-" * 70)
    
    # Update database with new schema
    notion.databases.update(
        database_id=NOTION_DATABASE_ID,
        properties=SCHEMA
    )
    
    print("✅ Schema updated successfully!")
    print("")
    
    # Verify update
    print("-" * 70)
    print("Verifying updated schema...")
    print("-" * 70)
    
    updated_db = notion.databases.retrieve(database_id=NOTION_DATABASE_ID)
    updated_props = updated_db.get('properties', {})
    
    if updated_props:
        print(f"\nTotal properties: {len(updated_props)}")
        print("")
        for prop_name, prop_info in updated_props.items():
            prop_type = prop_info.get('type', 'unknown')
            print(f"  ✅ {prop_name}: {prop_type}")
    
    print("")
    print("=" * 70)
    print("✅ SCHEMA SETUP COMPLETE!")
    print("=" * 70)
    print("")
    print("Next steps:")
    print("  1. Verify schema in Notion UI")
    print("  2. Run sync script to populate data")
    print("  3. Set up automation for future syncs")
    print("")
    
except Exception as e:
    print(f"\n❌ ERROR: {e}")
    import traceback
    traceback.print_exc()
