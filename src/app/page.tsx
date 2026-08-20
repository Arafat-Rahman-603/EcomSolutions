'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import MarketplaceSection from '@/components/MarketplaceSection';
import ServicesSection from '@/components/ServicesSection';
import WhyInvestSection from '@/components/WhyInvestSection';
import PromiseSection from '@/components/PromiseSection';
import BenefitsSection from '@/components/BenefitsSection';
import ProcessSection from '@/components/ProcessSection';
import StoreBuilder from '@/components/StoreBuilder';
import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import CTASection from '@/components/CTASection'; 
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import ApplicationModal from '@/components/ApplicationModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetMarketplace, setTargetMarketplace] = useState('Amazon Dropshipping');

  const handleOpenApplication = (marketplace?: string) => {
    if (marketplace) {
      setTargetMarketplace(marketplace);
    }
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0b0c0e] text-[#f2f2f0] relative overflow-hidden">
      {/* Global Background Noise Texture — very subtle */}
      <div className="fixed inset-0 pointer-events-none bg-noise z-[1] opacity-40" />

      {/* Navigation */}
      <Navbar onOpenApplication={handleOpenApplication} />

      {/* Content Sections */}
      <div className="relative z-10">
        <HeroSection onOpenApplication={handleOpenApplication} />
        <StatsSection />
        <MarketplaceSection onOpenApplication={handleOpenApplication} />
        <ServicesSection onOpenApplication={handleOpenApplication} />
        <WhyInvestSection onOpenApplication={handleOpenApplication} />
        <PromiseSection />
        <BenefitsSection onOpenApplication={handleOpenApplication} />
        <ProcessSection onOpenApplication={handleOpenApplication} />
        <StoreBuilder onOpenApplication={handleOpenApplication} />
        <AboutSection onOpenApplication={handleOpenApplication} />
        <TeamSection />
        <CTASection onOpenApplication={handleOpenApplication} />
        <FAQSection onOpenApplication={handleOpenApplication} />
        <Footer />
      </div>

      {/* Interactive Application Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMarketplace={targetMarketplace}
      />
    </main>
  );
}
