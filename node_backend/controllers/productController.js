const TryModel = require("../models/Product");

exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  try {
    const products = await TryModel.find().skip(skip).limit(limit);
    const totalProducts = await TryModel.countDocuments();
    const hasMore = page * limit < totalProducts;

    const formattedProducts = products.map(product => {
      let imageUrl = "./placeholder.jpg";

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

    res.status(200).json({ products: formattedProducts, hasMore });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};