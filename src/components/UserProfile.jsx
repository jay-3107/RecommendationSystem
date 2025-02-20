import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const preferencesOptions = [
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

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [preferences, setPreferences] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const location = useLocation();

  // Extract customerId from URL
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get('customerId');

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${customerId}`);
        setUser(response.data);
        setName(response.data.name);
        setUsername(response.data.username);
        setPreferences(response.data.preferences);
        setProfilePicture(response.data.profilePicture); // Set profile picture URL
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (customerId) {
      fetchUserData();
    }
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("preferences", preferences);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/user/profile/${customerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setUser(response.data);
      setAlertOpen(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <Header showSearchBar={false} />
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Card className="max-w-lg w-full mx-4  md:drop-shadow-xl">
          <CardHeader className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
              <img src={`http://localhost:5000${profilePicture}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <CardTitle className="mt-4">{user.name}</CardTitle>
            <CardDescription>{user.username}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <Label className="block text-black-700 mb-2 md:drop-shadow-xl">Name</Label>
                <Input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label className="block text-black-700 mb-2 md:drop-shadow-xl">Username</Label>
                <Input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label className="block text-black-700 mb-2 md:drop-shadow-xl">Profile Picture</Label>
                <Input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </div>
              <div className="mb-4">
                <Label className="block text-black-700 mb-2 md:drop-shadow-xl">Preferences</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={false}
                      className="w-full justify-between"
                    >
                      {preferences
                        ? preferencesOptions.find((option) => option.name === preferences)?.name
                        : "Select preference..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search preference..." />
                      <CommandList>
                        <CommandEmpty>No preference found.</CommandEmpty>
                        <CommandGroup>
                          {preferencesOptions.map((option) => (
                            <CommandItem
                              key={option.id}
                              value={option.name}
                              onSelect={(currentValue) => {
                                setPreferences(currentValue === preferences ? "" : currentValue);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${preferences === option.name ? "opacity-100" : "opacity-0"}`}
                              />
                              {option.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mb-4">
                <Label className="block text-black-700 mb-2 md:drop-shadow-xl" >Password</Label>
                <Input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <AlertDialog   open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="bg-blue-50 text-blue-900" >
          <AlertDialogHeader>
            <AlertDialogTitle className="bg-blue-50 text-blue-900" >Profile Updated</AlertDialogTitle>
            <AlertDialogDescription className="bg-blue-50 text-blue-900"  >
              Your profile has been updated successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction  className="bg-blue-500 text-white hover:bg-blue-600"  onClick={() => setAlertOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfile;