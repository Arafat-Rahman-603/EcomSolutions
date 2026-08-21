'use client';

import React, { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window === 'undefined') return () => {};
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      const listener = () => cb();
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    },
    () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    () => false,
  );
}

function Counter({ end, suffix = '+', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const stepTime = Math.abs(Math.floor((duration * 1000) / end));
    const increment = Math.max(1, Math.floor(end / 60));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-display">
      {count}
      {suffix}
    </span>
  );
}

interface MarqueeBadgeItem {
  id: string;
  name: string;
  label: string;
  image: string;
  imageW: number;
  accent: string;
}

function MarqueeBadge({ mp }: { mp: MarqueeBadgeItem }) {
  return (
    <div className="group relative shrink-0">
      <div
        className="group relative rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 sm:gap-3.5 bg-[#0F1013]/70 backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.03) inset, 0 10px 30px rgba(0,0,0,0.4)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 20% 0%, ${mp.accent}22, transparent 60%)`,
          }}
        />
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
          <Image
            src={mp.image}
            alt={mp.name}
            fill
            className="object-contain drop-shadow-sm"
            sizes={`${mp.imageW}px`}
          />
        </div>
        <span
          className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#F3F3F1] whitespace-nowrap"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {mp.label}
        </span>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const reducedMotion = useReducedMotion();
  const stats = [
    {
      value: 400,
      suffix: '+',
      label: 'Clients',
      description: 'Active store partners across 14 countries',
    },
    {
      value: 300,
      suffix: '+',
      label: 'Team Members',
      description: 'Full-time product & fulfillment specialists',
    },
    {
      value: 700,
      suffix: '+',
      label: 'Completed Projects',
      description: 'Successful stores built & scaled from scratch',
    },
    {
      value: 42,
      suffix: 'M+',
      prefix: '$',
      label: 'Managed GMV',
      description: 'Gross merchandise volume processed safely',
    },
  ];

  return (
    <section className="relative py-16 bg-[#0b0c0e] border-y border-white/[0.05] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-32 bg-[#6B96FF]/03 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Statistics Grid with subtle vertical dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col items-center text-center px-6 lg:px-8 ${
                idx !== stats.length - 1 ? 'lg:border-r lg:border-white/[0.08]' : ''
              }`}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F3F3F1] flex items-center justify-center">
                {stat.prefix && <span>{stat.prefix}</span>}
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-base font-semibold text-[#6B96FF] tracking-wide">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-[#6E7078] max-w-[180px]">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marketplace Logos — Infinite Horizontal Marquee */}
        <div className="mt-16 pt-10 border-t border-white/[0.04]">
          <div className="text-center mb-8 sm:mb-10">
            <span
              className="text-[11px] sm:text-xs font-display tracking-[0.22em] text-[#6E7078] uppercase"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Official Marketplace Integration &amp; Infrastructure
            </span>
          </div>

          {/* Marquee — overflow-hidden with left/right edge fade masks */}
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 z-10" style={{ background: 'linear-gradient(90deg, #0b0c0e 0%, rgba(11,12,14,0.85) 40%, transparent 100%)' }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 z-10" style={{ background: 'linear-gradient(-90deg, #0b0c0e 0%, rgba(11,12,14,0.85) 40%, transparent 100%)' }} />

            {/* Marquee track: exactly 2 copies wide (seamless loop via translate -50%) */}
            <div
              className={`flex items-center gap-3 sm:gap-4 w-[200%] ${reducedMotion ? '' : 'animate-marquee-x'}`}
              style={{ willChange: 'transform' }}
            >
              {/* Copy 1 */}
              <div className="flex shrink-0 items-center gap-3 sm:gap-4 basis-1/2 justify-around px-1">
                {[
                  { id: 'amazon', name: 'Amazon', label: 'FBA & DS', image: '/work/amazon.png', imageW: 128, accent: '#FF9900' },
                  { id: 'walmart', name: 'Walmart', label: 'WFS Verified', image: '/work/walmart.png', imageW: 128, accent: '#0071DC' },
                  { id: 'ebay', name: 'eBay', label: 'Top Rated+', image: '/work/ebay.png', imageW: 128, accent: '#E53238' },
                  { id: 'facebook', name: 'Meta Commerce', label: 'Meta Verified', image: '/work/fb-shop.png', imageW: 140, accent: '#1877F2' },
                ].map((mp) => (
                  <MarqueeBadge key={mp.id} mp={mp} />
                ))}
              </div>
              {/* Copy 2 (identical) — makes -50% loop seamless */}
              <div className="flex shrink-0 items-center gap-3 sm:gap-4 basis-1/2 justify-around px-1">
                {[
                  { id: 'amazon-2', name: 'Amazon', label: 'FBA & DS', image: '/work/amazon.png', imageW: 128, accent: '#FF9900' },
                  { id: 'walmart-2', name: 'Walmart', label: 'WFS Verified', image: '/work/walmart.png', imageW: 128, accent: '#0071DC' },
                  { id: 'ebay-2', name: 'eBay', label: 'Top Rated+', image: '/work/ebay.png', imageW: 128, accent: '#E53238' },
                  { id: 'facebook-2', name: 'Meta Commerce', label: 'Meta Verified', image: '/work/fb-shop.png', imageW: 140, accent: '#1877F2' },
                ].map((mp) => (
                  <MarqueeBadge key={mp.id} mp={mp} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
