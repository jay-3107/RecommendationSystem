const express = require("express");
const { registerUser, signInUser, savePreferences, searchProducts } = require("../controllers/userController");
const { getUserByCustomerId } = require("../controllers/userController");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const router = express.Router();

router.post("/userauth", registerUser);
router.post("/signin", signInUser);
router.post("/savePreferences", savePreferences);
router.get("/search", searchProducts); // Add this line for the search route
router.get("/user/:customerId", getUserByCustomerId);
router.get("/user/profile/:customerId", getUserProfile);
router.put("/user/profile/:customerId", updateUserProfile);


module.exports = router;