import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlowFieldSVG from '@/components/FlowFieldSVG';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#signature-section',
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="signature-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F4F4F0',
      }}
    >
      <FlowFieldSVG />
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '640px',
          width: '90%',
          padding: '4rem',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          opacity: 0,
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
          }}
        >
          Our Philosophy
        </span>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}
        >
          The Power of Flow
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '2.5rem',
          }}
        >
          We engineer flow states for autonomous systems. Every agent action is scoped,
          logged, and reversible. From isolated sandboxes to massive parallel orchestration,
          MowisAI provides the foundation that lets developers and enterprises run AI agents
          safely, at scale, and in full isolation.
        </p>
        <MagneticButton variant="light">Read our methodology</MagneticButton>
      </div>
    </section>
  );
}
