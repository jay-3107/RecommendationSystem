import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [customerId, setCustomerId] = useState(null);

  // Load customerId from localStorage on initial render
  useEffect(() => {
    const storedCustomerId = localStorage.getItem('customerId');
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);

  // Save customerId to localStorage when it changes
  useEffect(() => {
    if (customerId) {
      localStorage.setItem('customerId', customerId);
    }
  }, [customerId]);

  return (
    <SearchContext.Provider value={{ 
      searchResults, 
      setSearchResults,
      customerId,
      setCustomerId
    }}>
      {children}
    </SearchContext.Provider>
  );
};