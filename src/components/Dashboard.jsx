import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; 
import Header from "./Header"; 
import DashVdoSlider from "./DashVdoSlider"; 
import Features from "./Features"; 
import ProductCard from './ProductCard.jsx';
import Footer from "./Footer"; 

const Dashboard = () => {
  const [showButton, setShowButton] = useState(false);
  const [products, setProducts] = useState([]); // Store fetched products
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Check if more products exist
  const [loading, setLoading] = useState(false);


   // Fetch products from API
   const fetchProducts = async () => {
    if (loading || !hasMore) return; // Avoid duplicate requests
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/products?page=${page}&limit=30`);
      const data = await response.json();

      setProducts((prev) => [...prev, ...data.products]); // Append new products
      setHasMore(data.hasMore); // Update "hasMore" state
      setPage((prev) => prev + 1); // Increment page number
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setLoading(false);
  };

  // Fetch initial products
  useEffect(() => {
    fetchProducts();
  }, []);


    // Fetch initial products
    useEffect(() => {
      fetchProducts();
    }, []);


    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
          hasMore &&
          !loading
        ) {
          fetchProducts();
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);
  

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
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
      <Header />
      <DashVdoSlider />
      <Features />

      <div className="container mx-auto p-6">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 items-center justify-center">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="flex justify-center" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">No products available</p>
          )}
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

export default Dashboard;
