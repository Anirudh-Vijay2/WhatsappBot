const { Client } = require('whatsapp-web.js');
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const client = new Client();


client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    async function start(question){
        const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0,
         max_tokens: 1000,
        });
        console.log(response.data.choices[0].text)
        message.reply(response.data.choices[0].text)
    }
    let Og_text = message.body
    let result = Og_text.charAt(0)
    let resultR2 = Og_text.replace("!", "")
    if(result == "!"){
        if(message.body.toLowerCase() == "!who are you"){
            message.reply("I am Jarvis, a chat bot designed using JavaScript, I am running on AWS.")
        }
        else if(message.body.toLowerCase() == "!who is your owner?"){
            message.reply("Anirudh Vijay is my owner.")
        }
        else if(message.body.toLowerCase() == "!who made you?"){
            message.reply("Anirudh Vijay made me.")
        }
        else if(message.body.toLowerCase() == "!who is your owner"){
            message.reply("Anirudh Vijay is my owner.")
        }
        else if(message.body.toLowerCase() == "!who made you"){
            message.reply("Anirudh Vijay made me.")
        }
        else{
         start(message.body.replace("!", ""))
        }
        console.log(message.body);
    }
    
});

client.initialize();
