import { useEffect, useRef } from 'react';

/**
 * useFooterAnimation — Premium flowing wave + particle animation for the dark footer.
 * Uses Canvas 2D for lightweight performance.
 * Pauses when footer is off-screen via IntersectionObserver.
 * Respects prefers-reduced-motion.
 */
export function useFooterAnimation(canvasRef) {
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 768;

    let width, height, time = 0;
    let active = true;
    let visible = true;

    // Wave config
    const WAVES = isMobile ? 3 : 5;
    const PARTICLES = isMobile ? 20 : 45;

    const waves = Array.from({ length: WAVES }, (_, i) => ({
      amplitude: 18 + i * 8,
      frequency: 0.006 + i * 0.003,
      speed: 0.006 + i * 0.002,
      offset: (i / WAVES) * Math.PI * 2,
      opacity: 0.06 + i * 0.02,
      color: i % 2 === 0 ? '0,191,255' : '8,120,201',
      yBase: 0, // set in resize
    }));

    const particles = [];

    class FooterParticle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 4;
        this.vy = -(Math.random() * 0.4 + 0.2);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.8 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.15;
        this.life = 1;
        this.decay = Math.random() * 0.002 + 0.001;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -4) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,191,255,${this.opacity * this.life})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00BFFF';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(DPR, DPR);

      // Set wave base positions
      waves.forEach((w, i) => {
        w.yBase = height * (0.35 + i * 0.12);
      });

      // Init particles
      if (particles.length === 0) {
        for (let i = 0; i < PARTICLES; i++) {
          particles.push(new FooterParticle());
        }
      }
    }

    function drawWave(wave) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 3) {
        const y = wave.yBase +
          Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.3) * (wave.amplitude * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, wave.yBase - wave.amplitude, 0, height);
      grad.addColorStop(0, `rgba(${wave.color},${wave.opacity})`);
      grad.addColorStop(1, `rgba(${wave.color},0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    function drawLightTrails() {
      const trailCount = isMobile ? 2 : 4;
      for (let t = 0; t < trailCount; t++) {
        const xStart = (time * 0.4 * (t + 1) * 60) % (width + 200) - 100;
        const yPos = height * (0.2 + t * 0.2);
        const trailLen = 100 + t * 50;
        const grad = ctx.createLinearGradient(xStart - trailLen, yPos, xStart + 40, yPos);
        grad.addColorStop(0, 'rgba(0,191,255,0)');
        grad.addColorStop(0.7, `rgba(0,191,255,0.05)`);
        grad.addColorStop(1, 'rgba(0,191,255,0)');
        ctx.beginPath();
        ctx.moveTo(xStart - trailLen, yPos);
        ctx.lineTo(xStart + 40, yPos);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function animate() {
      if (!active) return;
      if (!visible) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 1;
      ctx.clearRect(0, 0, width, height);

      waves.forEach(drawWave);
      drawLightTrails();
      particles.forEach(p => { p.update(); p.draw(); });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(canvas.parentElement || canvas);

    const handleResize = () => {
      cancelAnimationFrame(animFrameRef.current);
      resize();
      animate();
    };
    window.addEventListener('resize', handleResize);

    resize();
    animate();

    return () => {
      active = false;
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
}
