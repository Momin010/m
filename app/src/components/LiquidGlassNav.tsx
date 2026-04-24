import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import gsap from 'gsap';

import logoImg from '@/assets/logo.png';

const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Contact', href: '/contact' },
];

export default function LiquidGlassNav() {
  const navRef = useRef<HTMLElement>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const ticking = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

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
        const vh = window.innerHeight;

        // Detect dark sections by sampling background color at nav position
        // Dark sections: ProblemSection, CapabilitiesSection, SandboxSection, GovernanceSection, Footer
        // We approximate by checking scroll position ranges on the home page
        const isHomePage = location.pathname === '/';
        const isCapabilitiesPage = location.pathname === '/capabilities';
        const isPhilosophyPage = location.pathname === '/philosophy';
        const isContactPage = location.pathname === '/contact';

        let dark = false;
        if (isCapabilitiesPage || isContactPage) {
          dark = true;
        } else if (isPhilosophyPage) {
          dark = false;
        } else if (isHomePage) {
          // Hero (0–1vh): light
          // Statement (1–3vh): light
          // Problem (3–6vh): dark
          // Capabilities carousel: dark
          // Sandbox: dark
          // Founders: light
          // Signature: light
          // Footer: dark
          const approxSection = currentY / vh;
          dark = approxSection > 2.5;
        }

        setIsDark(dark);

        // Hide/show
        if (currentY > 80) {
          if (delta > 4 && !isHidden.current) {
            isHidden.current = true;
            gsap.to(nav, { y: -90, opacity: 0, duration: 0.45, ease: 'power3.in' });
          } else if (delta < -4 && isHidden.current) {
            isHidden.current = false;
            gsap.to(nav, { y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' });
          }
        } else if (isHidden.current) {
          isHidden.current = false;
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' });
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      ref={navRef}
      className={isDark ? 'lg-nav lg-nav--dark' : 'lg-nav'}
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
        <div className="lg-backdrop" aria-hidden="true" />
        <div className="lg-inner-glow" aria-hidden="true" />
        <div className="lg-specular" aria-hidden="true" />
        <div className="lg-rim" aria-hidden="true" />

        {/* Logo */}
        <div
          className="lg-logo-wrap"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img
            src={logoImg}
            alt="MowisAI"
            style={{
              height: '22px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Links */}
        <div className="lg-links">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href || activeLink === link.label;
            return (
              <NavLink
                key={link.label}
                label={link.label}
                active={isActive}
                onEnter={() => setActiveLink(link.label)}
                onLeave={() => setActiveLink(null)}
                onClick={() => handleNavClick(link.href)}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="lg-cta-wrap">
          <button
            className="lg-cta-btn"
            onClick={() => navigate('/contact')}
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
  onClick,
}: {
  label: string;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href="#"
      className={`lg-link${active ? ' lg-link--active' : ''}`}
      onClick={(e) => { e.preventDefault(); onClick(); }}
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
