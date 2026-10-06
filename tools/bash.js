import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const workspace = process.cwd();
export const bashTool = {
    type: "function",
    function: {
        name: "run_command",
        description: "Execute a shell command in the workspace.",
        parameters: {
            type: "object",
            properties: {
                command: {
                    type: "string",
                    description: "The shell command to execute."
                },
                path: {
                    type: "string",
                    description: "Directory in which to execute the command. Defaults to the workspace root."
                }
            },
            required: ["command"]
        }
    }
}

export async function runCommand({ command, path = "." }) {
    try {
        const { stdout, stderr } = await execAsync(command, {
            cwd: path.join(workspace, path)
        });

        return stdout || stderr;
    } catch (error) {
        return error.stdout || error.stderr || `Command failed: ${error.message}`;
    }
}
