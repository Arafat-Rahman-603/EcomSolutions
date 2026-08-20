'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, ShieldCheck, TrendingUp, Building2, User, Mail, Phone, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMarketplace?: string;
}

export default function ApplicationModal({
  isOpen,
  onClose,
  initialMarketplace = 'Amazon Dropshipping',
}: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    marketplace: initialMarketplace,
    businessModel: 'Dropshipping',
    capital: '$25,000 - $50,000',
    timeline: 'Immediately (Next 7-14 Days)',
    fullName: '',
    email: '',
    phone: '',
    experience: 'Beginner / First Time Investor',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const marketplaces = [
    { id: 'Amazon Dropshipping', name: 'Amazon Dropshipping', badge: 'High Volume' },
    { id: 'Amazon FBA', name: 'Amazon FBA Automation', badge: 'Asset Heavy' },
    { id: 'eBay Automation', name: 'eBay Store Automation', badge: 'Fast Launch' },
    { id: 'Walmart Dropshipping', name: 'Walmart Dropshipping', badge: 'High Margin' },
    { id: 'Walmart WFS', name: 'Walmart WFS Fulfillment', badge: 'Verified' },
    { id: 'Facebook Shops', name: 'Facebook Social Commerce', badge: 'Emerging' },
  ];

  const capitalOptions = [
    '$15,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4A7BFF', '#6B96FF', '#2D5ADB', '#F3F3F1'],
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 1200);
  };

  const handleReset = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-[#0B0D0F]/80 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-[#121417] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-10 my-8"
        >
          {/* Ambient Top Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#4A7BFF] via-[#6B96FF] to-[#2D5ADB]" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#6B96FF]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 w-10 h-10 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-[#96989F] hover:text-[#F3F3F1] transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-10">
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F3F3F1]">
                    Apply for an Automated Store
                  </h3>
                  <p className="mt-2 text-sm text-[#96989F]">
                    Step {step} of 3 — We vet all partners to ensure optimal capital allocation and operational success.
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-md mt-5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#4A7BFF] to-[#2D5ADB]"
                      initial={{ width: '33%' }}
                      animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Form Steps */}
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-3">
                          Select Desired Marketplace & Model
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {marketplaces.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, marketplace: m.id })}
                              className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                                formData.marketplace === m.id
                                  ? 'bg-[#1E2126] border-[#6B96FF] text-[#F3F3F1] shadow-[0_0_20px_rgba(107,150,255,0.15)]'
                                  : 'bg-[#15171B] border-white/5 text-[#96989F] hover:border-white/15 hover:text-[#F3F3F1]'
                              }`}
                            >
                              <div className="pr-2">
                                <p className="text-sm font-medium text-[#F3F3F1]">{m.name}</p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                  formData.marketplace === m.id
                                    ? 'border-[#6B96FF] bg-[#6B96FF] text-[#0B0D0F]'
                                    : 'border-white/20'
                                }`}
                              >
                                {formData.marketplace === m.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-3">
                          Working Capital Allocation
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {capitalOptions.map((cap) => (
                            <button
                              key={cap}
                              type="button"
                              onClick={() => setFormData({ ...formData, capital: cap })}
                              className={`py-3 px-2 rounded-xl text-center text-xs font-medium border transition-all cursor-pointer ${
                                formData.capital === cap
                                  ? 'bg-[#1E2126] border-[#4A7BFF] text-[#F3F3F1] shadow-[0_0_15px_rgba(74,123,255,0.2)]'
                                  : 'bg-[#15171B] border-white/5 text-[#96989F] hover:border-white/20'
                              }`}
                            >
                              {cap}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-[#4A7BFF] to-[#6B96FF] text-[#0B0D0F] font-semibold text-sm hover:shadow-[0_0_25px_rgba(74,123,255,0.4)] transition-all cursor-pointer"
                        >
                          Next: Investor Profile
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-2">
                          Your Experience Level
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            'Complete Beginner',
                            'Some E-Com Experience',
                            'Experienced Investor / Portfolio',
                          ].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => setFormData({ ...formData, experience: lvl })}
                              className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                                formData.experience === lvl
                                  ? 'bg-[#1E2126] border-[#6B96FF] text-[#F3F3F1]'
                                  : 'bg-[#15171B] border-white/5 text-[#96989F] hover:border-white/20'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-2">
                          Target Launch Readiness
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            'Immediately (7-14 Days)',
                            'Within 30 Days',
                            'Researching / Q2-Q3',
                          ].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData({ ...formData, timeline: t })}
                              className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                                formData.timeline === t
                                  ? 'bg-[#1E2126] border-[#6B96FF] text-[#F3F3F1]'
                                  : 'bg-[#15171B] border-white/5 text-[#96989F] hover:border-white/20'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm text-[#96989F] hover:text-[#F3F3F1] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-[#4A7BFF] to-[#6B96FF] text-[#0B0D0F] font-semibold text-sm hover:shadow-[0_0_25px_rgba(74,123,255,0.4)] transition-all cursor-pointer"
                        >
                          Next: Contact Information
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7078]" />
                          <input
                            required
                            type="text"
                            placeholder="e.g. Alexander Mitchell"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#15171B] border border-white/10 rounded-xl text-sm text-[#F3F3F1] placeholder-[#6E7078] focus:outline-none focus:border-[#6B96FF] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-1.5">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7078]" />
                            <input
                              required
                              type="email"
                              placeholder="alex@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-[#15171B] border border-white/10 rounded-xl text-sm text-[#F3F3F1] placeholder-[#6E7078] focus:outline-none focus:border-[#6B96FF] transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E7078]" />
                            <input
                              required
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-[#15171B] border border-white/10 rounded-xl text-sm text-[#F3F3F1] placeholder-[#6E7078] focus:outline-none focus:border-[#6B96FF] transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#96989F] mb-1.5">
                          Questions or Special Requirements (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Tell us about your portfolio goals, previous seller accounts, or specific marketplace preferences..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#15171B] border border-white/10 rounded-xl text-sm text-[#F3F3F1] placeholder-[#6E7078] focus:outline-none focus:border-[#6B96FF] transition-colors resize-none"
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-[#6B96FF] shrink-0 mt-0.5" />
                        <p className="text-[12px] text-[#96989F] leading-tight">
                          Strict NDA Protected. Ecom Solutions does not share investor contact information with third parties.
                        </p>
                      </div>

                      <div className="pt-3 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm text-[#96989F] hover:text-[#F3F3F1] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-gradient-to-r from-[#4A7BFF] via-[#6B96FF] to-[#2D5ADB] text-[#0B0D0F] font-bold text-sm shadow-[0_0_30px_rgba(74,123,255,0.4)] hover:shadow-[0_0_45px_rgba(74,123,255,0.7)] transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-[#0B0D0F] border-t-transparent rounded-md animate-spin" />
                              Allocating Desk...
                            </span>
                          ) : (
                            <>
                              Submit Store Application
                              <Sparkles className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-6"
              >
                <div className="w-20 h-20 mx-auto rounded-md bg-gradient-to-tr from-[#4A7BFF]/20 to-[#6B96FF]/20 border border-[#6B96FF]/40 flex items-center justify-center text-[#4A7BFF] shadow-[0_0_40px_rgba(107,150,255,0.3)]">
                  <Check className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#F3F3F1]">
                    Application Received
                  </h3>
                  <p className="text-sm text-[#96989F] leading-relaxed">
                    Thank you, <span className="text-[#F3F3F1] font-semibold">{formData.fullName || 'Partner'}</span>. A Senior Portfolio Director has been assigned to your request for <span className="text-[#4A7BFF] font-medium">{formData.marketplace}</span>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#16181C] border border-white/5 max-w-md mx-auto text-left text-xs space-y-2 text-[#96989F]">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span>Assigned Desk:</span>
                    <span className="text-[#F3F3F1] font-display">Ecom VIP Operations</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span>Contact Channel:</span>
                    <span className="text-[#F3F3F1]">{formData.email || 'Email provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span className="text-[#6B96FF] font-semibold">Under 4 Hours</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-md bg-white/[0.08] hover:bg-white/[0.15] text-[#F3F3F1] text-sm font-medium border border-white/10 transition-all cursor-pointer"
                  >
                    Return to Website
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
