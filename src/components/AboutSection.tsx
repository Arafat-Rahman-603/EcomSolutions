'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe2,
  ShieldCheck,
  Building,
  CheckCircle2,
  Lock,
  Cpu,
  Sparkles,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import MagneticButton from './MagneticButton';

interface AboutSectionProps {
  onOpenApplication: () => void;
}

export default function AboutSection({ onOpenApplication }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#0B0D0F] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[rgba(107,150,255,0.06)] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7BFF]" />
              <span className="text-[11px] font-semibold tracking-widest text-[#6B96FF] uppercase font-mono">
                ABOUT ECOM SOLUTIONS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium tracking-tight text-[#F3F3F1] leading-[1.14]">
              We do the hard work.{' '}
              <span className="text-gradient">You sit back, relax,</span> and focus on what matters.
            </h2>

            <div className="space-y-4 text-base text-[#96989F] leading-relaxed">
              <p>
                <strong className="text-[#F3F3F1] font-semibold">Ecom Solutions</strong> is a full-service Done-For-You e-commerce management agency headquartered in Dhaka with global operational nodes across the United States.
              </p>
              <p>
                We help individuals, private investors, and business owners build, operate, and scale institutional e-commerce enterprises from the ground up.
              </p>
              <p>
                Whether you are completely new to digital commerce or looking to diversify an existing capital portfolio, our 300+ in-house operations team provides turnkey support—handling product discovery, supply chain routing, listings, and customer care.
              </p>
            </div>

            {/* Quick Pillars Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#141619] border border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#4A7BFF] mb-2" />
                <h4 className="text-sm font-semibold text-[#F3F3F1]">In-House Control</h4>
                <p className="text-xs text-[#6E7078] mt-1">Zero freelance outsourcing; full quality control.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#141619] border border-white/5">
                <Globe2 className="w-5 h-5 text-[#6B96FF] mb-2" />
                <h4 className="text-sm font-semibold text-[#F3F3F1]">Global Scale</h4>
                <p className="text-xs text-[#6E7078] mt-1">Direct ties to US fulfillment hubs & logistics.</p>
              </div>
            </div>

            <div className="pt-2">
              <MagneticButton
                variant="secondary"
                onClick={onOpenApplication}
                className="!py-3.5 !px-6 text-sm"
              >
                <span>Partner With Ecom Solutions</span>
                <Sparkles className="w-4 h-4 text-[#6B96FF]" />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Holographic Futuristic Security & Operations Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-[#14161A] border border-white/[0.12] p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden">
              {/* Glowing gradient ambient background */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[rgba(74,123,255,0.15)] via-[rgba(107,150,255,0.10)] to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Head office indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#4A7BFF]">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#F3F3F1]">Global Operations Desk</span>
                    <span className="text-xs text-[#6E7078] block flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#6B96FF]" />
                      West Rampura, Dhaka & US Hubs
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  ONLINE 24/7
                </span>
              </div>

              {/* Live telemetry list */}
              <div className="space-y-3.5 mb-6">
                {[
                  { title: 'Store Management Engineers', count: '140+ Specialists', icon: Cpu, col: '#4A7BFF' },
                  { title: 'Product Sourcing Specialists', count: '85+ Researchers', icon: TrendingUp, col: '#6B96FF' },
                  { title: 'Customer Experience & Compliance', count: '75+ Full-Time Staff', icon: ShieldCheck, col: '#2D5ADB' },
                ].map((dept, idx) => {
                  const Icon = dept.icon;
                  return (
                    <div
                      key={dept.title}
                      className="p-4 rounded-2xl bg-[#0F1114] border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                          style={{ backgroundColor: `${dept.col}15`, color: dept.col }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#F3F3F1]">
                          {dept.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#6B96FF] bg-white/[0.04] px-2.5 py-1 rounded-lg">
                        {dept.count}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Security & Verification Guarantee */}
              <div className="p-4 rounded-2xl bg-[#181A1F] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-[#96989F]">
                  <Lock className="w-4 h-4 text-[#4A7BFF]" />
                  <span>Institutional Seller Protection Protocol v4</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">100% SECURE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
