//const API_KEY = 'add key here';

const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElem = document.querySelector('input');

let input = "";
let output = "";
let asker = "";

async function getMessage() {
    if (inputElem.value !== "") {
        asker += inputElem.value + "\n";
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: asker}],
                max_tokens: 100
            })
        }
    
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', options)
            const data = await response.json();
            outputElement.textContent += "You: " + inputElem.value + "\nAI: " + data.choices[0]['message']['content'] + "\n\n";
            outputElement.style.whiteSpace = "pre-line";

            output += data.choices[0]['message']['content'];
            input += inputElem.value;
            asker += output + "\n";
            inputElem.value = "";
        } catch (error) {
            console.error(error);
        }
    } else {
        outputElement.textContent = "Invalid input please try again"
    }
}

submitButton.addEventListener('click', getMessage);
