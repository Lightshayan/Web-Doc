function AISend() {
  var userInput = document.getElementById("user-input").value;
  var encodedPrompt = encodeURIComponent(userInput);

  var chatMessages = document.getElementById("chat-messages");
  var userLi = document.createElement("li");
  userLi.classList.add("user-message");
  userLi.textContent = userInput;
  chatMessages.appendChild(userLi);

  var aiTypingLi = document.createElement("li");
  aiTypingLi.classList.add("ai-message", "ai-typing-message");
  aiTypingLi.textContent = "AI is typing...";
  chatMessages.appendChild(aiTypingLi);
  scrollToBottom(chatMessages);


  // reset to old but mostly working version //ok

  // nice! it works
      AiMessage(userInput, 'Be a helpful assistant.', "meta-llama/Llama-2-7b-chat-hf").then(response => {

          resp2 = JSON.parse(response)
         aiTypingLi.remove(); // Remove the old "AI is typing..." message
         var aiLi = document.createElement("li");
         aiLi.classList.add("ai-message");
         aiLi.textContent = resp2.choices[0].message.content; // Use the extracted content here
         chatMessages.appendChild(aiLi);
         scrollToBottom(chatMessages);
      })
  
  document.getElementById("user-input").value = "";
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

// Add event listener for Enter key press
document
  .getElementById("user-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      AISend();
    }
  });
  function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }