import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlowFieldSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const svg = svgRef.current;
    if (!svg) return;

    const totalLines = 40;
    const waveHeight = 10;

    for (let j = 0; j < totalLines; j++) {
      let points = '';
      for (let i = 0; i <= 100; i += 0.5) {
        const y = 50 + j + (Math.sin(i * 0.1 + j * 0.2) * (Math.cos(j * 0.3) * waveHeight));
        points += `${i},${y} `;
      }
      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline.setAttribute('points', points);
      polyline.setAttribute('fill', 'none');
      polyline.setAttribute('stroke', '#000000');
      polyline.setAttribute('stroke-width', '0.5');
      polyline.setAttribute('vector-effect', 'non-scaling-stroke');
      polyline.classList.add('flow-line');
      svg.appendChild(polyline);
    }

    const lines = svg.querySelectorAll('.flow-line');
    gsap.fromTo(
      lines,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        stagger: { each: 0.05, from: 'random' },
        scrollTrigger: {
          trigger: '#signature-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0.15,
      }}
    />
  );
}
