#!/usr/bin/env python3
"""
Convert HTML standalone React code to proper React component
"""
import re

def convert_html_to_jsx(content):
    """Convert HTML attributes to JSX format"""

    # class= to className=
    content = re.sub(r'\bclass=', 'className=', content)

    # for= to htmlFor=
    content = re.sub(r'\bfor=', 'htmlFor=', content)

    # onclick= to onClick= (and other event handlers)
    event_handlers = [
        'onclick', 'onchange', 'oninput', 'onsubmit', 'onkeydown',
        'onkeyup', 'onkeypress', 'onfocus', 'onblur', 'onmouseenter',
        'onmouseleave', 'onmousedown', 'onmouseup'
    ]
    for handler in event_handlers:
        # Convert lowercase to camelCase
        camel_case = handler[0:2] + handler[2].upper() + handler[3:]
        content = re.sub(r'\b' + handler + r'=', camel_case + '=', content, flags=re.IGNORECASE)

    return content

def create_react_component():
    """Create the React component file"""

    # Read the temp React code file
    with open(r'D:\TECH_BOX\Tikme_App_Prototypies\temp_react_code.txt', 'r', encoding='utf-8') as f:
        raw_content = f.read()

    # Remove the first line (const { useState, useEffect, useCallback, useRef } = React;)
    lines = raw_content.split('\n')

    # Find where const { useState... } line is and skip it
    start_idx = 0
    for i, line in enumerate(lines):
        if 'const { useState' in line and '} = React' in line:
            start_idx = i + 1
            break

    # Find the last ReactDOM.render line and remove it
    end_idx = len(lines)
    for i in range(len(lines) - 1, -1, -1):
        if 'ReactDOM.render' in lines[i]:
            end_idx = i
            break

    # Get the content between
    content_lines = lines[start_idx:end_idx]

    # Find where function App() starts and rename it
    for i, line in enumerate(content_lines):
        if 'function App()' in line:
            content_lines[i] = line.replace('function App()', 'export default function GrammarN4KotoNiSuru()')
            break

    # Join back
    content = '\n'.join(content_lines)

    # Convert HTML attributes to JSX
    content = convert_html_to_jsx(content)

    # Create the header
    header = '''/**
 * Grammar N4 - ～ことにする (KotoNiSuru)
 * Source: PROTO_SM6.1_WF4_B3_Grammar-N4-KotoNiSuru_V99.html
 * Integration: 02/12/2025
 * Approach: Hướng B (100% CEO code preserved)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GrammarN4KotoNiSuru.css';

'''

    # Add navigate hook after function declaration
    # Find the first line after function declaration
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'export default function GrammarN4KotoNiSuru()' in line:
            # Insert navigate hook after the opening brace
            lines.insert(i + 1, '    const navigate = useNavigate();')
            lines.insert(i + 2, '')
            break

    content = '\n'.join(lines)

    # Combine header + content
    final_content = header + content

    # Write to file
    output_path = r'D:\TECH_BOX\Tikme_App_Prototypies\tikme-app-minimal\src\pages\GrammarN4KotoNiSuru.jsx'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final_content)

    print(f"✅ React component created: {output_path}")
    print(f"   Total lines: {len(final_content.split(chr(10)))}")

if __name__ == '__main__':
    create_react_component()
