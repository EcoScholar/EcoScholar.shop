import { gsap } from 'gsap';

// Helper functions for more advanced transitions

// Slide transition - slides pages left/right
export const slideTransition = (element, direction, duration = 0.5) => {
  const xValue = direction === 'left' ? -100 : 100;
  
  return gsap.fromTo(
    element,
    { x: `${xValue}%`, opacity: 0 },
    { 
      x: '0%', 
      opacity: 1, 
      duration, 
      ease: 'power2.inOut',
      clearProps: 'all' 
    }
  );
};

// Fade transition with zoom
export const fadeZoomTransition = (element, zoomIn = true, duration = 0.5) => {
  const scale = zoomIn ? 0.8 : 1.2;
  
  return gsap.fromTo(
    element,
    { opacity: 0, scale },
    { 
      opacity: 1, 
      scale: 1, 
      duration, 
      ease: 'power2.out',
      clearProps: 'all' 
    }
  );
};

// Staggered fade-in for elements (useful for lists, grids, etc.)
export const staggeredFadeIn = (elements, staggerTime = 0.1, duration = 0.5) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      stagger: staggerTime, 
      duration, 
      ease: 'power2.out',
      clearProps: 'all' 
    }
  );
};

// Apply transition after page load
export const applyTransitionAfterLoad = (selector, transitionFn) => {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    transitionFn(elements);
  }
};

// Utility to preload images to prevent flashing during transitions
export const preloadImages = (images = []) => {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}; 