import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Letters from "./pages/letters";
import Gifts from "./pages/Gifts";
import AIPhotoBooth from "./pages/AIPhotoBooth";
import Checkout from "./pages/checkout";
import Login from "./pages/Login";
import Sellerdashboard from "./pages/Sellerdashboard"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { GiftProvider } from "./context/GiftProvider";

const App = () => {
  return (
    
    <GiftProvider>  
      <div className="min-h-screen bg-[#F2EFE9] text-gray-800 font-['Satoshi']">
        <Navbar />
        <main className=" mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/letters" element={<Letters />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/photobooth" element={<AIPhotoBooth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Sellerdashboard" element={<Sellerdashboard />} /> 
            <Route path="/home" element={<Home />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </GiftProvider>
  );
};

export default App;
