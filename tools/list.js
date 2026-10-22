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
        if(path == "." || path == ""){
            console.log(`Exploring ${workspace}`);
        }
        else {
            console.log(`Exploring ${path}`);
        }
        path = path || ".";
        const { stdout } = await execFileAsync(
    "find",
    [
        path,
        "-maxdepth", "1",
        "-mindepth", "1"
    ],
    { cwd: workspace }
);

        return stdout;
    } catch (error) {
        return error.stdout || `Failed to list files: ${error.message}`;
    }
}