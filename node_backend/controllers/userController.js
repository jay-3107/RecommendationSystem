const UserModel = require("../models/User");
const ProductModel = require("../models/Product"); // Assuming you have a Product model
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

    // Find the user by customerId (uuid)
    const user = await UserModel.findOne({ uuid: customerId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's preferences
    user.preferences = preferences;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Preferences saved successfully" });
  } catch (error) {
    console.error("Error saving preferences:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await ProductModel.find({ title: { $regex: query, $options: 'i' } });

    const formattedProducts = products.map(product => {
      let imageUrl = "/placeholder.jpg";

      if (product.images) {
        const validHiRes = (product.images.hi_res || []).filter(url => url);
        const validLarge = (product.images.large || []).filter(url => url);

        if (validHiRes.length > 0) {
          imageUrl = validHiRes[0];
        } else if (validLarge.length > 0) {
          imageUrl = validLarge[0];
        }
      }

      return {
        id: product._id,
        title: product.title || "No Title",
        category: product.main_category || "Unknown",
        rating: product.average_rating || 0,
        totalRatings: product.rating_number || 0,
        price: product.price !== "None" ? product.price : "N/A",
        imageUrl,
        store: product.store || "Unknown Seller",
        details: product.details || {},
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getUserByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const user = await UserModel.findOne({ uuid: customerId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};