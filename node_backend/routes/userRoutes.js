const express = require("express");
const { registerUser, signInUser, savePreferences } = require("../controllers/userController");

const router = express.Router();

router.post("/userauth", registerUser);
router.post("/signin", signInUser);
router.post("/savePreferences", savePreferences); // Add this line for saving preferences

module.exports = router;