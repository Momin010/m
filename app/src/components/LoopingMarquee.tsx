import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoopingMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tween = gsap.fromTo(
      container,
      { x: 0 },
      {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  const text = 'MOWISAI';

  return (
    <div style={{ overflow: 'hidden', position: 'absolute', inset: 0 }}>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontSize: '15vw',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)',
              paddingRight: '0.2em',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
