import { useRef, useCallback, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'dark' | 'light';
  className?: string;
}

export default function MagneticButton({ children, onClick, variant = 'dark', className = '' }: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const isDark = variant === 'dark';

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`magnetic-btn ${className}`}
      style={{
        borderColor: isDark ? '#000000' : '#FFFFFF',
        color: isDark ? '#000000' : '#FFFFFF',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        btn.style.backgroundColor = isDark ? '#000000' : '#FFFFFF';
        btn.style.color = isDark ? '#FFFFFF' : '#000000';
      }}
      onMouseOut={(e) => {
        const btn = e.currentTarget;
        btn.style.backgroundColor = 'transparent';
        btn.style.color = isDark ? '#000000' : '#FFFFFF';
      }}
    >
      {children}
    </button>
  );
}
