'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Scene } from '@/data/scenes';

interface SceneTextProps {
  scene: Scene;
  progress: number;
}

export const SceneText: React.FC<SceneTextProps> = ({ scene }) => {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center px-6 md:px-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-3xl text-center"
        >
          {scene.kicker && (
            <div className="mb-4 text-[11px] md:text-xs tracking-[0.35em] uppercase text-amber/70">
              {scene.kicker}
            </div>
          )}
          <h2 className="mb-4 text-2xl md:text-4xl lg:text-5xl font-serif text-cream leading-tight">
            {scene.title}
          </h2>
          {scene.subtitle && (
            <p className="text-sm md:text-base text-cream/70 leading-relaxed">
              {scene.subtitle}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
