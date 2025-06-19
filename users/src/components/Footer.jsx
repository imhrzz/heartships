import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-gray-400 transition">About Us</a></li>
            <li><a href="/services" className="hover:text-gray-400 transition">Services</a></li>
            <li><a href="/contact" className="hover:text-gray-400 transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</a></li>
          </ul>
        </div>
        
        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebookF size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedinIn size={20} /></a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-sm flex flex-col justify-center items-center md:items-end">
          <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
          <p className="mt-2">Designed with love Harsh</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
