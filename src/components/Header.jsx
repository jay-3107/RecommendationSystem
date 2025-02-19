import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Home } from "lucide-react"; // Icons
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
// import logo from './../assets/logo.png'; // Make sure to import your logo image
// import logo from './../../public/logo_icon1.png';
import logo from './../assets/logo_icon1.png';


const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Track if scrolled
  const username = "Jayesh"; // Replace with dynamic username if needed

  // Handle scroll event to add transparency effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Change 50 to adjust when the effect starts
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex justify-between items-center mt-4 px-6 transition-all duration-300 ease-in-out ${isScrolled ? "bg-white bg-opacity-80 shadow-lg" : "bg-transparent"
        } fixed w-full top-0 z-10 min-h-[60px]`}
    >
      {/* Left: Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-12 h-12 mr-6" /> {/* Adjust the margin here */}
      </div>

      {/* Center: Search Bar */}
      <div className="relative flex items-center ml-6"> {/* Add margin-left to separate it from the logo */}
        <div
          className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-all"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="w-5 h-5 text-gray-600" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className={`absolute left-12 px-3 py-1 border border-gray-300 rounded-lg shadow-md transition-all duration-300 bg-white ${showSearch ? "w-48 opacity-100" : "w-0 opacity-0"
            }`}
        />
      </div>

      {/* Center: Navigation Menu */}
      <div className="flex justify-center flex-grow">
        <Menubar className="bg-gray-100 border border-gray-300 rounded-2xl shadow-lg px-6 py-3 w-fit hover:bg-gray-200 transition-all duration-300">
          <MenubarMenu>
            <MenubarTrigger asChild>
              <Link to="/user/dashboard" className="flex items-center gap-2">
                <Home className="w-5 h-5" /> <span>Dashboard</span>
              </Link>
            </MenubarTrigger>
            <MenubarTrigger asChild>
              <Link to="#" className="flex items-center gap-2">
                <User className="w-5 h-5" /> <span>Profile</span>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>


      {/* Right: Username & User Avatar */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-medium font-serif">{username}</span>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
          <User className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </header>
  );
};

export default Header;
