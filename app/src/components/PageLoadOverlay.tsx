import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoadOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      opacity: 0,
      duration: 1.2,
      ease: 'expo.out',
      onComplete: () => {
        overlay.style.display = 'none';
      },
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFFFFF',
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    />
  );
}
