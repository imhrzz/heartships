import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide navbar on scroll down
      } else {
        setIsVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      } bg-transparent  text-fuchsia-950 p-4 z-50 font-sans`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide cursor-pointer">
          Heartships
        </h1>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 text-sm">
          {["Home", "Letters", "Gifts", "PhotoBooth", "Checkout"].map(
            (name, index) => (
              <li key={index} className="relative group transition">
                <Link
                  to={`/${name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-500 transition-all duration-300"
                >
                  {name}
                </Link>
                {/* Hover underline effect */}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-fuchsia-950 transition-all duration-300 group-hover:w-full"></span>
              </li>
            )
          )}
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="flex items-center gap-5">
          {/* Cart Icon (Always Visible) */}
          <Link to="/cart" className="relative">
            <FiShoppingCart className="text-xl hover:text-gray-400 transition" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              2
            </span>
          </Link>

          {/* Profile Icon (Only Visible in Desktop) */}
          <Link to="/login" className="hidden md:block">
            <FiUser className="text-xl hover:text-gray-400 transition" />
          </Link>

          {/* Hamburger / Close Button */}
          <button
            className={`md:hidden text-2xl z-50 transition-transform duration-300 ${
              isMenuOpen ? "rotate-90 scale-110 text-red-500" : "rotate-0"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-lg transition-all duration-500 shadow-lg ${
          isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {["Home", "Letters", "Gifts", "PhotoBooth", "Checkout"].map(
          (name, index) => (
            <Link
              key={index}
              to={`/${name.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-gray-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {name}
            </Link>
          )
        )}

        {/* Profile Icon in Mobile Menu */}
        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
          <FiUser className="text-2xl hover:text-gray-400 transition" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
