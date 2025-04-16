import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const words = ['Reuse ✨', 'Learn 📖', 'Thrive 💡'];
const images = [
  'https://assets-global.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483189_Ellipse%20845-1.png',
  'https://assets-global.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483184_Ellipse%20845.png',
  'https://assets-global.website-files.com/659dbdfd5a080be8d3483164/659dbdfd5a080be8d3483188_Ellipse%20845-2.png'
];

const Homey = () => {
  const homeyRef = useRef(null);

  useEffect(() => {
    if (!homeyRef.current) return;

    const isMobile = window.innerWidth < 768;
    
    // Initial setup
    gsap.set(".slidesm", { scale: isMobile ? 1.2 : 1.8 });

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: homeyRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Add animations to timeline
    tl.to(".vdodiv", {
      clipPath: "circle(0% at 50% 50%)",
      ease: "power2.inOut",
      duration: 1.5
    }, "start")
    .to(".slidesm", {
      scale: isMobile ? 0.6 : 0.8,
      ease: "power2.inOut",
      duration: 2.5
    }, "start+=0.5")
    .to(".lft", {
      x: isMobile ? "-4%" : "-8%",
      stagger: 0.2,
      ease: "power2.inOut",
      duration: 2
    }, "start+=1")
    .to(".rgt", {
      x: isMobile ? "4%" : "8%",
      stagger: 0.2,
      ease: "power2.inOut",
      duration: 2
    }, "start+=1");

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderRow = (direction, offset) => (
    <div className={`row ${direction} ${offset} w-full flex items-center justify-start gap-12 md:gap-48 whitespace-nowrap py-4 md:py-8`}>
      {Array(2).fill(words).flat().map((word, index) => (
        <div key={`${direction}-${word}-${index}`} className="elem flex items-center min-w-max">
          <div className="word-container flex items-center gap-4 md:gap-8">
            <h1 className="font-['Pp Neue Machina'] font-semibold text-2xl md:text-5xl tracking-tight min-w-max">{word}</h1>
            <div className="imgdiv min-w-[2rem] w-[2rem] h-[2rem] md:min-w-[3rem] md:w-[3rem] md:h-[3rem] overflow-hidden rounded-full bg-gray-100">
              <img src={images[index % images.length]} alt="" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={homeyRef} data-color="black" className="homey section w-full h-[200vh] relative">
      <div className="w-full sticky top-0 left-0">
        <div className="btmtext absolute z-[4] w-48 md:w-64 font-semibold bottom-[7%] left-[3%]">
          <h1 className="text-base md:text-xl text-center">A book unopened is a story untold… <br />
            Philosophy. Phycology. shelf-financing. <br />
            For real people. Real lives.</h1>
        </div>
        <div style={{ "--clip": "100%" }}
          className="vdodiv w-full h-screen z-[3] absolute top-0 left-0 bg-black overflow-hidden">
          <video autoPlay loop muted playsInline
            className="absolute w-full h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src="https://xgjzloifyvgpbmyonaya.supabase.co/storage/v1/object/public/files/bBj1XfrSyi/1ENIoa5sjq" />
        </div>
        <div className="marqueecontainer w-full h-screen relative overflow-hidden">
          <div className="heading w-64 md:w-96 font-semibold text-center absolute top-[7%] left-1/2 -translate-x-1/2">
            <h1 className="text-base md:text-xl font-regular">Trade words, trade wisdom, trade inspiration✨.</h1>
          </div>
          <div className="slidesm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%]">
            {renderRow('lft', '-translate-x-[5%]')}
            {renderRow('rgt', '-translate-x-[10%]')}
            {renderRow('lft', '-translate-x-[15%]')}
            {renderRow('rgt', '-translate-x-[20%]')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homey; 