import { useGiftContext } from "../context/GiftProvider";

function GiftItem({ gift }) {
  const { addToCart } = useGiftContext();

  if (!addToCart) {
    console.error("addToCart is undefined. Ensure GiftProvider is correctly wrapping the component tree.");
    return null; // Prevent crashes
  }

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={gift.image || "https://via.placeholder.com/150"} alt={gift.name} className="w-full h-40 object-cover rounded-md mb-4" />
      <h2 className="text-lg font-semibold">{gift.name}</h2>
      <p className="text-gray-600">₹{gift.price}</p>
      <button 
        onClick={() => addToCart(gift)} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default GiftItem;
