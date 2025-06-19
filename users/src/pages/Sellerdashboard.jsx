import { useState } from "react";
import { FaWhatsapp, FaEdit, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineAddBusiness } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Sellerdashboard = () => {
  const [store, setStore] = useState({ name: "", description: "", paymentMethod: "" });
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", item: "Custom Mug", status: "Pending", phone: "1234567890" },
    { id: 2, customer: "Jane Smith", item: "Personalized Keychain", status: "Shipped", phone: "9876543210" }
  ]);

  const handleStoreChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };
  const buttonStyles =
  "text-[#3E2A28] border border-[#3E2A28] rounded-md font-medium text-sm sm:text-base transition duration-300 hover:bg-[#3E2A28] hover:text-white px-5 py-2";


  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Seller Dashboard</h1>

      {/* Store Setup */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MdOutlineAddBusiness className="mr-2" /> Store Setup
        </h2>
        <input type="text" name="name" placeholder="Store Name" value={store.name} onChange={handleStoreChange} className="w-full p-2 border rounded mb-2" />
        <textarea name="description" placeholder="Store Description" value={store.description} onChange={handleStoreChange} className="w-full p-2 border rounded mb-2"></textarea>
        <input type="text" name="paymentMethod" placeholder="Payment Method (UPI/PayPal)" value={store.paymentMethod} onChange={handleStoreChange} className="w-full p-2 border rounded" />
        <button className="bg-[#3E2A28] text-white px-4 py-2 rounded mt-4">Save Store</button>
      </div>

      {/* Order Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <AiOutlineShoppingCart className="mr-2" /> Orders
        </h2>
        {orders.map((order) => (
          <div key={order.id} className="p-4 border-b flex justify-between items-center">
            <div>
              <p className="font-semibold">{order.customer}</p>
              <p className="text-gray-600">{order.item}</p>
              <p className={`text-sm ${order.status === "Pending" ? "text-red-500" : "text-green-500"}`}>{order.status}</p>
            </div>
            <div className="flex items-center gap-4">
              <a href={`https://wa.me/${order.phone}`} target="_blank" rel="noopener noreferrer" className="text-green-500 text-xl">
                <FaWhatsapp />
              </a>
              <button className="bg-gray-200 px-3 py-1 rounded text-sm">Update Status</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sellerdashboard;
