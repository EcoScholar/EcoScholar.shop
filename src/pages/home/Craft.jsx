import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Craft = () => {
  const craftRef = useRef(null);

  useEffect(() => {
    if (!craftRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: craftRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: true,
      }
    });

    tl.to(".craft-content", {
      y: -100,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });

    tl.to(".craft-image", {
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut"
    }, "<");

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={craftRef} data-color="black" className="craft section w-full h-screen relative overflow-hidden bg-black">
      <div className="craft-image absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop" 
          alt="Books Ecommerce" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="craft-content relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-8 opacity-0 translate-y-20">
        <h1 className="text-7xl font-['Pp Neue Machina'] mb-8 text-white">Crafting Wishdome</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-100">
          Unlock new stories, fresh ideas, and endless knowledge. Whether you're buying, selling, or exploring, every click brings you closer to wisdom.
        </p>
        <div className="mt-12 border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
          <span className="text-lg font-medium">Discover Our work</span>
        </div>
      </div>
    </div>
  );
}

export default Craft; 