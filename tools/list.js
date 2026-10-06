import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

// Create the async version
const execFileAsync = promisify(execFile);
const workspace = process.cwd();

export const listTool = {
    type: "function",
    function: {
        name: "list_files",
        description: "List files and directories in a specified directory.",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description: "Directory to list. Defaults to the workspace root."
                }
            },
            required: []
        }
    }
}


export async function listFiles({ path = "." }) {
    try {
        path = path || ".";
        const { stdout } = await execFileAsync(
            "find",
            [
    path,
    "-type", "d",
    "(",
    "-name", "node_modules",
    "-o", "-name", ".git",
    "-o", "-name", "dist",
    "-o", "-name", "build",
    "-o", "-name", ".next",
    "-o", "-name", "coverage",
    "-o", "-name", ".cache",
    "-o", "-name", "__pycache__",
    ")",
    "-prune",
    "-o",
    "-type", "f",
    "-print"
],
            { cwd: workspace }
        );

        return stdout;
    } catch (error) {
        return error.stdout || `Failed to list files: ${error.message}`;
    }
}