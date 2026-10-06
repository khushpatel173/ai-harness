import fs from 'fs/promises'
import path from 'path'


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
const workspace = process.cwd();
 export async function writeFile({content , path : location}){
     try {
        
        const fullPath = path.join(workspace, location);
        await fs.writeFile(fullPath, content, "utf-8");
        return `Successfully wrote to ${location}`;
    } catch (error) {
        return `Failed to write file: ${error.message}`;
    }
}