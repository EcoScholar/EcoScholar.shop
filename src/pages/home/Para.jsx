import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Para() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { 
        opacity: 0,
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} data-color="black" className="para-section section w-full min-h-screen bg-black py-8 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8 w-full">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          <div className="feature-card p-4 md:p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
            <h3 className="text-lg md:text-xl mb-3 md:mb-4">NCERT Books</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>• Class 6-12</li>
              <li>• All subjects</li>
              <li>• Latest editions</li>
            </ul>
          </div>

          <div className="feature-card p-4 md:p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
            <h3 className="text-lg md:text-xl mb-3 md:mb-4">Study Materials</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>• Reference books</li>
              <li>• Practice sets</li>
              <li>• Guide books</li>
            </ul>
          </div>

          <div className="feature-card p-4 md:p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
            <h3 className="text-lg md:text-xl mb-3 md:mb-4">Stationery</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li>• Notebooks</li>
              <li>• Writing tools</li>
              <li>• Art supplies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}