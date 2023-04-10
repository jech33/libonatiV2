'use client';

import { ArrowCircleUp } from '@phosphor-icons/react';
import { useRef } from 'react';

const ScrollTopButton = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // When the user scrolls down 20px from the top of the document, show the button
  function scrollFunction() {
    if (!buttonRef.current) return;

    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      buttonRef.current.style.opacity = '1';
      buttonRef.current.style.pointerEvents = 'all';
    } else {
      buttonRef.current.style.opacity = '0';
      buttonRef.current.style.pointerEvents = 'none';
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  if (typeof window !== 'undefined') {
    // browser code
    window.addEventListener('scroll', scrollFunction);
  }

  return (
    <button
      className="fixed bottom-6 right-6 transition delay-100 z-50 bg-libonatiDarkBlack bg-opacity-50 backdrop-blur-xl rounded-[50%] opacity-0 pointer-events-none"
      ref={buttonRef}
      onClick={topFunction}
    >
      <ArrowCircleUp
        className="text-libonatiGold-40"
        size={46}
        weight="duotone"
      />
    </button>
  );
};

export default ScrollTopButton;
