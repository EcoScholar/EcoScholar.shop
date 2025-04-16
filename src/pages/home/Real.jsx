import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Para from './Para';

gsap.registerPlugin(ScrollTrigger);

export default function Real() {
  const containerRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".slides",
          start: "top top",
          end: () => `+=${slidesContainerRef.current?.scrollWidth || 0}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      mainTl.to(slidesContainerRef.current, {
        x: () => -(slidesContainerRef.current?.scrollWidth - window.innerWidth || 0),
        ease: "none"
      });

      if (paraRef.current) {
        gsap.set(paraRef.current, {
          autoAlpha: 0,
          y: 100
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      <div data-color="black" className="real section w-full bg-black" ref={containerRef}>
        <div className="cont relative w-full">
          <div className="slides overflow-hidden sticky top-0 left-0 w-full h-[100vh] bg-black">
            <div 
              ref={slidesContainerRef} 
              className="slides-inner flex gap-4 md:gap-9 h-full w-full"
              style={{ width: "fit-content" }}
            >
              <div className="slide min-w-[100vw] h-screen flex-shrink-0 flex items-center justify-center bg-black">
                <div className="content w-[90%] md:w-2/3 mx-auto">
                  <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">Sell your books</h2>
                  <ul className="space-y-3 md:space-y-4 text-base md:text-xl">
                    <li>• Subject guides</li>
                    <li>• Reference Books</li>
                    <li>• Notes</li>
                    <li>• Practical Copy </li>
                  </ul>
                </div>
              </div>
              <div className="slide min-w-[100vw] h-screen flex-shrink-0 flex items-center justify-center bg-black">
                <div className="content w-[90%] md:w-2/3 mx-auto">
                  <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">NCERT Books</h2>
                  <ul className="space-y-3 md:space-y-4 text-base md:text-xl">
                    <li>• Complete set for all classes</li>
                    <li>• Latest editions available</li>
                    <li>• Best market prices</li>
                  </ul>
                </div>
              </div>

              <div className="slide min-w-[100vw] h-screen flex-shrink-0 flex items-center justify-center bg-black">
                <div className="content w-[90%] md:w-2/3 mx-auto">
                  <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">Reference Materials</h2>
                  <ul className="space-y-3 md:space-y-4 text-base md:text-xl">
                    <li>• Subject guides</li>
                    <li>• Practice questions</li>
                    <li>• Solved examples</li>
                  </ul>
                </div>
              </div>

              <div className="slide min-w-[100vw] h-screen flex-shrink-0 flex items-center justify-center bg-black">
                <div className="content w-[90%] md:w-2/3 mx-auto">
                  <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">Stationery</h2>
                  <ul className="space-y-3 md:space-y-4 text-base md:text-xl">
                    <li>• Premium notebooks</li>
                    <li>• Writing instruments</li>
                    <li>• Drawing supplies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={paraRef} className="w-full">
          <Para />
        </div>
      </div>
    </div>
  );
}