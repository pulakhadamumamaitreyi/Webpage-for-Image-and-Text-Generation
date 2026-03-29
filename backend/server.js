const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/* 🔹 TEXT ENHANCEMENT */
app.post("/enhance", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `Improve this prompt for image generation with more detail and creativity:\n${prompt}`
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* 🔹 IMAGE GENERATION */
app.post("/generate-image", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
                prompt: prompt,
                size: "512x512"
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* 🔹 IMAGE ANALYSIS (using OpenAI vision) */
app.post("/analyze-image", async (req, res) => {
    try {
        const { base64 } = req.body;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Describe this image in detail" },
                            {
                                type: "image_url",
                                image_url: {
                                    url: base64
                                }
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
