'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import Image from 'next/image';
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
    { label: 'Our Team', href: '#our-team' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 md:py-3.5 bg-[rgba(11,12,14,0.72)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)] shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
            : 'py-5 md:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo — uses web-logo.png from public folder per spec */}
          <a
            href="#hero"
            className="group flex items-center gap-3 focus:outline-none flex"
            aria-label="Ecom Solutions Home"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
              <Image
                src="/web-logo-icon.png"
                alt="Ecom Solutions"
                fill
                className="object-contain object-left transition-all duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
            {/* <div className="relative w-[200px] sm:w-[220px] h-full sm:h-24 flex items-center justify-start">
              <Image
                src="/web-logo.png"
                alt="Ecom Solutions"
                fill
                className="object-contain object-left transition-all duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div> */}
          </a>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-3.5 py-1.5 text-xs font-medium text-[#8A8C94] hover:text-[#F3F3F1] rounded-md transition-all duration-200 hover:bg-white/[0.04] group"
                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {link.label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-[#4A7BFF] to-[#2D5ADB] group-hover:w-4 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right CTA + Mobile Trigger */}
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
              className="lg:hidden p-2 rounded-md bg-white/[0.04] border border-white/[0.07] text-[#F3F3F1] hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-29 bg-[#0b0c0e]/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              style={{ zIndex: 29 }}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="fixed inset-x-0 top-20 mx-3 sm:mx-4 z-30 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl bg-[#121315]/98 backdrop-blur-2xl border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.8)] lg:hidden"
            >
              {/* Ambient Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#6B96FF]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1.5 relative z-10 p-4 sm:p-5">
                <div className="text-[10px] tracking-widest text-[#6b6b73] uppercase px-3 mb-3 pt-1 font-medium">
                  Navigation
                </div>
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{ delay: idx * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#f2f2f0] hover:bg-[#1a1b1e] hover:border-[#6B96FF]/25 transition-all duration-200 group"
                  >
                    <span className="text-base font-medium">{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#6b6b73] group-hover:text-[#6B96FF] group-hover:translate-x-0.5 transition-all" />
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-4 sm:p-5 pt-3 border-t border-white/[0.07] space-y-4 relative z-10"
              >
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenApplication();
                  }}
                  className="w-full py-4 rounded-md bg-gradient-to-r from-[#4A7BFF] via-[#6B96FF] to-[#2D5ADB] text-black font-bold text-sm shadow-[0_0_30px_rgba(74,123,255,0.30)] flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-[0_0_40px_rgba(74,123,255,0.5)] active:scale-[0.98]"
                >
                  <span>Apply for a Store</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="text-center pb-1">
                  <p className="text-xs text-[#6b6b73]">
                    Direct Partner Hotline:{' '}
                    <a href="tel:+8801710910594" className="text-[#a1a1aa] hover:text-[#f2f2f0]">
                      +880 1710 910594
                    </a>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
