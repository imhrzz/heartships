import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import letterImage from "../assets/letter.jpg";
import aiPhotoImage from "../assets/ai-photo.jpg";
import handwritingSample from "../assets/handwriting.jpg";
import poetrySample from "../assets/poetry.jpg";
import giftSample from "../assets/gift.jpg";

const Home = () => {
  const buttonStyles =
    "text-[#3E2A28] border border-[#3E2A28] rounded-md font-medium text-sm sm:text-base transition duration-300 hover:bg-[#3E2A28] hover:text-white px-5 py-2";

  const giftItems = [
    {
      id: 1,
      title: "Handwritten Letters",
      description: "Personalized calligraphy letters with custom designs",
      price: "$35",
      image: handwritingSample,
      gradient: "from-rose-100 to-pink-50",
      accentColor: "text-rose-600"
    },
    {
      id: 2,
      title: "Poetry Collections",
      description: "Custom poems and verse compilations in elegant formats",
      price: "$45",
      image: poetrySample,
      gradient: "from-blue-100 to-indigo-50",
      accentColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Memory Boxes",
      description: "Curated gift boxes with letters, photos, and keepsakes",
      price: "$75",
      image: giftSample,
      gradient: "from-green-100 to-emerald-50",
      accentColor: "text-green-600"
    },
    {
      id: 4,
      title: "Photo Albums",
      description: "AI-enhanced photo collections in premium albums",
      price: "$55",
      image: aiPhotoImage,
      gradient: "from-purple-100 to-violet-50",
      accentColor: "text-purple-600"
    }
  ];

  return (
    <section id="home">
      <div className="min-h-screen overflow-y-auto scrollbar-smooth bg-[#F2EFE9] text-[#3E3E3E] relative">
        {/* Hero Section - Full Width */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="w-full text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-wide max-w-4xl mx-auto"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Craft <span className="text-[#E07A5F]">Letters</span>, <br /> Enhance <span className="text-[#3D405B]">Memories</span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg sm:text-xl text-[#6B705C] max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              "A letter carries emotions, a photo holds moments—why not perfect both?"
            </motion.p>
            
            <div className="mt-16 flex flex-col lg:flex-row gap-12 justify-center items-center max-w-7xl mx-auto">
              <motion.div 
                className="w-full lg:w-1/2 text-left lg:pl-8"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">Your words & visuals, beautifully crafted</h2>
                <p className="text-gray-500 mt-4 text-base sm:text-lg leading-relaxed">
                  Express emotions through heartfelt letters and effortlessly elevate your photos with AI magic. Create lasting memories that speak to the heart.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link to="/letters">
                    <button className={`${buttonStyles} w-full sm:w-auto`}>Write a Letter</button>
                  </Link>
                  <Link to="/photobooth">
                    <button className={`${buttonStyles} w-full sm:w-auto`}>PhotoBooth</button>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2 flex gap-4 lg:pr-8"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <div className="w-1/2 space-y-4">
                  <img src={letterImage} alt="Letter Writing" className="w-full rounded-2xl shadow-xl hover:scale-105 transition duration-500 transform" />
                </div>
                <div className="w-1/2 space-y-4">
                  <img src={aiPhotoImage} alt="AI Photo Booth" className="w-full rounded-2xl shadow-xl hover:scale-105 transition duration-500 transform" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section - Full Width */}
        <div className="py-20 px-4 sm:px-6">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-16 max-w-none">
            
            {/* Left: Artistic Creations - Full Width */}
            <div className="w-full">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center xl:text-left">Artistic Creations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-8">
                  {[
                    {
                      img: handwritingSample,
                      text: "Beautiful handcrafted letters and calligraphy that transform words into art.",
                      link: "/artist-profile",
                      label: "View Artist",
                      gradient: "from-amber-50 to-orange-50"
                    },
                    {
                      img: poetrySample,
                      text: "Poems that touch the soul, crafted by passionate writers with decades of experience.",
                      link: "/writer-profile",
                      label: "View Writer",
                      gradient: "from-slate-50 to-gray-50"
                    },
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className={`bg-gradient-to-br ${item.gradient} p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50`}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="overflow-hidden rounded-xl mb-4">
                        <img src={item.img} alt="Sample" className="w-full h-48 object-cover hover:scale-110 transition duration-500" />
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed mb-4">{item.text}</p>
                      <Link to={item.link} className="inline-flex items-center text-[#3E2A28] font-semibold hover:text-[#E07A5F] transition-colors duration-300">
                        {item.label}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Gift Collection - Four Sections */}
            <div className="w-full">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center xl:text-left">Gift Collection</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {giftItems.map((gift, index) => (
                    <motion.div
                      key={gift.id}
                      className={`bg-gradient-to-br ${gift.gradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group`}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <div className="overflow-hidden rounded-xl mb-4">
                        <img 
                          src={gift.image} 
                          alt={gift.title} 
                          className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition duration-500" 
                        />
                      </div>
                      
                      <h3 className={`font-bold text-lg mb-2 ${gift.accentColor}`}>
                        {gift.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {gift.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#3D405B] font-bold text-xl">
                          {gift.price}
                        </span>
                        <Link
                          to="/store"
                          className="bg-[#3E2A28] hover:bg-[#E07A5F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                          Add to Cart
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* View All Button */}
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to="/store"
                    className="inline-flex items-center bg-gradient-to-r from-[#3E2A28] to-[#5c443f] hover:from-[#E07A5F] hover:to-[#d16849] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View All Gifts
                    <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;