import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const handwritingStyles = [
  { name: "Cursive", font: "Dancing Script, cursive" },
  { name: "Calligraphy", font: "Great Vibes, cursive" },
  { name: "Handwritten", font: "Patrick Hand, cursive" },
  { name: "Classic Print", font: "Merriweather, serif" },
];

const paperOptions = [
  { name: "Standard", price: 0 },
  { name: "Premium", price: 5 },
  { name: "Handmade", price: 8 },
  { name: "Recycled", price: 4 },
];

const sizeOptions = [
  { name: "A5", price: 0 },
  { name: "A4", price: 2 },
  { name: "Letter", price: 3 },
  { name: "Legal", price: 4 },
];

const inkOptions = [
  { name: "Black", price: 0 },
  { name: "Blue", price: 2 },
  { name: "Brown", price: 3 },
  { name: "Gold", price: 5 },
  { name: "Silver", price: 4 },
];

const sampleLetters = [
  {
    type: "Love Letter",
    description: "Express deep emotions with romantic elegance",
    content: `My Dearest Sarah,\n\nEvery sunrise brings thoughts of you, and every sunset whispers your name. The gentle way you laugh, the warmth in your eyes, and the kindness in your heart have captured my soul completely.\n\nI find myself lost in memories of our walks through the garden, where even the flowers seemed to pale in comparison to your radiant beauty...\n\nForever yours,\nMichael`,
    style: "Dancing Script, cursive",
    price: 23
  },
  {
    type: "Thank You Note",
    description: "Elegant gratitude for special occasions",
    content: `Dear Mrs. Johnson,\n\nYour thoughtfulness has touched our hearts beyond measure. The beautiful wedding gift you chose for us reflects not only your impeccable taste but also the depth of your caring friendship.\n\nWe are truly blessed to have someone like you in our lives, and we look forward to creating many more wonderful memories together.\n\nWith heartfelt appreciation,\nEmma & James`,
    style: "Great Vibes, cursive",
    price: 18
  },
  {
    type: "Business Letter",
    description: "Professional correspondence with personal touch",
    content: `Dear Mr. Thompson,\n\nThank you for considering our proposal for the upcoming project. We are excited about the opportunity to work with your esteemed organization and contribute to your continued success.\n\nOur team has carefully reviewed your requirements and we are confident that our approach will exceed your expectations while delivering exceptional value.\n\nSincerely,\nRobert Chen`,
    style: "Merriweather, serif",
    price: 20
  },
  {
    type: "Invitation",
    description: "Beautiful invitations for special events",
    content: `Dear Family & Friends,\n\nWe are delighted to invite you to celebrate our 25th Wedding Anniversary with us. Join us for an evening of joy, laughter, and cherished memories.\n\nDate: Saturday, June 15th\nTime: 6:00 PM\nLocation: The Garden Pavilion\n\nYour presence would make this celebration complete.\n\nWith love,\nDavid & Linda`,
    style: "Patrick Hand, cursive",
    price: 26
  },
  {
    type: "Personal Note",
    description: "Casual correspondence with warmth",
    content: `Hey Jessica!\n\nI hope this letter finds you well and enjoying your new city! I miss our coffee dates and long conversations about everything and nothing.\n\nLife here hasn't been quite the same without your infectious laughter and terrible jokes. I can't wait for you to visit so we can catch up properly.\n\nSend updates on your adventures!\n\nLove always,\nRachel`,
    style: "Patrick Hand, cursive",
    price: 17
  }
];

const BASE_CHARGE = 15;

