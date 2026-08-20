'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Cpu,
  Search,
  Code2,
  Users,
  TrendingUp,
} from 'lucide-react';

/**
 * TeamSection
 *
 * Uses premium abstract identity cards with role-based visuals.
 * No stock photos or fake biographies.
 */

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  department: string;
  tagline: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ElementType;
  iconColor: string;
  accent: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'es',
    initials: 'ES',
    name: 'Leadership Team',
    role: 'Executive & Strategy',
    department: 'Executive',
    tagline: 'Focused on building scalable systems and long-term strategy.',
    gradientFrom: '#4A7BFF',
    gradientTo: '#6B96FF',
    icon: Crown,
    iconColor: '#4A7BFF',
    accent: '#4A7BFF',
  },
  {
    id: 'op',
    initials: 'OP',
    name: 'Operations Team',
    role: 'Daily Store Operations',
    department: 'Operations',
    tagline: 'Dedicated operators ensuring seamless day-to-day store performance.',
    gradientFrom: '#6B96FF',
    gradientTo: '#2D5ADB',
    icon: Cpu,
    iconColor: '#6B96FF',
    accent: '#6B96FF',
  },
  {
    id: 'sr',
    initials: 'SR',
    name: 'Sourcing Team',
    role: 'Product & Supplier Research',
    department: 'Supply Chain',
    tagline: 'Verified supplier partnerships and catalog curation specialists.',
    gradientFrom: '#2D5ADB',
    gradientTo: '#6B96FF',
    icon: Search,
    iconColor: '#2D5ADB',
    accent: '#2D5ADB',
  },
  {
    id: 'ta',
    initials: 'TA',
    name: 'Technology Team',
    role: 'Systems & Automation',
    department: 'Engineering',
    tagline: 'Custom automation stack, real-time sync, and algorithmic pipelines.',
    gradientFrom: '#4A7BFF',
    gradientTo: '#2D5ADB',
    icon: Code2,
    iconColor: '#4A7BFF',
    accent: '#4A7BFF',
  },
  {
    id: 'cs',
    initials: 'CS',
    name: 'Client Success Team',
    role: 'Client Communication & Support',
    department: 'Partner Relations',
    tagline: 'Your direct line — dedicated support from onboarding to scale.',
    gradientFrom: '#6B96FF',
    gradientTo: '#4A7BFF',
    icon: Users,
    iconColor: '#6B96FF',
    accent: '#6B96FF',
  },
  {
    id: 'gr',
    initials: 'GR',
    name: 'Growth Team',
    role: 'Marketing & Scaling',
    department: 'Growth',
    tagline: 'Proven scaling playbooks and sustainable growth engineering.',
    gradientFrom: '#2D5ADB',
    gradientTo: '#4A7BFF',
    icon: TrendingUp,
    iconColor: '#2D5ADB',
    accent: '#2D5ADB',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      delay: i * 0.09,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const Icon = member.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }}
      className="group relative rounded-2xl bg-[#121315] border border-white/[0.08] overflow-hidden hover:border-white/[0.16] transition-all duration-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(107,150,255,0.05)] cursor-default"
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${member.accent}10 0%, transparent 65%)`,
        }}
      />

      {/* Abstract Identity Visual — large top area */}
      <div className="relative h-48 overflow-hidden bg-[#0b0c0e]">
        {/* Geometric gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${member.gradientFrom}20 0%, ${member.gradientTo}10 50%, transparent 80%)`,
          }}
        />

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Rotating abstract rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/[0.06] group-hover:border-white/[0.10] transition-colors duration-500 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-dashed border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500 animate-spin-reverse-slow" />

        {/* Central identity circle with large initials */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
          style={{
            background: `linear-gradient(135deg, ${member.gradientFrom}30, ${member.gradientTo}18)`,
            border: `1px solid ${member.gradientFrom}35`,
            boxShadow: `0 0 24px ${member.gradientFrom}18`,
          }}
        >
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ color: member.iconColor, fontFamily: 'var(--font-display)' }}
          >
            {member.initials}
          </span>
        </div>

        {/* Small decorative icon in corner */}
        <div
          className="absolute bottom-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${member.accent}12`,
            border: `1px solid ${member.accent}22`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: member.iconColor }} />
        </div>

        {/* Department label */}
        <div className="absolute top-4 right-4">
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              color: member.gradientFrom,
              backgroundColor: `${member.gradientFrom}12`,
              border: `1px solid ${member.gradientFrom}22`,
            }}
          >
            {member.department}
          </span>
        </div>

        {/* Gradient fade to card body */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#121315] to-transparent" />
      </div>

      {/* Card body */}
      <div className="p-5 space-y-3">
        <div>
          <h3
            className="text-base font-semibold text-[#f2f2f0] group-hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {member.name}
          </h3>
          <p
            className="text-[11px] font-medium mt-1 uppercase tracking-wider"
            style={{ color: member.accent }}
          >
            {member.role}
          </p>
          <p
            className="text-sm mt-3 text-[#a1a1aa] leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {member.tagline}
          </p>
        </div>

        {/* Bottom divider + initials row */}
        <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between">
          <div
            className="text-[10px] font-mono tracking-wider text-[#6b6b73] group-hover:text-[#a1a1aa] transition-colors"
          >
            ECOM SOLUTIONS / {member.department.toUpperCase()}
          </div>
          <div
            className="text-[11px] font-bold px-2 py-0.5 rounded"
            style={{
              color: member.gradientFrom,
              backgroundColor: `${member.gradientFrom}10`,
            }}
          >
            {member.initials}
          </div>
        </div>
      </div>

      {/* Premium top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${member.gradientFrom}60, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section
      id="our-team"
      className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.05]"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#6B96FF]/03 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#4A7BFF]/03 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
        
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display leading-[1.08] mb-5 tracking-tight"
          >
            Meet the team{' '}
            <span className="text-gradient">behind the work.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A multidisciplinary team focused on operations, marketplace strategy, technology, client success, and sustainable growth.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12 text-center"
        >
          <p
            className="text-xs text-[#6b6b73] max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Our team operates 24/7 across global operational hubs. Every partner is assigned a dedicated account director as their single point of contact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
