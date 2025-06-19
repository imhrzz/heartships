import { useState } from "react";
import { useGiftContext } from "../context/GiftProvider";

import GiftItem from "../components/GiftItem";
import GiftFilter from "../components/GiftFilter";

// Sample popular products with categories
const popularProducts = [
  { id: 1, name: "Custom Name Necklace", price: 2000, storeLink: "/store/necklace", image: "/images/necklace.jpg", category: "Jewelry" },
  { id: 2, name: "Engraved Wooden Watch", price: 50, storeLink: "/store/watch", image: "/images/watch.jpg", category: "Watches" },
  { id: 3, name: "Personalized Leather Wallet", price: 40, storeLink: "/store/wallet", image: "/images/wallet.jpg", category: "Accessories" },
  { id: 4, name: "Handwritten Letter Frame", price: 30, storeLink: "/store/letter-frame", image: "/images/letter-frame.jpg", category: "Letters" },
  { id: 5, name: "Custom Engraved Bracelet", price: 350, storeLink: "/store/bracelet", image: "/images/bracelet.jpg", category: "Jewelry" },
  { id: 6, name: "Vintage Pocket Watch", price: 60, storeLink: "/store/pocket-watch", image: "/images/pocket-watch.jpg", category: "Watches" },
  { id: 7, name: "Handmade Wooden Keychain", price: 15, storeLink: "/store/keychain", image: "/images/keychain.jpg", category: "Accessories" },
  { id: 8, name: "Personalized LED Nameplate", price: 45, storeLink: "/store/nameplate", image: "/images/nameplate.jpg", category: "Home Decor" },
];

const buttonStyles =
  "text-white bg-[#3E2A28] rounded-md font-medium text-sm sm:text-base transition duration-300 hover:scale-105 px-5 py-2";

function Gifts() {
  const { gifts } = useGiftContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const allGifts = [...popularProducts, ...gifts];

  const filteredGifts =
    selectedCategory === "All"
      ? allGifts
      : allGifts.filter((gift) => gift.category === selectedCategory);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="p-6">
      {/* Gift Filter at the Top */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Explore Personalized Gifts
      </h1>
      <GiftFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Display Filtered Gifts Below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredGifts.length > 0 ? (
          filteredGifts.map((gift) => (
            <GiftItem key={gift.id} gift={gift} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No gifts found in this category.
          </p>
        )}
      </div>

      {/* Gift Seller Section */}
      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold">Are you a Gift Seller?</h2>
        <p className="text-gray-500">List your products & start selling!</p>
        <a href="/Sellerdashboard">
          <button className={buttonStyles}>Open Your Store</button>
        </a>
      </div>

      {/* Popular Products Section */}
      <section className="my-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Discover Popular Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md bg-white flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 mb-2">₹{product.price}</p>
              <div className="flex flex-col gap-2 mt-auto">
                <a
                  href={product.storeLink}
                  className="text-sm text-blue-500 underline"
                >
                  Visit Store
                </a>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={buttonStyles}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Items Preview (for testing) */}
      {cart.length > 0 && (
        <div className="mt-10 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">🛒 Cart Preview:</h2>
          <ul className="list-disc pl-5 text-sm">
            {cart.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Gifts;
