'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  ShieldAlert,
  Search,
  Truck,
  DollarSign,
  RotateCcw,
  BarChart3,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import MagneticButton from './MagneticButton';

interface WhyInvestSectionProps {
  onOpenApplication: () => void;
}

export default function WhyInvestSection({ onOpenApplication }: WhyInvestSectionProps) {
  const operations = [
    { name: 'Store Operations', icon: Cpu, status: 'Active 24/7', color: '#D7A6B8' },
    { name: 'Product Research', icon: Search, status: 'AI Algorithmic', color: '#A79CC8' },
    { name: 'Supplier Management', icon: Truck, status: 'US Verified Feeds', color: '#7F89C5' },
    { name: 'Pricing Strategy', icon: DollarSign, status: 'Real-time Reprice', color: '#D7A6B8' },
    { name: 'Returns & Resolution', icon: RotateCcw, status: 'Fully Managed', color: '#A79CC8' },
    { name: 'Risk Monitoring', icon: ShieldAlert, status: '0 Policy Strikes', color: '#7F89C5' },
    { name: 'Financial Reports', icon: BarChart3, status: 'Transparent Ledger', color: '#D7A6B8' },
  ];

  const benefitsList = [
    'Manage direct supplier relationships & credit lines',
    'Set algorithmic optimal pricing strategies for Buy Box wins',
    'Facilitate customer returns and RMA processing seamlessly',
    'Identify and proactively monitor account risks & policy health',
    'Provide real-time live reporting dashboards & weekly recaps',
    'Full dedicated 300+ specialist team supporting daily operations',
  ];

  return (
    <section id="why-invest" className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.05]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#A79CC8]/04 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7A6B8]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#A79CC8] font-mono">
              INVESTOR CONFIDENCE ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-[#F3F3F1] leading-[1.12]">
            We put your money to work, so you can put your{' '}
            <span className="text-gradient">mind at ease.</span>
          </h2>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          {/* Left Column — Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 p-8 sm:p-10 rounded-2xl bg-[#080808] border border-white/[0.07] flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D7A6B8]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#F3F3F1] leading-snug">
                We build your store from the ground up.
              </h3>
              <div className="space-y-3 text-base text-[#96989F]">
                <p className="border-l-2 border-[#D7A6B8] pl-3 text-[#F3F3F1] font-medium">
                  Ready for operation.
                </p>
                <p className="border-l-2 border-[#A79CC8] pl-3 text-[#F3F3F1] font-medium">
                  Designed for long-term growth.
                </p>
              </div>
              <p className="text-sm text-[#96989F] leading-relaxed">
                Traditional businesses require 60+ hours a week of manual management. Our DFY model replaces human friction with automated operational pipelines and dedicated specialists.
              </p>
            </div>

            <div className="pt-8 border-t border-white/[0.06] mt-6 flex items-center gap-3">
              <div className="text-xs text-[#6E7078] font-mono">
                UPTIME GUARANTEE: <span className="text-emerald-400 font-semibold">99.98%</span>
              </div>
            </div>
          </motion.div>

          {/* Center Column — Futuristic Visual Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0d0d0d] border border-[#A79CC8]/15 shadow-[0_0_40px_rgba(167,156,200,0.07)] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient glowing beam */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#A79CC8]/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D7A6B8] animate-pulse" />
                  <span className="text-xs font-mono text-[#F3F3F1] font-medium tracking-wider">
                    OPERATIONAL MATRIX
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#A79CC8] bg-[#A79CC8]/10 px-2 py-0.5 rounded-full border border-[#A79CC8]/20">
                  REAL-TIME SYNC
                </span>
              </div>

              {/* Node Operations List */}
              <div className="space-y-2.5">
                {operations.map((op, idx) => {
                  const Icon = op.icon;
                  return (
                    <motion.div
                      key={op.name}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 + 0.2 }}
                      className="p-2.5 px-3 rounded-xl bg-[#111316] border border-white/5 flex items-center justify-between hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${op.color}15`, color: op.color }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-[#F3F3F1]">{op.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#96989F] bg-white/[0.03] px-2 py-0.5 rounded">
                        {op.status}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#6E7078] font-mono">
              <span>ACTIVE SYSTEM THREADS: 14</span>
              <span className="text-emerald-400">STATUS: HEALTHY</span>
            </div>
          </motion.div>

          {/* Right Column — Benefits List & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 p-8 sm:p-10 rounded-2xl bg-[#080808] border border-white/[0.07] flex flex-col justify-between"
          >
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A79CC8] mb-6">
                Direct Investor Advantages
              </h4>
              <div className="space-y-4">
                {benefitsList.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D7A6B8]/15 border border-[#D7A6B8]/30 flex items-center justify-center text-[#D7A6B8] shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-sm text-[#96989F] leading-snug hover:text-[#F3F3F1] transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <MagneticButton
                variant="primary"
                onClick={onOpenApplication}
                className="w-full !py-3.5 !text-sm group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
