import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mominImg from '@/assets/me.png';
import wasayImg from '@/assets/wasay2.jpg';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'Momin Aldahdooh',
    role: 'Founder & CEO',
    bio: 'Founded a registered company at 14. Interned at the Finnish Parliament and Mayor\'s Office. Built MominOS, EventConnect, and now MowisAI.',
    initials: 'MA',
    color: '#00d1c1',
    photo: mominImg,
    links: {
      linkedin: 'https://www.linkedin.com/in/momin-aldahdouh-49ab87380/',
      github: 'https://github.com/Momin010',
    },
  },
  {
    name: 'Abdul Wasay Muhammad',
    role: 'Co-Founder & COO',
    bio: 'AI entrepreneur with deep roots in marketing and content strategy. Content & Marketing Lead at Since AI. Internship at Boost Turku.',
    initials: 'AW',
    color: '#5b8fff',
    photo: wasayImg,
    links: {
      linkedin: 'https://www.linkedin.com/in/abdulwasaymuhammad/',
      github: 'https://github.com/AWM909',
    },
  },
];

export default function FoundersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.founders-h');
    const cards = section.querySelectorAll('.founder-c');

    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 80%' },
        }
      );
    }

    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cards[0], start: 'top 85%' },
      }
    );

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
        background: '#F4F4F0',
        padding: '10rem 2rem',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.72rem',
              color: 'rgba(0,0,0,0.35)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1.25rem',
            }}
          >
            The Team
          </span>
          <h2
            className="founders-h"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: '#0a0a0a',
              lineHeight: 1.05,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              opacity: 0,
            }}
          >
            Built by builders
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {founders.map((f, i) => (
            <div
              key={i}
              className="founder-c"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '2.5rem',
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
                  background: `linear-gradient(90deg, ${f.color}, transparent)`,
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '48px', height: '48px',
                    borderRadius: '50%',
                    border: `2px solid ${f.color}40`,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={f.photo}
                    alt={f.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#0a0a0a', marginBottom: '0.2rem', letterSpacing: '-0.01em' }}>
                    {f.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.45)' }}>{f.role}</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
                  {[
                    { href: f.links.linkedin, label: 'in' },
                    { href: f.links.github, label: 'gh' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '30px', height: '30px',
                        borderRadius: '7px',
                        background: 'rgba(0,0,0,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        textDecoration: 'none',
                        fontSize: '0.72rem',
                        color: 'rgba(0,0,0,0.45)',
                        fontWeight: 500,
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.1)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.05)'; }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(0,0,0,0.58)' }}>
                {f.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
