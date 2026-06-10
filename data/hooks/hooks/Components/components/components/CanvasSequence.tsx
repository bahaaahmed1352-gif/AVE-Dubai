'use client';

import { useEffect, useRef } from 'react';

interface CanvasSequenceProps {
  frames: HTMLImageElement[];
  progress: number; // 0–1
  className?: string;
}

export const CanvasSequence: React.FC<CanvasSequenceProps> = ({
  frames,
  progress,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentFrameIndexRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    contextRef.current = context;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameIndexRef.current);
    };

    const drawFrame = (index: number) => {
      if (!contextRef.current || !frames[index]) return;
      const ctx = contextRef.current;
      const img = frames[index];
      const { innerWidth, innerHeight } = window;

      ctx.clearRect(0, 0, innerWidth, innerHeight);

      const imgRatio = img.width / img.height;
      const canvasRatio = innerWidth / innerHeight;

      let renderWidth = innerWidth;
      let renderHeight = innerHeight;

      if (imgRatio > canvasRatio) {
        renderHeight = innerHeight;
        renderWidth = imgRatio * renderHeight;
      } else {
        renderWidth = innerWidth;
        renderHeight = renderWidth / imgRatio;
      }

      const x = (innerWidth - renderWidth) / 2;
      const y = (innerHeight - renderHeight) / 2;

      ctx.drawImage(img, x, y, renderWidth, renderHeight);
    };

    const handleResize = () => resize();

    window.addEventListener('resize', handleResize);
    resize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [frames]);

  useEffect(() => {
    if (!frames.length) return;
    const index = Math.min(
      frames.length - 1,
      Math.max(0, Math.floor(progress * (frames.length - 1)))
    );
    currentFrameIndexRef.current = index;

    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    const img = frames[index];
    if (!canvas || !ctx || !img) return;

    const { innerWidth, innerHeight } = window;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const imgRatio = img.width / img.height;
    const canvasRatio = innerWidth / innerHeight;

    let renderWidth = innerWidth;
    let renderHeight = innerHeight;

    if (imgRatio > canvasRatio) {
      renderHeight = innerHeight;
      renderWidth = imgRatio * renderHeight;
    } else {
      renderWidth = innerWidth;
      renderHeight = renderWidth / imgRatio;
    }

    const x = (innerWidth - renderWidth) / 2;
    const y = (innerHeight - renderHeight) / 2;

    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  }, [progress, frames]);

  return (
    <canvas
      ref={canvasRef}
      className={`block bg-obsidian ${className}`}
      aria-hidden="true"
    />
  );
};
