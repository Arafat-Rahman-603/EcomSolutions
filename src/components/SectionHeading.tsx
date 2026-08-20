'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`relative mb-14 md:mb-20 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
      } ${className}`}
    >
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4 ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D7A6B8] to-[#7F89C5] animate-pulse" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#A79CC8]">
            {label}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-[#f2f2f0] leading-[1.08]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-4 md:mt-6 text-base sm:text-lg text-[#a1a1aa] font-normal leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
