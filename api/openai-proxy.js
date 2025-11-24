export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // IMPORTANT: req.body is already parsed by Vercel
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "No message provided",
        body: req.body
      });
    }

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful website assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await apiRes.json();

    if (!data.choices) {
      return res.status(500).json({
        error: "OpenAI returned no choices",
        openaiResponse: data
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
