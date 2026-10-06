import fs from "fs/promises";
import path from 'path'

export const readTool = {
        type : "function" , 
        function : {
            name : "read_file" , 
            description: "Read the contents of a file",
            parameters: {
                type : "object" , 
                properties : {
                    path : {
                        type : "string" , 
                        description : "The path of the file to read"
                    }
                } , 
                required : ["path"]
            } , 
            
        }
}

const workspace = process.cwd();    

export async function readFile({path : location}){
    try {
    console.log(location);
    const fullPath = path.join(workspace , location);
    console.log(fullPath);
    const content = await fs.readFile(fullPath, "utf-8");
    return content;
    } catch (error) {
         return `Failed to read file: ${error.message}`;
    }
}