import { useRef } from 'react';
import { Routes, Route } from 'react-router';
import { useLenis } from '@/hooks/useLenis';
import { useVoxelScene } from '@/hooks/useVoxelScene';
import CustomCursor from '@/components/CustomCursor';
import PageLoadOverlay from '@/components/PageLoadOverlay';
import LiquidGlassNav from '@/components/LiquidGlassNav';

// Home sections
import HeroSection from '@/sections/HeroSection';
import StatementSection from '@/sections/StatementSection';
import ProblemSection from '@/sections/ProblemSection';
import CapabilitiesSection from '@/sections/CapabilitiesSection';
import SandboxSection from '@/sections/SandboxSection';
import DemoSection from '@/sections/DemoSection';
import FoundersSection from '@/sections/FoundersSection';
import FooterSection from '@/sections/FooterSection';

// Pages
import CapabilitiesPage from '@/pages/CapabilitiesPage';
import PhilosophyPage from '@/pages/PhilosophyPage';
import ContactPage from '@/pages/ContactPage';

function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useVoxelScene(canvasRef);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: -1,
        }}
      />
      <main>
        <HeroSection />
        <StatementSection />
        <ProblemSection />
        <div id="work">
          <CapabilitiesSection />
        </div>
        <SandboxSection />
        <DemoSection />
        <FoundersSection />
        <FooterSection />
      </main>
    </>
  );
}

export default function App() {
  useLenis();

  return (
    <>
      <PageLoadOverlay />
      <CustomCursor />
      <LiquidGlassNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capabilities" element={<CapabilitiesPage />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}
