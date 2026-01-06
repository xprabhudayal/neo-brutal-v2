'use client';

import { useState } from 'react';
import NeoNavbar from './NeoNavbar';
import NeoFooter from './NeoFooter';
import LiveChatModal from './LiveChatModal';
import BetaWarningModal from './BetaWarningModal'; // Import new component
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
      <main className="w-full min-h-screen bg-neo-bg">
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
