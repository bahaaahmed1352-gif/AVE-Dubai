'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface BottomDockProps {
  visible: boolean;
}

export const BottomDock: React.FC<BottomDockProps> = ({ visible }) => {
  const handleReserve = () => {
    // open inline booking overlay (placeholder hook-in)
    const event = new CustomEvent('ave:open-reservation');
    window.dispatchEvent(event);
  };

  const handleMenu = () => {
    // cinematic transition then redirect
    document.body.classList.add('ave-menu-transition');
    setTimeout(() => {
      window.location.href =
        'https://qr.finedinemenu.com/ave-restaurant/menu/697a4f44d7174724382a6f6c';
    }, 450);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="fixed bottom-4 left-0 right-0 z-30 flex justify-center px-4 md:px-0 pointer-events-none"
        >
          <div className="pointer-events-auto glass-dock flex items-center gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-3 rounded-full border border-cream/10 bg-obsidian/70 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.75)]">
            <button
              onClick={handleReserve}
              className="inline-flex items-center justify-center rounded-full bg-gold text-obsidian text-[11px] md:text-xs font-medium tracking-[0.22em] uppercase px-4 py-2 hover:bg-amber transition-colors"
            >
              Reserve Your Table
            </button>
            <button
              onClick={handleMenu}
              className="inline-flex items-center justify-center rounded-full border border-cream/25 text-cream text-[11px] md:text-xs tracking-[0.22em] uppercase px-4 py-2 hover:border-gold/80 hover:text-gold transition-colors"
            >
              Discover Our Culinary Menu
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
