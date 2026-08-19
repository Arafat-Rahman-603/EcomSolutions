'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface CTASectionProps {
  onOpenApplication: () => void;
}

export default function CTASection({ onOpenApplication }: CTASectionProps) {
  return (
    <section className="relative py-28 lg:py-36 bg-[#0B0D0F] overflow-hidden">
      {/* Dynamic Ambient Lavender/Pink Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[450px] bg-gradient-to-r from-[#D7A6B8]/20 via-[#A79CC8]/20 to-[#7F89C5]/20 rounded-full blur-[140px] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D0F] via-transparent to-[#0B0D0F]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D7A6B8]" />
          <span className="text-xs font-semibold tracking-widest text-[#A79CC8] uppercase font-mono">
            ACCEPTING NEW STORE ALLOCATIONS FOR Q2/Q3
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#F3F3F1] leading-[1.1]"
        >
          Ready to build your next{' '}
          <span className="text-gradient">e-commerce business?</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-[#96989F] font-normal leading-relaxed max-w-2xl mx-auto"
        >
          Let our dedicated operations team handle daily inventory, supplier contracts, and automated sales while you focus on the bigger picture.
        </motion.p>

        {/* Large Magnetic CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            variant="primary"
            onClick={onOpenApplication}
            className="!py-5 !px-10 text-base sm:text-lg font-bold shadow-[0_0_50px_rgba(215,166,184,0.5)] hover:shadow-[0_0_70px_rgba(215,166,184,0.8)]"
          >
            <span>Apply for a Store</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </MagneticButton>
        </motion.div>

        {/* Safety & Compliance Micro Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6E7078]"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#D7A6B8]" />
            Strict Performance Standards
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#A79CC8]" />
            100% Asset Ownership Retained
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#7F89C5]" />
            Rapid 7-14 Day Execution
          </span>
        </motion.div>
      </div>
    </section>
  );
}
