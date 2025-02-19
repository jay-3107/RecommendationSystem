const UserModel = require("../models/User");
const fs = require('fs');
const path = require('path');

exports.registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    let profilePicture = null;

    if (req.files && req.files.file) {
      const file = req.files.file;
      profilePicture = `/uploads/${file.name}`;
      await file.mv(`./public/uploads/${file.name}`);
    }

    const newUser = new UserModel({
      name,
      username,
      email,
      password,
      profilePicture,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", uuid: newUser.uuid });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "User signed in successfully", uuid: user.uuid });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.savePreferences = async (req, res) => {
  try {
    const { customerId, preferences } = req.body;
    const filePath = path.join(__dirname, '../data/preferences.json');

    // Read existing preferences from the file
    let existingPreferences = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      if (fileData) {
        existingPreferences = JSON.parse(fileData);
      }
    }

    // Ensure existingPreferences is an array
    if (!Array.isArray(existingPreferences)) {
      existingPreferences = [];
    }

    // Check if the user already exists
    const userIndex = existingPreferences.findIndex(pref => pref.customerId === customerId);
    if (userIndex !== -1) {
      // Update existing user's preferences
      existingPreferences[userIndex].preferences = preferences;
    } else {
      // Append new preferences
      existingPreferences.push({ customerId, preferences });
    }

    // Write updated preferences back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingPreferences, null, 2));

    res.status(200).json({ message: "Preferences saved successfully" });
  } catch (error) {
    console.error("Error saving preferences:", error);
    res.status(500).json({ message: "Server Error" });
  }
};