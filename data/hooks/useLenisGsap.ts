'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseLenisGsapProps {
  onProgress: (progress: number) => void;
  container: React.RefObject<HTMLElement | null>;
}

export const useLenisGsap = ({ onProgress, container }: UseLenisGsapProps) => {
  useEffect(() => {
    if (!container.current) return;

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.12,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll, limit }: any) => {
      const progress = limit === 0 ? 0 : scroll / limit;
      onProgress(progress);
      ScrollTrigger.update();
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({
        scroller: container.current || undefined,
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          onProgress(self.progress);
        },
      });
    }, container);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [container, onProgress]);
};
