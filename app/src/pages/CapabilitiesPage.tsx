import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchitectureSection from '@/sections/ArchitectureSection';
import ToolsSection from '@/sections/ToolsSection';

gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const hero = heroRef.current;
    if (!hero) return;
    const els = hero.querySelectorAll('.cap-hero-el');
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '10rem 2rem 6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(0,209,193,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <span
          className="cap-hero-el font-mono"
          style={{
            fontSize: '0.72rem',
            color: 'rgba(0,209,193,0.7)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          Capabilities
        </span>
        <h1
          className="cap-hero-el"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            lineHeight: 0.95,
            marginBottom: '2rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            opacity: 0,
          }}
        >
          What MowisAI<br />
          <span style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.4)' }}>can do</span>
        </h1>
        <p
          className="cap-hero-el"
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '520px',
            opacity: 0,
          }}
        >
          A single Rust binary that combines OS-level isolation, 75 built-in tools, and a 5-layer orchestration engine — all in one deployable runtime.
        </p>

        {/* Stats */}
        <div
          className="cap-hero-el"
          style={{
            display: 'flex',
            gap: '3rem',
            marginTop: '4rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: 0,
          }}
        >
          {[
            { value: '75', label: 'Built-in tools' },
            { value: '5', label: 'Orchestration layers' },
            { value: '<512ms', label: 'Cold-start' },
            { value: '100%', label: 'Agent isolation' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                {s.value}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '0.68rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture + Tools sections */}
      <ArchitectureSection />
      <ToolsSection />
    </div>
  );
}
