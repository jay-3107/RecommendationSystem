import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import preference_bg from './../assets/preference page/preference_bg.jpg';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocation, useNavigate } from 'react-router-dom';

const products = [
    { id: 1, name: "Beauty & Personal Care" },
    { id: 2, name: "Health & Household" },
    { id: 3, name: "Video Games" },
    { id: 4, name: "Toys & Games" },
    { id: 5, name: "Sports & Outdoors" },
    { id: 6, name: "Electronics" },
    { id: 7, name: "Clothing & Fashion" },
    { id: 8, name: "Home & Kitchen" },
    { id: 9, name: "Tools & Home Improvement" },
    { id: 10, name: "Software" }
];

const UserPreference = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get('customerId');

    const handleCardClick = (productId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId) // Deselect if already selected
                : [...prevSelected, productId] // Select if not selected
        );
    };

    const handleSubmit = async () => {
        if (selectedCategories.length > 0) {
            try {
                const response = await fetch('http://localhost:5000/api/savePreferences', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ customerId, preferences: selectedCategories }),
                });

                if (response.ok) {
                    setIsAlertOpen(true);
                    setTimeout(() => {
                        navigate(`/user/dashboard?customerId=${customerId}`);
                    }, 2000); // Redirect after 2 seconds
                } else {
                    console.error('Error saving preferences');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setIsAlertOpen(true);
        }
    };

    return (
        <div
            className="flex flex-col items-center p-5"
            style={{
                backgroundImage: `url(${preference_bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
            }}
        >
            <motion.h1
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-2xl font-bold font-serif">Select Your Shopping Category</h1>
            </motion.h1>

            <Card className="w-full bg-transparent shadow-none border-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 w-full">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <Card
                                onClick={() => handleCardClick(product.name)}
                                className={`w-full max-w-xs p-4 rounded-xlg transition-all duration-300 cursor-pointer
                                ${selectedCategories.includes(product.name) ? 'bg-blue-100 border-blue-500' : 'bg-blue-50'} 
                                hover:scale-105 hover:shadow-xl`}
                            >
                                <CardContent className="text-center">
                                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Card>

            <Button
                type="submit"
                className="mt-6 w-400 bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Submit Choices
            </Button>

            {/* Alert Dialog */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent className="bg-blue-50 text-blue-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{selectedCategories.length > 0 ? "Preferences saved successfully!" : "Error"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {selectedCategories.length > 0
                                ? "Your preferences have been saved."
                                : "Please select at least one category."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Close</AlertDialogCancel>
                        {selectedCategories.length > 0 && (
                            <AlertDialogAction 
                                className="bg-blue-500 text-white hover:bg-blue-600" 
                                onClick={() => {
                                    setIsAlertOpen(false);
                                    navigate(`/user/dashboard?customerId=${customerId}`);
                                }}
                            >
                                Okay
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UserPreference;