"use client";

import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const spacing = 45;
    const dots = [];

    const init = () => {
      dots.length = 0;
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          dots.push({
            x,
            y,
            originalX: x,
            originalY: y,
            size: 1,
          });
        }
      }
    };

    init();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
      init();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    const animate = () => {
      const isDark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        let dx = 0;
        let dy = 0;
        let dist = 0;

        if (mouse.x !== null && mouse.y !== null) {
          dx = mouse.x - dot.originalX;
          dy = mouse.y - dot.originalY;
          dist = Math.sqrt(dx * dx + dy * dy);
        }

        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          dot.x = dot.originalX - dx * force * 0.18;
          dot.y = dot.originalY - dy * force * 0.18;
          dot.size = 1 + force * 1.8;
        } else {
          dot.x += (dot.originalX - dot.x) * 0.1;
          dot.y += (dot.originalY - dot.y) * 0.1;
          dot.size += (1 - dot.size) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(238, 247, 242, 0.08)" : "rgba(12, 24, 17, 0.06)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full bg-transparent"
    />
  );
}
