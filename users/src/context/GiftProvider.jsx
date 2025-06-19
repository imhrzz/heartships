import React, { createContext, useContext, useState } from "react";

const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const [gifts, setGifts] = useState([
    { id: Date.now() + 1, name: "Custom Necklace", price: 25, category: "Jewelry" },
    { id: Date.now() + 2, name: "Engraved Watch", price: 50, category: "Watches" },
    { id: Date.now() + 3, name: "Personalized Mug", price: 15, category: "Home Decor" },
    { id: Date.now() + 4, name: "Leather Wallet", price: 40, category: "Accessories" },
    { id: Date.now() + 5, name: "Photo Frame", price: 20, category: "Home Decor" },
    { id: Date.now() + 6, name: "Custom Keychain", price: 10, category: "Accessories" },
    { id: Date.now() + 7, name: "Smartwatch", price: 150, category: "Watches" }
  ]);

  const [cart, setCart] = useState([]);

  // ✅ `addToCart` function
  const addToCart = (gift) => {
    setCart([...cart, gift]);
  };

  return (
    <GiftContext.Provider value={{ gifts, setGifts, cart, addToCart }}>
      {children}
    </GiftContext.Provider>
  );
};

// ✅ Export Hook
export const useGiftContext = () => {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error("useGiftContext must be used within a GiftProvider");
  }
  return context;
};
