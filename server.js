import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{
          role: "user",
          parts: [{ text: `Translate this Sanskrit text to English and briefly explain its meaning: "${text}"` }]
        }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({ translation: response.data.candidates[0]?.content?.parts[0]?.text || "Translation error" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${ }`));
