# Claude Code Hooks

Hooks are shell scripts that execute automatically in response to events like tool calls.

## Available Hooks

- `user-prompt-submit.sh` - Runs when the user submits a prompt
- `tool-call-read.sh` - Runs before Read tool is called
- `tool-call-write.sh` - Runs before Write tool is called
- `tool-call-edit.sh` - Runs before Edit tool is called
- `tool-call-bash.sh` - Runs before Bash tool is called
- And more...

## Example Hook

Create a file named `tool-call-write.sh`:

```bash
#!/bin/bash
# Example: Prevent writing to certain files
if [[ "$TOOL_PARAM_FILE_PATH" == *"package.json"* ]]; then
    echo "BLOCK: Please review package.json changes carefully"
    exit 1
fi
```

## Hook Environment Variables

Hooks receive environment variables with tool parameters:
- `TOOL_PARAM_FILE_PATH` - For file operations
- `TOOL_PARAM_COMMAND` - For Bash operations
- `TOOL_PARAM_PATTERN` - For Grep operations
- And others depending on the tool

## Usage

1. Create a hook script in this directory
2. Make it executable: `chmod +x hook-name.sh`
3. Claude Code will automatically run it when the event occurs
4. Return exit code 1 to block the operation
5. Print messages to provide feedback

For more details, see: https://github.com/anthropics/claude-code
