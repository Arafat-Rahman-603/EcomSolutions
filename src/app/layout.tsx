import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ecom Solutions | Done-For-You E-Commerce Store Management & Automation',
  description:
    'We build, operate, and scale institutional e-commerce businesses across Amazon, Walmart, eBay, and Facebook Shops. Hands-free automated income opportunities with full operational transparency.',
  keywords: [
    'e-commerce automation',
    'Amazon FBA automation',
    'Walmart WFS automation',
    'Done for you e-commerce',
    'Amazon dropshipping management',
    'eBay store automation',
    'Ecom Solutions',
  ],
  authors: [{ name: 'Ecom Solutions' }],
  creator: 'Ecom Solutions',
  openGraph: {
    title: 'Ecom Solutions — We do the heavy lifting so you can do the easy living',
    description:
      'Premier Done-For-You e-commerce management agency. We build, operate, and scale e-commerce businesses from the ground up.',
    url: 'https://ecomsolutionsbd.com',
    siteName: 'Ecom Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecom Solutions | DFY E-Commerce Management',
    description: 'We build, operate, and scale e-commerce businesses from the ground up.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth dark`}
    >
      <head />
      <body
        className="bg-[#0b0c0e] text-[#f2f2f0] min-h-screen antialiased selection:bg-[#4A7BFF]/25 selection:text-[#f2f2f0]"
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
