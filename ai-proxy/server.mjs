import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN?.split(",") ?? ["http://localhost:8080"],
  methods: ["POST"],
}));

app.post("/openai", async (req, res) => {
  try {
    const { messages = [] } = req.body;
    // Always use a valid OpenAI model id:
    const model = "gpt-4o-mini"; // or "gpt-4o", "gpt-4.1-mini", etc.

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "[no reply]";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "openai_proxy_failed" });
  }
});

app.post("/mistral", async (req, res) => {
  try {
    const { messages = [] } = req.body;
    const model = "mistral-medium-latest"; // pick a valid mistral id

    const r = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "[no reply]";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "mistral_proxy_failed" });
  }
});


app.listen(8787, () => console.log("AI proxy listening on http://localhost:8787"));
