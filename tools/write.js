export const writeTool = {
        type: "function",
    function: {
        name: "write_file",
        description: "Create a file or overwrite an existing file with the provided content.",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description: "Path of the file to create or overwrite."
                },
                content: {
                    type: "string",
                    description: "The content to write to the file."
                }
            },
            required: ["path", "content"]
        }
    }
}