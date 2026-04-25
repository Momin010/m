import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import demoVideo from '@/assets/demo.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function DemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      const heading = section.querySelector('.demo-heading');
      if (heading) {
        gsap.fromTo(heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 80%' },
          }
        );
      }

      // Video frame scales up on scroll into view
      gsap.fromTo(wrap,
        { opacity: 0, scale: 0.92, y: 60 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: wrap, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#000000',
        padding: '10rem 2rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Subtle grid */}
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

      {/* Glow behind video */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,209,193,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.72rem',
              color: 'rgba(0,209,193,0.7)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1.25rem',
            }}
          >
            Live Demo
          </span>
          <h2
            className="demo-heading"
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
            See it in action
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '1.25rem',
              maxWidth: '480px',
              margin: '1.25rem auto 0',
              lineHeight: 1.6,
            }}
          >
            Watch MowisAI's 5-layer orchestration engine run multiple isolated agents in parallel — all from a single Rust binary.
          </p>
        </div>

        {/* Video player */}
        <div
          ref={wrapRef}
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: '#000',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            opacity: 0,
          }}
        >
          <video
            ref={videoRef}
            src={demoVideo}
            style={{
              width: '100%',
              display: 'block',
              maxHeight: '65vh',
              objectFit: 'cover',
            }}
            loop
            playsInline
            onEnded={() => setPlaying(false)}
          />

          {/* Play/pause overlay */}
          <div
            onClick={togglePlay}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: playing ? 'transparent' : 'rgba(0,0,0,0.45)',
              transition: 'background 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              if (playing) (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              if (playing) (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            {!playing && (
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              >
                {/* Play triangle */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '12px solid transparent',
                    borderBottom: '12px solid transparent',
                    borderLeft: '20px solid rgba(255,255,255,0.9)',
                    marginLeft: '4px',
                  }}
                />
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1rem 1.5rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              MowisAI · agentd runtime · v0.1
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#34d399',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              <span
                className="font-mono"
                style={{ fontSize: '0.65rem', color: '#34d399', letterSpacing: '0.06em' }}
              >
                {playing ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>
          </div>
        </div>

        {/* Below video — pitch deck link */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/pitchdeck.pptx"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.7rem 1.5rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            <span>↓</span>
            <span>Download Pitch Deck</span>
          </a>
          <span
            className="font-mono"
            style={{
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            v0.1 Specification Available
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
}
