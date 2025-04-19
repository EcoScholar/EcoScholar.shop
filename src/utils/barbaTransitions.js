import barba from '@barba/core';
import { gsap } from 'gsap';
import { fadeZoomTransition, slideTransition } from './pageTransitions';

// Initialize Barba transitions
export const initBarba = () => {
  // Add data-barba="container" to the main App component
  const container = document.querySelector('main');
  if (container) {
    container.setAttribute('data-barba', 'container');
  }

  // Initialize Barba with custom transitions
  barba.init({
    debug: false, // Set to true for debugging
    prevent: ({ el }) => el.classList && el.classList.contains('prevent-barba'),
    transitions: [
      // Default transition
      {
        name: 'fade-transition',
        leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
          });
        },
        enter(data) {
          window.scrollTo(0, 0); // Scroll to top on new page
          return gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
          });
        }
      },
      // Home page specific transition
      {
        name: 'home-transition',
        to: { namespace: ['home'] },
        leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
            scale: 1.1,
            duration: 0.6,
            ease: 'power2.inOut'
          });
        },
        enter(data) {
          window.scrollTo(0, 0);
          return fadeZoomTransition(data.next.container, true, 0.6);
        }
      },
      // Study materials transitions
      {
        name: 'study-transition',
        to: { namespace: ['study-materials', 'ebooks', 'projects', 'notes'] },
        leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
            x: '-50%',
            duration: 0.5,
            ease: 'power2.inOut'
          });
        },
        enter(data) {
          window.scrollTo(0, 0);
          return slideTransition(data.next.container, 'left', 0.5);
        }
      }
    ],
    views: [
      {
        namespace: 'home',
        beforeEnter() {
          // Special handling for home page if needed
        }
      },
      {
        namespace: ['study-materials', 'ebooks', 'projects', 'notes'],
        afterEnter() {
          // Handle specific elements in these pages
          const items = document.querySelectorAll('.card, .item, .product-card');
          if (items.length > 0) {
            gsap.fromTo(
              items,
              { opacity: 0, y: 20 },
              { 
                opacity: 1, 
                y: 0, 
                stagger: 0.05, 
                duration: 0.5, 
                ease: 'power2.out',
                clearProps: 'all' 
              }
            );
          }
        }
      }
    ]
  });
};

// Helper function to add namespace to body
export const addNamespace = (namespace) => {
  document.body.setAttribute('data-barba-namespace', namespace);
}; 