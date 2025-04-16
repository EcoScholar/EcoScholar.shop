import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Capsules = () => {
  const capsuleRef = useRef(null);

  useEffect(() => {
    gsap.to(".capsule:nth-child(2)", {
      scrollTrigger: {
        trigger: ".capsules",
        start: "top 70%",
        end: "bottom bottom",
        scrub: 1,
      },
      y: 0,
      ease: "power4.out",
    });
  }, []);

  return (
    <div data-color="black" className="capsules section w-full min-h-screen flex flex-col md:flex-row items-center justify-between mt-20 md:mt-60 px-6 md:px-28 bg-black">
      <div className="left w-full md:w-1/4 flex flex-col justify-between h-full py-10">
        <h1 className="text-xl md:text-2xl font-regular mb-8 md:mb-0">
          Dive into a world of books, eBooks, and handwritten notes. Discover, learn, and grow—one page at a time.
        </h1>
        <div className="heading">
          <h1 className="text-3xl md:text-5xl font-['Pp Neue Machina']">
            Explore Now
          </h1>
          <div className="w-fit px-6 md:px-8 py-2 border-[0.2px] border-white mt-6 md:mt-8">
            <div className="masker overflow-hidden">
              <span className="inline-block uppercase text-sm font-semibold">View All Articles</span>
            </div>
          </div>
        </div>
      </div>
      <div className="right font-['Pp Neue Machina'] h-full flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-8 md:mt-0">
        <div className="capsule w-full md:w-[20rem] h-[20rem] md:h-[30rem] rounded-[1.5rem] overflow-hidden relative bg-black/50">
          <img className="w-full h-full object-cover opacity-70" src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop" alt="Library Books" />
          <div className="content absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl md:text-2xl mb-2">World of Books</h3>
            <p className="text-xs md:text-sm opacity-80">Discover endless knowledge through our vast collection</p>
          </div>
        </div>
        <div className="capsule w-full md:w-[20rem] h-[20rem] md:h-[30rem] rounded-[1.5rem] overflow-hidden relative md:translate-y-20 bg-black/50">
          <img className="w-full h-full object-cover opacity-70" src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1948&auto=format&fit=crop" alt="Stationery" />
          <div className="content absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl md:text-2xl mb-2">Premium Stationery</h3>
            <p className="text-xs md:text-sm opacity-80">Quality tools for your academic journey</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capsules; 