#!/usr/bin/env python3
"""Search for specific pages in Notion database"""
import os
from notion_client import Client

# Initialize
notion = Client(auth=os.getenv("NOTION_TOKEN") or "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")
database_id = "2ba2b641bddd80a1b948e54d0e888181"

# Search for Grammar entries
print("="*70)
print("Searching for Grammar entries...")
print("="*70)

try:
    # Query database with filter
    results = notion.databases.query(
        database_id=database_id,
        filter={
            "property": "Name",
            "title": {
                "contains": "Grammar"
            }
        }
    )
    
    print(f"\nFound {len(results['results'])} pages containing 'Grammar'\n")
    
    for page in results['results']:
        page_id = page['id']
        props = page['properties']
        
        # Get name
        name = "N/A"
        if 'Name' in props and props['Name']['title']:
            name = props['Name']['title'][0]['text']['content']
        
        # Get created date
        created = page['created_time']
        
        print(f"✓ {name}")
        print(f"  ID: {page_id}")
        print(f"  Created: {created}")
        print()
    
except Exception as e:
    print(f"❌ Error: {str(e)}")

print("="*70)
