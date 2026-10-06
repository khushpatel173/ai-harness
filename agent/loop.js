import Groq from "groq-sdk";
import "dotenv/config";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
import { messages } from "../src/index.js";
import { tools } from "../tools/combine.js";


export async function main() {
    while(true){
  const response = await getGroqChatCompletion();
  const message = response.choices[0].message;
//   add this message to your array
//         messages.push(message);
//   // Print the completion returned by the LLM.
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
    tools
  });
}
