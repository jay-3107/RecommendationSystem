const express = require("express");
const { handleChatbotRequest } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/chatbot", handleChatbotRequest);

module.exports = router;