# AI Harness

A command-line AI coding agent that uses Groq tool calling to inspect and modify a local workspace.

The agent accepts natural-language instructions, chooses from a small set of workspace tools, executes those tools, and returns a response. It keeps the conversation in memory for the duration of the session.

## Features

- Interactive command-line chat loop
- Groq `openai/gpt-oss-20b` model integration
- Read and write workspace files
- List files and directories
- Search file contents
- Run shell commands from the workspace
- `.env` configuration through `dotenv`

## Requirements

- Node.js 20 or newer
- A Groq API key

## Installation

Clone the project, move into its directory, and install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

The application loads `.env` from the project root when it starts. Keep this file private and do not commit it.

## Usage

Start the interactive agent with:

```bash
node ./bin/agent.js
```

You can then enter requests such as:

```text
List the files in the project
Read package.json and summarize the dependencies
Search for TODO comments
Create a short CONTRIBUTING.md file
```

Enter `exit` to end the session.

The process uses the directory from which it was started as the workspace. Start it from the project directory when you want the agent to work on this repository:

```bash
cd /path/to/ai-harness
node ./bin/agent.js
```

## Architecture

```text
bin/agent.js       CLI entry point
        |
src/index.js       Readline prompt and conversation state
        |
agent/loop.js      Groq chat loop and tool-call dispatch
        |
tools/             Workspace tools exposed to the model
config.js           Loads the root .env file
```

Available tools:

| Tool | Purpose |
| --- | --- |
| `read_file` | Read a UTF-8 file from the workspace |
| `write_file` | Create or overwrite a file |
| `list_files` | List entries in a directory |
| `search_files` | Search recursively for text with `grep` |
| `run_command` | Execute a shell command |

## Project layout

```text
.
├── agent/loop.js       Groq integration and agent loop
├── bin/agent.js        Executable CLI entry point
├── src/index.js        Interactive prompt
├── tools/              Tool definitions and implementations
├── config.js           Environment configuration
├── package.json
└── package-lock.json
```

## Development notes

- The project uses native ECMAScript modules (`"type": "module"`).
- Conversation messages are stored in the exported `messages` array in `src/index.js`.
- The model is currently configured in `agent/loop.js` as `openai/gpt-oss-20b`.
- `npm test` is not implemented yet; the current package script exits with an error by design.

## Safety

The agent can write files and execute arbitrary shell commands through `run_command`. Run it only in a workspace you trust, review requests before submitting them, and avoid placing secrets in files the agent may read. The current tool implementations do not provide a confirmation prompt or a sandbox for destructive commands.

## License

This package currently declares the ISC license in `package.json`.
