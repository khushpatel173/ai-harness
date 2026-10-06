import readline from "readline";
import { main } from "../agent/loop.js";



export const messages = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 function askUser() {
    rl.question("> ", async (input) => {

        if (input.trim() === "exit") {
            rl.close();
            return;
        }

        if (input.trim() === "") {
            askUser();
            return;
        }

        console.log("You said:", input);

        // Later:
        // await agent.run(input);

        messages.push({
            role : "user" , 
            content : input
        });
        console.log(messages);
        
        await main();

        askUser();
    });
}

console.log("MyAgent");
console.log("Workspace:", process.cwd());
console.log();

askUser();