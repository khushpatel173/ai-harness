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