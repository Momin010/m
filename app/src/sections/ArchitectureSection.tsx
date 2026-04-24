import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    id: 'kernel',
    label: 'Substrate Kernel',
    sublabel: 'Host OS',
    color: '#34d399',
    description: 'Manages agent lifecycle, scheduling, and inter-agent communication. The foundation everything runs on.',
    y: 0,
    width: '100%',
  },
  {
    id: 'sandbox',
    label: 'Execution Sandbox',
    sublabel: 'overlayfs + chroot',
    color: '#f59e0b',
    description: 'OS-level isolation. Each agent gets its own filesystem, process space, and enforced resource limits.',
    y: 1,
    width: '88%',
  },
  {
    id: 'policy',
    label: 'Policy Enforcer',
    sublabel: 'Constitutional Laws',
    color: '#a78bfa',
    description: 'Intercepts every tool call. Validates against 6 constitutional laws before any action executes.',
    y: 2,
    width: '76%',
  },
  {
    id: 'ledger',
    label: 'State Ledger',
    sublabel: 'Cryptographic Audit',
    color: '#5b8fff',
    description: 'Append-only, cryptographically signed record of every agent operation. Immutable. Tamper-proof.',
    y: 3,
    width: '64%',
  },
  {
    id: 'cognitive',
    label: 'Cognitive Core',
    sublabel: 'LLM Brain',
    color: '#00d1c1',
    description: 'The reasoning engine. Isolated from all system resources by default. Communicates only through tools.',
    y: 4,
    width: '52%',
  },
];

export default function ArchitectureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create floating particles
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const layerColors = [
      new THREE.Color('#34d399'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#5b8fff'),
      new THREE.Color('#00d1c1'),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const c = layerColors[Math.floor(Math.random() * layerColors.length)];
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let frame = 0;
    const animate = () => {
      frame++;
      particles.rotation.y = frame * 0.0003;
      particles.rotation.x = Math.sin(frame * 0.0002) * 0.1;
      renderer.render(scene, camera);
    };

    gsap.ticker.add(animate);

    const onResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.arch-heading');
    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 80%' },
        }
      );
    }

    const layerEls = section.querySelectorAll('.arch-layer');
    layerEls.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger && section.contains(t.vars.trigger as Element)) t.kill();
      });
    };
  }, []);

  const active = layers.find((l) => l.id === activeLayer);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#050505',
        padding: '12rem 2rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.72rem',
              color: 'rgba(0,209,193,0.8)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1.5rem',
            }}
          >
            System Architecture
          </span>
          <h2
            className="arch-heading"
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
            First-class entity model
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.45)',
              marginTop: '1.5rem',
              maxWidth: '500px',
              margin: '1.5rem auto 0',
              lineHeight: 1.6,
            }}
          >
            An agent is not a script. It is a dual-component entity with strict separation between cognition and execution.
          </p>
        </div>

        {/* Main layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left: Layer stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {layers.map((layer) => {
              const isActive = activeLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  className="arch-layer"
                  style={{
                    width: layer.width,
                    margin: '0 auto',
                    padding: '1.25rem 1.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${isActive ? layer.color : 'rgba(255,255,255,0.08)'}`,
                    background: isActive ? `${layer.color}12` : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer(null)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: layer.color,
                        boxShadow: isActive ? `0 0 12px ${layer.color}` : 'none',
                        flexShrink: 0,
                        transition: 'box-shadow 0.3s',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                        transition: 'color 0.3s',
                      }}
                    >
                      {layer.label}
                    </span>
                  </div>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65rem',
                      color: isActive ? layer.color : 'rgba(255,255,255,0.25)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      transition: 'color 0.3s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {layer.sublabel}
                  </span>
                </div>
              );
            })}

            {/* Description panel */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '80px',
                transition: 'all 0.3s ease',
              }}
            >
              {active ? (
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  <span style={{ color: active.color, fontWeight: 500 }}>{active.label}: </span>
                  {active.description}
                </p>
              ) : (
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.2)',
                    fontStyle: 'italic',
                  }}
                >
                  Hover a layer to learn more
                </p>
              )}
            </div>
          </div>

          {/* Right: 3D canvas */}
          <div
            style={{
              position: 'relative',
              height: '500px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
            {/* Overlay label */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.25rem',
                  }}
                >
                  agentd runtime
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  75 tools · Unix socket API · Rust
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}
              >
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
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            marginTop: '6rem',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {[
            { value: '75', label: 'Built-in tools', sub: 'across 14 categories' },
            { value: '6', label: 'Constitutional laws', sub: 'enforced at substrate level' },
            { value: '<1ms', label: 'Audit latency', sub: 'cryptographic overhead' },
            { value: '100%', label: 'Agent isolation', sub: 'overlayfs + chroot' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#050505',
                padding: '2.5rem 2rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  marginBottom: '0.5rem',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.label}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
