import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(dot, {
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        border: '1.5px solid #000000',
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(dot, {
        width: 8,
        height: 8,
        backgroundColor: '#000000',
        border: '0px solid transparent',
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    const addInteractiveListeners = () => {
      const interactiveEls = document.querySelectorAll('a, button, .magnetic-btn, [data-cursor-hover]');
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    addInteractiveListeners();
    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        backgroundColor: '#000000',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
      }}
    />
  );
}
