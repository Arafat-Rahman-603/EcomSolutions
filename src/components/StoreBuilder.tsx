'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Sliders,
  DollarSign,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Users,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

interface StoreBuilderProps {
  onOpenApplication: (serviceName?: string) => void;
}

export default function StoreBuilder({ onOpenApplication }: StoreBuilderProps) {
  const [marketplace, setMarketplace] = useState<'Amazon' | 'Walmart' | 'eBay' | 'Facebook Shops'>('Amazon');
  const [model, setModel] = useState<'Dropshipping' | 'FBA' | 'WFS'>('Dropshipping');
  const [growthStage, setGrowthStage] = useState<'Launch' | 'Operate' | 'Scale'>('Operate');
  const [targetCapital, setTargetCapital] = useState<number>(35000);

  // Dynamic calculations based on state
  const configMap = {
    Amazon: {
      Dropshipping: {
        estRevenue: `$${(targetCapital * 2.8).toLocaleString()}`,
        netMargin: '22% - 28%',
        dailyOrders: `${Math.round(targetCapital * 0.045)} - ${Math.round(targetCapital * 0.075)}`,
        onboardingDays: '7 - 10 Days',
        teamAllocated: '4 Specialists',
        riskIndex: 'Ultra Low (Protected Routing)',
        badge: 'Top Seller Engine',
      },
      FBA: {
        estRevenue: `$${(targetCapital * 2.2).toLocaleString()}`,
        netMargin: '28% - 34%',
        dailyOrders: `${Math.round(targetCapital * 0.035)} - ${Math.round(targetCapital * 0.055)}`,
        onboardingDays: '14 - 21 Days',
        teamAllocated: '5 Specialists',
        riskIndex: 'Zero (FBA Compliant)',
        badge: 'Prime Verified',
      },
      WFS: {
        estRevenue: `$${(targetCapital * 2.4).toLocaleString()}`,
        netMargin: '25% - 30%',
        dailyOrders: `${Math.round(targetCapital * 0.04)} - ${Math.round(targetCapital * 0.06)}`,
        onboardingDays: '10 - 14 Days',
        teamAllocated: '4 Specialists',
        riskIndex: 'Low (Wholesale)',
        badge: 'Enterprise FBA',
      },
    },
    Walmart: {
      Dropshipping: {
        estRevenue: `$${(targetCapital * 2.6).toLocaleString()}`,
        netMargin: '24% - 31%',
        dailyOrders: `${Math.round(targetCapital * 0.038)} - ${Math.round(targetCapital * 0.065)}`,
        onboardingDays: '10 - 14 Days',
        teamAllocated: '4 Specialists',
        riskIndex: 'Low (Strict OTD)',
        badge: 'High Ticket AOV',
      },
      FBA: {
        estRevenue: `$${(targetCapital * 2.3).toLocaleString()}`,
        netMargin: '26% - 32%',
        dailyOrders: `${Math.round(targetCapital * 0.032)} - ${Math.round(targetCapital * 0.052)}`,
        onboardingDays: '12 - 18 Days',
        teamAllocated: '4 Specialists',
        riskIndex: 'Very Low',
        badge: 'WFS Hub Sync',
      },
      WFS: {
        estRevenue: `$${(targetCapital * 2.9).toLocaleString()}`,
        netMargin: '27% - 33%',
        dailyOrders: `${Math.round(targetCapital * 0.042)} - ${Math.round(targetCapital * 0.07)}`,
        onboardingDays: '10 - 14 Days',
        teamAllocated: '5 Specialists',
        riskIndex: 'Zero (Walmart Guaranteed)',
        badge: '2-Day Express Badge',
      },
    },
    eBay: {
      Dropshipping: {
        estRevenue: `$${(targetCapital * 2.2).toLocaleString()}`,
        netMargin: '20% - 26%',
        dailyOrders: `${Math.round(targetCapital * 0.05)} - ${Math.round(targetCapital * 0.08)}`,
        onboardingDays: '3 - 5 Days',
        teamAllocated: '3 Specialists',
        riskIndex: 'Minimal',
        badge: 'Top Rated Plus',
      },
      FBA: {
        estRevenue: `$${(targetCapital * 2.1).toLocaleString()}`,
        netMargin: '22% - 27%',
        dailyOrders: `${Math.round(targetCapital * 0.04)} - ${Math.round(targetCapital * 0.06)}`,
        onboardingDays: '5 - 7 Days',
        teamAllocated: '3 Specialists',
        riskIndex: 'Minimal',
        badge: 'Multi-Channel Prep',
      },
      WFS: {
        estRevenue: `$${(targetCapital * 2.1).toLocaleString()}`,
        netMargin: '21% - 27%',
        dailyOrders: `${Math.round(targetCapital * 0.04)} - ${Math.round(targetCapital * 0.06)}`,
        onboardingDays: '5 - 7 Days',
        teamAllocated: '3 Specialists',
        riskIndex: 'Minimal',
        badge: 'Standard eBay Hub',
      },
    },
    'Facebook Shops': {
      Dropshipping: {
        estRevenue: `$${(targetCapital * 3.1).toLocaleString()}`,
        netMargin: '28% - 38%',
        dailyOrders: `${Math.round(targetCapital * 0.06)} - ${Math.round(targetCapital * 0.095)}`,
        onboardingDays: '5 - 7 Days',
        teamAllocated: '4 Specialists',
        riskIndex: 'Low (Meta Verified)',
        badge: 'Viral Organic Push',
      },
      FBA: {
        estRevenue: `$${(targetCapital * 2.7).toLocaleString()}`,
        netMargin: '26% - 34%',
        dailyOrders: `${Math.round(targetCapital * 0.05)} - ${Math.round(targetCapital * 0.08)}`,
        onboardingDays: '7 - 10 Days',
        teamAllocated: '4 Specialists',
        riskIndex: 'Low',
        badge: 'Social Commerce Prime',
      },
      WFS: {
        estRevenue: `$${(targetCapital * 2.7).toLocaleString()}`,
        netMargin: '26% - 34%',
        dailyOrders: `${Math.round(targetCapital * 0.05)} - ${Math.round(targetCapital * 0.08)}`,
        onboardingDays: '7 - 10 Days',
        teamAllocated: '4 Specialists',
        riskIndex: 'Low',
        badge: 'Meta Commerce Hub',
      },
    },
  };

  const currentStats = configMap[marketplace][model];

  return (
    <section id="store-builder" className="relative py-24 lg:py-32 bg-[#0E1012] overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-72 bg-[#A79CC8]/06 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="INTERACTIVE BLUEPRINT CONFIGURATOR"
          title="Your business. Managed from the ground up."
          subtitle="Customize your desired marketplace, business model, and growth objectives to generate an instant operational projection."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 p-7 sm:p-9 rounded-3xl bg-[#141619] border border-white/[0.08] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Marketplace Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A79CC8] mb-3">
                  1. Choose Target Marketplace
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Amazon', 'Walmart', 'eBay', 'Facebook Shops'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMarketplace(m)}
                      className={`py-3 px-2 rounded-2xl text-xs font-medium border transition-all text-center cursor-pointer ${
                        marketplace === m
                          ? 'bg-[#22252A] border-[#D7A6B8] text-[#F3F3F1] shadow-[0_0_20px_rgba(215,166,184,0.25)]'
                          : 'bg-[#101214] border-white/5 text-[#96989F] hover:border-white/20'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Model Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A79CC8] mb-3">
                  2. Select Operational Model
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Dropshipping', 'FBA', 'WFS'] as const).map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setModel(mod)}
                      className={`py-3 px-3 rounded-2xl text-xs font-medium border transition-all text-center cursor-pointer ${
                        model === mod
                          ? 'bg-[#22252A] border-[#A79CC8] text-[#F3F3F1] shadow-[0_0_20px_rgba(167,156,200,0.25)]'
                          : 'bg-[#101214] border-white/5 text-[#96989F] hover:border-white/20'
                      }`}
                    >
                      {mod === 'Dropshipping' ? 'Dropshipping' : mod === 'FBA' ? 'Amazon FBA' : 'Walmart WFS'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Growth Stage Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A79CC8] mb-3">
                  3. Select Growth Stage Objective
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Launch', 'Operate', 'Scale'] as const).map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setGrowthStage(stage)}
                      className={`py-3 px-3 rounded-2xl text-xs font-medium border transition-all text-center cursor-pointer ${
                        growthStage === stage
                          ? 'bg-[#22252A] border-[#7F89C5] text-[#F3F3F1] shadow-[0_0_20px_rgba(127,137,197,0.25)]'
                          : 'bg-[#101214] border-white/5 text-[#96989F] hover:border-white/20'
                      }`}
                    >
                      {stage === 'Launch' ? 'Phase 1: Launch' : stage === 'Operate' ? 'Phase 2: Operate' : 'Phase 3: Scale'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Working Capital Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono uppercase tracking-wider text-[#A79CC8]">
                    4. Planned Capital Allocation
                  </span>
                  <span className="font-mono text-[#F3F3F1] font-bold text-sm bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                    ${targetCapital.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={100000}
                  step={5000}
                  value={targetCapital}
                  onChange={(e) => setTargetCapital(Number(e.target.value))}
                  className="w-full h-2 bg-[#22252A] rounded-lg appearance-none cursor-pointer accent-[#D7A6B8]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6E7078] mt-2">
                  <span>$15k (Starter)</span>
                  <span>$50k (Growth)</span>
                  <span>$100k+ (Enterprise)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#6E7078]">
                Vetting status: <strong className="text-emerald-400">Available Quota Open</strong>
              </span>
              <span className="text-[11px] font-mono text-[#A79CC8]">Live Algorithmic Estimate</span>
            </div>
          </div>

          {/* Right Column: Dynamic Live Dashboard Preview */}
          <div className="lg:col-span-6 p-7 sm:p-9 rounded-3xl bg-[#17191E] border border-white/[0.12] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Soft Glowing Rings around preview */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#D7A6B8]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#7F89C5]/15 blur-3xl pointer-events-none" />

            <div>
              {/* Header preview telemetry */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="text-[10px] font-mono text-[#6E7078] uppercase tracking-wider block">
                    PROJECTED ARCHITECTURE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#F3F3F1] mt-0.5">
                    {marketplace} Store Blueprint
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Status: Active DFY</span>
                </div>
              </div>

              {/* Dynamic Parameter Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                <div className="p-3 rounded-2xl bg-[#101215] border border-white/5">
                  <span className="text-[10px] font-mono text-[#6E7078] block">Marketplace</span>
                  <span className="text-xs font-bold text-[#F3F3F1] mt-1 block truncate">{marketplace}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#101215] border border-white/5">
                  <span className="text-[10px] font-mono text-[#6E7078] block">Business Model</span>
                  <span className="text-xs font-bold text-[#D7A6B8] mt-1 block truncate">{model}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#101215] border border-white/5">
                  <span className="text-[10px] font-mono text-[#6E7078] block">Growth Stage</span>
                  <span className="text-xs font-bold text-[#A79CC8] mt-1 block truncate">{growthStage}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#101215] border border-white/5">
                  <span className="text-[10px] font-mono text-[#6E7078] block">Allocation</span>
                  <span className="text-xs font-bold text-[#7F89C5] mt-1 block truncate font-mono">${(targetCapital/1000).toFixed(0)}k</span>
                </div>
              </div>

              {/* Dynamic Metrics Cards */}
              <div className="p-5 rounded-2xl bg-[#111316] border border-white/5 space-y-4 mb-6">
                <div className="flex items-baseline justify-between border-b border-white/[0.05] pb-3">
                  <div>
                    <span className="text-xs text-[#96989F] block">Projected Monthly Revenue Run-Rate</span>
                    <span className="text-3xl font-bold font-mono text-[#F3F3F1] mt-0.5 block">
                      {currentStats.estRevenue}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#D7A6B8] bg-[#D7A6B8]/10 px-2.5 py-1 rounded-full border border-[#D7A6B8]/20">
                    {currentStats.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] font-mono text-[#6E7078] uppercase">Target Net Margin</span>
                    <p className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">{currentStats.netMargin}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6E7078] uppercase">Est. Daily Orders</span>
                    <p className="text-sm font-semibold text-[#F3F3F1] font-mono mt-0.5">{currentStats.dailyOrders}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6E7078] uppercase">Launch Readiness</span>
                    <p className="text-sm font-semibold text-[#A79CC8] font-mono mt-0.5">{currentStats.onboardingDays}</p>
                  </div>
                </div>
              </div>

              {/* Team Allocation & Safeguards */}
              <div className="p-3.5 rounded-2xl bg-[#111316] border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#96989F]">
                  <Users className="w-4 h-4 text-[#D7A6B8]" />
                  <span>Team Allocation: <strong className="text-[#F3F3F1]">{currentStats.teamAllocated}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[#96989F]">
                  <ShieldCheck className="w-4 h-4 text-[#A79CC8]" />
                  <span>Risk Level: <strong className="text-emerald-400">{currentStats.riskIndex}</strong></span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-white/[0.08] mt-6">
              <MagneticButton
                variant="primary"
                onClick={() => onOpenApplication(`${marketplace} ${model} Automation`)}
                className="w-full !py-4 text-base font-bold shadow-[0_0_35px_rgba(215,166,184,0.4)]"
              >
                <span>Reserve This Configuration</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
