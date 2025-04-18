import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Primary School',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSeOwUWfAGU_8HCMyK_zsGSPIYfndvDkO3CNJYw4Yoq43H0wBg/viewform?usp=dialog ',
    image: 'https://cdn-icons-png.flaticon.com/512/201/201818.png'
  },
  {
    name: 'High School',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSeR8ZAC7h6d1ACVJKTEb3bfh-gTH3lCJzj-MDMIB5v-14ThSA/viewform?usp=header',
      image: 'https://th.bing.com/th/id/OIP.9H2Vz_efkzS-ikdAhgJGAgHaHa'
  },
  {
    name: '+2 Science',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSfEysidMmER0uICV51MISb6R3IW-zzwnGOftHa6PudsMRAC_g/viewform?usp=header',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/009/098/321/small/student-icon-line-free-vector.jpg'
  },
  {
    name: 'UG/PG',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSfQ8YHa_tTzq-KHE7bHSkb0xKLIEXpPutU9X4QBcU9Ffc73aQ/viewform?usp=header ',
    image: 'https://cdn-icons-png.flaticon.com/512/2416/2416471.png'
  },
  {
    name: 'Competitive Exams',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSd_ZusIbyKnOj2-2Opi1VefmfX01WO_01_Dh0uPOKMUM8AAIg/viewform?usp=header ',
    image: 'https://cdn-icons-png.flaticon.com/512/2416/2416471.png'
  },
  {
    name: 'Special Products',
    path: 'https://docs.google.com/forms/d/e/1FAIpQLSclUtescsNIHhUYwyMv0L8bJfZ0eQil8zDIO76PeOdV1nAamA/viewform?usp=header ',
    image: 'https://cdn-icons-png.flaticon.com/512/2416/2416471.png'
  }
];

function Sell() {
  // Add useEffect for background animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      const orbs = document.querySelectorAll('.bg-orb');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      orbs.forEach((orb, index) => {
        const speed = index % 3 === 0 ? 20 : index % 2 === 0 ? 30 : 40;
        const offsetX = (x * speed) - (speed / 2);
        const offsetY = (y * speed) - (speed / 2);
        orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-900 pt-12 pb-20 overflow-hidden relative">
      {/* Animated gradient orbs */}
      <motion.div 
        className="bg-orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-900 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="bg-orb absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-900 opacity-20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.25, 0.15, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="bg-orb absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-gray-800 opacity-15 blur-3xl"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-8"
        >
          Post Your Ad
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 text-lg text-center max-w-2xl mx-auto mb-12"
        >
          Choose a category below to sell your educational materials
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Link
                to={category.path}
                className="bg-gray-800 border border-emerald-500/20 rounded-xl p-6 flex flex-col items-center shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 p-3 mb-4 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span className="text-gray-200 font-medium text-center">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sell; 
