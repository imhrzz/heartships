import { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", formData);
    alert("Your order has been placed successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block mb-2">Name</label>
        <input type="text" name="name" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Email</label>
        <input type="email" name="email" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Address</label>
        <input type="text" name="address" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">City</label>
        <input type="text" name="city" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Zip Code</label>
        <input type="text" name="zip" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Payment Method</label>
        <select name="paymentMethod" onChange={handleChange} className="w-full p-2 border rounded mb-4">
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
