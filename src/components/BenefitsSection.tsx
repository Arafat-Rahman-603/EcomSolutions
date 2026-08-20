'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Clock, Shield, Users, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface BenefitsSectionProps {
  onOpenApplication: () => void;
}

export default function BenefitsSection({ onOpenApplication }: BenefitsSectionProps) {
  const benefits = [
    {
      title: 'Stress-Free Onboarding',
      description:
        'We guide you through every step, from onboarding consultation and business setup to a personalized application process. We assist with entity formation, tax registration, and marketplace seller approval.',
      icon: Compass,
      cardBg: 'bg-[#121315]',
      bgTint: '',
      borderHighlight: 'border-[#4A7BFF]/20',
      accentColor: '#4A7BFF',
      number: '01',
      highlights: ['Turnkey Account Setup', 'EIN & Reseller Cert Support', 'Dedicated Onboarding Director'],
    },
    {
      title: 'Hands-Free Operations',
      description:
        'Once your business is running, our team manages the daily operations so you can focus on your time and priorities. Product sourcing, inventory replenishment, and customer support run autonomously.',
      icon: Clock,
      cardBg: 'bg-[#6B96FF]/08',
      bgTint: 'bg-[#6B96FF]/05',
      borderHighlight: 'border-[#6B96FF]/25',
      accentColor: '#6B96FF',
      number: '02',
      highlights: ['24/7 Automated Repricing', 'US Warehousing & Prep', 'Zero Daily Manual Work'],
    },
    {
      title: 'Transparent & Ethical',
      description:
        'Our operation is built around transparency, accountability, and strong business values. You have full access to view invoices, profit margins, and performance metrics in real time with zero hidden markups.',
      icon: Shield,
      cardBg: 'bg-[#121315]',
      bgTint: '',
      borderHighlight: 'border-[#2D5ADB]/20',
      accentColor: '#2D5ADB',
      number: '03',
      highlights: ['Live Financial Dashboard', 'Audited Supplier Invoices', 'Strict Policy Compliance'],
    },
    {
      title: 'Direct Team Management',
      description:
        'You work directly with our team. We maintain control over the operational process and do not rely on unnecessary outsourcing or third-party middlemen. Your account is handled by full-time vetted pros.',
      icon: Users,
      cardBg: 'bg-[#4A7BFF]/06',
      bgTint: 'bg-[#4A7BFF]/04',
      borderHighlight: 'border-[#4A7BFF]/25',
      accentColor: '#4A7BFF',
      number: '04',
      highlights: ['In-House 300+ Operators', 'No Low-Quality Outsourcing', 'Dedicated Slack / WhatsApp Channel'],
    },
  ];

  return (
    <section id="benefits" className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#6B96FF]/06 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#4A7BFF]/06 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="THE ECOM SOLUTIONS DIFFERENCE"
          title="Benefits of Working Together With Us"
          subtitle="Experience institutional-grade e-commerce operations backed by end-to-end management and dedicated specialists."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-3xl p-8 sm:p-10 ${b.cardBg} border border-white/[0.08] hover:${b.borderHighlight} transition-all duration-400 flex flex-col justify-between overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.5)]`}
              >
                {/* Number Watermark */}
                <span className="absolute top-6 right-8 text-6xl font-light tracking-tighter text-white/[0.03] group-hover:text-white/[0.08] transition-colors font-display select-none pointer-events-none">
                  {b.number}
                </span>

                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${b.accentColor}18`, color: b.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-display text-[#6B96FF] uppercase tracking-wider">
                      Core Advantage
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F3F3F1] group-hover:text-white transition-colors">
                    {b.title}
                  </h3>

                  <p className="mt-4 text-base text-[#96989F] leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-2.5">
                  {b.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#F3F3F1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A7BFF]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
