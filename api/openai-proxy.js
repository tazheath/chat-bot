export default async function handler(req, res) {
  try {
    const { message } = JSON.parse(req.body);

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful website support chatbot." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await apiRes.json();
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
