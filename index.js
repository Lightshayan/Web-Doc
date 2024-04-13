const express = require("express");
const app = express();
const AiMessage = require("./llama.js");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api", async (req, res) => {
  // AI responses are working! send a POST request to this as a test:
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
});
