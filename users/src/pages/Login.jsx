import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaPhone } from "react-icons/fa";

const LoginSignup = () => {
  const [isCreator, setIsCreator] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", phone: "" });
  const [additionalInfo, setAdditionalInfo] = useState({ address: "", portfolio: "" });
  const [requiresDetails, setRequiresDetails] = useState(false);

  const handleLoginSignup = () => {
    if (!userDetails.email && !userDetails.phone) {
      alert("Please enter Gmail or Phone Number to proceed.");
      return;
    }
    setRequiresDetails(true);
  };

  const handleAdditionalDetails = () => {
    if (!additionalInfo.address) {
      alert("Address is required to proceed with orders.");
      return;
    }
    alert("Welcome! Your profile is now complete.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow w-96"
      >
        {!requiresDetails ? (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">
              {isSigningUp ? "Sign Up" : "Login"}
            </h2>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Gmail/ Phone number"
                className="w-full px-4 py-2 border rounded-md"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              />
              <button
                onClick={handleLoginSignup}
                className="w-full border border-[#3E2A28] text-[#3E2A28] py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#3E2A28] hover:text-white transition"
              >
                <FaGoogle /> Continue with Google
              </button>
              <button
                onClick={handleLoginSignup}
                className="w-full border border-[#3E2A28] text-[#3E2A28] py-2 rounded-md flex items-center justify-center gap-2 hover:bg-[#3E2A28] hover:text-white transition"
              >
                <FaPhone /> Continue with Phone
              </button>
            </div>
            <div className="mt-4 text-center space-y-1">
              <p
                className="text-sm cursor-pointer text-[#3E2A28] hover:underline"
                onClick={() => setIsSigningUp(!isSigningUp)}
              >
                {isSigningUp ? "Already have an account? Login" : "Don't have an account? Sign up"}
              </p>
              <p
                className="text-sm cursor-pointer text-[#3E2A28] hover:underline"
                onClick={() => setIsCreator(!isCreator)}
              >
                {isCreator ? "Switch to User Mode" : "Sign Up as a Creator"}
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-4">Complete Your Profile</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-md"
                value={additionalInfo.address}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, address: e.target.value })}
              />
              {isCreator && (
                <input
                  type="text"
                  placeholder="Portfolio Link (for creators)"
                  className="w-full px-4 py-2 border rounded-md"
                  value={additionalInfo.portfolio}
                  onChange={(e) => setAdditionalInfo({ ...additionalInfo, portfolio: e.target.value })}
                />
              )}
              <button
                className="w-full border border-[#3E2A28] text-[#3E2A28] py-2 rounded-md hover:bg-[#3E2A28] hover:text-white transition"
                onClick={handleAdditionalDetails}
              >
                Save & Continue
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default LoginSignup;
