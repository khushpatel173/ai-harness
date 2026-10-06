import readline from "readline";

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
        

        askUser();
    });
}

console.log("MyAgent");
console.log("Workspace:", process.cwd());
console.log();

askUser();