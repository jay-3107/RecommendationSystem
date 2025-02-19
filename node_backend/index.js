// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

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
// const ProductSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   main_category: String,
//   average_rating: Number,
//   rating_number: Number,
//   price: String,
//   images: {
//     hi_res: [String],
//     large: [String],
//     thumb: [String],
//     variant: [String],
//   },
//   store: String,
//   details: Object,
// });

// const Product = mongoose.model("Product", ProductSchema, "products");
// app.get("/api/products", async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     try {
//         const products = await Product.find().skip(skip).limit(limit);
//         const totalProducts = await Product.countDocuments();
//         const hasMore = page * limit < totalProducts;

//         const formattedProducts = products.map(product => {
//             let imageUrl = "";
            
//             // Simple approach to get the first valid image URL
//             if (product.images) {
//                 // Check hi_res images
//                 if (product.images.hi_res && Array.isArray(product.images.hi_res)) {
//                     const validHiRes = product.images.hi_res.find(url => url && url !== "None");
//                     if (validHiRes) imageUrl = validHiRes;
//                 }
                
//                 // If no hi_res image, check large images
//                 if (!imageUrl && product.images.large && Array.isArray(product.images.large)) {
//                     const validLarge = product.images.large.find(url => url && url !== "None");
//                     if (validLarge) imageUrl = validLarge;
//                 }
                
//                 // If still no image, check thumb images
//                 if (!imageUrl && product.images.thumb && Array.isArray(product.images.thumb)) {
//                     const validThumb = product.images.thumb.find(url => url && url !== "None");
//                     if (validThumb) imageUrl = validThumb;
//                 }
//             }

//             return {
//                 id: product._id,
//                 title: product.title || "No Title",
//                 category: product.main_category || "Unknown",
//                 rating: product.average_rating || 0,
//                 totalRatings: product.rating_number || 0,
//                 price: product.price !== "None" ? product.price : "N/A",
//                 imageUrl: imageUrl || "/placeholder.jpg",
//                 store: product.store || "Unknown Seller",
//                 details: product.details || {},
//             };
//         });

//         res.status(200).json({ products: formattedProducts, hasMore });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

