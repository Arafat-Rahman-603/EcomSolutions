'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Layers, Shield, ChevronRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  onOpenApplication: (marketplace?: string) => void;
}

export default function Navbar({ onOpenApplication }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-invest' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Configurator', href: '#store-builder' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#0B0D0F]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Ecom Solutions Home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-[#1A1C1F] border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#A79CC8]/50 group-hover:shadow-[0_0_20px_rgba(167,156,200,0.3)]">
              {/* Abstract glowing geometric logo mark */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D7A6B8]/20 via-[#A79CC8]/20 to-[#7F89C5]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#F3F3F1] relative z-10 transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="url(#logo-grad-1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="url(#logo-grad-2)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#96989F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="logo-grad-1" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D7A6B8" />
                    <stop offset="1" stopColor="#A79CC8" />
                  </linearGradient>
                  <linearGradient id="logo-grad-2" x1="2" y1="17" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A79CC8" />
                    <stop offset="1" stopColor="#7F89C5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-[#F3F3F1] leading-none">
                ECOM<span className="text-[#A79CC8] font-light ml-1">SOLUTIONS</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#6E7078] uppercase font-mono mt-0.5">
                Automated Systems
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#15171A]/70 border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-[#96989F] hover:text-[#F3F3F1] rounded-full transition-all duration-200 hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side Pill CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton
                variant="primary"
                onClick={() => onOpenApplication()}
                className="!py-2.5 !px-5 !text-xs uppercase tracking-wider font-semibold"
              >
                <span>Apply for a Store</span>
                <Sparkles className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[#F3F3F1] hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Glass Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 pt-24 px-6 pb-10 bg-[#0B0D0F]/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#A79CC8]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="text-[11px] font-mono tracking-widest text-[#6E7078] uppercase px-3 mb-2">
                Navigation
              </div>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 + 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-lg font-medium text-[#F3F3F1] hover:bg-white/[0.06] hover:border-[#A79CC8]/30 transition-all"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#6E7078]" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-4 relative z-10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D7A6B8] via-[#A79CC8] to-[#7F89C5] text-[#0B0D0F] font-bold text-base shadow-[0_0_30px_rgba(215,166,184,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for a Store</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <div className="text-center">
                <p className="text-xs text-[#6E7078]">
                  Direct Partner Hotline:{' '}
                  <a href="tel:+8801710910594" className="text-[#96989F] hover:text-[#F3F3F1]">
                    +880 1710 910594
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
