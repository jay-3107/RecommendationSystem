const UserModel = require("../models/User");

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
    res.status(201).json({ message: "User registered successfully", uuid: newUser.uuid }); // Include uuid in the response
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