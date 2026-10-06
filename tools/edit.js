export const editTool = {
    type: "function",
    function: {
        name: "edit_file",
        description: "Edit a file by replacing specific existing content with new content.",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description: "Path of the file to edit."
                },
                old_content: {
                    type: "string",
                    description: "The exact existing content that should be replaced."
                },
                new_content: {
                    type: "string",
                    description: "The new content that should replace the existing content."
                }
            },
            required: ["path", "old_content", "new_content"]
        }
    }
}