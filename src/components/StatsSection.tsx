'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

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

export default function StatsSection() {
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

  const marketplaces = [
    { name: 'Amazon Store Management', tag: 'FBA & Dropship' },
    { name: 'Walmart Marketplace', tag: 'WFS Verified' },
    { name: 'eBay Business', tag: 'Top Rated Plus' },
    { name: 'Facebook Commerce', tag: 'Meta Verified' },
    { name: 'Shopify Ecosystem', tag: 'Custom Channels' },
    { name: 'TikTok Shop Automation', tag: 'Viral Commerce' },
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

        {/* Marketplace Logos / Partners Ticker */}
        <div className="mt-16 pt-10 border-t border-white/[0.04]">
          <div className="text-center mb-6">
            <span className="text-[11px] font-display tracking-widest text-[#6E7078] uppercase">
              Official Marketplace Integration & Infrastructure
            </span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 opacity-80 text-white"
          >
            {/* Amazon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.10] transition-colors cursor-pointer"
            >
              <div className="relative w-16 h-6">
                <Image src="/work/amazon.png" alt="Amazon" fill className="object-contain" sizes="64px" />
              </div>
              <span className="text-[10px] font-display text-gray-200 bg-white/[0.03] px-1.5 py-0.5 rounded">FBA & DS</span>
            </motion.div>
            {/* Walmart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.10] transition-colors cursor-pointer"
            >
              <div className="relative w-16 h-6">
                <Image src="/work/walmart.png" alt="Walmart" fill className="object-contain" sizes="64px" />
              </div>
              <span className="text-[10px] font-display text-white bg-white/[0.03] px-1.5 py-0.5 rounded">WFS Verified</span>
            </motion.div>
            {/* eBay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.10] transition-colors cursor-pointer"
            >
              <div className="relative w-16 h-6">
                <Image src="/work/ebay.png" alt="eBay" fill className="object-contain" sizes="64px" />
              </div>
              <span className="text-[10px] font-display text-white bg-white/[0.03] px-1.5 py-0.5 rounded">Top Rated+</span>
            </motion.div>
            {/* Facebook */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.10] transition-colors cursor-pointer"
            >
              <div className="relative w-20 h-6">
                <Image src="/work/fb-shop.png" alt="Facebook Shop" fill className="object-contain" sizes="80px" />
              </div>
              <span className="text-[10px] font-display text-white bg-white/[0.03] px-1.5 py-0.5 rounded">Meta Verified</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
