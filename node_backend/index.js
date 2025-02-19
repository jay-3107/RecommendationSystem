// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// // import placeholderImage from "./placeholder.jpg";
// // const placeholderImage = require ("./placeholder.jpg");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));


// // Connect to MongoDB (Local Instance)
// const MONGO_URI = `${process.env.MONGODB_URI}shopVerse`; // Ensure 'shopVerse' is the correct database name

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
// db.once("open", () => {
//   console.log("✅ Connected to MongoDB - shopVerse");
// });

// // Define Product Schema
// const TrySchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   main_category: String,
//   average_rating: Number,
//   rating_number: Number,
//   price: String,
//   images: {
//     hi_res: [String],
//   },
//   store: String,
//   details: Object,
// });

// // Use the "try" collection
// const TryModel = mongoose.model("Try", TrySchema, "products");

// app.get("/api/products", async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 50 ; 
//   const skip = (page - 1) * limit;

//   try {
//     const products = await TryModel.find().skip(skip).limit(limit);
//     const totalProducts = await TryModel.countDocuments();
//     const hasMore = page * limit < totalProducts;

//     const formattedProducts = products.map(product => ({
//       id: product._id,
//       title: product.title || "No Title",
//       category: product.main_category || "Unknown",
//       rating: product.average_rating || 0,
//       totalRatings: product.rating_number || 0,
//       price: product.price !== "None" ? product.price : "N/A",
//       imageUrl: product.images && product.images.hi_res && product.images.hi_res.length > 0 
//                 ? product.images.hi_res[0] 
//                 : "./placeholder.jpg",  // Fetching first image directly
//       store: product.store || "Unknown Seller",
//       details: product.details || {},
//     }));

//     res.status(200).json({ products: formattedProducts, hasMore });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB (Local Instance)
const MONGO_URI = `${process.env.MONGODB_URI}shopVerse`; // Ensure 'shopVerse' is the correct database name

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB - shopVerse");
});

// Define Product Schema
const TrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  main_category: String,
  average_rating: Number,
  rating_number: Number,
  price: String,
  images: {
    hi_res: [String],
    large: [String], // Added 'large' array as a fallback option
  },
  store: String,
  details: Object,
});

// Use the "try" collection
const TryModel = mongoose.model("Try", TrySchema, "products");

app.get("/api/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  try {
    const products = await TryModel.find().skip(skip).limit(limit);
    const totalProducts = await TryModel.countDocuments();
    const hasMore = page * limit < totalProducts;

    const formattedProducts = products.map(product => {
      let imageUrl = "./placeholder.jpg"; // Default placeholder

      if (product.images) {
        // Remove null values from hi_res and large arrays
        const validHiRes = (product.images.hi_res || []).filter(url => url);
        const validLarge = (product.images.large || []).filter(url => url);

        if (validHiRes.length > 0) {
          imageUrl = validHiRes[0]; // Use first non-null hi_res image
        } else if (validLarge.length > 0) {
          imageUrl = validLarge[0]; // Use first non-null large image
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

    res.status(200).json({ products: formattedProducts, hasMore });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
