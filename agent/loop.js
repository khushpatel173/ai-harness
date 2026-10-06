import Groq from "groq-sdk";
import "dotenv/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
import { messages } from "../src/index.js";
import { tools } from "../tools/combine.js";
import { readFile } from "../tools/read.js";
import { writeFile } from "../tools/write.js";
import { searchFiles } from "../tools/search.js";
import { listFiles } from "../tools/list.js";
import { runCommand } from "../tools/bash.js";


export async function main() {
    while(true){
  const response = await getGroqChatCompletion();
  const message = response.choices[0].message;
    messages.push(message);
    console.log(message);
    console.log(message.tool_calls);
    if(message.tool_calls){
        for(let tool of message.tool_calls){   
            // execute the tool and give the response back to the agent

            const args = JSON.parse(tool.function.arguments);
            console.log(args);
        
            if(tool.function.name == "read_file"){
            const content = await readFile(args);
            console.log(content);
            messages.push({
                role: "tool",
                tool_call_id: tool.id,
                content
            });
            }
            else if(tool.function.name == "write_file"){
                const content = await writeFile(args);
            console.log(content);
             messages.push({
                role: "tool",
                tool_call_id: tool.id,
                content
            });
            }
             else if(tool.function.name == "search_files"){
                const content = await searchFiles(args);
            console.log(content);
             messages.push({
                role: "tool",
                tool_call_id: tool.id,
                content
            });
            }
             else if(tool.function.name == "list_files"){
                const content = await listFiles(args);
            console.log(content);
             messages.push({
                role: "tool",
                tool_call_id: tool.id,
                content
            });
            }
             else if(tool.function.name == "run_command"){
                const content = await runCommand(args);
                console.log(content);
                 messages.push({
                role: "tool",
                tool_call_id: tool.id,
                content
            });
            }
        }
    }
    else {
        // complete
        console.log(message);
         break;
    }
    }
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
    messages,
    model: "openai/gpt-oss-20b",
    tools
  });
}
