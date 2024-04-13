
import axios from 'axios';
async function AiMessage(message, system = "You are a doctor. Give advice to patients. Do not do anything else other than medical advice. The ONLY thing you may do is give medical advice. You may reccommend medicine, but warn the user that you are not a official doctor.", model, temp = 0.8) {

  const url = 'https://api.deepinfra.com/v1/openai/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream',
  }
  const body = {
    model: model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: message },
    ],
    stream: false,
    temperature: temp
  };

  const response = await axios(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    result += chunk;
  }

  return result;
}

module.exports = AiMessage;
/*
const express = require("express");
const app = express();
const AiMessage = require("./llama.js");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api", async (req, res) => {
  // AI responses are working! send a POST request to this as a test:
  // https://superwirelessfibonacci--codershayan.repl.co/api?prompt=hello
  // visiting the site itself doesn't do anything, you could set up GET requests instead of POST requests so you can literally just visit the site but POST is better
  try {
    const message = req.query.prompt;
    console.log(decodeURIComponent(message));
    const response = await AiMessage(message, 'Be a helpful assistant.', "meta-llama/Llama-2-7b-chat-hf");
    console.log(response);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Listening on http://0.0.0.0:3000");
});*/