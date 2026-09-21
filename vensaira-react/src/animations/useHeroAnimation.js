import { useEffect, useRef } from 'react';

/**
 * useHeroAnimation — Enhanced Three.js neural network visual for the hero.
 * Falls back to Canvas 2D if Three.js unavailable.
 * Respects prefers-reduced-motion.
 */
export function useHeroAnimation(canvasRef) {
  const animFrameRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 22 : 48;
    const MAX_DIST = isMobile ? 100 : 145;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let width, height;
    let particles = [];
    state.mouse = { x: null, y: null, radius: 160 };

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
      createParticles();
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2.5 + 1.5;
        this.baseRadius = this.radius;
        // Cycle through blue spectrum
        const t = Math.random();
        this.color = t > 0.6
          ? '#00BFFF'
          : t > 0.3
            ? '#0878C9'
            : '#33A8F5';
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        this.pulse += 0.025;

        // Mouse repulsion
        const { mouse } = state;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.8;
            this.y -= (dy / dist) * force * 1.8;
          }
        }
      }

      draw() {
        const r = Math.max(0.5, this.baseRadius + Math.sin(this.pulse) * 0.7);
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.38;
            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            grad.addColorStop(0, `rgba(0,191,255,${opacity})`);
            grad.addColorStop(1, `rgba(8,120,201,${opacity})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }
    }

    let active = true;

    function animate() {
      if (!active) return;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient gradient
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, 'rgba(8,120,201,0.04)');
      grad.addColorStop(1, 'rgba(0,191,255,0.00)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      connectParticles();
      particles.forEach(p => { p.update(); p.draw(); });
      animFrameRef.current = requestAnimationFrame(animate);
    }

    // Events
    const handleResize = () => {
      cancelAnimationFrame(animFrameRef.current);
      resize();
      animate();
    };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse.x = e.clientX - rect.left;
      state.mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      state.mouse.x = null;
      state.mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    resize();
    animate();

    return () => {
      active = false;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef]);
}
