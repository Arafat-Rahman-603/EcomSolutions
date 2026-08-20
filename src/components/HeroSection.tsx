'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  CheckCircle2,
  BarChart3,
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

const reducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

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
  resetKey: string | number
): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setValue(reducedMotion ? target : 0);
    if (!start || reducedMotion) {
      setValue(target);
      return;
    }
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(t);
      setValue(target * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, start, duration, resetKey]);

  return value;
}

function generateChartData(platformIdx: number): number[] {
  const points = 30;
  const data: number[] = [];
  const baseStart = 0.2 + Math.random() * 0.1;
  let val = baseStart;
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    let noise = (Math.random() - 0.48) * 0.06;
    if (i > 0) {
      const drift = (Math.random() - 0.45) * 0.04;
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
  const [activePlatform, setActivePlatform] = useState(0);
  const userInteractedUntil = useRef<number>(0);
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
      color: '#D7A6B8',
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
      color: '#7F89C5',
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
      color: '#A79CC8',
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
      color: '#E0B5C4',
      icon: '/work/fb-shop.png',
    },
  ];

  useEffect(() => {
    if (!sectionInView || reducedMotion) return;
    let timerId: ReturnType<typeof setTimeout>;
    const loop = () => {
      const now = Date.now();
      if (now >= userInteractedUntil.current) {
        setActivePlatform((prev) => (prev + 1) % platforms.length);
      }
      timerId = setTimeout(loop, 5000);
    };
    const initialDelay = hasEntered ? 2500 : 5000;
    timerId = setTimeout(loop, initialDelay);
    return () => clearTimeout(timerId);
  }, [sectionInView, hasEntered, platforms.length]);

  const handleTabClick = (idx: number) => {
    setActivePlatform(idx);
    userInteractedUntil.current = Date.now() + 12000;
  };

  const curr = platforms[activePlatform];
  const targetRevenue = parseNumber(curr.revenue);
  const targetOrders = parseNumber(curr.orders);

  const revenueStart = hasEntered;
  const ordersStart = hasEntered;

  const revenueValue = useCountUp(targetRevenue, revenueStart, 1600, `rev-${activePlatform}`);
  const ordersValue = useCountUp(targetOrders, ordersStart, 1200, `ord-${activePlatform}`);

  const syncIsPercent = curr.activeStatus.includes('99.9%');
  const syncNumeric = useCountUp(99.9, hasEntered, 1400, `sync-${activePlatform}`);

  const chartData = useMemo(() => generateChartData(activePlatform), [activePlatform]);
  const strokePath = smoothPath(chartData, 600, 96);
  const areaPath = `${strokePath} L 600 96 L 0 96 Z`;

  const [currentTime, setCurrentTime] = useState('Aug 20, 14:32 UTC');
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

  const stagger = reducedMotion ? { staggerChildren: 0 } : { staggerChildren: 0.04 };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Background Ambient Glows and Grid */}
      <div className="absolute inset-0 bg-[#0b0c0e] pointer-events-none">
        {/* Very soft ambient glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] lg:w-[900px] h-[450px] bg-gradient-to-b from-[#a7a0cc]/08 via-[#d8a6b8]/05 to-transparent rounded-full blur-[160px] opacity-60" />
        <div className="absolute top-1/3 right-[-10%] w-[450px] h-[450px] bg-[#8188c2]/06 rounded-full blur-[130px] opacity-50" />
        <div className="absolute bottom-10 left-[-5%] w-[350px] h-[350px] bg-[#d8a6b8]/04 rounded-full blur-[110px] opacity-40" />

        {/* Minimal Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Small Label Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D7A6B8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D7A6B8]" />
              </span>
              <span className="text-[11px] font-semibold tracking-widest text-[#A79CC8] uppercase font-mono">
                DONE-FOR-YOU E-COMMERCE AUTOMATION
              </span>
            </motion.div>

            {/* Large Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-display tracking-tight text-[#F3F3F1] leading-[1.08]"
            >
              We do the{' '}
              <span className="text-gradient">heavy lifting</span> so you can do the{' '}
              <span className="italic font-light text-[#F3F3F1] underline decoration-[#A79CC8]/40 decoration-1 underline-offset-8">
                easy living.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl text-[#8A8C94] font-normal leading-relaxed max-w-2xl"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
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
                className="!py-4 !px-8 text-base shadow-[0_0_35px_rgba(215,166,184,0.4)]"
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
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.06] text-xs text-[#6E7078]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A79CC8]" />
                <span>100% Hands-Off DFY Model</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D7A6B8]" />
                <span>Dedicated Account Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#7F89C5]" />
                <span>Multi-Marketplace Redundancy</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Premium Dashboard */}
          <div
            ref={(node) => {
              // @ts-ignore combine refs
              dashboardSectionRef.current = node;
              // @ts-ignore
              cycleRef.current = node;
            }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Subtle elliptical path background */}
            <svg
              className="absolute z-0 pointer-events-none"
              width="600"
              height="380"
              viewBox="0 0 600 380"
              style={{ transform: 'rotate(-6deg)' }}
              aria-hidden
            >
              <ellipse
                cx="300"
                cy="190"
                rx="290"
                ry="180"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                strokeDasharray="2 8"
                fill="none"
              />
            </svg>

            {/* 4 tiny orbiting data particles */}
            {!reducedMotion && (
              <>
                <motion.div
                  className="absolute z-0 w-[2px] h-[2px] rounded-sm bg-white/30 pointer-events-none"
                  animate={{
                    x: [0, 110, 200, 150, 0, -140, -200, -90, 0],
                    y: [0, 80, 20, -70, -120, -40, 40, 90, 0],
                  }}
                  transition={{ duration: 22, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                  style={{ top: '50%', left: '50%' }}
                />
                <motion.div
                  className="absolute z-0 w-[2px] h-[2px] rounded-sm bg-white/30 pointer-events-none"
                  animate={{
                    x: [0, -130, -210, -100, 40, 170, 220, 100, 0],
                    y: [0, -60, 30, 110, 60, -50, -90, -20, 0],
                  }}
                  transition={{ duration: 28, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                  style={{ top: '50%', left: '50%' }}
                />
                <motion.div
                  className="absolute z-0 w-[2px] h-[2px] rounded-sm bg-white/30 pointer-events-none"
                  animate={{
                    x: [0, 90, 160, 40, -100, -180, -120, 20, 0],
                    y: [0, -90, -20, 80, 100, 10, -80, -60, 0],
                  }}
                  transition={{ duration: 18, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                  style={{ top: '50%', left: '50%' }}
                />
                <motion.div
                  className="absolute z-0 w-[2px] h-[2px] rounded-sm bg-white/30 pointer-events-none"
                  animate={{
                    x: [0, -80, -170, -80, 70, 180, 150, 30, 0],
                    y: [0, 70, 0, -90, -100, -10, 80, 60, 0],
                  }}
                  transition={{ duration: 25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                  style={{ top: '50%', left: '50%' }}
                />
              </>
            )}

            {/* Main Premium Dashboard Window */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={hasEntered || reducedMotion ? { opacity: 1, y: 0 } : {}}
              transition={
                reducedMotion
                  ? { duration: 0.5 }
                  : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              }
              className="relative w-full max-w-[480px] bg-[#0D0E10] border border-white/[0.08] rounded-2xl p-5 sm:p-6 z-10"
              style={{
                boxShadow:
                  '0 30px 70px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.035)',
              }}
            >
              {/* Top Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={hasEntered || reducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.1 }}
                className="flex items-center justify-between pb-4"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-[#6E7078] tracking-wide">
                    Ecom Engine
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono text-[#6E7078]">{currentTime}</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                    Live
                  </span>
                </div>
              </motion.div>

              {/* Marketplace Mini Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={hasEntered || reducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 0.15 }}
                className="relative grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#0A0B0C]/80 border border-white/[0.05] mb-5"
              >
                {platforms.map((p, idx) => {
                  const isActive = activePlatform === idx;
                  return (
                    <button
                      key={p.short}
                      type="button"
                      onClick={() => handleTabClick(idx)}
                      className={`relative py-2 text-[11px] font-medium rounded-lg cursor-pointer transition-all duration-200 z-10 ${
                        isActive
                          ? 'text-[#F3F3F1]'
                          : 'text-[#6E7078] hover:text-[#96989F] hover:bg-white/[0.02]'
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
                          className="absolute inset-0 rounded-lg bg-[#1A1B1E] border border-white/[0.08]"
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
                      <span className="text-[11px] font-mono text-[#A79CC8] uppercase tracking-wider">
                        {curr.name}
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span
                          key={`rev-${activePlatform}`}
                          className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F3F3F1] font-mono tabular-nums"
                        >
                          {formatCurrency(revenueValue)}
                        </span>
                        <motion.span
                          initial={reducedMotion ? {} : { opacity: 0, x: -6 }}
                          animate={hasEntered || reducedMotion ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.25,
                            delay: reducedMotion ? 0 : 1.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-0.5 whitespace-nowrap"
                        >
                          <TrendingUp className="w-3 h-3" />
                          {curr.growth}
                        </motion.span>
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
                        <Activity className="w-3.5 h-3.5 text-[#7F89C5]" />
                        30-Day Trajectory
                      </span>
                      <span className="font-mono text-[#F3F3F1] text-[12px]">{curr.profit}</span>
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
                        <text x="2" y="27" fontFamily="ui-monospace, monospace" fontSize="9" fill="#6E7078" textAnchor="start">$90k</text>
                        <text x="2" y="51" fontFamily="ui-monospace, monospace" fontSize="9" fill="#6E7078" textAnchor="start">$60k</text>
                        <text x="2" y="75" fontFamily="ui-monospace, monospace" fontSize="9" fill="#6E7078" textAnchor="start">$30k</text>
                        <text x="2" y="94" fontFamily="ui-monospace, monospace" fontSize="9" fill="#6E7078" textAnchor="start">$0</text>

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
                      <div className="flex items-center gap-1.5 text-[11px] text-[#6E7078] mb-1">
                        <Package className="w-3.5 h-3.5 text-[#A79CC8]" />
                        <span>Dispatched Orders</span>
                      </div>
                      <div key={`ord-${activePlatform}`} className="text-lg font-semibold text-[#F3F3F1] font-mono tabular-nums">
                        {formatNumber(ordersValue)} <span className="text-[11px] text-[#6E7078] font-normal">/mo</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#16171A] border border-white/[0.05]">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#6E7078] mb-1">
                        <Zap className="w-3.5 h-3.5 text-[#D7A6B8]" />
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
                            className="text-xs font-semibold text-emerald-400 font-mono"
                          >
                            {syncNumeric.toFixed(1)}% Sync
                          </motion.span>
                        ) : (
                          <motion.span
                            key={`sync-text-${activePlatform}`}
                            initial={reducedMotion ? {} : { opacity: 0 }}
                            animate={hasEntered || reducedMotion ? { opacity: 1 } : {}}
                            transition={{ duration: 0.3, delay: reducedMotion ? 0 : 1.5 }}
                            className="text-xs font-semibold text-emerald-400 font-mono"
                          >
                            {curr.activeStatus}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Floating Mini Notification Badge */}
                  <motion.div
                    key={`payout-${activePlatform}`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={hasEntered || reducedMotion ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: reducedMotion ? 0 : 1.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute -bottom-5 -right-3 sm:-right-5 p-3.5 rounded-xl bg-[#151618] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-3 z-20"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#2a2b2e] flex items-center justify-center text-[#A79CC8] text-sm">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#F3F3F1]">Store Payout Released</p>
                      <p className="text-[10px] font-mono text-[#A79CC8]">+$14,820.50 via Stripe Wire</p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Bar */}
              <div className="mt-1 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-[#6E7078]">
                <span>v4.8.2 · Production</span>
                <span>US-East-1 · 38ms</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
