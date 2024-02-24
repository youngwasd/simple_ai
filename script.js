//import dotenv from "dotenv"; // importing like this causes problems
// import OpenAI from "openai";
// import readline from "readline";

//dotenv.config();

//const API_KEY = process.env.API_KEY;

// const openai = new OpenAI({ apiKey: process.env.API_KEY });

const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElem = document.querySelector('input');
const historyElem = document.querySelector('.history');

// https://www.youtube.com/watch?v=05ssqx-SZT0 40:58

async function getMessage() {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputElem.value}],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json();
        console.log(data);
        outputElement.textContent = data.choices[0]['message']['content'];
        if (data.choices[0]['message']['content']) {
            const pElem = document.createElement('p');
            pElem.textContent = inputElem.value;
            historyElem.append(pElem);
        }
    } catch (error) {
        console.error(error);
    }
}

submitButton.addEventListener('click', getMessage);


// const rl = new readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// async function main() {
//     const userInput = await askQuestion("You: ");

//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "user", content: userInput }],
//         model: "gpt-3.5-turbo",
//     });

//     console.log("AI: " + completion.choices[0]['message']['content']);
//     main();
// };

// function askQuestion(question) {
//     return new Promise((resolve, reject) => {
//         rl.question(question, (answer) => {
//             resolve(answer);
//         });
//     });
// };

// main();

// rl.on("close", () => {
//     console.log("\nbye ;(");
//     process.exit(0);
// });