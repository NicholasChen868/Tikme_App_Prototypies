#!/usr/bin/env python3
"""
TikMe Prototype Organizer
Automatically organize prototype files into Notion database
Author: ClaudeK (PM)
Date: 2025-11-30
"""

import os
import re
import json
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from notion_client import Client


# ==================== CONFIGURATION ====================

def load_config() -> Dict:
    """Load configuration from config file and environment"""
    config_path = Path(__file__).parent.parent / "config" / "organize_prototypes_config.json"
    
    # Default config
    config = {
        "notion_token": os.getenv("NOTION_TOKEN"),
        "notion_database_id": "2ba2b641bddd80a1b948e54d0e888181",
        "notion_data_source_id": "2ba2b641-bddd-8056-a829-000bb86fe20a",
        "base_path": "D:/TECH_BOX/Tikme_App_Prototypies",
        "iterations_path": "iterations",
        "file_url_prefix": "file:///D:/TECH_BOX/Tikme_App_Prototypies"
    }
    
    # Load from file if exists
    if config_path.exists():
        with open(config_path, 'r', encoding='utf-8') as f:
            file_config = json.load(f)
            config.update(file_config)
    
    return config


# ==================== CORE FUNCTIONS ====================

def parse_filename(filename: str) -> Optional[Dict[str, any]]:
    """
    Parse prototype filename to extract metadata
    
    Supports two formats:
    1. Old: PROTO_SM{block}_WF{wireframe}_{module}_{feature}_V{version}.html
       Example: PROTO_SM6.1_WF4_B2_PreClassDashboard_V14.html
    
    2. New (with sub-tool): PROTO_SM{block}_WF{wireframe}_{module}_{tool}-{level}-{topic}_V{version}.html
       Example: PROTO_SM6.1_WF4_B3_Grammar-N5-WA_V1.html
    
    Returns:
        Dict with keys: block, wireframe, module, feature, version
        For new format, feature = "{tool}-{level}-{topic}"
        None if filename doesn't match either pattern
    """
    # Try new pattern first (with sub-tool: Tool-Level-Topic)
    # PROTO_SM6.1_WF4_B3_Grammar-N5-WA_V1.html
    new_pattern = r'PROTO_SM(\d+\.?\d*)_WF(\d+)_([A-Z]\d+)_([A-Za-z]+)-([A-Z]\d+)-([A-Za-z0-9]+)_V(\d+)\.html'
    
    match = re.match(new_pattern, filename)
    if match:
        # New format with sub-tool
        tool = match.group(4)      # Grammar
        level = match.group(5)     # N5
        topic = match.group(6)     # WA
        feature = f"{tool}-{level}-{topic}"  # Grammar-N5-WA
        
        return {
            'block': f"SM{match.group(1)}",
            'wireframe': int(match.group(2)),
            'module': match.group(3),
            'feature': feature,
            'tool': tool,
            'level': level,
            'topic': topic,
            'version': int(match.group(7))
        }
    
    # Try old pattern (simple feature name)
    # PROTO_SM6.1_WF4_B2_PreClassDashboard_V14.html
    old_pattern = r'PROTO_SM(\d+\.?\d*)_WF(\d+)_([A-Z]\d+)_([A-Za-z]+)_V(\d+)\.html'
    
    match = re.match(old_pattern, filename)
    if match:
        return {
            'block': f"SM{match.group(1)}",
            'wireframe': int(match.group(2)),
            'module': match.group(3),
            'feature': match.group(4),
            'version': int(match.group(5))
        }
    
    # No match
    return None


def get_file_metadata(filepath: str) -> Dict[str, any]:
    """
    Get file metadata (size, lines, dates)
    
    Args:
        filepath: Full path to file
        
    Returns:
        Dict with keys: size, lines, created_date, modified_date
    """
    stat = os.stat(filepath)
    
    # Count lines
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            line_count = sum(1 for _ in f)
    except:
        line_count = 0
    
    return {
        'size': stat.st_size,
        'lines': line_count,
        'created_date': datetime.fromtimestamp(stat.st_ctime).strftime('%Y-%m-%d'),
        'modified_date': datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d')
    }


