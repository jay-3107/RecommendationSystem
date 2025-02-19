import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Importing icon
import Header from "./Header"; // Import the Header component
import DashVdoSlider from "./DashVdoSlider"; // Import the DashVdoSlider component
import Features from "./Features"; // Import the Features component
import ProductCard from './ProductCard.jsx';
import Footer from "./Footer"; // Import Footer

const DashBoard = () => {
  const [showButton, setShowButton] = useState(false);
  const [products, setProducts] = useState([]);


   // Fetch products data
   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <Header /> {/* Render Header */}

      {/* Video Slideshow */}
      <DashVdoSlider /> {/* Use the DashVdoSlider component */}

      {/* Features Section */}
      <Features /> {/* Use the Features component */}

      <div className="container mx-auto p-6">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
          {products.map((product) => (
            <div className="flex justify-center" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default DashBoard;
