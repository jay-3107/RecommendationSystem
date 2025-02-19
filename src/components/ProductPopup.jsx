import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductPopup = ({ product, recommendedProducts = [], onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <Card className="transition-transform hover:scale-y-105">
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={product.imageUrl} alt={product.title} className="w-full h-50 object-cover rounded-lg" />
            <p className="text-lg font-bold text-gray-900 mt-4">
              {product.price !== "N/A" ? `$${product.price}` : "Price Unavailable"}
            </p>
            <p className="text-sm text-gray-600 mt-2">Sold by: {product.store}</p>
          </CardContent>
          <CardFooter>
            <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all" onClick={onClose}>
              Close
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((recProduct, index) => (
              <Card key={index} className="transition-transform hover:scale-y-105">
                <CardHeader>
                  <CardTitle>{recProduct.title}</CardTitle>
                  <CardDescription>{recProduct.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={recProduct.imageUrl} alt={recProduct.title} className="w-full h-32 object-cover rounded-lg" />
                  <p className="text-lg font-bold text-gray-900 mt-4">
                    {recProduct.price !== "N/A" ? `$${recProduct.price}` : "Price Unavailable"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;