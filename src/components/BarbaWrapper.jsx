import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initBarba, addNamespace } from '../utils/barbaTransitions';

// This component initializes Barba.js and handles page transitions
const BarbaWrapper = ({ children }) => {
  const location = useLocation();
  const initialized = useRef(false);
  const pathname = location.pathname;

  // Set appropriate namespace based on current route
  useEffect(() => {
    const namespace = pathname === '/' || pathname === '/home' 
      ? 'home' 
      : pathname.substring(1).replace('/', '-');
    
    addNamespace(namespace);
  }, [pathname]);

  // Initialize Barba.js once
  useEffect(() => {
    if (!initialized.current) {
      initBarba();
      initialized.current = true;
    }
  }, []);

  // Wrapper with data-barba="wrapper" attribute
  return (
    <div data-barba="wrapper">
      {children}
    </div>
  );
};

export default BarbaWrapper; 