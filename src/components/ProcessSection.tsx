'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Settings2,
  TrendingUp,
  CheckCircle2,
  Users,
  Shield,
  Layers,
  Sparkles,
  BarChart4,
  Cpu,
  Zap,
} from 'lucide-react';
import SectionHeading from './SectionHeading';

interface ProcessSectionProps {
  onOpenApplication: () => void;
}

export default function ProcessSection({ onOpenApplication }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      tabLabel: 'Build Your Business',
      title: 'Acquire and Build Your Business Structure',
      subtitle: 'Regardless of the service, the first step is building the operational foundation.',
      description:
        'We set up your legal business structure, verify marketplace seller privileges, assign your dedicated account management team, and integrate our automated software stack.',
      color: '#6B96FF',
      items: [
        { label: 'Business & Entity Setup', detail: 'LLC, EIN, Resale Certificate, and banking integration.' },
        { label: 'Team Preparation', detail: 'Dedicated account director, sourcing leads, and fulfillment staff.' },
        { label: 'Account Manager Assignment', detail: 'Direct single point of contact via phone and encrypted chat.' },
        { label: 'Required Tools & Software', detail: 'API integration with our proprietary pricing & inventory feeds.' },
        { label: 'Operational Structure', detail: 'Establishing warehouse routing, return protocols, and supplier terms.' },
      ],
      visual: {
        heading: 'FOUNDATION BLUEPRINT',
        badge: 'PHASE 01 // 7-14 DAYS',
        metrics: [
          { label: 'Entity Status', value: '100% Compliant' },
          { label: 'Marketplace Approval', value: 'Verified Tier 1' },
          { label: 'Assigned Specialists', value: '4 Dedicated' },
        ],
        stepsVisual: [
          { text: 'Legal Entity & Banking Established', done: true },
          { text: 'Marketplace Verification & Brand Registry', done: true },
          { text: 'API Pipeline & Warehousing Synced', done: true },
          { text: 'Catalog Initial Seed (500+ High Margin SKUs)', done: false },
        ],
      },
    },
    {
      id: '02',
      tabLabel: 'Manage Your Account',
      title: 'Managing Your Account',
      subtitle: 'Our team works on the account daily and focuses on maintaining consistent operations.',
      description:
        'Our specialists take over the day-to-day workload. From daily product research and order dispatching to Buy Box optimization and rapid customer service resolution.',
      color: '#4A7BFF',
      items: [
        { label: 'Daily Product Operations', detail: 'Constant algorithmic sourcing of high-demand, low-competition items.' },
        { label: 'Store Monitoring & Health', detail: '24/7 surveillance of metrics, order defect rate (ODR), and shipping compliance.' },
        { label: 'Automated Buy Box Optimization', detail: 'Dynamic price shifting to maximize profit while securing sales.' },
        { label: 'Performance & Inventory Tracking', detail: 'Automated reorders and stock replenishment across US hubs.' },
        { label: 'Comprehensive Monthly Reports', detail: 'Clear, itemized balance sheets delivered every single month.' },
      ],
      visual: {
        heading: 'DAILY OPERATIONS HUB',
        badge: 'PHASE 02 // AUTONOMOUS',
        metrics: [
          { label: 'Daily Orders', value: '45 - 120 Units' },
          { label: 'ODR Performance', value: '0.00% Defect' },
          { label: 'Tracking Upload', value: '< 2 Hours' },
        ],
        stepsVisual: [
          { text: 'Real-time Buy Box Algorithmic Repricing Active', done: true },
          { text: 'Automated 1-Click US Supplier Dispatching', done: true },
          { text: '24/7 Multi-Lingual Customer Support Coverage', done: true },
          { text: 'Bi-Weekly Financial Audit & Profit Distribution', done: true },
        ],
      },
    },
    {
      id: '03',
      tabLabel: 'Scale Your Account',
      title: 'Scaling Your Account',
      subtitle: 'We focus on improving the long-term value and growth of your business.',
      description:
        'Once stability is established, we systematically compound your revenue through catalog expansion, multi-channel replication, supplier exclusivity contracts, and working capital optimization.',
      color: '#2D5ADB',
      items: [
        { label: 'Catalog & Channel Expansion', detail: 'Cross-listing verified winning products to Walmart, eBay, and FB.' },
        { label: 'Operational Optimization', detail: 'Negotiating direct volume pricing discounts with top manufacturers.' },
        { label: 'Scaling Opportunities', detail: 'Leveraging inventory credit lines and private label brand acquisitions.' },
        { label: 'Long-term Strategy & Exit', detail: 'Positioning your profitable store as a high-multiple sellable asset.' },
      ],
      visual: {
        heading: 'COMPOUNDING GROWTH MATRIX',
        badge: 'PHASE 03 // 6-12 MONTHS+',
        metrics: [
          { label: 'Monthly GMV', value: '$75k - $250k+' },
          { label: 'Net Margins', value: '24% - 32%' },
          { label: 'Asset Valuation', value: '3.5x - 4.2x SDE' },
        ],
        stepsVisual: [
          { text: 'Multi-Channel Marketplace Cross-Listing', done: true },
          { text: 'Exclusive Tier-1 Wholesale Distribution Lines', done: true },
          { text: 'Asset Portfolio Multiplier & Valuation Optimization', done: true },
          { text: 'Automated Scaling & Exit Consultation', done: true },
        ],
      },
    },
  ];

  const current = steps[activeStep];

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-[#0B0D0F] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-[#4A7BFF]/06 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="STEP-BY-STEP ROADMAP"
          title="How It Works"
          subtitle="Our systematic 3-phase execution framework transforms your capital into an automated digital retail enterprise."
        />

        {/* Interactive Top Horizontal Step Navigation */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-3xl bg-[#141619] border border-white/[0.08] backdrop-blur-xl">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`relative py-3.5 sm:py-4 px-3 sm:px-6 rounded-2xl text-center transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                    isActive ? 'text-[#F3F3F1] font-semibold' : 'text-[#6E7078] hover:text-[#96989F]'
                  }`}
                >
                  {/* Sliding Active Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepIndicator"
                      className="absolute inset-0 rounded-2xl bg-[#222428] border border-white/15 shadow-[0_0_20px_rgba(74,123,255,0.15)]"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}

                  <span className="relative z-10 font-mono text-xs text-[#4A7BFF] hidden sm:inline">
                    {step.id}
                  </span>
                  <span className="relative z-10 text-xs sm:text-sm tracking-tight truncate">
                    {step.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Step Content & High-Fidelity Visual Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
          >
            {/* Left Side: Step Breakdown Details */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#16181B] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-2xl font-mono font-bold px-3.5 py-1 rounded-xl bg-white/[0.04] border border-white/10"
                    style={{ color: current.color }}
                  >
                    {current.id}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono text-[#4A7BFF] uppercase tracking-wider block">
                      Execution Phase
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium text-[#F3F3F1] mt-0.5">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#96989F] leading-relaxed mb-8">
                  {current.description}
                </p>

                {/* Items List */}
                <div className="space-y-4">
                  {current.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#111315] border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#6B96FF] shrink-0" />
                        <h4 className="text-sm font-semibold text-[#F3F3F1]">{item.label}</h4>
                      </div>
                      <p className="mt-1 text-xs text-[#96989F] pl-6 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Step Visual Dashboard Preview */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#181A1E] border border-white/[0.1] shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: current.color }}
              />

              <div>
                <div className="pb-4 border-b border-white/[0.08] mb-6">
                  <span className="text-[10px] font-mono text-[#6E7078] uppercase block">
                    TELEMETRY SIMULATION
                  </span>
                  <span className="text-base font-semibold text-[#F3F3F1] tracking-tight">
                    {current.visual.heading}
                  </span>
                </div>

                {/* 3 Metrics Cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {current.visual.metrics.map((m, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-[#111316] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-[#6E7078] uppercase block truncate">
                        {m.label}
                      </span>
                      <span className="text-sm font-bold text-[#F3F3F1] font-mono mt-1 block">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Visual Checklist Progression */}
                <div className="p-4 rounded-2xl bg-[#111316] border border-white/5 space-y-3">
                  <span className="text-[11px] font-mono text-[#4A7BFF] uppercase tracking-wider block mb-2">
                    Milestone Progress Tracker
                  </span>
                  {current.visual.stepsVisual.map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-white/[0.03] last:border-none">
                      <span className="text-[#96989F] pr-2">{s.text}</span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                          s.done
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}
                      >
                        {s.done ? 'COMPLETED' : 'IN PROGRESS'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-[#6E7078]">
                  Automated Workflow Uptime: <strong className="text-[#F3F3F1]">99.98%</strong>
                </span>
                <button
                  onClick={onOpenApplication}
                  className="px-5 py-2 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-[#F3F3F1] border border-white/10 transition-all cursor-pointer"
                >
                  Deploy Phase {current.id} →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
