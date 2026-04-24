import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: 'Sandboxing',
    subtitle: '01',
    description:
      'OS-level isolation through overlayfs and chroot. Every agent runs in its own lightweight, truly isolated execution environment. No VMs, no heavy container overhead.',
    bg: '#0d0d0d',
    accent: '#c8a96e',
  },
  {
    title: 'Built-in Tools',
    subtitle: '02',
    description:
      '75 built-in tools across 14 categories. From filesystem operations to HTTP requests, git workflows to developer utilities. Agents do real work out of the box.',
    bg: '#111108',
    accent: '#d4b896',
  },
  {
    title: 'Scale',
    subtitle: '03',
    description:
      'Architected for massive parallelism. Handle thousands of concurrent agents, each in full isolation. Whether 10 agents or 10,000, the model stays the same.',
    bg: '#0a0f0d',
    accent: '#8fb8a8',
  },
  {
    title: 'Compliance',
    subtitle: '04',
    description:
      'Finnish-built for European regulatory reality. Sovereign deployment with full data sovereignty. No data leaves your perimeter. Designed for GDPR, DORA, and AI Act.',
    bg: '#0f0a0d',
    accent: '#c4a0b0',
  },
];

export default function CapabilitiesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const numPanels = panels.length;

    const tween = gsap.to(container, {
      xPercent: -(numPanels - 1) * 100,
      ease: 'none',
      duration: 1,
    });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: () => `+=${(panels.length - 1) * 150}vh`,
      pin: true,
      pinSpacing: false,
      scrub: 1,
      anticipatePin: 1,
      animation: tween,
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="horizontal-wrapper" style={{ height: `${panels.length * 150}vh` }}>
      <div
        ref={containerRef}
        className="parallax-container"
        style={{
          display: 'flex',
          height: '100vh',
          width: `${panels.length * 100}vw`,
          willChange: 'transform',
        }}
      >
          {panels.map((panel, i) => (
            <div
              key={i}
              className="parallax-slide"
              style={{
                width: '100vw',
                flexShrink: 0,
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Background */}
              <div
                className="parallax-image-layer"
                style={{
                  position: 'absolute',
                  inset: '-20%',
                  backgroundColor: panel.bg,
                  willChange: 'transform',
                }}
              />

              {/* Subtle grain texture overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
                  opacity: 0.4,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  maxWidth: '640px',
                  padding: '0 4rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2.5rem',
                  }}
                >
                  <span
                    style={{
                      width: '2.5rem',
                      height: '1px',
                      background: panel.accent,
                      display: 'block',
                      opacity: 0.7,
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.7rem',
                      color: panel.accent,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      opacity: 0.8,
                    }}
                  >
                    {panel.subtitle}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    marginBottom: '1.75rem',
                    lineHeight: 1.0,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                  }}
                >
                  {panel.title}
                </h2>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.55)',
                    maxWidth: '420px',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {panel.description}
                </p>
              </div>

              {/* Large background number */}
              <div
                style={{
                  position: 'absolute',
                  right: '6vw',
                  bottom: '8vh',
                  fontSize: 'clamp(8rem, 18vw, 18rem)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                {panel.subtitle}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
