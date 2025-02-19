import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-3">ABOUT US</h3>
            <ul className="space-y-2">
              <li>About us</li>
              <li>Store location</li>
              <li>Contact</li>
              <li>Orders tracking</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">USEFUL LINKS</h3>
            <ul className="space-y-2">
              <li>Returns</li>
              <li>Support Policy</li>
              <li>Size guide</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-3">FOLLOW US</h3>
            <ul className="space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-4">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <img src="/logo_icon1.png" alt="Shopverse Logo" className="w-10 h-10" />
            <p>© 2025 Shopverse. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
