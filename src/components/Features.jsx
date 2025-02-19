import React from "react";
import { Truck, Headphones, RefreshCcw, Tag } from "lucide-react"; // Importing icons

const Features = () => {
  return (
    <div>
     
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {/* Free Shipping */}
        <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg">
          <Truck className="w-16 h-16 text-green-500" />
          <h3 className="text-xl font-semibold mt-4">Free Shipping</h3>
          <p className="text-gray-600">Free shipping on all orders</p>
        </div>

        {/* Support 24/7 */}
        <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg">
          <Headphones className="w-16 h-16 text-blue-500" />
          <h3 className="text-xl font-semibold mt-4">Support 24/7</h3>
          <p className="text-gray-600">We offer 24/7 customer support</p>
        </div>

        {/* Money Return */}
        <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg">
          <RefreshCcw className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-semibold mt-4">Money Return</h3>
          <p className="text-gray-600">30 days money return guarantee</p>
        </div>

        {/* Order Discount */}
        <div className="flex flex-col items-center text-center p-4 border rounded-lg shadow-lg">
          <Tag className="w-16 h-16 text-yellow-500" />
          <h3 className="text-xl font-semibold mt-4">Order Discount</h3>
          <p className="text-gray-600">Get discounts on your next order</p>
        </div>
      </div>

       {/* DAILY DEALS! Section */}
       <div className="text-center font-bold text-2xl my-8">
        <span className="border-t-2 border-b-2 py-2 px-4 inline-block text-red-600">
          DAILY DEALS!
        </span>
      </div>

    </div>
  );
};

export default Features;
