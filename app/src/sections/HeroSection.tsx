import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from '@/components/MagneticButton';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const words = wordsRef.current;
    if (words.length === 0) return;

    gsap.to(words, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.5,
    });

    const subtitle = sectionRef.current?.querySelector('.hero-subtitle');
    const cta = sectionRef.current?.querySelector('.hero-cta');

    if (subtitle) {
      gsap.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2,
      });
    }
    if (cta) {
      gsap.to(cta, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.4,
      });
    }
  }, []);

  const titleWords = ['We', 'craft', 'digital', 'ecosystems.'];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px', padding: '0 2rem', marginTop: '8rem' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 12vw, 12vw)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            marginBottom: '2rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) wordsRef.current[i] = el;
              }}
              className="hero-word"
              style={{ marginRight: '0.25em' }}
            >
              {word}
            </span>
          ))}
        </h1>
        <p
          className="hero-subtitle"
          style={{
            fontSize: '1.125rem',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#999999',
            marginBottom: '3rem',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          AI agent infrastructure for the real world.
          <br />
          Production-grade execution. Full data sovereignty. Built in Rust.
        </p>
        <div
          className="hero-cta"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <MagneticButton>Explore our work</MagneticButton>
        </div>
      </div>
    </section>
  );
}
