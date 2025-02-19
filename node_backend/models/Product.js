const mongoose = require("mongoose");

const TrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  main_category: String,
  average_rating: Number,
  rating_number: Number,
  price: String,
  images: {
    hi_res: [String],
    large: [String],
  },
  store: String,
  details: Object,
});

module.exports = mongoose.model("Try", TrySchema, "products");