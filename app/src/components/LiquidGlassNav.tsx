import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = ['Work', 'Capabilities', 'Philosophy', 'Contact'];

export default function LiquidGlassNav() {
  const navRef = useRef<HTMLElement>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  // Track scroll direction for hide/show
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance: slide down from above after page load
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 1.8 }
    );

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        // Only react after scrolling past the initial hero area
        if (currentY > 80) {
          if (delta > 4 && !isHidden.current) {
            // Scrolling DOWN — hide
            isHidden.current = true;
            gsap.to(nav, {
              y: -90,
              opacity: 0,
              duration: 0.45,
              ease: 'power3.in',
            });
          } else if (delta < -4 && isHidden.current) {
            // Scrolling UP — show
            isHidden.current = false;
            gsap.to(nav, {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'expo.out',
            });
          }
        } else if (isHidden.current) {
          // Back near top — always show
          isHidden.current = false;
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' });
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    >
      <div className="lg-pill">
        {/* Glass layers — order matters for stacking */}
        <div className="lg-backdrop" aria-hidden="true" />
        <div className="lg-inner-glow" aria-hidden="true" />
        <div className="lg-specular" aria-hidden="true" />
        <div className="lg-rim" aria-hidden="true" />

        {/* Logo */}
        <div className="lg-logo-wrap">
          <span className="lg-logo-text">Mowis</span>
        </div>

        {/* Nav links */}
        <div className="lg-links">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link}
              label={link}
              active={activeLink === link}
              onEnter={() => setActiveLink(link)}
              onLeave={() => setActiveLink(null)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="lg-cta-wrap">
          <button
            className="lg-cta-btn"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.25 })}
          >
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  label,
  active,
  onEnter,
  onLeave,
}: {
  label: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href="#"
      className={`lg-link${active ? ' lg-link--active' : ''}`}
      onMouseEnter={() => {
        onEnter();
        if (ref.current) gsap.to(ref.current, { y: -1.5, duration: 0.18, ease: 'power2.out' });
      }}
      onMouseLeave={() => {
        onLeave();
        if (ref.current) gsap.to(ref.current, { y: 0, duration: 0.22, ease: 'power2.out' });
      }}
    >
      {label}
    </a>
  );
}