def get_auto_tags(module: str) -> List[str]:
    """
    Get automatic tags based on module
    
    Mapping:
    - B1 → ["B1", "Setup", "Admin"]
    - B2 → ["B2", "PreClass", "Coach"]
    - B3 → ["B3", "InClass", "Coach"]
    - B4 → ["B4", "PostClass", "Coach"]
    - B5 → ["B5", "Reports", "Admin"]
    
    Args:
        module: Module code (B1, B2, B3, B4, B5)
        
    Returns:
        List of tag strings
    """
    tag_mapping = {
        'B1': ['B1', 'Setup', 'Admin'],
        'B2': ['B2', 'PreClass', 'Coach'],
        'B3': ['B3', 'InClass', 'Coach'],
        'B4': ['B4', 'PostClass', 'Coach'],
        'B5': ['B5', 'Reports', 'Admin']
    }
    
    return tag_mapping.get(module, [module])



def create_notion_entry(
    notion: Client,
    config: Dict,
    filename: str,
    filepath: str,
    parsed: Dict,
    metadata: Dict,
    dry_run: bool = False
) -> Tuple[bool, str]:
    """
    Create Notion database entry for prototype
    
    Args:
        notion: Notion client instance
        config: Configuration dict
        filename: File name
        filepath: Relative file path from base
        parsed: Parsed filename data
        metadata: File metadata
        dry_run: If True, don't actually create entry
        
    Returns:
        Tuple of (success: bool, message: str)
    """
    # Build entry name
    entry_name = filename.replace('.html', '')
    
    # Get auto tags
    tags = get_auto_tags(parsed['module'])
    
    # Build full file URL
    full_path = os.path.join(config['base_path'], filepath, filename)
    file_url = full_path.replace('\\', '/').replace('D:/', 'file:///D:/')
    
    # Build properties
    properties = {
        'Name': entry_name,
        'Module': parsed['module'],
        'Block': parsed['block'],
        'Wireframe': parsed['wireframe'],
        'Feature': parsed['feature'],
        'Version': parsed['version'],
        'File Name': filename,
        'File Path': filepath + '/',
        'File Size': metadata['size'],
        'Line Count': metadata['lines'],
        'date:Created Date:start': metadata['created_date'],
        'date:Created Date:is_datetime': 0,
        'date:Last Modified:start': metadata['modified_date'],
        'date:Last Modified:is_datetime': 0,
        'Tags': json.dumps(tags),
        'Full Prototype URL': file_url,
        'Status': 'Draft',
        'Merge Status': 'Not Started',
        'Priority': 'Medium'
    }
    
    if dry_run:
        return True, f"[DRY RUN] Would create: {entry_name}"
    
    try:
        # Check for duplicates first
        results = notion.databases.query(
            database_id=config['notion_database_id'],
            filter={
                "property": "Name",
                "title": {
                    "equals": entry_name
                }
            }
        )
        
        if results['results']:
            return False, f"SKIP: Entry already exists - {entry_name}"
        
        # Create page
        notion.pages.create(
            parent={
                "type": "database_id",
                "database_id": config['notion_database_id']
            },
            properties={
                'Name': {'title': [{'text': {'content': properties['Name']}}]},
                'Module': {'select': {'name': properties['Module']}},
                'Block': {'rich_text': [{'text': {'content': properties['Block']}}]},
                'Wireframe': {'number': properties['Wireframe']},
                'Feature': {'rich_text': [{'text': {'content': properties['Feature']}}]},
                'Version': {'number': properties['Version']},
                'File Name': {'rich_text': [{'text': {'content': properties['File Name']}}]},
                'File Path': {'rich_text': [{'text': {'content': properties['File Path']}}]},
                'File Size': {'number': properties['File Size']},
                'Line Count': {'number': properties['Line Count']},
                'Created Date': {'date': {'start': properties['date:Created Date:start']}},
                'Last Modified': {'date': {'start': properties['date:Last Modified:start']}},
                'Tags': {'multi_select': [{'name': tag} for tag in tags]},
                'Full Prototype URL': {'url': properties['Full Prototype URL']},
                'Status': {'select': {'name': properties['Status']}},
                'Merge Status': {'select': {'name': properties['Merge Status']}},
                'Priority': {'select': {'name': properties['Priority']}}
            }
        )
        
        return True, f"SUCCESS: Created entry - {entry_name}"
        
    except Exception as e:
        return False, f"ERROR: Failed to create {entry_name} - {str(e)}"


