import { createContext, useState, useContext } from "react";

const GiftContext = createContext();

export function GiftProvider({ children }) {
  const [gifts, setGifts] = useState([
    { id: 1, name: "Handwritten Love Letter", price: 250, category: "Handmade", image: "/images/love-letter.jpg" },
    { id: 2, name: "Custom Name Necklace", price: 799, category: "Jewelry", image: "/images/necklace.jpg" },
    { id: 3, name: "Personalized Diary", price: 499, category: "Stationery", image: "/images/diary.jpg" },
  ]);
  
  const [cart, setCart] = useState([]);
  

  const addToCart = (gift) => {
    setCart([...cart, gift]);
  };

  const addGift = (newGift) => {
    setGifts([...gifts, newGift]);
  };

  return (
    <GiftContext.Provider value={{ gifts, cart, addToCart, addGift }}>
      {children}
    </GiftContext.Provider>
  );
}

export function useGiftContext() {
  return useContext(GiftContext);
}
