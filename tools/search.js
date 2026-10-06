import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

// Create the async version
const execFileAsync = promisify(execFile);


const workspace = process.cwd();
export const searchTool = {
    type: "function",
    function: {
        name: "search_files",
        description: "Search for text or code within files in the workspace.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "The text or code to search for."
                },
                path: {
                    type: "string",
                    description: "Directory to search in. Defaults to the workspace root."
                }
            },
            required: ["query"]
        }
    }
}


export async function searchFiles( {query, path = "."}){
   
    try {
        const { stdout } = await execFileAsync(
            "grep",
            ["-R", "-n", query, path],
            { cwd: workspace }
        );

        return stdout;
    } catch (error) {
        return error.stdout || `Search failed: ${error.message}`;
    }
}
