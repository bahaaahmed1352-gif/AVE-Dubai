'use client';

import { useEffect, useMemo, useState } from 'react';

interface UseSequenceLoaderProps {
  desktopBasePath: string;
  mobileBasePath: string;
  frameCount: number;
  preloadThreshold: number; // 0.3 = 30%
  onInitialReady?: () => void;
}

export const useSequenceLoader = ({
  desktopBasePath,
  mobileBasePath,
  frameCount,
  preloadThreshold,
  onInitialReady,
}: UseSequenceLoaderProps) => {
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [initialReady, setInitialReady] = useState(false);

  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    []
  );

  useEffect(() => {
    const basePath = isMobile ? mobileBasePath : desktopBasePath;
    const imgs: HTMLImageElement[] = [];
    let cancelled = false;

    const handleLoaded = () => {
      if (cancelled) return;
      setLoadedCount((prev) => prev + 1);
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `${basePath}/${String(i).padStart(4, '0')}.webp`;
      img.loading = 'eager';
      img.decode?.().catch(() => undefined);
      img.onload = handleLoaded;
      imgs.push(img);
    }

    setFrames(imgs);

    return () => {
      cancelled = true;
    };
  }, [desktopBasePath, mobileBasePath, frameCount, isMobile]);

  useEffect(() => {
    if (!initialReady && frameCount > 0) {
      const ratio = loadedCount / frameCount;
      if (ratio >= preloadThreshold) {
        setInitialReady(true);
        onInitialReady?.();
      }
    }
  }, [loadedCount, frameCount, preloadThreshold, initialReady, onInitialReady]);

  const loadedRatio = frameCount === 0 ? 0 : loadedCount / frameCount;

  return { frames, loadedRatio, initialReady };
};
