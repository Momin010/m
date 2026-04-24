import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: 'Agents share', italic: false },
  { text: 'the host OS.', italic: true },
  { text: 'Everything breaks.', italic: false },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Lines slide in from alternating sides — same feel as StatementSection
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    linesRef.current.forEach((line, i) => {
      if (!line) return;
      const fromX = i % 2 === 0 ? '-100vw' : '100vw';
      tl.fromTo(
        line,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
        i * 0.25
      );
    });

    // Sub-text fades in after lines
    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.9
      );
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '300vh',
        zIndex: 2,
        background: 'linear-gradient(to bottom, #F4F4F0 0%, #0a0a0a 30%, #0a0a0a 100%)',
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
          gap: '0.5rem',
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            ref={(el) => { if (el) linesRef.current[i] = el; }}
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              opacity: 0,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: line.italic ? 'italic' : 'normal',
              color: i === 2 ? 'rgba(255,100,100,0.85)' : '#FFFFFF',
            }}
          >
            {line.text}
          </div>
        ))}

        <div
          ref={subRef}
          style={{
            marginTop: '2.5rem',
            opacity: 0,
            textAlign: 'center',
            maxWidth: '560px',
            padding: '0 2rem',
          }}
        >
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Current frameworks treat agents as ephemeral scripts running directly on the host OS. No isolation. No governance. No audit trail.
          </p>
          <p
            style={{
              marginTop: '1rem',
              fontSize: '1.1rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
            }}
          >
            MowisAI is the execution layer that fixes this.
          </p>
        </div>
      </div>
    </section>
  );
}
