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