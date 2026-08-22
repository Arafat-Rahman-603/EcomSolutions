'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowUpRight,
  CheckCircle,
  X,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onOpenApplication: (serviceName?: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  marketplace: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  gridClass: string;
  cardVariant: 'large-horiz' | 'square' | 'tall' | 'medium' | 'wide-bottom' | 'small-accent';
  icon: string;
  color: string;
  highlightDetails: string[];
}

interface HorizontalScrollShowcaseProps {
  services: ServiceItem[];
  onOpenApplication: (serviceName?: string) => void;
}

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onClick: () => void;
}

function HorizontalScrollShowcase({ services, onOpenApplication }: HorizontalScrollShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - section.clientWidth);

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="h-screen overflow-hidden flex items-center">
        <div
          ref={trackRef}
          className="flex flex-nowrap gap-4 sm:gap-6 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onClick={() => onOpenApplication(service.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index, onClick }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group relative rounded-2xl p-5 sm:p-7 lg:p-9 bg-[#080808] border border-white/[0.07] hover:border-white/[0.18] hover:bg-[#0d0d0d] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] cursor-pointer shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] ${service.gridClass}`}
      onClick={onClick}
    >
      {/* Subtle hover gradient glow inside card */}
      <div
        className="absolute top-0 right-0 -mr-16 -mt-16 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: service.color }}
      />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-[#1a1c1f] border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[#6B96FF]/40 transition-all">
              <Image src={service.icon} alt={service.marketplace} fill className="object-contain" sizes="40px" />
            </div>
            <div>
              <span className="text-[11px] font-display text-[#6B96FF] uppercase tracking-wider block">
                {service.marketplace}
              </span>
              <div className="text-[11px] text-[#6E7078]">{service.subtitle}</div>
            </div>
          </div>

          {/* Arrow Action Button */}
          <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#96989F] group-hover:text-[#0B0D0F] group-hover:bg-gradient-to-r group-hover:from-[#4A7BFF] group-hover:to-[#2D5ADB] group-hover:border-transparent transition-all shrink-0">
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#F3F3F1] group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-[#96989F] leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </div>

      {/* Card Footer: Metrics & Tags */}
      <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-4">
        {/* Metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {service.metrics.map((metric, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-[#111315]/80 border border-white/5">
              <span className="text-[10px] uppercase font-display text-[#6E7078] block">
                {metric.label}
              </span>
              <span className="text-xs font-semibold text-[#F3F3F1] font-display mt-0.5 block">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection({ onOpenApplication }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [featuredActive, setFeaturedActive] = useState(0);

  const services: ServiceItem[] = [
    {
      id: 'amazon-dropship',
      title: 'Amazon Dropshipping Automation',
      marketplace: 'Amazon Marketplace',
      subtitle: 'Over 50% of Amazon sales come from third-party sellers.',
      description:
        'More than 50% of Amazon sales come from third-party sellers. Let us help you build, operate, and scale your store with proprietary inventory routing and multi-warehouse sync.',
      metrics: [
        { label: 'Avg. Profit Margin', value: '18% – 28%' },
        { label: 'Inventory Capital Needed', value: 'Low / On-Demand' },
        { label: 'Product Catalog', value: '5,000+ Verified SKUs' },
      ],
      tags: ['Zero Inventory Risk', 'Automated Pricing Engine', 'Prime Delivery Routing'],
      gridClass: 'lg:col-span-8',
      cardVariant: 'large-horiz',
      icon: '/work/amazon.png',
      color: '#4A7BFF',
      highlightDetails: [
        'Proprietary US supplier integration to guarantee strict 2-3 day shipping compliance',
        'Algorithmic Buy-Box repricer operating 24/7 across thousands of fast-moving products',
        'Full customer service, returns resolution, and account health compliance team',
      ],
    },
    {
      id: 'amazon-fba',
      title: 'Amazon FBA Automation',
      marketplace: 'Amazon FBA Network',
      subtitle: 'Asset-backed fulfillment utilizing Amazon logistics.',
      description:
        "Leverage Amazon's fulfillment network while our team handles the day-to-day operations, wholesale product research, purchase orders, and prep-center logistics.",
      metrics: [
        { label: 'Fulfillment Speed', value: 'Prime 1-2 Days' },
        { label: 'Brand Exclusivity', value: 'Wholesale & Private' },
      ],
      tags: ['Prime Badge', 'Wholesale Sourcing', 'Hands-Off Prep'],
      gridClass: 'lg:col-span-4',
      cardVariant: 'square',
      icon: '/work/amazon.png',
      color: '#6B96FF',
      highlightDetails: [
        'Direct relationship building with top US distributors & brand authorizations',
        'Comprehensive freight forwarding, barcode labeling, and FBA warehouse dispatch',
        'High organic ranking with sponsored product PPC optimization managed in-house',
      ],
    },
    {
      id: 'ebay-automation',
      title: 'eBay Automation',
      marketplace: 'eBay Global',
      subtitle: 'High buyer volume with minimal seller restrictions.',
      description:
        'Build and manage your eBay store with a dedicated team focused on operations, multi-variant listings, auction dynamics, and sustainable long-term cash flow.',
      metrics: [
        { label: 'Buyer Base', value: '135M+ Active' },
        { label: 'Launch Speed', value: '3 - 5 Days' },
      ],
      tags: ['Top Rated Status', 'Automated Relisting', 'Global Shipping'],
      gridClass: 'lg:col-span-4',
      cardVariant: 'tall',
      icon: '/work/ebay.png',
      color: '#2D5ADB',
      highlightDetails: [
        'Automated product sync across trending consumer electronics, tools, and home goods',
        'Top Rated Seller maintenance strategy to minimize selling fees and rank #1 in search',
        'Direct eBay API token integration with automated tracking number uploads',
      ],
    },
    {
      id: 'facebook-shops',
      title: 'Facebook Shops Automation',
      marketplace: 'Meta Commerce',
      subtitle: 'Tap into direct social commerce feeds.',
      description:
        'Expand your business through social commerce with professionally managed Facebook Shop operations, organic marketplace traffic, and checkout integrations.',
      metrics: [
        { label: 'Platform Reach', value: '2.9B+ Users' },
        { label: 'Organic Traffic', value: 'High Virality' },
      ],
      tags: ['Social Commerce', 'Zero Ad Spend Models', 'In-App Checkout'],
      gridClass: 'lg:col-span-8',
      cardVariant: 'medium',
      icon: '/work/fb-shop.png',
      color: '#4A7BFF',
      highlightDetails: [
        'Harness Meta algorithmic recommendations to drive repeat organic checkout sales',
        'Direct connection to US supplier fulfillment networks with instant order injection',
        'Hands-free dispute resolution and continuous commerce policy compliance',
      ],
    },
    {
      id: 'walmart-dropship',
      title: 'Walmart Dropshipping Automation',
      marketplace: 'Walmart.com',
      subtitle: "The world's largest omnichannel retail platform.",
      description:
        'Reach Walmart’s massive online customer base with a managed e-commerce operation engineered for high average order value and premium margins.',
      metrics: [
        { label: 'Monthly Visitors', value: '120M+ Shoppers' },
        { label: 'Competition Ratio', value: '1/10th of Amazon' },
      ],
      tags: ['Less Competition', 'High Average Ticket', 'Curated Catalog'],
      gridClass: 'lg:col-span-7',
      cardVariant: 'wide-bottom',
      icon: '/work/walmart.png',
      color: '#2D5ADB',
      highlightDetails: [
        'Walmart seller account approval assistance and corporate structure onboarding',
        'Strict adherence to Walmart Seller Performance standards (OTD, VTR, PCR)',
        'Exclusive access to high-margin US supplier feeds unavailable to regular sellers',
      ],
    },
    {
      id: 'walmart-wfs',
      title: 'Walmart WFS Automation',
      marketplace: 'Walmart Fulfillment Services',
      subtitle: 'Walmart 2-day delivery badge with guaranteed buy-box preference.',
      description:
        'Streamline your Walmart store and fulfillment process with experienced automation support, automated replenishment, and preferential search placement.',
      metrics: [
        { label: 'Shipping Speed', value: '2-Day Express' },
        { label: 'Buy Box Share', value: '+60% Boost' },
      ],
      tags: ['2-Day Badge', 'WFS Storage Sync', 'Premium Placement'],
      gridClass: 'lg:col-span-5',
      cardVariant: 'small-accent',
      icon: '/work/walmart.png',
      color: '#6B96FF',
      highlightDetails: [
        'Complete inventory prep and shipment dispatch directly into Walmart WFS hubs',
        'Automatic 2-day delivery badge on all product listings for superior conversion rates',
        'Walmart dedicated customer service & return handling handled end-to-end',
      ],
    },
  ];

  // Featured services for the 3-card centered showcase
  const featuredServices = [
    {
      id: 'feat-amazon',
      title: 'Amazon Automation',
      description: 'Build, operate, and scale your Amazon store with our full DFY management team. From product research to Prime-compliant fulfillment.',
      image: '/work/amazon.png',
      marketplace: 'Amazon FBA & Dropship',
      metric: '$84.9K /mo Avg.',
    },
    {
      id: 'feat-walmart',
      title: 'Walmart Automation',
      description: "Tap into Walmart's 120M+ monthly shoppers. Less competition, higher average order value — we handle everything from approval to scaling.",
      image: '/work/walmart.png',
      marketplace: 'Walmart WFS',
      metric: '1/10th Competition',
    },
    {
      id: 'feat-ebay',
      title: 'eBay Automation',
      description: 'High buyer volume with minimal seller restrictions. Our team manages full store operations, listings, and Top Rated Seller compliance.',
      image: '/work/ebay.png',
      marketplace: 'eBay Global',
      metric: '135M+ Active Buyers',
    },
    {
      id: 'feat-facebook',
      title: 'Facebook Shop Automation',
      description: 'Social commerce with organic reach. We run your Facebook Shop with zero ad spend models, viral catalog placement, and hands-free checkout.',
      image: '/work/fb-shop.png',
      marketplace: 'Meta Commerce',
      metric: '2.9B+ Reach',
    },
  ];

  /* Auto-advance featured carousel every 4.5s, pause on hover */
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setFeaturedActive((prev) => (prev + 1) % featuredServices.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, featuredServices.length]);

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.05]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#6B96FF]/04 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-[#4A7BFF]/04 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="COMPREHENSIVE MARKETPLACE SOLUTIONS"
          title="Featured Services"
          subtitle="Showcase and storytelling for our most in-demand automation programs."
        />

        {/* ── FEATURED 3-CARD CENTERED SHOWCASE ── */}
        <div
          className="mb-20 lg:mb-28"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Platform tab selectors — pill style */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
            {featuredServices.map((fs, idx) => (
              <button
                key={fs.id}
                type="button"
                onClick={() => setFeaturedActive(idx)}
                className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  featuredActive === idx
                    ? 'bg-[#111315] border-2 border-[#4A7BFF]/60 text-white shadow-[0_0_24px_rgba(74,123,255,0.18)]'
                    : 'bg-[#0f1012] border border-white/[0.06] text-[#6b6b73] hover:text-[#a1a1aa] hover:border-white/[0.12]'
                }`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {fs.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* 4-Card layout — absolute-positioned, all 4 visible on md/lg, centered with offsets */}
          <div className="hidden md:block relative mx-auto w-full max-w-5xl h-[520px] md:h-[540px] lg:h-[600px] overflow-hidden">
            {featuredServices.map((fs, idx) => {
              const N = featuredServices.length;
              let offset = idx - featuredActive;
              if (offset > N / 2) offset -= N;
              if (offset < -N / 2) offset += N;
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              let scale: number;
              let opacity: number;
              let yOffset: number;
              let xPx: number;
              let showFull: boolean;
              let cardW: string;

              if (isActive) {
                scale = 1.02;
                opacity = 1;
                yOffset = 0;
                xPx = 0;
                showFull = true;
                cardW = 'md:w-[300px] lg:w-[350px]';
              } else if (absOffset === 1) {
                scale = 0.9;
                opacity = 0.78;
                yOffset = 16;
                xPx = offset * 250;
                showFull = false;
                cardW = 'md:w-[250px] lg:w-[290px]';
              } else {
                scale = 0.78;
                opacity = 0.5;
                yOffset = 30;
                xPx = offset * 390;
                showFull = false;
                cardW = 'md:w-[220px] lg:w-[250px]';
              }

              return (
                <motion.div
                  key={fs.id}
                  animate={{
                    x: `calc(-50% + ${xPx}px)`,
                    y: yOffset,
                    scale,
                    opacity,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute top-0 left-1/2 ${cardW} ${!isActive ? 'cursor-pointer' : ''}`}
                  onClick={() => !isActive && setFeaturedActive(idx)}
                  style={{ zIndex: 10 - absOffset }}
                >
                  {showFull ? (
                    <div className="relative rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0a0b0d] shadow-[0_40px_100px_rgba(0,0,0,0.85),0_0_80px_rgba(74,123,255,0.08)]">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4A7BFF]/50 to-transparent" />

                      <div className="relative h-36 md:h-40 lg:h-48 flex items-center justify-center pt-8 pb-3">
                        <div className="relative w-20 md:w-24 h-20 md:h-24 lg:w-28 lg:h-28">
                          <Image
                            src={fs.image}
                            alt={fs.marketplace}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(min-width: 1024px) 112px, (min-width: 768px) 96px, 80px"
                          />
                        </div>
                      </div>

                      <div className="px-6 md:px-7 lg:px-9 pb-8 md:pb-9 space-y-3 md:space-y-3.5">
                        <span
                          className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[#4A7BFF] block"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {fs.marketplace}
                        </span>

                        <h3
                          className="text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-tight"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {fs.title}
                        </h3>

                        <motion.p
                          key={`${fs.id}-desc`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-xs md:text-sm lg:text-base text-[#a1a1aa] leading-relaxed"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {fs.description}
                        </motion.p>

                        <div className="pt-4 md:pt-5 mt-4 md:mt-5 border-t border-white/[0.08] flex items-center justify-between">
                          <span
                            className="text-[11px] md:text-xs lg:text-sm text-[#6b6b73] font-medium"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            {fs.metric}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenApplication(fs.title);
                            }}
                            className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-[#5a8cff] hover:bg-[#4A7BFF] text-black font-semibold text-[11px] md:text-xs lg:text-sm transition-all duration-300 hover:shadow-[0_0_28px_rgba(74,123,255,0.45)] cursor-pointer"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#08090a]">
                      <div className="relative h-32 md:h-36 lg:h-44 flex items-center justify-center pt-6 md:pt-7 pb-2">
                        <div className="relative w-16 md:w-20 h-16 md:h-20 lg:w-24 lg:h-24">
                          <Image
                            src={fs.image}
                            alt={fs.marketplace}
                            fill
                            className="object-contain"
                            sizes="(min-width: 1024px) 96px, (min-width: 768px) 80px, 64px"
                          />
                        </div>
                      </div>

                      <div className="px-5 md:px-6 lg:px-8 pb-7 md:pb-8 space-y-2 md:space-y-2.5">
                        <span
                          className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4A7BFF]/70 block"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {fs.marketplace}
                        </span>

                        <h3
                          className="text-lg md:text-xl lg:text-2xl font-semibold text-[#9a9ba3] tracking-tight leading-tight"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {fs.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: 4-card horizontal scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
            {featuredServices.map((fs, idx) => {
              const isActive = featuredActive === idx;
              return (
                <div
                  key={fs.id}
                  onClick={() => setFeaturedActive(idx)}
                  className={`shrink-0 w-[270px] snap-center rounded-3xl overflow-hidden border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0a0b0d] border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
                      : 'bg-[#08090a] border-white/[0.06] cursor-pointer'
                  }`}
                >
                  <div className="relative h-32 flex items-center justify-center pt-5 pb-2">
                    <div className={`relative w-16 h-16 ${isActive ? '' : 'opacity-60'}`}>
                      <Image
                        src={fs.image}
                        alt={fs.marketplace}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  </div>

                  <div className="px-5 pb-6 space-y-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider block ${
                        isActive ? 'text-[#4A7BFF]' : 'text-[#4A7BFF]/60'
                      }`}
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {fs.marketplace}
                    </span>

                    <h3
                      className={`text-lg font-semibold tracking-tight leading-tight ${
                        isActive ? 'text-white' : 'text-[#6b6b73]'
                      }`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {fs.title}
                    </h3>

                    {isActive && (
                      <>
                        <p className="text-xs text-[#a1a1aa] leading-relaxed mt-2" style={{ fontFamily: 'var(--font-sans)' }}>
                          {fs.description}
                        </p>
                        <div className="pt-3 mt-3 border-t border-white/[0.08] flex items-center justify-between">
                          <span className="text-[11px] text-[#6b6b73]" style={{ fontFamily: 'var(--font-sans)' }}>
                            {fs.metric}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenApplication(fs.title);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-[#5a8cff] text-black font-semibold text-[11px] cursor-pointer"
                            style={{ fontFamily: 'var(--font-sans)' }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ── END FEATURED CAROUSEL ── */}

      {/* Explore All Services heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08] font-display tracking-tight text-[#f2f2f0]"
          >
            Explore All <span className="text-gradient">Services</span>
          </h2>
          <p
            className="mt-4 text-[#a1a1aa] text-base max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Every service, from marketplace launch to scale — fully managed by our specialist teams.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Showcase — full viewport width, pinned scroll-driven */}
      <HorizontalScrollShowcase services={services} onOpenApplication={onOpenApplication} />

      {/* Service Detail Deep Dive Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#080808] border border-white/[0.10] rounded-2xl p-6 sm:p-9 shadow-2xl z-10 my-8 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#4A7BFF] via-[#6B96FF] to-[#2D5ADB]" />

              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-md bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-[#96989F] hover:text-[#F3F3F1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="relative w-12 h-12 sm:w-14 sm:h-14 p-2.5 rounded-2xl bg-[#1E2126] border border-white/10 flex-shrink-0 block">
                  <Image src={selectedService.icon} alt={selectedService.marketplace} fill className="object-contain" sizes="40px" />
                </span>
                <div>
                  <span className="text-xs font-display text-[#6B96FF] uppercase tracking-wider">
                    {selectedService.marketplace}
                  </span>
                  <h3 className="text-2xl font-medium text-[#F3F3F1]">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#96989F] leading-relaxed mt-2">
                {selectedService.description}
              </p>

              {/* Highlights Breakdown */}
              <div className="my-6 space-y-3">
                <h4 className="text-xs font-display uppercase tracking-wider text-[#6B96FF]">
                  Operational Blueprint & Deliverables
                </h4>
                {selectedService.highlightDetails.map((h, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#0F1114] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-[#4A7BFF] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#F3F3F1] leading-snug">{h}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-[#6E7078]">
                  Turnaround: <span className="text-[#F3F3F1] font-display">7-14 Days Onboarding</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-md text-xs text-[#96989F] hover:text-[#F3F3F1] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const name = selectedService.title;
                      setSelectedService(null);
                      onOpenApplication(name);
                    }}
                    className="px-6 py-2.5 rounded-md bg-gradient-to-r from-[#4A7BFF] via-[#6B96FF] to-[#2D5ADB] text-[#0B0D0F] font-bold text-xs shadow-lg hover:shadow-[0_0_25px_rgba(74,123,255,0.5)] transition-all cursor-pointer"
                  >
                    Apply for {selectedService.title.split(' ')[0]} Store
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
