import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag } from 'lucide-react';
import { sliderImages } from '../../data/sliderImages';

const ImageSlider = () => {
  const [selectedImage, setSelectedImage] = useState(sliderImages[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [images] = useState(sliderImages);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let intervalId;

    if (!isHovered && !isMobile) {
      intervalId = window.setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, currentIndex, images, isMobile]);

  const handleImageClick = useCallback((image, index) => {
    if (currentIndex === index) {
      window.location.href = image.link;
      return;
    }
    setCurrentIndex(index);
    setSelectedImage(image);
  }, [currentIndex]);

  const onMouseEnter = useCallback(() => !isMobile && setIsHovered(true), [isMobile]);
  const onMouseLeave = useCallback(() => !isMobile && setIsHovered(false), [isMobile]);

  const activeImage = images[currentIndex];

  const handleShopNow = useCallback((image) => {
    const url = `/product${image.link}`;
    window.location.href = url;
  }, []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const diff = startX - touch.clientX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) { // Swipe left
          const nextIndex = (currentIndex + 1) % images.length;
          setCurrentIndex(nextIndex);
          setSelectedImage(images[nextIndex]);
        } else { // Swipe right
          const nextIndex = (currentIndex - 1 + images.length) % images.length;
          setCurrentIndex(nextIndex);
          setSelectedImage(images[nextIndex]);
        }
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', handleTouchMove);
    }, { once: true });
  }, [currentIndex, images]);

  return (
    <div className="relative h-screen bg-black flex flex-col justify-start">
      <div 
        className="banner h-full relative flex flex-col items-center"
        onTouchStart={handleTouchStart}
      >
        <div className="relative h-[300px] md:h-[400px] w-full mt-12 md:mt-20">
          <div className={`slider ${isHovered ? 'paused' : ''}`}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`item ${currentIndex === index ? 'active' : ''}`}
                style={{
                  '--position': index + 1,
                  '--quantity': images.length
                }}
                onClick={() => handleImageClick(image, index)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <img
                  src={`${image.url}`}
                  alt={image.title}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0">
          <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row gap-6 md:gap-0">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{activeImage.title}</h1>
              <span className="text-lg md:text-xl text-gray-400">{activeImage.price}</span>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 md:line-clamp-none">
                {activeImage.description}
              </p>
              <div className="inline-block w-full md:w-auto">
                <button 
                  onClick={() => handleShopNow(activeImage)}
                  className="w-full md:w-auto group relative overflow-hidden rounded-full border border-white/30
                    px-6 md:px-8 py-2.5 text-sm text-white transition-all duration-300
                    hover:border-white/50"
                >
                  <span className="relative z-10 flex items-center justify-center md:justify-start gap-2">
                    Shop Now
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                  <div className="absolute inset-0 z-0 w-full h-full transition-all duration-300 
                    bg-white/0 group-hover:bg-white/10">
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setSelectedImage(images[index]);
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
};

export default ImageSlider; 