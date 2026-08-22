'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Globe2, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface MarketplaceSectionProps {
  onOpenApplication?: (marketplace?: string) => void;
}

const platforms = [
  {
    id: 'amazon',
    name: 'Amazon',
    subtitle: 'FBA & Dropshipping',
    description:
      'The largest online marketplace on Earth. Build a fully automated Amazon operation with proprietary supplier routing, buy-box engine, and Prime-compliant fulfillment.',
    image: '/work/amazon.png',
    metric: '$84.9K /mo',
    metricLabel: 'Avg. Store Revenue',
    secondaryMetric: '18–28%',
    secondaryLabel: 'Net Margin',
    tag: 'Most Popular',
    tagColor: '#4A7BFF',
    color: '#4A7BFF',
    bullets: [
      'US supplier network — 2–3 day shipping',
      '24/7 Buy-Box repricing across 5k+ SKUs',
      'Account health & customer service team',
    ],
  },
  {
    id: 'walmart',
    name: 'Walmart',
    subtitle: 'WFS Automation',
    description:
      'Walmart.com sees 120M+ monthly shoppers with a fraction of Amazon competition. Secure approval, earn the 2-Day badge, and scale with less price pressure.',
    image: '/work/walmart.png',
    metric: '+60%',
    metricLabel: 'Buy Box Boost',
    secondaryMetric: '120M+',
    secondaryLabel: 'Monthly Visitors',
    tag: '2-Day Badge',
    tagColor: '#2D5ADB',
    color: '#2D5ADB',
    bullets: [
      'Walmart seller approval & corporate setup',
      'WFS storage, prep, and 2-day delivery',
      'Performance compliance (OTD, VTR, PCR)',
    ],
  },
  {
    id: 'ebay',
    name: 'eBay',
    subtitle: 'Managed Stores',
    description:
      "eBay's 135M+ active buyers reward Top Rated Sellers with fee discounts and ranking priority. We run full-lifecycle store ops, multi-variant listings, and global shipping.",
    image: '/work/ebay.png',
    metric: '135M+',
    metricLabel: 'Active Buyers',
    secondaryMetric: '3–5 Days',
    secondaryLabel: 'Launch Speed',
    tag: 'Top Rated Plus',
    tagColor: '#6B96FF',
    color: '#6B96FF',
    bullets: [
      'Top Rated Seller status maintenance',
      'API tracking & automated relisting',
      'Trending electronics, tools, home goods',
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook Shop',
    subtitle: 'Social Commerce',
    description:
      "Tap Meta's 2.9B+ reach through Facebook Shops with zero-ad-spend viral catalog traffic, in-app checkout, and algorithmic recommendations.",
    image: '/work/fb-shop.png',
    metric: '2.9B+',
    metricLabel: 'Platform Reach',
    secondaryMetric: '0',
    secondaryLabel: 'Ad Spend Required',
    tag: 'Viral Organic',
    tagColor: '#6B96FF',
    color: '#4A7BFF',
    bullets: [
      'Organic feed traffic + marketplace listings',
      'Direct US supplier order injection',
      'Policy compliance & dispute handling',
    ],
  },
];

const serviceCards = [
  { title: 'Store Operations', description: '24/7 automated management', icon: Globe2, success: '99.8%' },
  { title: 'Product Research', description: 'AI-powered sourcing', icon: TrendingUp, success: '94%' },
  { title: 'Pricing Engine', description: 'Real-time repricing', icon: Zap, success: '97%' },
  { title: 'Risk Management', description: 'Policy compliance', icon: ShieldCheck, success: '100%' },
];

/* ──────────────────────────────────────────────────────────
   Stacked-card layout constants
   ────────────────────────────────────────────────────────── */
const STACK_Y = 15;       // px downward peek offset per back-card layer
const STACK_SCALE = 0.04; // scale reduction per back-card layer

export default function MarketplaceSection({ onOpenApplication }: MarketplaceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = cards.length;
      if (total < 2) return;

      /* ── Initial state ─────────────────────────────────────
         Card 0  = visible (yPercent 0, full scale, top z)
         Card 1+ = hidden below the viewport (yPercent 100),
                   with stacked peek offsets for depth.
         Higher-index cards get higher z-index so each
                   incoming card is always above the outgoing one. */
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          y: STACK_Y * i,
          scale: 1 - STACK_SCALE * i,
          zIndex: total - i,
        });
      });

      /* ── Scroll-triggered timeline ─────────────────────────
         Pin the cards viewport.  scrub: true keeps the
         animation locked 1-to-1 with scroll position —
         no easing lag, no smoothing delay.
         Scroll distance = (total-1) viewport heights so
         each card transition gets exactly 100vh.        */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsSectionRef.current,
          start: 'top top',
          end: () => `+=${innerHeight * (total - 1)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });

      /* Each transition occupies duration 1 on the timeline.
         With (total-1) transitions the timeline runs 0 → (total-1),
         and scroll distance is (total-1)×100vh → exactly 100vh
         of scroll per transition.                        */
      for (let i = 0; i < total - 1; i++) {
        const current = cards[i];
        const next = cards[i + 1];

        // Current card exits upward + fades
        tl.to(
          current,
          {
            yPercent: -30,
            opacity: 0,
            scale: 0.95,
            ease: 'none',
            duration: 1,
          },
          i,
        );

        // Next card slides up from below viewport to centre
        tl.to(
          next,
          {
            yPercent: 0,
            scale: 1,
            y: 0,
            ease: 'none',
            duration: 1,
          },
          i,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platforms"
      className="relative bg-[#0b0c0e]"
    >
      {/* Section heading — scrolls normally, not pinned */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <SectionHeading
          label="MULTI-PLATFORM OPERATIONS"
          title="One strategy. Multiple marketplaces."
          subtitle="A unified e-commerce automation layer spanning the four most profitable online ecosystems — each store built and fully managed by our specialist teams."
        />
      </div>

      {/* Pinned cards viewport — GSAP ScrollTrigger pins this div */}
      <div
        ref={cardsSectionRef}
        className="relative h-screen overflow-hidden"
      >
        {platforms.map((platform, index) => (
          <div
            key={platform.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Colored background */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `${platform.color}08` }}
            />

            {/* Ambient glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
              style={{ backgroundColor: `${platform.color}15` }}
            />

            {/* Solid container */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[88vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
              {/* Left side */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
                {/* Marketplace logo */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 sm:mb-6">
                  <Image
                    src={platform.image}
                    alt={platform.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>

                {/* Category label */}
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  AUTOMATION
                </span>

                {/* Marketplace title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {platform.name.toUpperCase()}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {platform.description}
                </p>

                {/* Get Started button */}
                <MagneticButton
                  variant="primary"
                  onClick={() => onOpenApplication?.(`${platform.name} Automation`)}
                  className="!py-3 sm:!py-4 !px-6 sm:!px-8 text-sm sm:text-base"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </MagneticButton>
              </div>

              {/* Right side — 2×2 service card grid */}
              <div className="w-full lg:w-1/2 bg-gray-50 p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {serviceCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={i}
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
                      >
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 mb-2 sm:mb-3" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                          {card.description}
                        </p>
                        <div className="h-px bg-gray-100 mb-2 sm:mb-3" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs text-gray-400">
                            Success Rate
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-green-600">
                            {card.success}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
