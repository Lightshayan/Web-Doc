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

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api?prompt=" + encodedPrompt);
  xhr.setRequestHeader("Content-Type", "application/json");
   xhr.onload = function () {
     if (xhr.status === 200) {
       var data = xhr.responseText;
       var parsedData = JSON.parse(data);
       var content = parsedData.choices[0].message.content;

       aiTypingLi.remove(); // Remove the old "AI is typing..." message
       var aiLi = document.createElement("li");
       aiLi.classList.add("ai-message");
       aiLi.textContent = content; // Use the extracted content here
       chatMessages.appendChild(aiLi);
       scrollToBottom(chatMessages);
     } else {
       console.error("Error: " + xhr.status);
     }
   }
  xhr.onerror = function () {
    console.error("Request failed");
  };
  xhr.send();
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
