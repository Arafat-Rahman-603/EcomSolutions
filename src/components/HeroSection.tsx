'use client';

import React, { useState, useEffect, useRef, useMemo, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Package,
  Sparkles,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import MagneticButton from './MagneticButton';
import Image from 'next/image';

interface HeroSectionProps {
  onOpenApplication: (marketplace?: string) => void;
}

const parseNumber = (s: string): number => {
  return parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
};

const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const formatCurrency = (n: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(n);

const formatNumber = (n: number): string =>
  new Intl.NumberFormat('en-US').format(Math.round(n));

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

function useInViewOnce(threshold = 0.2): [React.MutableRefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function useInViewToggle(threshold = 0.2): [React.MutableRefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setInView(e.isIntersecting));
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function useCountUp(
  target: number,
  start: boolean,
  duration: number,
  resetKey: string | number,
  reducedMotion: boolean
): number {
  const [value, setValue] = useState<number>(() =>
    !start || reducedMotion ? target : 0
  );
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    if (!start || reducedMotion) {
      rafRef.current = requestAnimationFrame(() => {
        if (mounted) setValue(target);
      });
      return () => {
        mounted = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
    rafRef.current = requestAnimationFrame(() => {
      if (!mounted) return;
      setValue(0);
      const startTime = performance.now();
      const tick = (now: number) => {
        if (!mounted) return;
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutExpo(t);
        setValue(target * eased);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    });
    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, start, duration, resetKey]);

  return value;
}

/* Deterministic seeded PRNG (mulberry32) so SSR and client produce identical chart data */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function generateChartData(platformIdx: number): number[] {
  const points = 30;
  const data: number[] = [];
  const rand = mulberry32(1000 + platformIdx * 7919);
  const baseStart = 0.2 + rand() * 0.1;
  let val = baseStart;
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const noise = (rand() - 0.48) * 0.06;
    if (i > 0) {
      const drift = (rand() - 0.45) * 0.04;
      val += noise + drift;
    }
    if (platformIdx === 0) {
      val = baseStart + progress * 0.72 + noise;
    } else if (platformIdx === 1) {
      val = baseStart * 0.9 + progress * 0.56 + noise;
    } else if (platformIdx === 2) {
      val = baseStart * 0.85 + progress * 0.45 + noise;
    } else {
      val = baseStart * 0.8 + progress * 0.44;
      if (i > 20) {
        val += (i - 20) * 0.012 + noise * 0.5;
      } else {
        val += noise;
      }
    }
    val = Math.max(0.02, Math.min(0.98, val));
    data.push(val);
  }
  return data;
}

function smoothPath(points: number[], w: number, h: number): string {
  if (points.length === 0) return '';
  const stepX = w / (points.length - 1);
  const coords = points.map((v, i) => [i * stepX, h - v * (h - 8) - 4] as [number, number]);
  let d = `M ${coords[0][0].toFixed(2)} ${coords[0][1].toFixed(2)}`;
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const cp1x = x0 + stepX / 2;
    const cp1y = y0;
    const cp2x = x1 - stepX / 2;
    const cp2y = y1;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return d;
}

export default function HeroSection({ onOpenApplication }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const [activePlatform, setActivePlatform] = useState(2);
  const interactedRef = useRef<boolean>(false);
  const interactTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [dashboardSectionRef, hasEntered] = useInViewOnce(0.2);
  const [cycleRef, sectionInView] = useInViewToggle(0.2);

  const platforms = [
    {
      name: 'Amazon FBA & Dropship',
      short: 'Amazon',
      revenue: '$84,920.00',
      growth: '+314.8%',
      orders: '1,840',
      activeStatus: '99.9% Sync',
      profit: '28.4% Net Margin',
      color: '#5B8CFF',
      icon: '/work/amazon.png',
    },
    {
      name: 'Walmart WFS Automation',
      short: 'Walmart',
      revenue: '$62,450.00',
      growth: '+189.2%',
      orders: '1,210',
      activeStatus: 'Express Sync',
      profit: '31.2% Net Margin',
      color: '#2D5ADB',
      icon: '/work/walmart.png',
    },
    {
      name: 'eBay Managed Stores',
      short: 'eBay',
      revenue: '$47,800.00',
      growth: '+142.5%',
      orders: '980',
      activeStatus: 'Auto-Bidding Active',
      profit: '24.6% Net Margin',
      color: '#5B8CFF',
      icon: '/work/ebay.png',
    },
    {
      name: 'Facebook Social Commerce',
      short: 'FB Shop',
      revenue: '$38,150.00',
      growth: '+420.1%',
      orders: '840',
      activeStatus: 'Catalog Live',
      profit: '36.8% Net Margin',
      color: '#4A7BFF',
      icon: '/work/fb-shop.png',
    },
  ];

  useEffect(() => {
    if (!sectionInView || reducedMotion) return;
    let timerId: ReturnType<typeof setTimeout>;
    const loop = () => {
      if (!interactedRef.current) {
        setActivePlatform((prev) => (prev + 1) % platforms.length);
      }
      timerId = setTimeout(loop, 5000);
    };
    const initialDelay = hasEntered ? 2500 : 5000;
    timerId = setTimeout(loop, initialDelay);
    return () => {
      clearTimeout(timerId);
      if (interactTimerRef.current) clearTimeout(interactTimerRef.current);
    };
  }, [sectionInView, hasEntered, platforms.length]);

  const handleTabClick = (idx: number) => {
    setActivePlatform(idx);
    interactedRef.current = true;
    if (interactTimerRef.current) clearTimeout(interactTimerRef.current);
    interactTimerRef.current = setTimeout(() => {
      interactedRef.current = false;
    }, 12000);
  };

  const curr = platforms[activePlatform];
  const targetRevenue = parseNumber(curr.revenue);
  const targetOrders = parseNumber(curr.orders);

  const revenueStart = hasEntered;
  const ordersStart = hasEntered;

  const revenueValue = useCountUp(targetRevenue, revenueStart, 1600, `rev-${activePlatform}`, reducedMotion);
  const ordersValue = useCountUp(targetOrders, ordersStart, 1200, `ord-${activePlatform}`, reducedMotion);

  const syncIsPercent = curr.activeStatus.includes('99.9%');
  const syncNumeric = useCountUp(99.9, hasEntered, 1400, `sync-${activePlatform}`, reducedMotion);

  const chartData = useMemo(() => generateChartData(activePlatform), [activePlatform]);
  const strokePath = smoothPath(chartData, 600, 96);
  const areaPath = `${strokePath} L 600 96 L 0 96 Z`;

  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const m = months[now.getUTCMonth()];
      const d = now.getUTCDate();
      const hh = String(now.getUTCHours()).padStart(2, '0');
      const mm = String(now.getUTCMinutes()).padStart(2, '0');
      setCurrentTime(`${m} ${d}, ${hh}:${mm} UTC`);
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Device float animation */}
      <style>{`
        @keyframes deviceFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .device-showcase {
          animation: deviceFloat 8s ease-in-out infinite;
        }
        .device-showcase > * {
          pointer-events: auto;
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-[#090B0F] pointer-events-none">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Large Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-display tracking-tight text-[#F3F3F1] leading-[1.08]"
            >
              We do the{' '}
              <span className="text-gradient">heavy lifting</span> so you can do the{' '}
              <span className="italic font-light text-[#F3F3F1] underline decoration-[#5B8CFF]/40 decoration-1 underline-offset-8">
                easy living.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl text-[#8A8C94] font-normal leading-relaxed max-w-2xl"

            >
              We build, operate, and scale your e-commerce business from the ground up—so you can focus on your freedom while our dedicated operations team handles product research, supplier logistics, listings, and customer fulfillment.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton
                variant="primary"
                onClick={() => onOpenApplication(curr.name)}
                className="!py-4 !px-8 text-base shadow-[0_0_35px_rgba(74,123,255,0.4)]"
              >
                <span>Apply for a Store</span>
                <Sparkles className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                href="#services"
                className="!py-4 !px-7 text-base group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#96989F] group-hover:text-[#F3F3F1] group-hover:translate-x-1 transition-all" />
              </MagneticButton>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.06] text-xs text-[#7C8492]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B8CFF]" />
                <span>100% Hands-Off DFY Model</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5B8CFF]" />
                <span>Dedicated Account Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#2D5ADB]" />
                <span>Multi-Marketplace Redundancy</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Premium Dashboard */}
          <div
            ref={(node) => {
              dashboardSectionRef.current = node;
              cycleRef.current = node;
            }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >

            {/* Device Showcase */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
              animate={hasEntered || reducedMotion ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={reducedMotion ? { duration: 0.5 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full device-showcase"
            >
              {/* Laptop Device Frame */}
              <div
                className="relative w-full max-w-[540px] mx-auto"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                }}
              >
                {/* Laptop Screen Bezel */}
                <div className="relative rounded-xl overflow-hidden bg-[#1a1a1e] border border-white/[0.06]">
                  {/* Camera dot */}
                  <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2a2a2e] border border-[#333] z-20" />
                  {/* Screen area */}
                  <div className="relative pt-6">

            {/* Main Premium Dashboard Window */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={hasEntered || reducedMotion ? { opacity: 1, y: 0 } : {}}
              transition={
                reducedMotion
                  ? { duration: 0.5 }
                  : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              }
              className="relative w-full bg-[#11141A] border-x border-b border-white/[0.04] p-4 sm:p-5 z-10"
            >
              {/* Top Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={hasEntered || reducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.1 }}
                className="flex items-center justify-between pb-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-display text-[#7C8492] tracking-wide">
                    Ecom Engine
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-display text-[#7C8492]">{currentTime}</span>
                </div>
              </motion.div>

              {/* Marketplace Mini Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={hasEntered || reducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.15 }}
                className="relative grid grid-cols-4 gap-1 p-1 rounded-md bg-[#0A0B0C]/80 border border-white/[0.05] mb-5"
              >
                {platforms.map((p, idx) => {
                  const isActive = activePlatform === idx;
                  return (
                    <button
                      key={p.short}
                      type="button"
                      onClick={() => handleTabClick(idx)}
                      className={`relative py-2 text-[11px] font-medium rounded-md cursor-pointer transition-all duration-200 z-10 ${
                        isActive
                          ? 'text-[#F3F3F1]'
                          : 'text-[#7C8492] hover:text-[#96989F] hover:bg-white/[0.02]'
                      }`}
                      style={!isActive ? { transform: 'translateY(0)' } : undefined}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget.style.transform = 'translateY(-0.5px)');
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget.style.transform = 'translateY(0)');
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBg"
                          className="absolute inset-0 rounded-md bg-[#1A1B1E] border border-white/[0.08]"
                          style={{
                            boxShadow:
                              '0 1px 0 rgba(255,255,255,0.03) inset, 0 1px 2px rgba(0,0,0,0.3)',
                            zIndex: -1,
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                      <span className="relative z-10">{p.short}</span>
                    </button>
                  );
                })}
              </motion.div>

              {/* Inner Content Area with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`platform-content-${activePlatform}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Active Platform Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <span className="text-[11px] font-display text-[#5B8CFF] uppercase tracking-wider">
                        {curr.name}
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span
                          key={`rev-${activePlatform}`}
                          className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F3F3F1] font-display tabular-nums"
                        >
                          {formatCurrency(revenueValue)}
                        </span>
                      </div>
                    </div>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#151618] border border-white/[0.08] flex items-center justify-center flex-shrink-0 overflow-visible">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`logo-${activePlatform}`}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.1 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={curr.icon}
                            alt={curr.name}
                            fill
                            className="object-contain p-2"
                            sizes="56px"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* 30-Day Trajectory Chart Panel */}
                  <div className="mb-5 p-4 rounded-xl bg-[#101113] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-3 text-[11px]">
                      <span className="flex items-center gap-1.5 text-[#96989F]">
                        <Activity className="w-3.5 h-3.5 text-[#2D5ADB]" />
                        30-Day Trajectory
                      </span>
                      <span className="font-display text-[#F3F3F1] text-[12px]">{curr.profit}</span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={hasEntered || reducedMotion ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.4 }}
                    >
                      <svg
                        key={`chart-${activePlatform}`}
                        width="100%"
                        height="96"
                        viewBox="0 0 600 96"
                        preserveAspectRatio="none"
                        className="overflow-visible"
                      >
                        <defs>
                          <linearGradient
                            id={`gradFill-${activePlatform}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stopColor={curr.color} stopOpacity="0.18" />
                            <stop offset="100%" stopColor={curr.color} stopOpacity="0" />
                          </linearGradient>
                          <filter id={`glowFilter-${activePlatform}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1.2" result="blur" />
                            <feColorMatrix
                              in="blur"
                              type="matrix"
                              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"
                              result="glow"
                            />
                            <feMerge>
                              <feMergeNode in="glow" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Horizontal grid */}
                        <line x1="36" y1="24" x2="598" y2="24" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
                        <line x1="36" y1="48" x2="598" y2="48" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
                        <line x1="36" y1="72" x2="598" y2="72" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />

                        {/* Y-axis labels */}
                        <text x="2" y="27" fontFamily="ui-monospace, monospace" fontSize="9" fill="#7C8492" textAnchor="start">$90k</text>
                        <text x="2" y="51" fontFamily="ui-monospace, monospace" fontSize="9" fill="#7C8492" textAnchor="start">$60k</text>
                        <text x="2" y="75" fontFamily="ui-monospace, monospace" fontSize="9" fill="#7C8492" textAnchor="start">$30k</text>
                        <text x="2" y="94" fontFamily="ui-monospace, monospace" fontSize="9" fill="#7C8492" textAnchor="start">$0</text>

                        {/* Area fill */}
                        <motion.path
                          d={areaPath}
                          initial={{ opacity: 0 }}
                          animate={hasEntered || reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: reducedMotion ? 0 : 1.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          fill={`url(#gradFill-${activePlatform})`}
                        />

                        {/* Stroke line */}
                        <motion.path
                          d={strokePath}
                          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: 1 }}
                          animate={{ pathLength: 1 }}
                          transition={
                            reducedMotion
                              ? { duration: 0 }
                              : { duration: 1.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }
                          }
                          stroke={curr.color}
                          strokeWidth="1.8"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            filter: `drop-shadow(0 0 1.2px ${curr.color}80)`,
                          }}
                        />

                        {/* Data points */}
                        {chartData.map((v, i) => {
                          const stepX = 600 / (chartData.length - 1);
                          const cx = i * stepX;
                          const cy = 96 - v * (96 - 8) - 4;
                          const isLast = i === chartData.length - 1;
                          return (
                            <g key={`pt-${i}`}>
                              <motion.circle
                                cx={cx}
                                cy={cy}
                                r={isLast ? 3.5 : 2.2}
                                fill={curr.color}
                                initial={{ opacity: 0 }}
                                animate={hasEntered || reducedMotion ? { opacity: isLast ? 1 : 0.85 } : {}}
                                transition={{
                                  duration: 0.25,
                                  delay: reducedMotion ? 0 : 2.0 + i * 0.01,
                                }}
                              />
                              {isLast && (
                                <motion.circle
                                  cx={cx}
                                  cy={cy}
                                  r={3.5}
                                  fill="none"
                                  stroke={curr.color}
                                  strokeWidth="1.5"
                                  initial={{ scale: 1, opacity: 0.7 }}
                                  animate={
                                    reducedMotion
                                      ? { scale: 1, opacity: 0 }
                                      : { scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }
                                  }
                                  transition={{
                                    duration: 0.9,
                                    delay: reducedMotion ? 0 : 2.3,
                                    times: [0, 0.5, 1],
                                    repeat: 0,
                                  }}
                                />
                              )}
                            </g>
                          );
                        })}
                      </svg>
                    </motion.div>
                  </div>

                  {/* Data Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-1">
                    <div className="p-3.5 rounded-xl bg-[#16171A] border border-white/[0.05]">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#7C8492] mb-1">
                        <Package className="w-3.5 h-3.5 text-[#5B8CFF]" />
                        <span>Dispatched Orders</span>
                      </div>
                      <div key={`ord-${activePlatform}`} className="text-lg font-semibold text-[#F3F3F1] font-display tabular-nums">
                        {formatNumber(ordersValue)} <span className="text-[11px] text-[#7C8492] font-normal">/mo</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#16171A] border border-white/[0.05]">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#7C8492] mb-1">
                        <Zap className="w-3.5 h-3.5 text-[#5B8CFF]" />
                        <span>Sync Status</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="relative flex w-1.5 h-1.5">
                          <motion.span
                            key={`sync-dot-${activePlatform}`}
                            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                            initial={reducedMotion ? { scale: 1, opacity: 0.7 } : { scale: 1, opacity: 0.7 }}
                            animate={
                              reducedMotion
                                ? { scale: 1, opacity: 0.7 }
                                : { scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }
                            }
                            transition={{
                              duration: 0.9,
                              delay: reducedMotion ? 0 : 1.4,
                              times: [0, 0.5, 1],
                              repeat: 0,
                            }}
                          />
                          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                        </span>
                        {syncIsPercent ? (
                          <motion.span
                            key={`sync-text-${activePlatform}`}
                            initial={reducedMotion ? {} : { opacity: 0 }}
                            animate={hasEntered || reducedMotion ? { opacity: 1 } : {}}
                            transition={{ duration: 0.3, delay: reducedMotion ? 0 : 1.5 }}
                            className="text-xs font-semibold text-emerald-400 font-display"
                          >
                            {syncNumeric.toFixed(1)}% Sync
                          </motion.span>
                        ) : (
                          <motion.span
                            key={`sync-text-${activePlatform}`}
                            initial={reducedMotion ? {} : { opacity: 0 }}
                            animate={hasEntered || reducedMotion ? { opacity: 1 } : {}}
                            transition={{ duration: 0.3, delay: reducedMotion ? 0 : 1.5 }}
                            className="text-xs font-semibold text-emerald-400 font-display"
                          >
                            {curr.activeStatus}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>


                </motion.div>
              </AnimatePresence>

              {/* Bottom Bar */}
              <div className="mt-1 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-display text-[#7C8492]">
                <span>v4.8.2 · Production</span>
                <span>US-East-1 · 38ms</span>
              </div>
            </motion.div>

                  </div>
                </div>
                {/* Laptop Base */}
                <div className="relative">
                  <div
                    className="h-[14px] bg-gradient-to-b from-[#2a2a2e] to-[#1e1e22] border-x border-b border-white/[0.04]"
                    style={{
                      borderRadius: '0 0 10px 10px',
                      margin: '0 14%',
                    }}
                  />
                  <div
                    className="h-[5px] bg-gradient-to-b from-[#1a1a1e] to-[#161619]"
                    style={{
                      borderRadius: '0 0 14px 14px',
                      margin: '0 8%',
                    }}
                  />
                </div>
              </div>

              {/* Mobile Phone Device */}
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
                animate={hasEntered || reducedMotion ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={reducedMotion ? { duration: 0.5, delay: 0.1 } : { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 sm:right-[-8px] bottom-[18%] z-20"
                style={{
                  filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6)) drop-shadow(0 5px 12px rgba(0,0,0,0.4))',
                }}
              >
                <div className="w-[115px] sm:w-[132px] rounded-[22px] sm:rounded-[26px] bg-[#1a1a1e] border border-white/[0.08] p-[5px] sm:p-[6px]">
                  <div className="relative rounded-[17px] sm:rounded-[20px] bg-[#0D0E10] overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="flex justify-center pt-[6px] pb-[3px]">
                      <div className="w-[34px] sm:w-[40px] h-[11px] sm:h-[13px] bg-black rounded-full" />
                    </div>
                    {/* Screen content */}
                    <div className="px-2.5 sm:px-3 pb-3 sm:pb-4 pt-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[7px] sm:text-[8px] text-[#7C8492] font-display">Ecom Engine</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-[#5B8CFF] font-display uppercase tracking-wider mb-0.5">Amazon FBA</div>
                      <div className="text-base sm:text-lg font-semibold text-[#F3F3F1] font-display tabular-nums mb-0.5">$84,920</div>
                      <div className="text-[8px] sm:text-[9px] text-emerald-400 font-display font-medium mb-2">↗ +314.8%</div>
                      <div className="h-[36px] sm:h-[44px] rounded-[8px] sm:rounded-[10px] bg-[#101113] border border-white/[0.06] p-1.5 sm:p-2 mb-1.5">
                        <svg viewBox="0 0 120 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 34 C 8 30, 16 26, 24 22 C 32 18, 40 20, 48 16 C 56 12, 64 14, 72 10 C 80 7, 88 8, 96 4 C 104 2, 112 3, 120 1 L 120 40 L 0 40 Z"
                            fill="url(#phoneGrad)"
                          />
                          <path
                            d="M 0 34 C 8 30, 16 26, 24 22 C 32 18, 40 20, 48 16 C 56 12, 64 14, 72 10 C 80 7, 88 8, 96 4 C 104 2, 112 3, 120 1"
                            fill="none"
                            stroke="#5B8CFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                        <div className="p-1.5 sm:p-2 rounded-[6px] sm:rounded-[8px] bg-[#16171A] border border-white/[0.05]">
                          <div className="text-[6.5px] sm:text-[7px] text-[#7C8492] mb-0.5">Orders</div>
                          <div className="text-[10px] sm:text-xs font-semibold text-[#F3F3F1] font-display tabular-nums">1,840</div>
                        </div>
                        <div className="p-1.5 sm:p-2 rounded-[6px] sm:rounded-[8px] bg-[#16171A] border border-white/[0.05]">
                          <div className="text-[6.5px] sm:text-[7px] text-[#7C8492] mb-0.5">Sync</div>
                          <div className="flex items-center gap-0.5">
                            <div className="w-1 h-1 rounded-full bg-emerald-400" />
                            <div className="text-[8px] sm:text-[10px] font-semibold text-emerald-400 font-display">99.9%</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1.5 p-1.5 sm:p-2 rounded-[6px] sm:rounded-[8px] bg-[#151618] border border-white/[0.06] flex items-center gap-1.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] sm:rounded-[5px] bg-[#2a2b2e] flex items-center justify-center text-[#5B8CFF] text-[7px] sm:text-[8px]">✓</div>
                        <div>
                          <div className="text-[6.5px] sm:text-[7px] text-[#F3F3F1] font-medium">Payout Released</div>
                          <div className="text-[6px] sm:text-[7px] text-[#5B8CFF] font-display">+$14,820.50</div>
                        </div>
                      </div>
                    </div>
                    {/* Home indicator */}
                    <div className="flex justify-center pb-[6px] sm:pb-[8px]">
                      <div className="w-[32px] sm:w-[36px] h-[3px] sm:h-[4px] bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Payout Notification */}
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                animate={hasEntered || reducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={reducedMotion ? { duration: 0.5, delay: 0.2 } : { duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-4 right-2 sm:right-4 z-30 p-3.5 rounded-xl bg-[#15181F] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#2a2b2e] flex items-center justify-center text-[#5B8CFF] text-sm">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-medium text-[#F3F4F6]">Store Payout Released</p>
                  <p className="text-[10px] font-display text-[#5B8CFF]">+$14,820.50 via Stripe Wire</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