const Letters = () => {
  const [selectedStyle, setSelectedStyle] = useState(handwritingStyles[0]);
  const [inputMethod, setInputMethod] = useState("manual");
  const [letterContent, setLetterContent] = useState("Every letter tells a story, every word carries the heart's whisper...");
  const [paper, setPaper] = useState(paperOptions[0]);
  const [size, setSize] = useState(sizeOptions[0]);
  const [ink, setInk] = useState(inkOptions[0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showDropdown, setShowDropdown] = useState({ paper: false, size: false, ink: false });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const totalPrice = BASE_CHARGE + paper.price + size.price + ink.price;

  const toggleDropdown = (type) => {
    setShowDropdown(prev => ({
      paper: false,
      size: false,
      ink: false,
      [type]: !prev[type]
    }));
  };

  const handleCheckout = () => {
    if (!letterContent.trim() && !uploadedFile) {
      alert("Please write a letter or upload a file before checkout.");
      return;
    }
    
    if (!customerInfo.name || !customerInfo.email) {
      alert("Please fill in required customer information.");
      return;
    }

    alert("Order placed successfully! You will receive a confirmation email shortly.");
    
    setLetterContent("Every letter tells a story, every word carries the heart's whisper...");
    setUploadedFile(null);
    setCustomerInfo({ name: '', email: '', address: '', phone: '' });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const DropdownMenu = ({ options, selected, onSelect, type }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(type)}
        className="w-full bg-stone-50 border border-stone-200 rounded-md px-3 py-3 sm:py-2 text-left flex items-center justify-between hover:border-stone-300 transition-all duration-200 text-sm sm:text-xs min-h-[44px] sm:min-h-[36px]"
      >
        <div>
          <p className="font-medium text-amber-900 text-sm sm:text-xs">{selected.name}</p>
          <p className="text-sm sm:text-xs text-amber-700">+${selected.price}</p>
        </div>
        <svg 
          className={`w-4 h-4 sm:w-3 sm:h-3 text-amber-700 transition-transform duration-200 ${showDropdown[type] ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showDropdown[type] && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute top-full left-0 right-0 mt-1 bg-stone-50 border border-stone-200 rounded-md shadow-lg z-10 overflow-hidden"
        >
          {options.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                onSelect(option);
                setShowDropdown(prev => ({ ...prev, [type]: false }));
              }}
              className={`w-full px-3 py-3 sm:py-2 text-left hover:bg-stone-100 transition-colors duration-150 flex justify-between items-center text-sm sm:text-xs min-h-[44px] sm:min-h-[36px]
                ${selected.name === option.name ? 'bg-stone-200 text-amber-900' : 'text-amber-800'}`}
            >
              <span className="font-medium">{option.name}</span>
              <span className="text-sm sm:text-xs text-amber-700">+${option.price}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full py-8 sm:py-12 lg:py-20 font-sans">
      {/* Header */}
      <div className="border-b border-stone-200 bg-stone-300">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-amber-900 tracking-wide mb-2 sm:mb-4">
              CUSTOMIZE YOUR LETTER
            </h1>
            <p className="text-amber-900 text-base sm:text-lg font-light tracking-wide">
              Professional Handwritten Correspondence Service
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Left Column - Content Creation */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              
              {/* Input Method Selection */}
              <motion.div 
                className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <h2 className="text-sm font-semibold mb-4 text-amber-900 tracking-wide uppercase">Content Input Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: "Write Letter", value: "manual" },
                    { label: "Upload Document", value: "upload" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setInputMethod(option.value)}
                      className={`px-4 py-3 sm:py-3 rounded-md border text-sm sm:text-xs font-medium transition-all duration-200 flex items-center justify-center min-h-[44px]
                        ${inputMethod === option.value 
                          ? "bg-amber-900 text-stone-50 border-amber-900" 
                          : "bg-stone-50 text-amber-900 border-stone-200 hover:border-stone-300"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Letter Content Area */}
              <motion.div 
                className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
                  <h2 className="text-sm font-semibold text-amber-900 tracking-wide uppercase">Letter Content</h2>
                  <div className="flex items-center gap-3">
                    <label className="text-sm sm:text-xs font-medium text-amber-900">Style:</label>
                    <select
                      value={selectedStyle.name}
                      onChange={(e) => setSelectedStyle(handwritingStyles.find(s => s.name === e.target.value))}
                      className="px-3 py-2 border border-stone-200 rounded-md text-sm sm:text-xs focus:border-stone-400 focus:outline-none bg-stone-50 text-amber-900 min-h-[44px] sm:min-h-[36px]"
                    >
                      {handwritingStyles.map((style) => (
                        <option key={style.name} value={style.name}>
                          {style.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {inputMethod === "manual" ? (
                  <textarea
                    className="w-full h-48 sm:h-64 lg:h-80 p-4 border border-stone-200 rounded-md bg-stone-50 text-amber-900 focus:outline-none focus:border-stone-400 resize-none text-sm leading-relaxed"
                    placeholder="Begin crafting your letter..."
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                  />
                ) : (
                  <div className="border-2 border-dashed border-stone-300 rounded-md p-8 sm:p-12 text-center hover:border-stone-400 transition-colors duration-200 bg-stone-50">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={(e) => setUploadedFile(e.target.files[0])}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="w-12 h-12 mx-auto mb-3 bg-stone-200 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-amber-900 mb-1">
                        {uploadedFile ? uploadedFile.name : "Choose file to upload"}
                      </p>
                      <p className="text-xs text-amber-700">Supports PDF, DOC, TXT, and images</p>
                    </label>
                  </div>
                )}
              </motion.div>

              {/* Customization Options */}
              <motion.div 
                className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-sm font-semibold mb-4 text-amber-900 tracking-wide uppercase">Customization Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm sm:text-xs font-semibold text-amber-900 mb-2 uppercase tracking-wide">Paper Quality</label>
                    <DropdownMenu
                      options={paperOptions}
                      selected={paper}
                      onSelect={setPaper}
                      type="paper"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm sm:text-xs font-semibold text-amber-900 mb-2 uppercase tracking-wide">Paper Size</label>
                    <DropdownMenu
                      options={sizeOptions}
                      selected={size}
                      onSelect={setSize}
                      type="size"
                    />
                  </div>
                  
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm sm:text-xs font-semibold text-amber-900 mb-2 uppercase tracking-wide">Ink Color</label>
                    <DropdownMenu
                      options={inkOptions}
                      selected={ink}
                      onSelect={setInk}
                      type="ink"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-4">
              <motion.div 
                className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-6 lg:sticky lg:top-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold mb-6 text-amber-900 tracking-wide uppercase">Order Summary</h3>
                
                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-4 border-b border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-xs text-amber-700">Base Service</span>
                    <span className="font-semibold text-amber-900 text-sm sm:text-xs">${BASE_CHARGE}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-xs text-amber-700">Paper ({paper.name})</span>
                    <span className="font-semibold text-amber-900 text-sm sm:text-xs">+${paper.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-xs text-amber-700">Size ({size.name})</span>
                    <span className="font-semibold text-amber-900 text-sm sm:text-xs">+${size.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-xs text-amber-700">Ink ({ink.name})</span>
                    <span className="font-semibold text-amber-900 text-sm sm:text-xs">+${ink.price}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-bold text-amber-900 mb-6">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>

                {/* Customer Information */}
                <div className="mb-6">
                  <h4 className="text-sm sm:text-xs font-semibold text-black mb-3 uppercase tracking-wide">Customer Details</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-200 rounded-md text-sm sm:text-xs focus:border-gray-400 focus:outline-none bg-white text-black min-h-[44px] sm:min-h-[36px]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-200 rounded-md text-sm sm:text-xs focus:border-gray-400 focus:outline-none bg-white text-black min-h-[44px] sm:min-h-[36px]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-200 rounded-md text-sm sm:text-xs focus:border-gray-400 focus:outline-none bg-white text-black min-h-[44px] sm:min-h-[36px]"
                    />
                    <textarea
                      placeholder="Delivery Address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full px-3 py-3 sm:py-2 border border-gray-200 rounded-md text-sm sm:text-xs focus:border-gray-400 focus:outline-none resize-none h-16 sm:h-20 bg-white text-black"
                    />
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-100">
                  <h4 className="text-sm sm:text-xs font-semibold text-black mb-2 uppercase tracking-wide">Delivery Information</h4>
                  <div className="text-sm sm:text-xs text-gray-600 space-y-1">
                    <p>Estimated delivery: 5-7 business days</p>
                    <p>Complimentary shipping on orders over $50</p>
                    <p>Tracking details provided upon dispatch</p>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 sm:py-3 px-4 rounded-md font-semibold text-sm sm:text-xs transition-colors duration-200 uppercase tracking-wide min-h-[44px]"
                >
                  Place Order — ${totalPrice}
                </button>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Secure payment processing • Satisfaction guaranteed
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Letters Carousel */}
      <motion.div 
        className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-t border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-black mb-2 sm:mb-4 tracking-wide">SAMPLE LETTERS</h2>
            <p className="text-black text-sm tracking-wide">Discover the artistry of our handwritten correspondence</p>
          </div>

          <div 
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {sampleLetters.map((letter, index) => (
              <div 
                key={index}
                className="flex-none w-72 sm:w-80 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-black mb-1 uppercase tracking-wide">{letter.type}</h3>
                  <p className="text-xs text-gray-600 mb-4">{letter.description}</p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-md border border-gray-200 h-48 sm:h-64 overflow-hidden">
                  <div 
                    className="text-black leading-relaxed text-xs sm:text-xs"
                    style={{ 
                      fontFamily: letter.style,
                      fontSize: "0.75rem",
                      lineHeight: "1.5"
                    }}
                  >
                    {letter.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < letter.content.split('\n').length - 1 && <><br /><br /></>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Starting from</span>
                  <span className="text-black font-semibold text-sm">${letter.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-xs text-gray-500">← Scroll to view more samples →</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Letters;