const express = require("express");
const { registerUser, signInUser } = require("../controllers/userController");

const router = express.Router();

router.post("/userauth", registerUser);
router.post("/signin", signInUser); 

module.exports = router;