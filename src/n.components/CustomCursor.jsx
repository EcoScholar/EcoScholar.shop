import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const cursorBg = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      mainCursor.current.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0)`;
      cursorBg.current.style.transform = `translate3d(${mouseX - 100}px, ${mouseY - 100}px, 0)`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className="cursor-wrapper">
      <div className="main-cursor" ref={mainCursor}></div>
      <div className="cursor-background" ref={cursorBg}></div>
    </div>
  );
};

export default CustomCursor; 