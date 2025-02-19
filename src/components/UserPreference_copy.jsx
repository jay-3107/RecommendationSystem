import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    const [preferences, setPreferences] = useState({});
    const [isAlertOpen, setIsAlertOpen] = useState(false); // State for controlling the alert dialog visibility
    const [selectedCategories, setSelectedCategories] = useState([]); // No type declaration in .jsx

    const handleSwitchChange = (productId, checked) => {
        setPreferences((prev) => ({
            ...prev,
            [productId]: checked,
        }));
    };

    const handleSubmit = () => {
        const selected = Object.entries(preferences)
            .filter(([_, selected]) => selected)
            .map(([productId, _]) => products.find(product => product.id === Number(productId))?.name);

        setSelectedCategories(selected);

        if (selected.length > 0) {
            setIsAlertOpen(true); // Open the success dialog if categories are selected
        } else {
            setIsAlertOpen(true); // Open the error dialog if no category is selected
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
                                className={`w-full max-w-xs p-4 rounded-xlg transition-all duration-300 
                                ${preferences[product.id] ? 'bg-blue-100 border-blue-500' : 'bg-blue-50'} 
                                hover:scale-105 hover:shadow-xl`}
                            >
                                <CardContent className="text-center">
                                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                                    <Switch
                                        checked={preferences[product.id] || false}
                                        onCheckedChange={(checked) => handleSwitchChange(product.id, checked)}
                                    />
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

            {/* ShadCN AlertDialog for Success/Error Messages */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger />
                <AlertDialogContent className="bg-blue-50 text-blue-900"> {/* Bluish-White Background for AlertDialog */}
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
                                onClick={() => setIsAlertOpen(false)}>
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
