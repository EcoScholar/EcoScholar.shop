import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Maximize, Minimize } from 'lucide-react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Recommened from './Recommened';
import CanvasAnimation from './CanvasAnimation';
import ImageSlider from './ImageSlider';
import Homey from './Homey';
import Craft from './Craft';
import Real from './Real';
import Para from './Para';
import Capsules from './Capsules';
import Footer from '../../n.components/Footer';
import { Link, useNavigate } from 'react-router-dom';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isHeadingHidden, setIsHeadingHidden] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const [headingFontWeight, setHeadingFontWeight] = useState(700);
  const videoRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorBlurRef = useRef(null);
  const mainRef = useRef(null);
  const headingRef = useRef(null);

  // Toggle fullscreen video function
  const toggleFullscreenVideo = () => {
    setIsFullscreenVideo(!isFullscreenVideo);
  };

  // Function to adjust heading font weight based on screen width
  const adjustHeadingWeight = () => {
    const width = window.innerWidth;
    if (width < 480) {
      setHeadingFontWeight(400);
    } else if (width < 768) {
      setHeadingFontWeight(500);
    } else if (width < 1024) {
      setHeadingFontWeight(600);
    } else {
      setHeadingFontWeight(700);
    }
  };

  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      adjustHeadingWeight(); // Adjust heading weight on window resize
    };
    window.addEventListener('resize', checkMobile);

    // Initial call to set font weight on component mount
    adjustHeadingWeight();

    // Optimize video playback on mobile
    const videoElement = document.querySelector('#video video');
    if (videoElement) {
      // For better mobile performance
      if (isMobile) {
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('preload', 'auto');
        
        // Handle video loading issues
        videoElement.addEventListener('loadeddata', () => {
          videoElement.play().catch(e => {
            console.log('Auto-play prevented:', e);
            setVideoError(true);
          });
        });
      }
      
      // Handle video loading errors
      videoElement.addEventListener('error', () => {
        console.log('Video error occurred');
        setVideoError(true);
      });
    }

    // Handle mouse move for cursor effect
    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (cursorBlurRef.current) {
        cursorBlurRef.current.style.left = e.clientX - 250 + 'px';
        cursorBlurRef.current.style.top = e.clientY - 250 + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Handle scroll to hide/show heading
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsHeadingHidden(true);
      } else {
        setIsHeadingHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // GSAP Animations with slower scrub
    gsap.to(mainRef.current, {
      backgroundColor: '#000',
      scrollTrigger: {
        trigger: mainRef.current,
        scroller: "body",
        start: 'top -25%',
        end: 'top -70%',
        scrub: 2, // Increased scrub value for slower animation
      },
    });

    const cards = gsap.utils.toArray('.about-card');
    cards.forEach((card) => {
      gsap.from(card, {
        y: isMobile ? 50 : 100,
        opacity: 0,
        duration: isMobile ? 0.6 : 1, // Increased duration
        ease: "power2.out", // Changed to smoother ease
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
          scrub: 1.5 // Added slower scrub
        }
      });
    });

    const updateBodyTheme = () => {
      document.querySelectorAll(".section").forEach((section) => {
        const rect = section.getBoundingClientRect();
        const midpoint = window.innerHeight / 2;

        if (rect.top <= midpoint && rect.bottom >= midpoint) {
          const color = section.dataset.color;
          document.body.setAttribute("theme", color || "black");
        }
      });
    };

    window.addEventListener('scroll', updateBodyTheme);
    updateBodyTheme();

    gsap.utils.toArray(".card").forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.6 : 1, // Increased duration
        ease: "power2.out", // Changed to smoother ease
        delay: isMobile ? index * 0.1 : index * 0.2, // Increased delay between cards
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
          scrub: 1.5 // Added slower scrub
        }
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', updateBodyTheme);
      // Reset scroll behavior
      document.documentElement.style.scrollBehavior = '';
    };
  }, [isMobile]);

  // Add smooth scroll behavior to anchor links with slower duration
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          
          // Smooth scroll with custom timing function
          const duration = 2000; // 2 seconds duration
          const start = performance.now();
          
          function animate(currentTime) {
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smoother animation
            const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            
            window.scrollTo(0, startPosition + distance * easing(progress));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }
          
          requestAnimationFrame(animate);
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (  
    <>
      <div id='video' className={isFullscreenVideo ? 'fullscreen-video' : ''} ref={videoRef}>
        <video 
          src="/Doze Studio.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          onError={() => setVideoError(true)}
        />
        {videoError && (
          <div className="video-fallback"></div>
        )}
        {isFullscreenVideo && (
          <div className="fullscreen-overlay" onClick={toggleFullscreenVideo}>
            <h1 className="fullscreen-title">EcoScholar</h1>
            <p className="fullscreen-description">Welcome to our digital haven for knowledge seekers</p>
            <p className="fullscreen-hint">Click anywhere to exit fullscreen</p>
          </div>
        )}
      </div>
      
      {!isMobile && (
        <>
          <div ref={cursorRef} id="cursor" className="hidden md:block"></div>
          <div ref={cursorBlurRef} id="cursor-blur" className="hidden md:block"></div>
        </>
      )}
      <div ref={mainRef} id="main" style={{ margin: 0 }}>
        <div id="page1">
          <h1 
            ref={headingRef} 
            className={`eco-scholar-heading ${isHeadingHidden ? 'heading-hidden' : ''}`}
            style={{ fontWeight: headingFontWeight, userSelect: 'none' }}
          >
            EcoScholar
          </h1>
          
          <button 
            onClick={toggleFullscreenVideo} 
            className="fullscreen-toggle"
            aria-label={isFullscreenVideo ? "Exit fullscreen video" : "View fullscreen video"}
          >
            {isFullscreenVideo ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
         
          <div id="arrow">
            <ArrowDown size={50} />
          </div>
        </div>

       {!isMobile && <CanvasAnimation />}

        <div id="page2" style={{ margin: 0 }}>
          <div id="scroller">
            <div id="scroller-in">
              {['•RAZZAQ•' ,'•PRIYANSHU•','•RAZZAQ•' ,'•PRIYANSHU•', '•ASHMIN•'].map(
                (text) => (
                  <h4 key={text}>{text}</h4>
                )
              )}
            </div>
            <div id="scroller-in">
              {['•RAZZAQ•' ,'•PRIYANSHU•','•RAZZAQ•' ,'•PRIYANSHU•', '•ASHMIN•'].map(
                (text) => (
                  <h4 key={text}>{text}</h4>
                )
              )}
            </div>
          </div>

          <div id="about-us" className="relative flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 my-0 gap-4 section">
            <div id="about-us-in" className="w-full ">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">About Us – Built by Passion,</h3>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Fueled by Code</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Three students, one dream—born from a love for books and an obsession with coding. What started as late-night brainstorming turned into a digital haven for readers and writers alike. We built this platform with passion, blending technology and storytelling to create a space where books find new homes and ideas never fade. This isn't just a marketplace—it's our tribute to knowledge, creativity, and the magic of words.</p>   
                 <p>Welcome to our journey.</p>
            </div>
          </div>

          <div id="cards-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3 md:p-8">
            <div onClick={() => navigate('/all-items')} className="card p-3 rounded-lg shadow-lg text-sm md:text-base" id="card1">
              <h4 onClick={() => navigate('/all-items')} className="text-base md:text-xl font-semibold mb-1 md:mb-2">Collections 📚</h4>
              <p className="text-xs md:text-base">
                Discover, trade, and treasure books that whisper wisdom through time.
              </p>
            </div>
            <div onClick={() => navigate('/sell')} className="card p-3 rounded-lg shadow-lg text-sm md:text-base" id="card2">
              <h4 onClick={() => navigate('/sell')} className="text-base md:text-xl font-semibold mb-1 md:mb-2">Sell 📚</h4>
              <p className="text-xs md:text-base">
                From pens that glide to notebooks that listen—find tools that spark creativity.
              </p>
            </div>
            <div onClick={() => navigate('/studymaterials')} className="card p-3 rounded-lg shadow-lg text-sm md:text-base" id="card3">
              <h4 onClick={() => navigate('/studymaterials')} className="text-base md:text-xl font-semibold mb-1 md:mb-2">Study Materials 📚</h4>
              <p className="text-xs md:text-base">
                Curated for readers, writers, and visionaries—shop with purpose, sell with pride.
              </p>
            </div>
            <div onClick={() => navigate('/library')} className="card p-3 rounded-lg shadow-lg text-sm md:text-base" id="card4">
              <h4 onClick={() => navigate('/library')} className="text-base md:text-xl font-semibold mb-1 md:mb-2">Library 📚</h4>
              <p className="text-xs md:text-base">
                Access premium study resources, from textbooks to digital notes.
                Get everything you need for academic success in one place.
              </p>
            </div>
          </div>

          <ImageSlider />
        </div>

        <div className="animation-123-container" style={{ margin: 0 }}>
          <div className="main overflow-hidden w-full mx-auto px-4">
            <Homey />
            <Craft />
            <Real />
            <Banner />
            <Recommened />
            <TopSellers />
            <Para />
            <Capsules />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
