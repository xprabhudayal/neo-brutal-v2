'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import NeoNavbar from './NeoNavbar';
import NeoFooter from './NeoFooter';

const LiveChatModal = dynamic(() => import('./LiveChatModal'), { ssr: false });
const BetaWarningModal = dynamic(() => import('./BetaWarningModal'), { ssr: false });
// import { ProgressiveBlur } from './ui/progressive-blur'; // Might clash with design, commenting out for now or removing.

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleOpenAI = () => {
    setShowWarning(true);
  };

  return (
    <>
      <NeoNavbar onOpenAI={handleOpenAI} />
      <main id="main-content" className="w-full min-h-screen bg-neo-bg">
        {children}
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

      {showModal && <LiveChatModal onClose={() => setShowModal(false)} />}
    </>
  );
}
