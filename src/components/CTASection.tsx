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
    <section className="relative py-28 lg:py-40 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.05]">
      {/* Dynamic Ambient Lavender/Pink Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial gradient base */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0b0c0e]" />
        {/* Animated soft glow pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[380px] sm:h-[500px] bg-gradient-to-r from-[#d8a6b8]/18 via-[#a7a0cc]/18 to-[#8188c2]/18 rounded-full blur-[160px] opacity-80 animate-glow-pulse" />
        {/* Soft top & bottom fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0e] via-transparent to-[#0b0c0e]" />
        {/* Fine dotted texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-7"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d8a6b8]" />
          <span className="text-[11px] font-semibold tracking-[0.18em] text-[#a7a0cc] uppercase"
            style={{ fontFamily: 'var(--font-sans)' }}>
            LIMITED Q2 / Q3 ALLOCATIONS
          </span>
        </motion.div>

        {/* Heading - Large display with reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="font-display tracking-tight text-[#f2f2f0] heading-section"
        >
          Ready to build your next{' '}
          <span className="text-gradient">e-commerce</span>{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">automation business?</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-7 text-base sm:text-lg lg:text-xl text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Dedicated specialist teams running your Amazon, Walmart, eBay, and Facebook marketplace stores — end-to-end, fully managed, while you retain 100% ownership.
        </motion.p>

        {/* Large Magnetic CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            variant="primary"
            onClick={onOpenApplication}
            className="!py-5.5 !px-12 text-base sm:text-lg font-bold shadow-[0_0_55px_rgba(216,166,184,0.5)] hover:shadow-[0_0_80px_rgba(216,166,184,0.75)]"
          >
            <span className="tracking-wide">Apply for a Store</span>
            <ArrowRight className="w-5 h-5 ml-1.5" />
          </MagneticButton>
        </motion.div>

        {/* Safety & Compliance Micro Badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-14 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-[#6b6b73]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d8a6b8]" />
            Strict Performance Standards
          </span>
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#a7a0cc]" />
            100% Asset Ownership Retained
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#8188c2]" />
            Rapid 7-14 Day Execution
          </span>
        </motion.div>
      </div>
    </section>
  );
}
