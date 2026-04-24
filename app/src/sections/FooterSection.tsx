import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoopingMarquee from '@/components/LoopingMarquee';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.fromTo(
      content,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#footer-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const navLinks = [
    { label: 'Home', action: () => navigate('/') },
    { label: 'Capabilities', action: () => navigate('/capabilities') },
    { label: 'Philosophy', action: () => navigate('/philosophy') },
    { label: 'Contact', action: () => navigate('/contact') },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/Momin010' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/momin-aldahdouh-49ab87380/' },
  ];

  return (
    <section
      id="footer-section"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      <LoopingMarquee />
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '700px',
          padding: '0 2rem',
          opacity: 0,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '2.5rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          Let&apos;s create something{' '}
          <em
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #d4b896 0%, #c4a0b0 50%, #8fb8a8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline',
            }}
          >
            timeless
          </em>
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '3rem',
          }}
        >
          Get in touch to explore how MowisAI can power your AI agent infrastructure.
        </p>
        <MagneticButton variant="light">Contact us</MagneticButton>

        <div
          style={{
            marginTop: '6rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Navigation
            </span>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => { e.preventDefault(); item.action(); }}
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'left' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Social
            </span>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.05em',
            }}
          >
            &copy; 2025 MOWISAI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </section>
  );
}
