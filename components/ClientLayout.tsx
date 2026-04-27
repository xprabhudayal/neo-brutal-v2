'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import NeoNavbar from './NeoNavbar';
import NeoFooter from './NeoFooter';

const VoiceOrb = dynamic(() => import('./VoiceOrb'), { ssr: false });
const BetaWarningModal = dynamic(() => import('./BetaWarningModal'), { ssr: false });
// import { ProgressiveBlur } from './ui/progressive-blur'; // Might clash with design, commenting out for now or removing.

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const pathname = usePathname();

  const handleOpenAI = () => {
    setShowWarning(true);
  };

  return (
    <>
      <NeoNavbar onOpenAI={handleOpenAI} />
      <main id="main-content" className="w-full min-h-screen bg-neo-bg overflow-x-hidden">
        <div key={pathname} className="route-fade">
          {children}
        </div>
      </main>
      <NeoFooter />

      {showWarning && (
        <BetaWarningModal
          onClose={() => setShowWarning(false)}
          onStart={() => {
            setShowWarning(false);
            setShowModal(true);
          }}
        />
      )}

      <VoiceOrb 
        isActiveProp={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}
