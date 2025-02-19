import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"; // Importing ShadCN card components
import { Star } from "lucide-react"; // Assuming you're using Lucide icons for the rating
import { Button } from "@/components/ui/button"
const ProductCard = () => {
    return (
        <Card className="border rounded-lg shadow-md w-full sm:w-80 md:w-64 lg:w-80">
            {/* Card Header - Product Title */}
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Product Title</CardTitle>
            </CardHeader>

            {/* Card Content - Image, Rating, and Details */}
            <CardContent className="flex flex-col items-center text-center">
                {/* Product Image */}
                <img
                    src="/path-to-image.jpg"
                    alt="Product Image"
                    className="w-full h-48 object-cover rounded-t-lg"
                />

                {/* Product Rating */}
                <div className="flex items-center justify-center mt-2 text-yellow-500">
                    {/* Render 5 stars for rating (Assume 4/5 rating for demo) */}
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star
                            key={index}
                            className={`w-5 h-5 ${index < 4 ? "text-yellow-500" : "text-gray-300"}`}
                        />
                    ))}
                </div>

                {/* Product Details */}
                <CardDescription className="text-sm text-gray-600 mt-2">
                    This is a brief description of the product. It explains its features and benefits.
                </CardDescription>

                {/* Product Price */}
                <p className="text-lg font-bold text-gray-900 mt-4">$49.99</p>
            </CardContent>

            {/* Card Footer (if needed, for extra actions) */}
            <CardFooter className="flex justify-center mt-4">
                {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
          Add to Cart
        </button> */}
                <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    Add to Cart
                    
                </Button>

            </CardFooter>
        </Card>
    );
};

export default ProductCard;
