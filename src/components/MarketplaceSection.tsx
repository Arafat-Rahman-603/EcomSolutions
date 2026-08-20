'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Globe2, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import MagneticButton from './MagneticButton';
import SectionHeading from './SectionHeading';

interface MarketplaceSectionProps {
  onOpenApplication: (marketplace?: string) => void;
}

const platforms = [
  {
    id: 'amazon',
    name: 'Amazon',
    subtitle: 'FBA & Dropshipping',
    description:
      'The largest online marketplace on Earth. Build a fully automated Amazon operation with proprietary supplier routing, buy-box engine, and Prime-compliant fulfillment.',
    image: '/work/amazon.png',
    metric: '$84.9K /mo',
    metricLabel: 'Avg. Store Revenue',
    secondaryMetric: '18–28%',
    secondaryLabel: 'Net Margin',
    tag: 'Most Popular',
    tagColor: '#4A7BFF',
    color: '#4A7BFF',
    bullets: [
      'US supplier network — 2–3 day shipping',
      '24/7 Buy-Box repricing across 5k+ SKUs',
      'Account health & customer service team',
    ],
  },
  {
    id: 'walmart',
    name: 'Walmart',
    subtitle: 'WFS Automation',
    description:
      'Walmart.com sees 120M+ monthly shoppers with a fraction of Amazon competition. Secure approval, earn the 2-Day badge, and scale with less price pressure.',
    image: '/work/walmart.png',
    metric: '+60%',
    metricLabel: 'Buy Box Boost',
    secondaryMetric: '120M+',
    secondaryLabel: 'Monthly Visitors',
    tag: '2-Day Badge',
    tagColor: '#2D5ADB',
    color: '#2D5ADB',
    bullets: [
      'Walmart seller approval & corporate setup',
      'WFS storage, prep, and 2-day delivery',
      'Performance compliance (OTD, VTR, PCR)',
    ],
  },
  {
    id: 'ebay',
    name: 'eBay',
    subtitle: 'Managed Stores',
    description:
      'eBay’s 135M+ active buyers reward Top Rated Sellers with fee discounts and ranking priority. We run full-lifecycle store ops, multi-variant listings, and global shipping.',
    image: '/work/ebay.png',
    metric: '135M+',
    metricLabel: 'Active Buyers',
    secondaryMetric: '3–5 Days',
    secondaryLabel: 'Launch Speed',
    tag: 'Top Rated Plus',
    tagColor: '#6B96FF',
    color: '#6B96FF',
    bullets: [
      'Top Rated Seller status maintenance',
      'API tracking & automated relisting',
      'Trending electronics, tools, home goods',
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook Shop',
    subtitle: 'Social Commerce',
    description:
      'Tap Meta’s 2.9B+ reach through Facebook Shops with zero-ad-spend viral catalog traffic, in-app checkout, and algorithmic recommendations.',
    image: '/work/fb-shop.png',
    metric: '2.9B+',
    metricLabel: 'Platform Reach',
    secondaryMetric: '0',
    secondaryLabel: 'Ad Spend Required',
    tag: 'Viral Organic',
    tagColor: '#6B96FF',
    color: '#4A7BFF',
    bullets: [
      'Organic feed traffic + marketplace listings',
      'Direct US supplier order injection',
      'Policy compliance & dispute handling',
    ],
  },
];

const statsLine = [
  { icon: Globe2, text: '4 Major Marketplaces' },
  { icon: TrendingUp, text: '$42M+ GMV Managed' },
  { icon: Zap, text: '400+ Active Partners' },
  { icon: ShieldCheck, text: '100% DFY Operations' },
];

export default function MarketplaceSection({ onOpenApplication }: MarketplaceSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;
    const timer = setInterval(() => {
      setActiveIdx((p) => (p + 1) % platforms.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [userInteracted]);

  const active = platforms[activeIdx];
  const satellites = platforms.filter((_, i) => i !== activeIdx);

  return (
    <section
      id="platforms"
      className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.05]"
    >
      {/* Ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-[520px] h-[520px] bg-[#6B96FF]/05 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[440px] h-[440px] bg-[#4A7BFF]/04 rounded-full blur-[150px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '44px 44px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="MULTI-PLATFORM OPERATIONS"
          title="One strategy. Multiple marketplaces."
          subtitle="A unified e-commerce automation layer spanning the four most profitable online ecosystems — each store built and fully managed by our specialist teams."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-16 lg:mt-20">
          {/* LEFT: 3 satellite cards stack */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            {satellites.map((p, i) => (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => {
                  setUserInteracted(true);
                  setActiveIdx(platforms.indexOf(p));
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="w-full text-left group relative rounded-2xl bg-[#080808] border border-white/[0.07] p-4 sm:p-5 hover:border-white/[0.18] hover:bg-[#0b0b0d] transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${p.color}14 0%, transparent 65%)`,
                  }}
                />
                <div className="relative flex items-center gap-4">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0e1012] border border-white/[0.07] flex items-center justify-center shrink-0 p-2.5">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[11px] font-mono uppercase tracking-wider"
                        style={{ color: p.color }}
                      >
                        {p.subtitle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-[#F3F3F1] truncate">
                        {p.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-[#555760] group-hover:text-[#F3F3F1] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-sm font-semibold text-[#F3F3F1] font-mono">
                        {p.metric}
                      </span>
                      <span className="text-[10px] text-[#555760]">{p.metricLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CENTER: Primary featured card */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              {/* Outer framing line set */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-[28px] border border-white/[0.04] pointer-events-none" />
              <div className="absolute -inset-6 sm:-inset-8 rounded-[32px] border border-white/[0.025] pointer-events-none" />

              {/* Animated connection paths (desktop) */}
              <svg
                className="absolute -left-[34%] -right-[20%] -top-10 -bottom-10 w-[170%] h-[calc(100%+80px)] pointer-events-none hidden lg:block"
                viewBox="0 0 1000 700"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6B96FF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#6B96FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#4A7BFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M100 180 C 280 120, 360 180, 430 230"
                  stroke="url(#connGrad)"
                  strokeWidth="1"
                  strokeDasharray="3 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M100 360 C 260 360, 360 340, 430 330"
                  stroke="url(#connGrad)"
                  strokeWidth="1"
                  strokeDasharray="3 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, delay: 0.1, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M100 540 C 270 540, 360 490, 430 430"
                  stroke="url(#connGrad)"
                  strokeWidth="1"
                  strokeDasharray="3 10"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.4, delay: 0.15, ease: 'easeInOut' }}
                />
              </svg>

              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, scale: 0.985, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl bg-gradient-to-b from-[#0c0d0f] to-[#070709] border border-white/[0.10] p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.85)] overflow-hidden"
                >
                  {/* Hover/active color accent glow */}
                  <div
                    className="absolute inset-0 opacity-[0.85] pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${active.color}18 0%, transparent 70%)`,
                    }}
                  />
                  {/* Top hairline accent */}
                  <div
                    className="absolute top-0 inset-x-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${active.color}60 50%, transparent 100%)`,
                    }}
                  />

                  <div className="relative space-y-6">
                    {/* Header: logo + marketplace */}
                    <header className="flex items-start gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0a0b0d] border border-white/[0.08] flex items-center justify-center shrink-0 p-3 shadow-inner"
                          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)' }}
                        >
                          <Image
                            src={active.image}
                            alt={active.name}
                            fill
                            className="object-contain"
                            sizes="80px"
                            priority
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className="text-[11px] font-mono uppercase tracking-[0.18em]"
                            style={{ color: active.color }}
                          >
                            {active.subtitle}
                          </span>
                          <h3 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F3F1]">
                            {active.name}
                          </h3>
                        </div>
                      </div>
                    </header>

                    {/* Description */}
                    <p
                      className="text-sm sm:text-[15px] leading-relaxed text-[#8A8C94]"
                      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    >
                      {active.description}
                    </p>

                    {/* KPI row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[#0a0c0e] border border-white/[0.05] p-4">
                        <div className="text-[10px] uppercase tracking-wider text-[#555760] font-mono">
                          {active.metricLabel}
                        </div>
                        <div className="mt-1 text-xl sm:text-2xl font-semibold text-[#F3F3F1] font-mono tracking-tight">
                          {active.metric}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-[#0a0c0e] border border-white/[0.05] p-4">
                        <div className="text-[10px] uppercase tracking-wider text-[#555760] font-mono">
                          {active.secondaryLabel}
                        </div>
                        <div className="mt-1 text-xl sm:text-2xl font-semibold text-[#F3F3F1] font-mono tracking-tight">
                          {active.secondaryMetric}
                        </div>
                      </div>
                    </div>

                    {/* Delimiter */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {active.bullets.map((b, i) => (
                        <motion.li
                          key={b}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.12 + i * 0.06, ease: 'easeOut' }}
                          className="flex items-start gap-3 text-sm text-[#a1a1aa]"
                        >
                          <span
                            className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: active.color }}
                          />
                          <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            {b}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="pt-2">
                      <MagneticButton
                        variant="primary"
                        onClick={() => onOpenApplication(`${active.name} Automation`)}
                        className="w-full sm:w-auto !py-3.5 !px-7 text-sm shadow-[0_0_30px_rgba(74,123,255,0.25)]"
                      >
                        <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                          Launch {active.name} Store
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Progress pips */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {platforms.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setUserInteracted(true);
                      setActiveIdx(i);
                    }}
                    aria-label={`Select ${p.name}`}
                    className="group relative h-1.5 rounded-md overflow-hidden transition-all duration-300"
                    style={{
                      width: i === activeIdx ? '28px' : '8px',
                      backgroundColor: i === activeIdx ? `${p.color}40` : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    {i === activeIdx && (
                      <motion.span
                        layoutId="pip-fill"
                        className="absolute inset-0 rounded-md"
                        style={{ backgroundColor: p.color }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Stats strip + quick meta */}
          <div className="lg:col-span-3 order-3 space-y-4">
            <div className="space-y-3">
              {statsLine.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#080808] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#6B96FF]" />
                  </div>
                  <span
                    className="text-xs sm:text-sm text-[#8A8C94]"
                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Small connection card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(74,123,255,0.07) 0%, rgba(107,150,255,0.05) 50%, rgba(45,90,219,0.07) 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl bg-[#6B96FF]/20 pointer-events-none" />
              <div className="relative">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6B96FF] mb-2">
                  Unified Control Plane
                </div>
                <div
                  className="text-sm sm:text-[15px] leading-relaxed text-[#c5c6ce]"
                  style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                >
                  One dashboard, one ops team, one payout rhythm — across all stores. No
                  juggling vendor dashboards.
                </div>
                <button
                  type="button"
                  onClick={() => onOpenApplication()}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F3F3F1] hover:text-white transition-colors cursor-pointer"
                >
                  Talk to a Strategist
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile platform cards 2×2 fallback (for very small screens) */}
        <div className="mt-14 sm:hidden grid grid-cols-2 gap-3">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setUserInteracted(true);
                setActiveIdx(platforms.indexOf(p));
              }}
              className="text-left rounded-2xl bg-[#080808] border border-white/[0.07] p-4 hover:border-white/[0.18] transition-colors"
            >
              <div className="relative w-full h-10 mb-3">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
              <p className="text-xs font-semibold text-[#F3F3F1]">{p.name}</p>
              <p className="text-[10px] text-[#555760] mt-0.5">{p.subtitle}</p>
              <p className="text-[11px] font-mono text-[#a1a1aa] mt-2">{p.metric}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
