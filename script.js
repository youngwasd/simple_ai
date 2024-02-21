import { config } from "dotenv";
import OpenAI from "openai";
import readline from "readline";

config();

const openai = new OpenAI({ apiKey: process.env.API_KEY });

// function sendMessage() {
//     var userInput = document.getElementById("userInput").value;
//     displayMessage("User", userInput, "user-message");

//     openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: userInput }]
//     }).then((response) => {
//         var aiResponse = response.data.choices[0]['message']['content'];
//         displayMessage("AI", aiResponse, "ai-message");
//     }).catch((error) => {
//         console.error("Error:", error);
//     });

//     document.getElementById("userInput").value = "";
// }

// function displayMessage(sender, message, className) {
//     var chatBox = document.getElementById("chat-box");
//     var messageDiv = document.createElement("div");
//     messageDiv.textContent = sender + ": " + message;
//     messageDiv.classList.add("message");
//     messageDiv.classList.add(className);
//     chatBox.appendChild(messageDiv);
//     chatBox.scrollTop = chatBox.scrollHeight;
// }

const rl = new readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const userInput = await askQuestion("You: ");

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: userInput }],
        model: "gpt-3.5-turbo",
    });

    console.log("AI: " + completion.choices[0]['message']['content']);
    main();
};

function askQuestion(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

main();

rl.on("close", () => {
    console.log("\nbye ;(");
    process.exit(0);
});