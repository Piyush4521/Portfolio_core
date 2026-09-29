import React, { useEffect, useRef } from 'react';

export default function TechnicalGridBackground({ colorMode = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = colorMode === 'light';

      // Subtle CAD-style engineering dot grid
      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.07)' : 'rgba(255, 255, 255, 0.04)';
      const spacing = 36;
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Subtle engineering blueprint axis lines
      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.03)';
      ctx.lineWidth = 1;

      // Subtle vertical guides
      ctx.beginPath();
      ctx.moveTo(width * 0.15, 0);
      ctx.lineTo(width * 0.15, height);
      ctx.moveTo(width * 0.85, 0);
      ctx.lineTo(width * 0.85, height);
      ctx.stroke();
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorMode]);

  return <canvas id="engineering-canvas" ref={canvasRef} />;
}
