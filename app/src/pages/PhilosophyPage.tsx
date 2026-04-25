import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GovernanceSection from '@/sections/GovernanceSection';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: 'Agent-Native Architecture',
    body: 'Built from scratch for agents, not retrofitted from process models or containers designed for humans. The execution model treats agents as first-class computational entities.',
    color: '#00d1c1',
  },
  {
    title: 'Security as a Substrate',
    body: 'Isolation and governance live at the execution layer — not in middleware or application code that agents can bypass. Security is not a feature. It is the foundation.',
    color: '#5b8fff',
  },
  {
    title: 'Transparent by Design',
    body: 'Every computation is traceable. Every agent action produces a signed, immutable audit entry. You always know what happened, when, and why.',
    color: '#a78bfa',
  },
  {
    title: 'Composable Trust',
    body: 'Agents can delegate capability to child agents with scoped, revocable permissions — full trust hierarchies. Authority flows downward only, never upward.',
    color: '#34d399',
  },
];

export default function PhilosophyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const hero = heroRef.current;
    const ctx = gsap.context(() => {
      if (hero) {
        const els = hero.querySelectorAll('.phil-hero-el');
        gsap.fromTo(els,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
        );
      }

      const cards = principlesRef.current?.querySelectorAll('.principle-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: principlesRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#F4F4F0', minHeight: '100vh' }}>
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
          background: 'linear-gradient(180deg, #ffffff 0%, #F4F4F0 100%)',
        }}
      >
        <span
          className="phil-hero-el font-mono"
          style={{
            fontSize: '0.72rem',
            color: 'rgba(0,0,0,0.35)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          Philosophy
        </span>
        <h1
          className="phil-hero-el"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#0a0a0a',
            lineHeight: 0.95,
            marginBottom: '2rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            opacity: 0,
          }}
        >
          The foundation<br />
          <span style={{ fontStyle: 'normal', color: 'rgba(0,0,0,0.35)' }}>we build on</span>
        </h1>
        <p
          className="phil-hero-el"
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.65,
            color: 'rgba(0,0,0,0.5)',
            maxWidth: '520px',
            opacity: 0,
          }}
        >
          Not a set of policies you configure. A set of enforced substrate guarantees that every agent inherits automatically.
        </p>
      </div>

      {/* Principles */}
      <div
        ref={principlesRef}
        style={{
          background: '#F4F4F0',
          padding: '8rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {principles.map((p, i) => (
              <div
                key={i}
                className="principle-card"
                style={{
                  padding: '3rem',
                  borderRadius: '16px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.07)',
                  opacity: 0,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { y: -4, boxShadow: '0 20px 50px rgba(0,0,0,0.08)', duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { y: 0, boxShadow: 'none', duration: 0.3 });
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${p.color}, transparent)`,
                  }}
                />
                <div
                  style={{
                    width: '10px', height: '10px',
                    borderRadius: '50%',
                    background: p.color,
                    marginBottom: '1.5rem',
                    boxShadow: `0 0 16px ${p.color}60`,
                  }}
                />
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: '#0a0a0a',
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.97rem',
                    lineHeight: 1.7,
                    color: 'rgba(0,0,0,0.55)',
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Governance laws */}
      <GovernanceSection />
    </div>
  );
}
