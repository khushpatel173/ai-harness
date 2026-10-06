import Groq from "groq-sdk";
import "dotenv/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
import { messages } from "../src/index.js";

const tools = [
    {
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
    } , {
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
]


export async function main() {
    while(true){
  const response = await getGroqChatCompletion();
  const message = response.choices[0].message;

//   add this message to your array

        messages.push(message);
  // Print the completion returned by the LLM.
    if(message.tool_calls){

    }
    else {
        // complete
        break;
    }
    }
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
    messages,
    model: "openai/gpt-oss-20b",
  });
}
