export const config = {
  api: { bodyParser: true },
};

export default async function handler(req, res) {
  console.log(">>> Incoming request:", req.method, req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      console.log("❌ No message provided:", req.body);
      return res.status(400).json({ error: "No message provided", body: req.body });
    }

    console.log(">>> Sending to OpenAI:", message);

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

    console.log(">>> OPENAI RAW RESPONSE:", data);

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({
        error: "OpenAI error",
        openai: data
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
