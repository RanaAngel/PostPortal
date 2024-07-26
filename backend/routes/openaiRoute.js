const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

router.post('/generate-post', async (req, res) => {
  const { title } = req.body;

  try {
    const result = await model.generateContent(`Create a post about "${title}" that includes the following: A catchy headline, Key benefits of the topic, and A call-to-action at the end in a paragraph format.Also do not exceed 228 characters`);
    const response = await result.response;
    const generatedPost = await response.text();
    res.json({ post: generatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate post' });
  }
});

module.exports = router;
