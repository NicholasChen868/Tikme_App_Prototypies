#!/usr/bin/env python3
"""
Convert HTML standalone React code to proper React component - V2
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

    # Split into lines
    lines = raw_content.split('\n')

    # Process line by line
    processed_lines = []
    skip_next = False

    for i, line in enumerate(lines):
        # Skip the React destructuring line
        if 'const { useState' in line and '} = React' in line:
            continue

        # Skip ReactDOM.render line and everything after
        if 'ReactDOM.render' in line:
            break

        # Replace function App() with export default function GrammarN4KotoNiSuru()
        if 'function App()' in line:
            processed_lines.append(line.replace('function App()', 'export default function GrammarN4KotoNiSuru()'))
            # Add navigate hook on the next line (after the opening brace)
            # We'll add it after we find the opening brace
            continue

        processed_lines.append(line)

    # Join back
    content = '\n'.join(processed_lines)

    # Add navigate hook after function declaration
    # Find "export default function GrammarN4KotoNiSuru() {" and add navigate on next line
    content = content.replace(
        'export default function GrammarN4KotoNiSuru() {',
        'export default function GrammarN4KotoNiSuru() {\n    const navigate = useNavigate();\n'
    )

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
