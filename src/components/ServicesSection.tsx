'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  TrendingUp,
  Package,
  Layers,
  Sparkles,
  Zap,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  X,
} from 'lucide-react';
import SectionHeading from './SectionHeading';

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

export default function ServicesSection({ onOpenApplication }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

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
      icon: '🛒',
      color: '#D7A6B8',
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
      icon: '📦',
      color: '#A79CC8',
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
      icon: '⚡',
      color: '#7F89C5',
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
      icon: '🔥',
      color: '#D7A6B8',
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
      icon: '💎',
      color: '#7F89C5',
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
      icon: '🚀',
      color: '#A79CC8',
      highlightDetails: [
        'Complete inventory prep and shipment dispatch directly into Walmart WFS hubs',
        'Automatic 2-day delivery badge on all product listings for superior conversion rates',
        'Walmart dedicated customer service & return handling handled end-to-end',
      ],
    },
  ];

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-[#0B0D0F] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#A79CC8]/08 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-[#D7A6B8]/08 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="COMPREHENSIVE MARKETPLACE SOLUTIONS"
          title="Our Popular Services"
          subtitle="We build and manage scalable e-commerce businesses across the world's leading marketplaces with tailored operational frameworks."
        />

        {/* Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`${service.gridClass} group relative rounded-3xl p-7 sm:p-9 bg-[#16181B] border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#1A1D21] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] cursor-pointer`}
              onClick={() => setSelectedService(service)}
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
                    <div className="w-12 h-12 rounded-2xl bg-[#222426] border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[#A79CC8]/40 transition-all">
                      {service.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#A79CC8] uppercase tracking-wider block">
                        {service.marketplace}
                      </span>
                      <div className="text-[11px] text-[#6E7078]">{service.subtitle}</div>
                    </div>
                  </div>

                  {/* Arrow Action Button */}
                  <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#96989F] group-hover:text-[#0B0D0F] group-hover:bg-gradient-to-r group-hover:from-[#D7A6B8] group-hover:to-[#7F89C5] group-hover:border-transparent transition-all shrink-0">
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
                      <span className="text-[10px] uppercase font-mono text-[#6E7078] block">
                        {metric.label}
                      </span>
                      <span className="text-xs font-semibold text-[#F3F3F1] font-mono mt-0.5 block">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] text-[#96989F] text-[11px] font-medium border border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Deep Dive Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-[#0B0D0F]/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#14161A] border border-white/15 rounded-3xl p-6 sm:p-9 shadow-2xl z-10 my-8 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D7A6B8] via-[#A79CC8] to-[#7F89C5]" />

              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-[#96989F] hover:text-[#F3F3F1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl p-2.5 rounded-2xl bg-[#1E2126] border border-white/10">
                  {selectedService.icon}
                </span>
                <div>
                  <span className="text-xs font-mono text-[#A79CC8] uppercase tracking-wider">
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
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A79CC8]">
                  Operational Blueprint & Deliverables
                </h4>
                {selectedService.highlightDetails.map((h, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#0F1114] border border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-[#D7A6B8] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#F3F3F1] leading-snug">{h}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-[#6E7078]">
                  Turnaround: <span className="text-[#F3F3F1] font-mono">7-14 Days Onboarding</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-full text-xs text-[#96989F] hover:text-[#F3F3F1] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const name = selectedService.title;
                      setSelectedService(null);
                      onOpenApplication(name);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D7A6B8] via-[#A79CC8] to-[#7F89C5] text-[#0B0D0F] font-bold text-xs shadow-lg hover:shadow-[0_0_25px_rgba(215,166,184,0.5)] transition-all cursor-pointer"
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
