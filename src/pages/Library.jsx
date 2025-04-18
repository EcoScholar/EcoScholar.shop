import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Library = () => {
  // Parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e) => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Letters animation for main title
  const titleLetters = "LIBRARY".split("");
  
  const letterVariants = {
    initial: { y: -100, opacity: 0 },
    animate: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }),
    hover: {
      y: -15,
      color: "#64ffda",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]">
      {/* Floating particles for background effect */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white opacity-30 parallax"
          data-speed={Math.random() * 6 + 2}
          style={{
            width: `${Math.random() * 30 + 5}px`,
            height: `${Math.random() * 30 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(2px)"
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center">
          {/* Animated main title */}
          <div className="mb-16 flex space-x-2 md:space-x-4">
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={letterVariants}
                className="inline-block text-5xl md:text-7xl font-black text-white"
                style={{ 
                  textShadow: "0 0 15px rgba(100, 255, 218, 0.5)",
                  cursor: "default"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* Main content card */}
          <motion.div 
            className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-6">
             Eco-Library
            </h2>
            
            <p className="text-lg text-cyan-100 text-center mb-8">
            The Eco-Library is an online platform where students can easily buy or rent academic books. It offers a convenient way to access study materials with options for purchase or short-term rental, secure payments, and home delivery, making learning more affordable and accessible.
            </p>
            
            <div className="flex justify-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Notify Me When Available
              </motion.button>
            </div>
          </motion.div>
          
          {/* Feature preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">
            {[
              { 
                title: "Book-collection-", 
                icon: "📚", 
                delay: 1.2,
                href: '/all-items'
              },
              { 
                title: "Sell your books", 
                icon: "🤝", 
                delay: 1.4,
                href: '/Sell'
              },
              { 
                title: "Study-materials", 
                icon: "📦", 
                delay: 1.6,
                href: '/studymaterials'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white bg-opacity-5 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center border border-white border-opacity-10 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: feature.delay, duration: 0.5 } 
                }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" 
                }}
                onClick={() => window.location.href = feature.href}
              >
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library; 
