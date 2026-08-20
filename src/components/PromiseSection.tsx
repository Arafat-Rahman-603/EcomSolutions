'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function PromiseSection() {
  const promises = [
    {
      title: 'Communication',
      icon: MessageSquare,
      color: '#6B96FF',
      phrases: ['Constant.', 'Transparent.', 'Genuine.', 'Prompt.'],
      description:
        'You have direct, unhindered access to your senior account team. No hidden tickets, no waiting weeks for updates. Real conversations with real operators.',
      badge: 'Direct Channel Access',
    },
    {
      title: 'Accountability',
      icon: ShieldCheck,
      color: '#6B96FF',
      phrases: ['Real-time reporting.', 'Analytics.', 'Performance monitoring.', 'Operational visibility.'],
      description:
        'Every single purchase order, tracking number, and customer transaction is visible to you in your live client portal 24 hours a day, 7 days a week.',
      badge: '100% Ledger Transparency',
    },
    {
      title: 'Integrity',
      icon: HeartHandshake,
      color: '#2D5ADB',
      phrases: ['No unrealistic promises.', 'No pressure.', 'Honest communication.', 'Long-term collaboration.'],
      description:
        'We never sell get-rich-quick fantasies. We build legitimate, long-term commercial assets backed by proven supplier contracts and careful risk mitigation.',
      badge: 'Ethical Partnership',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-48 bg-gradient-to-r from-[#6B96FF]/05 via-[#4A7BFF]/08 to-[#2D5ADB]/05 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="INVESTOR ETHOS & PILLARS"
          title="Our promises to store investors"
          subtitle="We operate with unmatched transparency, rigorous institutional standards, and uncompromising integrity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {promises.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl p-8 sm:p-10 bg-[#16181B] border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#1A1D21] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Ambient internal light */}
                <div
                  className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: p.color }}
                />

                <div>
                  <div className="flex items-start mb-8">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${p.color}15`, color: p.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F3F3F1] mb-6">
                    {p.title}
                  </h3>

                  {/* Large Typography Phrases */}
                  <div className="space-y-1 mb-8">
                    {p.phrases.map((phrase, i) => (
                      <p
                        key={i}
                        className={`text-xl sm:text-2xl font-normal tracking-tight ${
                          i === 0
                            ? 'text-[#F3F3F1] font-medium'
                            : i === 1
                            ? 'text-[#6B96FF]'
                            : i === 2
                            ? 'text-[#4A7BFF]'
                            : 'text-[#2D5ADB]'
                        }`}
                      >
                        {phrase}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <p className="text-xs sm:text-sm text-[#96989F] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