def organize_prototypes(
    mode: str,
    filepath: Optional[str] = None,
    scan_path: Optional[str] = None,
    dry_run: bool = False
) -> Dict:
    """
    Main function to organize prototypes
    
    Args:
        mode: 'file' or 'scan'
        filepath: Path to single file (for mode='file')
        scan_path: Path to scan directory (for mode='scan')
        dry_run: If True, preview without creating entries
        
    Returns:
        Dict with summary statistics
    """
    config = load_config()
    
    # Validate config
    if not config['notion_token']:
        return {
            'success': False,
            'error': 'NOTION_TOKEN not found in environment or config'
        }
    
    # Initialize Notion client
    notion = Client(auth=config['notion_token'])
    
    # Results tracking
    results = {
        'success': True,
        'processed': 0,
        'created': 0,
        'skipped': 0,
        'errors': 0,
        'messages': []
    }
    
    # Get files to process
    files_to_process = []
    
    if mode == 'file':
        if not filepath:
            results['success'] = False
            results['error'] = 'No filepath provided for mode=file'
            return results
        files_to_process.append(filepath)
    
    elif mode == 'scan':
        scan_dir = scan_path or os.path.join(config['base_path'], config['iterations_path'])
        
        # Scan for .html files
        for root, dirs, files in os.walk(scan_dir):
            for file in files:
                if file.endswith('.html') and file.startswith('PROTO_'):
                    full_path = os.path.join(root, file)
                    files_to_process.append(full_path)
    
    # Process each file
    for full_filepath in files_to_process:
        results['processed'] += 1
        
        filename = os.path.basename(full_filepath)
        
        # Parse filename
        parsed = parse_filename(filename)
        if not parsed:
            results['errors'] += 1
            results['messages'].append(f"ERROR: Invalid filename format - {filename}")
            continue
        
        # Get file metadata
        try:
            metadata = get_file_metadata(full_filepath)
        except Exception as e:
            results['errors'] += 1
            results['messages'].append(f"ERROR: Cannot read file {filename} - {str(e)}")
            continue
        
        # Get relative path
        rel_path = os.path.dirname(full_filepath).replace(config['base_path'], '').strip('\\/')
        
        # Create Notion entry
        success, message = create_notion_entry(
            notion, config, filename, rel_path, parsed, metadata, dry_run
        )
        
        if success:
            if not dry_run:
                results['created'] += 1
            results['messages'].append(message)
        elif 'SKIP' in message:
            results['skipped'] += 1
            results['messages'].append(message)
        else:
            results['errors'] += 1
            results['messages'].append(message)
    
    return results


# ==================== CLI ====================

def main():
    """Main CLI entry point"""
    parser = argparse.ArgumentParser(
        description='Organize TikMe prototype files into Notion database',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Process single file
  python organize_prototypes.py --file "iterations/B2_PreClassDashboard/PROTO_SM6.1_WF4_B2_PreClassDashboard_V14.html"
  
  # Scan all prototypes
  python organize_prototypes.py --scan
  
  # Dry run (preview without creating)
  python organize_prototypes.py --scan --dry-run
  
  # Scan specific directory
  python organize_prototypes.py --scan --path "iterations/B3_InClassTeaching"
        """
    )
    
    parser.add_argument('--file', type=str, help='Process single file')
    parser.add_argument('--scan', action='store_true', help='Scan and process all files')
    parser.add_argument('--path', type=str, help='Path to scan (default: iterations/)')
    parser.add_argument('--dry-run', action='store_true', help='Preview without creating entries')
    
    args = parser.parse_args()
    
    # Validate arguments
    if not args.file and not args.scan:
        parser.error('Must specify either --file or --scan')
    
    if args.file and args.scan:
        parser.error('Cannot specify both --file and --scan')
    
    # Determine mode
    mode = 'file' if args.file else 'scan'
    
    # Print header
    print("=" * 60)
    print("TikMe Prototype Organizer")
    print("=" * 60)
    print(f"Mode: {mode.upper()}")
    if args.dry_run:
        print("DRY RUN: No entries will be created")
    print("-" * 60)
    
    # Run organizer
    results = organize_prototypes(
        mode=mode,
        filepath=args.file,
        scan_path=args.path,
        dry_run=args.dry_run
    )
    
    # Print results
    if not results['success']:
        print(f"\n❌ ERROR: {results.get('error', 'Unknown error')}")
        return 1
    
    print(f"\n📊 SUMMARY:")
    print(f"  Files processed: {results['processed']}")
    print(f"  Entries created: {results['created']}")
    print(f"  Entries skipped: {results['skipped']}")
    print(f"  Errors: {results['errors']}")
    
    if results['messages']:
        print(f"\n📝 DETAILS:")
        for msg in results['messages']:
            print(f"  {msg}")
    
    print("=" * 60)
    
    return 0 if results['errors'] == 0 else 1


if __name__ == '__main__':
    exit(main())
