import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MagneticButton from '@/components/MagneticButton';

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const hero = heroRef.current;
    if (!hero) return;
    const els = hero.querySelectorAll('.contact-el');
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        background: '#000000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10rem 2rem 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(91,143,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={heroRef}
        style={{
          width: '100%',
          maxWidth: '640px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          className="contact-el font-mono"
          style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
            opacity: 0,
          }}
        >
          Contact
        </span>

        <h1
          className="contact-el"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            lineHeight: 0.95,
            marginBottom: '1.5rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            opacity: 0,
          }}
        >
          Let's talk
        </h1>

        <p
          className="contact-el"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '3.5rem',
            opacity: 0,
          }}
        >
          Reach out to explore how MowisAI can power your AI agent infrastructure. We respond within 24 hours.
        </p>

        {/* Contact info */}
        <div
          className="contact-el"
          style={{
            display: 'flex',
            gap: '2rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          {[
            { label: 'Email', value: 'momin.aldahdooh@gmail.com' },
            { label: 'Location', value: 'Helsinki, Finland' },
          ].map((item) => (
            <div key={item.label}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <form
            className="contact-el"
            onSubmit={handleSubmit}
            style={{ opacity: 0 }}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
            </div>
            <div style={{ marginBottom: '1.75rem' }}>
              <textarea
                placeholder="Tell us about your use case..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
            </div>
            <MagneticButton variant="light">Send message</MagneticButton>
          </form>
        ) : (
          <div
            style={{
              padding: '2.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(52,211,153,0.3)',
              background: 'rgba(52,211,153,0.05)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
            <p style={{ color: '#34d399', fontSize: '1rem', marginBottom: '0.5rem' }}>Message sent</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>We'll be in touch within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}
