'use client';

import React, { useSyncExternalStore, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

type WheelPhoto = {
  id: string;
  name: string;
  role: string;
  accent: string;
  image: string;
  seed: string;
};

const wheelPhotos: WheelPhoto[] = [
  {
    id: 'op-01',
    name: 'Operations',
    role: 'Store Performance',
    accent: '#6B96FF',
    seed: 'team-ops-analyst-01',
    image: 'https://picsum.photos/seed/team-ops-analyst-01/800/1000',
  },
  {
    id: 'sr-02',
    name: 'Sourcing',
    role: 'Supplier Research',
    accent: '#FF9A3C',
    seed: 'team-sourcing-mgr-02',
    image: 'https://picsum.photos/seed/team-sourcing-mgr-02/800/1000',
  },
  {
    id: 'es-03',
    name: 'Executive',
    role: 'Strategy Lead',
    accent: '#4A7BFF',
    seed: 'team-exec-strategy-03',
    image: 'https://picsum.photos/seed/team-exec-strategy-03/800/1000',
  },
  {
    id: 'ta-04',
    name: 'Engineering',
    role: 'Automation & Sync',
    accent: '#6B96FF',
    seed: 'team-eng-auto-04',
    image: 'https://picsum.photos/seed/team-eng-auto-04/800/1000',
  },
  {
    id: 'gr-05',
    name: 'Growth',
    role: 'Performance Marketing',
    accent: '#2D5ADB',
    seed: 'team-growth-pm-05',
    image: 'https://picsum.photos/seed/team-growth-pm-05/800/1000',
  },
  {
    id: 'cs-06',
    name: 'Client Success',
    role: 'Partner Relations',
    accent: '#4A7BFF',
    seed: 'team-cs-partner-06',
    image: 'https://picsum.photos/seed/team-cs-partner-06/800/1000',
  },
  {
    id: 'ds-07',
    name: 'Data Science',
    role: 'Forecasting & Pricing',
    accent: '#FF9A3C',
    seed: 'team-ds-forecast-07',
    image: 'https://picsum.photos/seed/team-ds-forecast-07/800/1000',
  },
  {
    id: 'cx-08',
    name: 'CX Operations',
    role: 'Support Excellence',
    accent: '#6B96FF',
    seed: 'team-cx-support-08',
    image: 'https://picsum.photos/seed/team-cx-support-08/800/1000',
  },
];

const CARD_WIDTH_PX = 280;
const CARD_GAP_PX = 24;

function CarouselCard({
  photo,
  reducedMotion,
}: {
  photo: WheelPhoto;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className="flex-shrink-0"
      style={{
        width: `${CARD_WIDTH_PX}px`,
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
      whileInView={
        reducedMotion ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      viewport={{ once: true, margin: '-120px' }}
      transition={{
        duration: reducedMotion ? 0 : 0.9,
        ease: reducedMotion ? undefined : ([0.22, 1, 0.36, 1] as [number, number, number, number]),
      }}
      whileHover={
        reducedMotion
          ? {}
          : {
              scale: 1.06,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
            }
      }
    >
      <div
        className="group relative aspect-[4/5] w-full rounded-[22px] md:rounded-[26px] overflow-hidden border border-white/[0.10] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85),0_10px_30px_-8px_rgba(0,0,0,0.7)]"
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />

        <Image
          src={photo.image}
          alt={`${photo.name} — ${photo.role}`}
          fill
          sizes="(max-width: 768px) 40vw, 280px"
          className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.08]"
          draggable={false}
        />

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, transparent 0%, rgba(0,0,0,0.0) 55%, rgba(0,0,0,0.46) 100%)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-35"
          style={{
            background:
              'linear-gradient(180deg, #2b3558 0%, transparent 40%, rgba(255,210,170,0.10) 100%)',
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 z-10">
          <div className="flex items-end justify-between gap-2">
            <div className="rounded-xl bg-black/35 backdrop-blur-[6px] border border-white/[0.12] px-3 py-2 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.8)]">
              <div
                className="text-[11px] md:text-xs font-semibold text-white leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {photo.name}
              </div>
              <div
                className="text-[9.5px] md:text-[10.5px] font-medium text-white/80 leading-tight mt-0.5"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {photo.role}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute top-3 left-3 z-10">
          <div className="rounded-md bg-black/30 backdrop-blur-[4px] border border-white/[0.12] px-2 py-1">
            <span
              className="text-[9.5px] font-bold tracking-widest text-white/85"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {photo.id.split('-')[0].toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="our-team"
      className="relative py-24 lg:py-32 bg-[#0b0c0e] overflow-hidden border-t border-white/[0.05]"
    >
      <div className="absolute top-1/3 -left-10 w-[500px] h-[500px] bg-[#6B96FF]/05 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[420px] h-[420px] bg-[#FF9A3C]/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display leading-[1.08] mb-5 tracking-tight"
          >
            Meet the team{' '}
            <span className="text-gradient">behind the work.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A multidisciplinary team focused on operations, marketplace strategy, technology, client success, and sustainable growth.
          </motion.p>
        </div>

        <div className="relative w-full mx-auto overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[60%] rounded-full blur-[110px]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(107,150,255,0.10), transparent 60%)',
              }}
            />
          </div>

          <div className="relative overflow-hidden py-12">
            <motion.div
              className="flex"
              animate={reducedMotion || isHovered ? {} : {
                x: [0, -(wheelPhotos.length * (CARD_WIDTH_PX + CARD_GAP_PX))],
              }}
              transition={
                reducedMotion || isHovered
                  ? {}
                  : {
                      duration: 30,
                      repeat: Infinity,
                      ease: 'linear',
                    }
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {[...wheelPhotos, ...wheelPhotos, ...wheelPhotos].map((photo, i) => (
                <div key={`${photo.id}-${i}`} style={{ marginRight: `${CARD_GAP_PX}px` }}>
                  <CarouselCard
                    photo={photo}
                    reducedMotion={reducedMotion}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 z-20"
            style={{
              background:
                'linear-gradient(90deg, #0b0c0e 0%, rgba(11,12,14,0.88) 45%, rgba(11,12,14,0.25) 85%, transparent 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 z-20"
            style={{
              background:
                'linear-gradient(-90deg, #0b0c0e 0%, rgba(11,12,14,0.88) 45%, rgba(11,12,14,0.25) 85%, transparent 100%)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mt-10 lg:mt-16 text-center"
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
