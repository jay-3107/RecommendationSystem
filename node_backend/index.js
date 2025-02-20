const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require('path');
// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/chatbotRoutes")); // Add this line

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));