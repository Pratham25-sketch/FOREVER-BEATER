const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple fallback data in case OpenAI fails
const fallbackData = {
  quote: { text: "Your heart is your engine. Take care of it daily.", author: "Unknown" },
  tips: [
    { emoji: "💧", title: "Stay Hydrated", description: "Drink water throughout the day." },
    { emoji: "🚶‍♂️", title: "Light Walk", description: "Take short walks to boost circulation." },
  ],
  habits: [
    { emoji: "☀️", time: "Morning", habit: "Drink a glass of water" },
    { emoji: "🌙", time: "Night", habit: "Stretch for 5 minutes" },
  ],
  facts: [
    "Your heart beats over 100,000 times a day.",
    "Laughing reduces stress and improves blood flow."
  ]
};

// Validate the AI JSON
function validateAI(data) {
  if (!data) return false;
  if (!data.quote || !data.quote.text) return false;
  if (!Array.isArray(data.tips)) return false;
  if (!Array.isArray(data.habits)) return false;
  if (!Array.isArray(data.facts)) return false;
  return true;
}

// AI tips endpoint
router.get("/tips", async (req, res) => {
  try {
    const prompt = `
    Generate a JSON object:
    {
      "quote": { "text": "", "author": "" },
      "tips": [{ "emoji": "", "title": "", "description": "" }],
      "habits": [{ "emoji": "", "time": "", "habit": "" }],
      "facts": [""]
    }

    Rules:
    • Respond ONLY with valid JSON.
    • NO text, NO markdown, NO explanations.
    • Ensure arrays contain at least 3 items.
    • Make content heart-health related.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    let raw = response.choices[0].message.content.trim();

    // Make sure only JSON remains (removes accidental text)
    raw = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("❌ AI sent invalid JSON. Raw Response:", raw);
      return res.json(fallbackData);
    }

    if (!validateAI(parsed)) {
      console.warn("⚠️ AI JSON failed validation. Using fallback.");
      return res.json(fallbackData);
    }

    return res.json(parsed);

  } catch (err) {
    console.error("❌ AI ROUTE ERROR:", err);
    return res.json(fallbackData);
  }
});

module.exports = router;
