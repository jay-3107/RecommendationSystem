import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, Home } from "lucide-react"; // Icons
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import logo from './../assets/logo_icon1.png';
import { SearchContext } from './SearchContext.jsx';
import { useIsMobile } from '../hooks/use-mobile';
import DashVdoSlider from './DashVdoSlider';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Track if scrolled
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); // State to store user data
  const { setSearchResults } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Extract customerId from URL
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get('customerId');

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

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${customerId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (customerId) {
      fetchUserData();
    }
  }, [customerId]);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await fetch(`http://localhost:5000/api/search?query=${e.target.value}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchResults(data);
        navigate('/user/dashboard'); // Navigate to the dashboard
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className={`flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-all duration-300 ease-in-out ${isScrolled ? "bg-white bg-opacity-80 shadow-lg" : "bg-transparent"} fixed w-full top-0 z-10`}>
          <div className="flex justify-between items-center w-full">
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
                value={searchQuery}
                onChange={handleSearch}
                className={`absolute left-12 px-3 py-1 border border-gray-300 rounded-lg shadow-md transition-all duration-300 bg-white ${showSearch ? "w-48 opacity-100" : "w-0 opacity-0"
                  }`}
              />
            </div>

            {/* Center: Navigation Menu */}
            <div className="flex justify-center flex-grow">
              <div className="bg-gray-100 border border-gray-300 rounded-2xl shadow-lg px-6 py-3 w-fit hover:bg-gray-200 transition-all duration-300 flex gap-4">
                <Link to={`/user/dashboard?customerId=${customerId}`} className="flex items-center gap-2">
                  <Home className="w-5 h-5" /> <span>Dashboard</span>
                </Link>
                <Link to={`/user/profile?customerId=${customerId}`} className="flex items-center gap-2">
                  <User className="w-5 h-5" /> <span>Profile</span>
                </Link>
              </div>
            </div>

            {/* Right: Username & User Avatar */}
            <div className="flex items-center space-x-3">
              {user && (
                <>
                  <span className="text-gray-700 font-medium font-serif">{user.username}</span>
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
                    <img src={`http://localhost:5000${user.profilePicture}`} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        {location.pathname !== '/user/profile' && <DashVdoSlider />}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Header;