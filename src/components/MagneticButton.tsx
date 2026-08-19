'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  href,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-tight rounded-full transition-all duration-300 select-none overflow-hidden cursor-pointer';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#D7A6B8] via-[#A79CC8] to-[#7F89C5] text-[#0B0D0F] font-semibold shadow-[0_0_25px_rgba(167,156,200,0.35)] hover:shadow-[0_0_40px_rgba(215,166,184,0.6)] px-7 py-3.5 text-[15px]',
    secondary:
      'bg-[#1A1C1F]/90 hover:bg-[#222426] text-[#F3F3F1] border border-white/10 hover:border-white/25 px-6 py-3.5 text-[15px] backdrop-blur-md',
    ghost:
      'bg-transparent hover:bg-white/[0.04] text-[#96989F] hover:text-[#F3F3F1] border border-transparent px-5 py-2.5 text-sm',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative z-10 flex items-center justify-center gap-2"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/15 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      {content}
    </button>
  );
}
