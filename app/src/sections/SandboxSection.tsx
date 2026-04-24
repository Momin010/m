import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const agents = [
  { id: 'agent-7f2a', color: '#00d1c1', task: 'Refactoring auth module', status: 'running', memory: '312mb', cpu: '18%' },
  { id: 'agent-3b9c', color: '#5b8fff', task: 'Writing unit tests', status: 'running', memory: '256mb', cpu: '12%' },
  { id: 'agent-1e4d', color: '#a78bfa', task: 'Generating API docs', status: 'complete', memory: '128mb', cpu: '0%' },
  { id: 'agent-8a2f', color: '#f59e0b', task: 'Fixing lint errors', status: 'running', memory: '198mb', cpu: '9%' },
  { id: 'agent-5c7e', color: '#34d399', task: 'Merging patches', status: 'merging', memory: '445mb', cpu: '34%' },
  { id: 'agent-2d6b', color: '#f87171', task: 'Security audit', status: 'running', memory: '289mb', cpu: '22%' },
];

export default function SandboxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Tick for live-feel updates
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  // 3D sandbox visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 6, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    // Colored point lights for each agent
    const agentColors = agents.map((a) => new THREE.Color(a.color));
    agentColors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 0.8, 8);
      const angle = (i / agents.length) * Math.PI * 2;
      light.position.set(Math.cos(angle) * 3, 1, Math.sin(angle) * 3);
      scene.add(light);
    });

    // Ground plane (host OS)
    const groundGeo = new THREE.PlaneGeometry(14, 14);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid lines on ground
    const gridHelper = new THREE.GridHelper(14, 14, 0x222222, 0x1a1a1a);
    gridHelper.position.y = -0.49;
    scene.add(gridHelper);

    // Agent sandbox boxes
    const sandboxMeshes: THREE.Mesh[] = [];
    agents.forEach((agent, i) => {
      const angle = (i / agents.length) * Math.PI * 2;
      const radius = 3.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const color = new THREE.Color(agent.color);

      // Outer sandbox boundary (wireframe)
      const boxGeo = new THREE.BoxGeometry(2.2, 1.8, 2.2);
      const boxMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.set(x, 0.4, z);
      scene.add(box);

      // Inner agent cube
      const innerGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      const innerMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.7,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      inner.position.set(x, 0.4, z);
      inner.castShadow = true;
      scene.add(inner);
      sandboxMeshes.push(inner);
    });

    // Central agentd daemon sphere
    const daemonGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const daemonMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const daemon = new THREE.Mesh(daemonGeo, daemonMat);
    daemon.position.set(0, 0.5, 0);
    scene.add(daemon);

    // Connection lines from daemon to agents
    agents.forEach((agent, i) => {
      const angle = (i / agents.length) * Math.PI * 2;
      const radius = 3.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const points = [
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(x, 0.4, z),
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(agent.color),
        transparent: true,
        opacity: 0.2,
      });
      scene.add(new THREE.Line(lineGeo, lineMat));
    });

    let frame = 0;
    const animate = () => {
      frame++;

      // Rotate sandbox boxes
      sandboxMeshes.forEach((mesh, i) => {
        mesh.rotation.y = frame * 0.01 + i * 0.5;
        mesh.rotation.x = Math.sin(frame * 0.008 + i) * 0.2;
        // Pulse scale
        const scale = 1 + Math.sin(frame * 0.05 + i * 1.2) * 0.08;
        mesh.scale.setScalar(scale);
      });

      // Daemon pulse
      daemon.scale.setScalar(1 + Math.sin(frame * 0.04) * 0.1);

      // Slowly orbit camera
      camera.position.x = Math.sin(frame * 0.002) * 2;
      camera.position.z = 12 + Math.cos(frame * 0.002) * 2;
      camera.lookAt(0, 0, 0);

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
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector('.sandbox-heading');
    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 80%' },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger && section.contains(t.vars.trigger as Element)) t.kill();
      });
    };
  }, []);

  const statusColor = (status: string) => {
    if (status === 'running') return '#34d399';
    if (status === 'complete') return '#5b8fff';
    if (status === 'merging') return '#f59e0b';
    return '#f87171';
  };

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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
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
              Parallel Execution
            </span>
            <h2
              className="sandbox-heading"
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
              Six agents.<br />
              <span style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.35)' }}>Zero interference.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '360px',
            }}
          >
            Each agent runs in its own isolated sandbox. They share nothing. They cannot corrupt each other. They all report to a single agentd daemon.
          </p>
        </div>

        {/* Main layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Agent list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {agents.map((agent) => {
              const isActive = activeAgent === agent.id;
              return (
                <div
                  key={agent.id}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '10px',
                    border: `1px solid ${isActive ? agent.color : 'rgba(255,255,255,0.07)'}`,
                    background: isActive ? `${agent.color}10` : 'rgba(255,255,255,0.02)',
                    cursor: 'default',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={() => setActiveAgent(agent.id)}
                  onMouseLeave={() => setActiveAgent(null)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: statusColor(agent.status),
                          boxShadow: `0 0 8px ${statusColor(agent.status)}`,
                          animation: agent.status === 'running' ? 'pulse-dot 2s ease-in-out infinite' : 'none',
                        }}
                      />
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.75rem',
                          color: isActive ? agent.color : 'rgba(255,255,255,0.5)',
                          letterSpacing: '0.04em',
                          transition: 'color 0.25s',
                        }}
                      >
                        {agent.id}
                      </span>
                    </div>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.65rem',
                        color: statusColor(agent.status),
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {agent.status}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(255,255,255,0.6)',
                      marginBottom: '0.75rem',
                      paddingLeft: '1.5rem',
                    }}
                  >
                    {agent.task}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      paddingLeft: '1.5rem',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}
                    >
                      MEM {agent.memory}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}
                    >
                      CPU {agent.cpu}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* agentd status */}
            <div
              style={{
                marginTop: '0.5rem',
                padding: '1rem 1.5rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: '0 0 8px rgba(255,255,255,0.8)',
                  }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}
                >
                  agentd daemon
                </span>
              </div>
              <span
                className="font-mono"
                style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}
              >
                /tmp/agentd.sock
              </span>
            </div>
          </div>

          {/* Right: 3D canvas */}
          <div
            style={{
              position: 'relative',
              height: '520px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
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
                style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}
              >
                LIVE · {agents.filter((a) => a.status === 'running').length} AGENTS RUNNING
              </span>
            </div>
          </div>
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
