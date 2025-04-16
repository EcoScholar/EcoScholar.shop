import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaPencilAlt, FaFlask } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const StudyMaterials = () => {
  const navigate = useNavigate();

  const studyMaterials = [
    {
      title: 'E-Books',
      description: 'Access our comprehensive collection of digital textbooks for Class 11 and 12.',
      icon: <FaBookOpen className="h-12 w-12 text-white transform -rotate-12 hover:rotate-0 transition-transform duration-300" />,
      href: '/ebooks',
      available: true,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Hand Written Notes & PYQs',
      description: 'High-quality handwritten notes and PYQs for effective exam preparation.',
      icon: <FaPencilAlt className="h-12 w-12 text-white transform rotate-45 hover:rotate-0 transition-transform duration-300" />,
      href: '/notes',
      available: true,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Project & Practical Notes',
      description: 'Detailed guides for science projects and practical experiments. Coming soon!',
      icon: <FaFlask className="h-12 w-12 text-white transform hover:scale-110 transition-transform duration-300" />,
      href: '/projects',
      available: true,
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const handleCardClick = (href, available) => {
    if (available) {
      navigate(href);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-8"
          >
            Study Materials
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Choose from our collection of carefully curated study materials to enhance your learning experience.
          </motion.p>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {studyMaterials.map((material, index) => (
            <motion.div
              key={material.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: material.available ? 1.03 : 1,
                transition: { duration: 0.2 }
              }}
              onClick={() => handleCardClick(material.href, material.available)}
              className={`relative bg-gray-800 rounded-3xl border border-emerald-500/30 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 ${
                material.available ? 'cursor-pointer' : 'opacity-90 cursor-not-allowed'
              } flex flex-col h-full`}
            >
              {/* Card Content */}
              <div className="p-8 flex-grow flex flex-col">
                {/* Icon Container */}
                <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${material.gradient} 
                  flex items-center justify-center transform rotate-3 shadow-lg border border-emerald-400/30`}>
                  {material.icon}
                </div>
                
                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-gray-100 text-center mb-4">
                  {material.title}
                </h3>
                <p className="text-gray-400 text-center text-lg leading-relaxed mb-auto">
                  {material.description}
                </p>
              </div>
              
              {/* Status Badge - Now in a separate div at bottom */}
              <div className="p-8 pt-0">
                <div className="flex justify-center">
                  <span
                    className={`px-6 py-2 rounded-full text-sm font-semibold border ${
                      material.available
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400/50 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400/50 text-white'
                    }`}
                  >
                    {material.available ? 'Available Now' : 'Coming Soon'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials; 