import { useRef } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useVoxelScene } from '@/hooks/useVoxelScene';
import CustomCursor from '@/components/CustomCursor';
import PageLoadOverlay from '@/components/PageLoadOverlay';
import LiquidGlassNav from '@/components/LiquidGlassNav';
import HeroSection from '@/sections/HeroSection';
import StatementSection from '@/sections/StatementSection';
import CapabilitiesSection from '@/sections/CapabilitiesSection';
import SignatureSection from '@/sections/SignatureSection';
import FooterSection from '@/sections/FooterSection';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLenis();
  useVoxelScene(canvasRef);

  return (
    <>
      <PageLoadOverlay />
      <CustomCursor />
      <LiquidGlassNav />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
      />
      <main>
        <HeroSection />
        <StatementSection />
        <CapabilitiesSection />
        <SignatureSection />
        <FooterSection />
      </main>
    </>
  );
}
