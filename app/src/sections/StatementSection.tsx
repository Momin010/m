import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const lines = linesRef.current;
    if (!section || lines.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: false,
      },
    });

    lines.forEach((line, i) => {
      const fromX = i % 2 === 0 ? '-100vw' : '100vw';
      tl.fromTo(
        line,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        i * 0.2
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  const lines = [
    'Execution is',
    'the foundation of',
    'every great system.',
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '200vh',
        zIndex: 2,
        background: 'linear-gradient(to bottom, transparent 0%, #F4F4F0 20%, #F4F4F0 80%, transparent 100%)',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) linesRef.current[i] = el;
            }}
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              opacity: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: i === 1 ? 'italic' : 'normal',
              color: '#0a0a0a',
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </section>
  );
}
