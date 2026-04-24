import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const laws = [
  {
    number: 'I',
    title: 'No Direct Action',
    description: 'Agents never act directly on the environment. Every interaction is mediated through the tool layer, which is governed and audited.',
    color: '#00d1c1',
  },
  {
    number: 'II',
    title: 'No Privilege Escalation',
    description: 'Permissions are fixed at spawn time. An agent cannot acquire capabilities beyond what was explicitly granted by its parent.',
    color: '#5b8fff',
  },
  {
    number: 'III',
    title: 'Hierarchical Authority',
    description: 'Child agents inherit a strict subset of parent permissions. Authority flows downward only. No agent can exceed its parent\'s scope.',
    color: '#a78bfa',
  },
  {
    number: 'IV',
    title: 'Explicit Communication',
    description: 'No hidden state sharing between agents. All inter-agent communication is explicit, logged, and routed through the substrate kernel.',
    color: '#f59e0b',
  },
  {
    number: 'V',
    title: 'Resource Boundaries',
    description: 'Strict CPU, RAM, and I/O limits enforced at the OS level. An agent cannot consume more than its allocated quota, ever.',
    color: '#34d399',
  },
  {
    number: 'VI',
    title: 'Immutable Audit Trail',
    description: 'Every action produces a cryptographically signed, append-only audit entry. The ledger cannot be modified or deleted.',
    color: '#f87171',
  },
];

export default function GovernanceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLaw, setActiveLaw] = useState<number | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.gov-heading');
    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 80%' },
        }
      );
    }

    const cards = section.querySelectorAll('.law-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 85%' },
      }
    );

    // Animate the vertical line
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 80%' },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger && section.contains(t.vars.trigger as Element)) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0a0a0a',
        padding: '12rem 2rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Subtle noise texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            marginBottom: '7rem',
            alignItems: 'end',
          }}
        >
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1.5rem',
              }}
            >
              Constitutional Framework
            </span>
            <h2
              className="gov-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                lineHeight: 1.05,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                opacity: 0,
              }}
            >
              Six laws.<br />
              <span style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.35)' }}>No exceptions.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              alignSelf: 'end',
            }}
          >
            Not a set of policies you configure. A set of enforced substrate guarantees that every agent inherits automatically — baked into the execution layer, not the application layer.
          </p>
        </div>

        {/* Laws grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {laws.map((law, i) => {
            const isActive = activeLaw === i;
            return (
              <div
                key={i}
                className="law-card"
                style={{
                  background: isActive ? '#111111' : '#0a0a0a',
                  padding: '3rem 2.5rem',
                  cursor: 'default',
                  transition: 'background 0.3s ease',
                  opacity: 0,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={() => setActiveLaw(i)}
                onMouseLeave={() => setActiveLaw(null)}
              >
                {/* Active left border */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    background: law.color,
                    transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'top',
                    transition: 'transform 0.3s ease',
                  }}
                />

                {/* Roman numeral */}
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    color: law.color,
                    letterSpacing: '0.1em',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Law
                  </span>
                  <span
                    style={{
                      fontSize: '1.1rem',
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: law.color,
                    }}
                  >
                    {law.number}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    marginBottom: '1rem',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {law.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  {law.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '4rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '0.5rem',
              }}
            >
              Every violation triggers an immediate termination event.
            </p>
            <p
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.05em',
              }}
            >
              Logged · Signed · Immutable
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {laws.map((law, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: law.color,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
