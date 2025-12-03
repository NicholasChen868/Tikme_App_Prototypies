#!/usr/bin/env python3
"""Test parse_filename function with new pattern"""
import re

def parse_filename(filename):
    """Parse prototype filename to extract metadata"""
    # New pattern (with sub-tool)
    new_pattern = r'PROTO_SM(\d+\.?\d*)_WF(\d+)_([A-Z]\d+)_([A-Za-z]+)-([A-Z]\d+)-([A-Za-z0-9]+)_V(\d+)\.html'
    match = re.match(new_pattern, filename)
    if match:
        tool = match.group(4)
        level = match.group(5)
        topic = match.group(6)
        feature = f'{tool}-{level}-{topic}'
        return {
            'block': f'SM{match.group(1)}',
            'wireframe': int(match.group(2)),
            'module': match.group(3),
            'feature': feature,
            'tool': tool,
            'level': level,
            'topic': topic,
            'version': int(match.group(7))
        }
    
    # Old pattern
    old_pattern = r'PROTO_SM(\d+\.?\d*)_WF(\d+)_([A-Z]\d+)_([A-Za-z]+)_V(\d+)\.html'
    match = re.match(old_pattern, filename)
    if match:
        return {
            'block': f'SM{match.group(1)}',
            'wireframe': int(match.group(2)),
            'module': match.group(3),
            'feature': match.group(4),
            'version': int(match.group(5))
        }
    return None

# Test cases
test_cases = [
    ('PROTO_SM6.1_WF4_B3_Grammar-N5-WA_V1.html', 'New format - N5 Grammar'),
    ('PROTO_SM6.1_WF4_B3_Grammar-N4-KotoNiSuru_V99.html', 'New format - N4 Grammar'),
    ('PROTO_SM6.1_WF4_B2_PreClassDashboard_V14.html', 'Old format - PreClass'),
    ('PROTO_SM6.1_WF4_B3_InClassTeaching_V5.html', 'Old format - InClass')
]

print('='*70)
print('STRING-BASED TESTING - Parse Filename Function')
print('='*70)

passed = 0
failed = 0

for filename, description in test_cases:
    result = parse_filename(filename)
    print(f'\nTest: {description}')
    print(f'File: {filename}')
    
    if result:
        print(f'  ✓ PASS - Parsed successfully:')
        for key, value in result.items():
            print(f'      {key}: {value}')
        passed += 1
    else:
        print(f'  ✗ FAIL - Could not parse')
        failed += 1

print('\n' + '='*70)
print(f'RESULTS: {passed} passed, {failed} failed out of {len(test_cases)} tests')
print('='*70)
