const apiKey = "OPENAI_KEY";

async function sendMessage(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful website assistant." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

const toggleBtn = document.getElementById("chatbot-toggle");
const chatWindow = document.getElementById("chatbot-window");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

toggleBtn.onclick = () => {
  chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
};

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    
    const userMsg = document.createElement("div");
    userMsg.textContent = "You: " + input.value;
    messages.appendChild(userMsg);

    const reply = await sendMessage(input.value);

    const botMsg = document.createElement("div");
    botMsg.textContent = "Bot: " + reply;
    messages.appendChild(botMsg);

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
});
