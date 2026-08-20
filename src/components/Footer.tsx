'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Check,
  Globe,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [dhakaTime, setDhakaTime] = useState('');
  const [nyTime, setNyTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setDhakaTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setNyTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const services = [
    { label: 'Amazon Automation', href: '#services' },
    { label: 'Amazon FBA Wholesale', href: '#services' },
    { label: 'eBay Store Automation', href: '#services' },
    { label: 'Facebook Shops & Meta', href: '#services' },
    { label: 'Walmart Dropshipping', href: '#services' },
    { label: 'Walmart WFS 2-Day', href: '#services' },
  ];

  const company = [
    { label: 'About Ecom Solutions', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Investor Benefits', href: '#benefits' },
    { label: 'Interactive Configurator', href: '#store-builder' },
    { label: 'Frequently Asked Questions', href: '#faq' },
  ];

  return (
    <footer className="relative bg-[#08090B] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden text-[#96989F]">
      {/* Subtle bottom lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[rgba(107,150,255,0.05)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-[#1A1C1F] border border-white/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-tr from-[#4A7BFF] to-[#2D5ADB] rounded-md" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-[#F3F3F1] leading-none">
                  ECOM<span className="text-[#6B96FF] font-light ml-1">SOLUTIONS</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#6E7078] uppercase font-display mt-0.5">
                  Managed DFY Systems
                </span>
              </div>
            </div>

            <p className="text-sm text-[#96989F] leading-relaxed max-w-sm">
              We help build, operate, and scale e-commerce businesses through Done-For-You management services, providing turnkey retail income opportunities.
            </p>

            {/* Live Operational Time Clocks */}
            <div className="p-3.5 rounded-2xl bg-[#111316] border border-white/5 space-y-2 max-w-sm">
              <div className="flex items-center justify-between text-xs font-display">
                <span className="flex items-center gap-1.5 text-[#6E7078]">
                  <Clock className="w-3.5 h-3.5 text-[#4A7BFF]" />
                  Dhaka Ops HQ:
                </span>
                <span className="text-[#F3F3F1] font-semibold">{dhakaTime || 'Loading...'} (GMT+6)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-display">
                <span className="flex items-center gap-1.5 text-[#6E7078]">
                  <Clock className="w-3.5 h-3.5 text-[#4A7BFF]" />
                  US Markets Desk:
                </span>
                <span className="text-[#F3F3F1] font-semibold">{nyTime || 'Loading...'} (EST)</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-display uppercase tracking-wider text-[#F3F3F1]">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#F3F3F1] transition-colors flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-display uppercase tracking-wider text-[#F3F3F1]">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-[#F3F3F1] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-display uppercase tracking-wider text-[#F3F3F1]">
              Contact & HQ
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4A7BFF] shrink-0 mt-1" />
                <p className="text-xs text-[#96989F] leading-snug">
                  H-68/1, Omor Ali Lane, West Rampura, Dhaka-1219, Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6B96FF] shrink-0" />
                <a
                  href="tel:+8801710910594"
                  className="text-xs text-[#F3F3F1] hover:text-[#4A7BFF] transition-colors font-display"
                >
                  +880 1710 910594
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2D5ADB] shrink-0" />
                <a
                  href="mailto:info@ecomsolutionsbd.com"
                  className="text-xs text-[#F3F3F1] hover:text-[#6B96FF] transition-colors font-display"
                >
                  info@ecomsolutionsbd.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-3">
              <h5 className="text-xs font-medium text-[#F3F3F1] mb-2">Stay ahead of e-commerce</h5>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3.5 pr-28 py-2.5 bg-[#14161A] border border-white/10 rounded-md text-xs text-[#F3F3F1] placeholder-[#6E7078] focus:outline-none focus:border-[#6B96FF] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-md bg-gradient-to-r from-[#4A7BFF] to-[#2D5ADB] text-[#0B0D0F] font-bold text-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1 text-[11px]">
                      <Check className="w-3 h-3 stroke-[3]" /> Done
                    </span>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E7078]">
          <p>© 2026 Ecom Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#96989F] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#96989F] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#96989F] cursor-pointer">Partner Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
