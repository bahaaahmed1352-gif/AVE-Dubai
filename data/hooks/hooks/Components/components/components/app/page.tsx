'use client';

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CanvasSequence } from '@/components/CanvasSequence';
import { SceneText } from '@/components/SceneText';
import { BottomDock } from '@/components/BottomDock';
import { useSequenceLoader } from '@/hooks/useSequenceLoader';
import { useLenisGsap } from '@/hooks/useLenisGsap';
import { scenes } from '@/data/scenes';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1 scroll progress
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { frames, loadedRatio } = useSequenceLoader({
    desktopBasePath: '/sequences/desktop',
    mobileBasePath: '/sequences/mobile',
    frameCount: 320,
    preloadThreshold: 0.3,
    onInitialReady: () => setIsLoaded(true),
  });

  useLenisGsap({
    onProgress: (p) => setProgress(p),
    container: containerRef,
  });

  const currentScene = scenes.find(
    (scene) => progress >= scene.start && progress < scene.end
  ) ?? scenes[scenes.length - 1];

  const showDock = progress >= 0.8; // Scene 11–15 arc

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-obsidian text-cream font-sans antialiased overflow-hidden"
    >
      {/* Preloader overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian">
            <div className="mb-6 text-xs tracking-[0.35em] uppercase text-amber/70">
              AVE DUBAI
            </div>
            <div className="text-lg md:text-2xl font-serif text-cream mb-4">
              Preparing Your Ritual
            </div>
            <div className="w-40 h-[1px] bg-espresso/40 overflow-hidden">
              <div
                className="h-full bg-gold transition-all duration-300 ease-out"
                style={{ width: `${Math.round(loadedRatio * 100)}%` }}
              />
            </div>
            <div className="mt-4 text-[11px] tracking-[0.25em] uppercase text-cream/50">
              {Math.round(loadedRatio * 100)}% Curated
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Canvas cinematic layer */}
      <CanvasSequence
        frames={frames}
        progress={progress}
        className="fixed inset-0 z-0"
      />

      {/* Textual scene overlay */}
      <section className="relative z-10 pointer-events-none">
        <SceneText scene={currentScene} progress={progress} />
      </section>

      {/* Bottom CTA dock (mobile-first, also on desktop) */}
      <BottomDock visible={showDock} />

      {/* Accessibility / SEO content (off-canvas but crawlable) */}
      <section className="sr-only">
        <h1>AVE Dubai — Ultra-Premium Restaurant, Café, and Fine Dining Destination</h1>
        <p>
          A cinematic, scroll-driven journey through the AVE Dubai ritual—from bean to cup to
          architectural sanctuary overlooking the Dubai Fountain.
        </p>
      </section>
    </main>
  );
            }
