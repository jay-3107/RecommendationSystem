import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"; 
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  if (!product) return null; 

  const {
    title = "No Title Available",
    imageUrl = "/placeholder.jpg",
    rating = 0,
    totalRatings = 0,
    price = "N/A",
    store = "Unknown Seller",
  } = product;

  // Image fallback handler
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const handleImageError = () => setImgSrc("/placeholder.jpg"); 

  return (
    <Card className="border rounded-lg shadow-md w-full sm:w-80 md:w-64 lg:w-80 transition-transform hover:scale-105">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold text-gray-800 truncate">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center text-center">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
          onError={handleImageError} 
        />

        <div className="flex items-center justify-center mt-2 text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${index < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-gray-600 text-sm">({totalRatings} reviews)</span>
        </div>

        <p className="text-lg font-bold text-gray-900 mt-4">
          {price !== "N/A" ? `$${price}` : "Price Unavailable"}
        </p>

        <CardDescription className="text-sm text-gray-600 mt-2">
          Sold by: {store}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-center mt-4">
        <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
