const apiKey = "OPENAI_API_KEY";

document.addEventListener("DOMContentLoaded", () => {

  async function sendMessage(message) {
    const response = await fetch("https://chat-bot-mauve-seven-61.vercel.app/api/openai-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    return data?.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
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

});

