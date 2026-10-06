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