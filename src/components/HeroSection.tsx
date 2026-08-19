'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  CheckCircle2,
  BarChart3,
  Globe2,
} from 'lucide-react';
import MagneticButton from './MagneticButton';

interface HeroSectionProps {
  onOpenApplication: (marketplace?: string) => void;
}

export default function HeroSection({ onOpenApplication }: HeroSectionProps) {
  const [activePlatform, setActivePlatform] = useState(0);

  const platforms = [
    {
      name: 'Amazon FBA & Dropship',
      short: 'Amazon',
      revenue: '$84,920.00',
      growth: '+314.8%',
      orders: '1,840',
      activeStatus: '99.9% Sync',
      profit: '28.4% Net Margin',
      color: '#D7A6B8',
      icon: '🛒',
    },
    {
      name: 'Walmart WFS Automation',
      short: 'Walmart',
      revenue: '$62,450.00',
      growth: '+189.2%',
      orders: '1,210',
      activeStatus: 'Express Sync',
      profit: '31.2% Net Margin',
      color: '#7F89C5',
      icon: '⚡',
    },
    {
      name: 'eBay Managed Stores',
      short: 'eBay',
      revenue: '$47,800.00',
      growth: '+142.5%',
      orders: '980',
      activeStatus: 'Auto-Bidding Active',
      profit: '24.6% Net Margin',
      color: '#A79CC8',
      icon: '💎',
    },
    {
      name: 'Facebook Social Commerce',
      short: 'FB Shop',
      revenue: '$38,150.00',
      growth: '+420.1%',
      orders: '840',
      activeStatus: 'Catalog Live',
      profit: '36.8% Net Margin',
      color: '#E0B5C4',
      icon: '🔥',
    },
  ];

  // Auto-cycle through platforms gently every 5s if user hasn't touched
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePlatform((prev) => (prev + 1) % platforms.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [platforms.length]);

  const curr = platforms[activePlatform];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Background Ambient Glows and Grid */}
      <div className="absolute inset-0 bg-[#0B0D0F] pointer-events-none">
        {/* Soft Lavender and Pink ambient lighting */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] lg:w-[900px] h-[450px] bg-gradient-to-b from-[#A79CC8]/15 via-[#D7A6B8]/10 to-transparent rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-1/3 right-[-10%] w-[450px] h-[450px] bg-[#7F89C5]/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-10 left-[-5%] w-[350px] h-[350px] bg-[#D7A6B8]/08 rounded-full blur-[100px] opacity-50" />

        {/* Minimal Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Small Label Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D7A6B8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D7A6B8]" />
              </span>
              <span className="text-[11px] font-semibold tracking-widest text-[#A79CC8] uppercase font-mono">
                DONE-FOR-YOU E-COMMERCE AUTOMATION
              </span>
            </motion.div>

            {/* Large Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-medium tracking-tight text-[#F3F3F1] leading-[1.08]"
            >
              We do the{' '}
              <span className="text-gradient">heavy lifting</span> so you can do the{' '}
              <span className="italic font-light text-[#F3F3F1] underline decoration-[#A79CC8]/40 decoration-1 underline-offset-8">
                easy living.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl text-[#96989F] font-normal leading-relaxed max-w-2xl"
            >
              We build, operate, and scale your e-commerce business from the ground up—so you can focus on your freedom while our dedicated operations team handles product research, supplier logistics, listings, and customer fulfillment.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton
                variant="primary"
                onClick={() => onOpenApplication(curr.name)}
                className="!py-4 !px-8 text-base shadow-[0_0_35px_rgba(215,166,184,0.4)]"
              >
                <span>Apply for a Store</span>
                <Sparkles className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                href="#services"
                className="!py-4 !px-7 text-base group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#96989F] group-hover:text-[#F3F3F1] group-hover:translate-x-1 transition-all" />
              </MagneticButton>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.06] text-xs text-[#6E7078]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A79CC8]" />
                <span>100% Hands-Off DFY Model</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D7A6B8]" />
                <span>Dedicated Account Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#7F89C5]" />
                <span>Multi-Marketplace Redundancy</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Cinematic Floating Automation Dashboard */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Soft Orbit Rings Background */}
            <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-white/[0.05] animate-spin-slow pointer-events-none flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#D7A6B8] shadow-[0_0_15px_#D7A6B8] absolute -top-1.5" />
            </div>
            <div className="absolute w-[440px] h-[440px] sm:w-[540px] sm:h-[540px] rounded-full border border-dashed border-[#A79CC8]/15 animate-spin-reverse-slow pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7F89C5] shadow-[0_0_12px_#7F89C5] absolute -bottom-1" />
            </div>

            {/* Main Floating Glass Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[480px] bg-[#141619]/90 border border-white/[0.12] rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-float-slow z-10"
            >
              {/* Top Bar with Platform Switchers */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="text-[11px] font-mono text-[#6E7078] ml-1">Ecom Engine v4.8</span>
                </div>

                <div className="flex items-center gap-1 bg-[#0B0D0F]/80 p-1 rounded-xl border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1.5" />
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold px-1.5">
                    AUTO ACTIVE
                  </span>
                </div>
              </div>

              {/* Marketplace Mini Tabs */}
              <div className="grid grid-cols-4 gap-1.5 my-4 p-1 rounded-2xl bg-[#0B0D0F]/60 border border-white/5">
                {platforms.map((p, idx) => (
                  <button
                    key={p.short}
                    type="button"
                    onClick={() => setActivePlatform(idx)}
                    className={`py-1.5 px-2 rounded-xl text-center text-[11px] font-medium transition-all cursor-pointer ${
                      activePlatform === idx
                        ? 'bg-[#222426] text-[#F3F3F1] border border-white/10 shadow-sm'
                        : 'text-[#6E7078] hover:text-[#96989F]'
                    }`}
                  >
                    {p.short}
                  </button>
                ))}
              </div>

              {/* Active Platform Header */}
              <div className="flex items-start justify-between mt-2">
                <div>
                  <span className="text-xs font-mono text-[#A79CC8] uppercase tracking-wider">
                    {curr.name}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F3F3F1]">
                      {curr.revenue}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {curr.growth}
                    </span>
                  </div>
                </div>
                <div className="text-2xl p-2 rounded-2xl bg-white/[0.04] border border-white/10">
                  {curr.icon}
                </div>
              </div>

              {/* Visual Graph Waves Simulation */}
              <div className="my-5 p-4 rounded-2xl bg-[#0F1114] border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#96989F]">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#D7A6B8]" />
                    30-Day Automated Trajectory
                  </span>
                  <span className="font-mono text-[#F3F3F1]">{curr.profit}</span>
                </div>

                {/* SVG Visual Mini Sparkline */}
                <div className="h-16 w-full flex items-end justify-between gap-1.5 pt-2">
                  {[35, 48, 42, 60, 55, 75, 68, 82, 78, 95, 90, 100].map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.6, delay: i * 0.03 }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        i >= 8
                          ? 'bg-gradient-to-t from-[#A79CC8]/40 to-[#D7A6B8]'
                          : 'bg-white/[0.08]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Data Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#1A1C1F] border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-[#6E7078] mb-1">
                    <Package className="w-3.5 h-3.5 text-[#A79CC8]" />
                    <span>Dispatched Orders</span>
                  </div>
                  <div className="text-lg font-semibold text-[#F3F3F1] font-mono">
                    {curr.orders} <span className="text-[11px] text-[#6E7078]">/mo</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#1A1C1F] border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-[#6E7078] mb-1">
                    <Zap className="w-3.5 h-3.5 text-[#D7A6B8]" />
                    <span>Sync Status</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 font-mono mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {curr.activeStatus}
                  </div>
                </div>
              </div>

              {/* Floating Mini Notification Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-5 -right-4 sm:-right-6 p-3.5 rounded-2xl bg-[#1E2126] border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D7A6B8] to-[#A79CC8] flex items-center justify-center text-[#0B0D0F] font-bold text-sm shadow-md">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-medium text-[#F3F3F1]">Store Payout Released</p>
                  <p className="text-[10px] font-mono text-[#A79CC8]">+$14,820.50 via Stripe Wire</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
