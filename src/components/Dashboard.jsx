import React, { useState, useEffect, useContext } from "react";
import { ArrowUp, Bot } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Header from "./Header";
import DashVdoSlider from "./DashVdoSlider";
import Features from "./Features";
import ProductCard from './ProductCard.jsx';
import Footer from "./Footer";
import { SearchContext } from './SearchContext.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const API_KEY = 'AIzaSyCdH3aDzd12nL4N4_aagzm5wlyVphMTQWw';


const Dashboard = () => {
  const [showButton, setShowButton] = useState(false);
  const [products, setProducts] = useState([]); // Store fetched products
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Check if more products exist
  const [loading, setLoading] = useState(false);
  const { searchResults } = useContext(SearchContext);
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

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

  // Handle chatbot submit
  const handleChatbotSubmit = async () => {
    if (!inputText.trim()) return;

    const userMessage = { role: 'user', content: inputText };
    setChatMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: 'user', parts: [{ text: `You are an information provider employee in this online e-commerce platform. Answer the question as per it: ${inputText}. Respond in React Markdown format and keep the response short.` }] }],
          generationConfig: {
            maxOutputTokens: 200 // Limits response length
          }
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const chatbotData = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
      const botMessage = { role: 'bot', content: chatbotData };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorMessage = { role: 'bot', content: 'Failed to fetch response.' };
      setChatMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <DashVdoSlider />
      <Features />

      <div className="container mx-auto p-6">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 items-center justify-center">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div className="flex justify-center" key={product._id}>
                <ProductCard product={product} recommendedProducts={[]} />
              </div>
            ))
          ) : (
            products.length > 0 ? (
              products.map((product, index) => (
                <div className="flex justify-center" key={product._id || `${product.id}-${index}`}>
                  <ProductCard product={product} recommendedProducts={[]} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-4">No products available</p>
            )
          )}
        </div>
      </div>

      {/* Chatbot Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-28 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
          >
            <Bot className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat with Us</DialogTitle>
            <DialogDescription>
              How can we help you today?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col h-96">
            <div className="flex-grow overflow-y-auto p-4 bg-gray-100 rounded-lg">
              {chatMessages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex mt-4">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-l-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-all"
                onClick={handleChatbotSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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