#!/usr/bin/env python3
"""
Convert HTML standalone React code to proper React component - V3
Follow GrammarN5WA pattern: All code inside the function component
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

    # Find key line numbers
    react_destructure_idx = -1
    function_app_idx = -1
    reactdom_render_idx = -1

    for i, line in enumerate(lines):
        if 'const { useState' in line and '} = React' in line:
            react_destructure_idx = i
        if 'function App()' in line:
            function_app_idx = i
        if 'ReactDOM.render' in line:
            reactdom_render_idx = i
            break

    print(f"React destructure at line: {react_destructure_idx}")
    print(f"Function App at line: {function_app_idx}")
    print(f"ReactDOM.render at line: {reactdom_render_idx}")

    # Strategy:
    # 1. Skip react_destructure_idx line
    # 2. Take all code from react_destructure_idx+1 to reactdom_render_idx
    # 3. Remove "function App() {" line
    # 4. Wrap everything with "export default function GrammarN4KotoNiSuru() {" at the beginning

    # Get all code (skip React destructure, stop before ReactDOM.render)
    content_lines = []
    for i in range(len(lines)):
        if i == react_destructure_idx:
            continue  # Skip React destructure line
        if i >= reactdom_render_idx:
            break  # Stop at ReactDOM.render
        if i == function_app_idx:
            continue  # Skip original function App() line
        content_lines.append(lines[i])

    # Join content
    content = '\n'.join(content_lines)

    # Convert HTML to JSX
    content = convert_html_to_jsx(content)

    # Create the header with function declaration
    header = '''/**
 * Grammar N4 - ～ことにする (KotoNiSuru)
 * Source: PROTO_SM6.1_WF4_B3_Grammar-N4-KotoNiSuru_V99.html
 * Integration: 02/12/2025
 * Approach: Hướng B (100% CEO code preserved)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GrammarN4KotoNiSuru.css';

export default function GrammarN4KotoNiSuru() {
    const navigate = useNavigate();
'''

    # Combine: header + content
    final_content = header + content

    # Write to file
    output_path = r'D:\TECH_BOX\Tikme_App_Prototypies\tikme-app-minimal\src\pages\GrammarN4KotoNiSuru.jsx'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final_content)

    line_count = len(final_content.split('\n'))
    print(f"\n✅ React component created: {output_path}")
    print(f"   Total lines: {line_count}")

if __name__ == '__main__':
    create_react_component()
