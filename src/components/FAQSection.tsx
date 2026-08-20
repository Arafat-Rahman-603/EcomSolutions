'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

interface FAQSectionProps {
  onOpenApplication: () => void;
}

export default function FAQSection({ onOpenApplication }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is e-commerce automation?',
      answer:
        'E-commerce automation is a Done-For-You (DFY) business partnership model where our agency builds, manages, and scales an online store on your behalf. We handle the heavy operational lifting—including entity setup, daily product research, algorithmic repricing, supplier fulfillment, returns management, and account health compliance—while you own 100% of the asset and collect profits.',
    },
    {
      question: 'Which marketplaces do you support?',
      answer:
        'We support the world’s highest-volume retail platforms: Amazon (both Dropshipping and FBA Wholesale), Walmart (Dropshipping and WFS Fulfillment), eBay (Managed Business Stores), and Facebook Shops (Meta Social Commerce). We help you choose the best channel based on your working capital and timeline.',
    },
    {
      question: 'How does the onboarding process work?',
      answer:
        'Our onboarding is structured into a streamlined 7-14 day roadmap. Once you apply and get approved, we assist with your legal entity (LLC/EIN), complete marketplace seller verification, integrate our proprietary software API pipeline, and assign your dedicated senior account team. We then seed initial winning inventory and launch operations.',
    },
    {
      question: 'Will I receive business reports?',
      answer:
        'Yes. Transparency is a cornerstone of our company. You receive access to a live client telemetry portal where you can monitor daily orders, revenue, profit margins, and supplier invoices 24/7. In addition, your dedicated account manager delivers formal monthly financial statements and performance reviews.',
    },
    {
      question: 'How involved do I need to be?',
      answer:
        'Our model is designed to be 100% hands-off for the investor. You do not need to pack boxes, talk to difficult customers, or handle inventory orders. Your only responsibility is maintaining working capital for purchasing inventory (which is quickly recouped when the marketplace pays out every 14 days) and reviewing your monthly profit payouts.',
    },
    {
      question: 'How do you manage store operations?',
      answer:
        'Store operations are handled by our 300+ in-house full-time team across specialized departments: Product Sourcing & Trend Analysis, Algorithmic Buy Box Pricing, Supplier Logistics & Tracking Uploads, Customer Care & RMA Returns, and Account Health & Policy Compliance. We never outsource to unqualified third parties.',
    },
    {
      question: 'How can I apply for a store?',
      answer:
        'You can click any "Apply for a Store" button on this website to open our private investor application form. We review each application within 4 hours to verify eligibility, discuss your capital goals, and match you with the appropriate marketplace allocation.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-[#6B96FF]/05 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="FREQUENTLY ASKED QUESTIONS"
          title="Everything you need to know"
          subtitle="Clear answers to common questions about our store management, capital requirements, and operational procedures."
        />

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#16181C] border-[#6B96FF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-[#121417] border-white/[0.06] hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-medium text-[#F3F3F1] tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                      isOpen
                        ? 'bg-gradient-to-r from-[#4A7BFF] to-[#2D5ADB] text-[#0B0D0F] border-transparent rotate-180'
                        : 'bg-white/[0.04] text-[#96989F] border-white/10'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-7 pb-7 pt-1 text-sm sm:text-base text-[#96989F] leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Support Prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#141619] border border-white/[0.08] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-semibold text-[#F3F3F1]">Have a custom or institutional question?</h4>
            <p className="text-xs text-[#96989F] mt-1">Our Senior Portfolio Directors are ready to advise on custom allocations.</p>
          </div>
          <MagneticButton
            variant="secondary"
            onClick={onOpenApplication}
            className="!py-3 !px-6 text-xs whitespace-nowrap"
          >
            <span>Book Consultation Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
