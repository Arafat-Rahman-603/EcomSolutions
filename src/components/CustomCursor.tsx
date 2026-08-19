'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Glow Halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-[#A79CC8]/15 blur-md"
        animate={{
          x: mousePosition.x - (isHovered ? 28 : 16),
          y: mousePosition.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.15,
        }}
      />
      {/* Precision Dot */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full ${
          isHovered
            ? 'bg-gradient-to-r from-[#D7A6B8] to-[#7F89C5] shadow-[0_0_12px_rgba(215,166,184,0.8)]'
            : 'bg-white/80'
        }`}
        animate={{
          x: mousePosition.x - (isHovered ? 6 : 3),
          y: mousePosition.y - (isHovered ? 6 : 3),
          width: isHovered ? 12 : 6,
          height: isHovered ? 12 : 6,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 450,
          mass: 0.05,
        }}
      />
    </div>
  );
}
