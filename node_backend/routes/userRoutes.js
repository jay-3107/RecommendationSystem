const express = require("express");
const { registerUser, signInUser, savePreferences, searchProducts } = require("../controllers/userController");
const { getUserByCustomerId } = require("../controllers/userController");

const router = express.Router();

router.post("/userauth", registerUser);
router.post("/signin", signInUser);
router.post("/savePreferences", savePreferences);
router.get("/search", searchProducts); // Add this line for the search route
router.get("/user/:customerId", getUserByCustomerId);

module.exports = router;