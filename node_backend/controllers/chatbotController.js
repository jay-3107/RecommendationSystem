const axios = require('axios');

const handleChatbotRequest = async (req, res) => {
  const { inputText } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [{ role: 'user', parts: [{ text: `You are an information provider employee in this online e-commerce platform. Answer the question as per it: ${inputText}. Respond in React Markdown format and keep the response short.` }] }],
        generationConfig: {
          maxOutputTokens: 200 // Limits response length
        }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const chatbotData = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
    res.json({ message: chatbotData });
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    res.status(500).json({ message: 'Failed to fetch response.' });
  }
};

module.exports = { handleChatbotRequest };