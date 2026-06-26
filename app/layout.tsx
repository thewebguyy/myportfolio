import React from 'react'
import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { PrincipiaNav } from './components/principia/PrincipiaNav'
import { FloatingChatbot } from './components/ai/FloatingChatbot'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
  weight: ['400', '700'],
})

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://olabodeolusegun.com'),
  title: {
    default: 'Olabode Olusegun — Full-Stack Engineer',
    template: '%s | Olabode Olusegun'
  },
  description: 'Lagos-based full-stack engineer specialising in African fintech infrastructure and marketplace platforms.',
  keywords: ['Full-Stack Engineer', 'Fintech', 'Marketplace', 'Design Engineer', 'Lagos', 'Nigeria', 'React', 'Node.js', 'TypeScript', 'Engineering'],
  authors: [{ name: 'Olabode Olusegun' }],
  creator: 'Olabode Olusegun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://olabodeolusegun.com',
    title: 'Olabode Olusegun - Systems Architect',
    description: 'Lagos-based full-stack engineer specialising in African fintech infrastructure and marketplace platforms.',
    siteName: 'Olabode Olusegun',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Olabode Olusegun - Full-Stack Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olabode Olusegun - Systems Architect',
    description: 'Lagos-based full-stack engineer specialising in African fintech infrastructure and marketplace platforms.',
    creator: '@BodeBillions',
    images: ['/twitter-image']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Olabode Olusegun',
  url: 'https://olabodeolusegun.com',
  jobTitle: 'Full-Stack Engineer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG'
  },
  sameAs: [
    'https://linkedin.com/in/thewebguyy',
    'https://github.com/thewebguyy',
    'https://x.com/BodeBillions',
    'https://instagram.com/thewebguyy'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-mono antialiased bg-paper text-ink">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:font-mono focus:text-[12px] focus:outline-none focus:ring-1 focus:ring-primary-light">
          Skip to content
        </a>
        <PrincipiaNav />

        <main id="main-content">
          {children}
        </main>

        <Analytics />
        <SpeedInsights />
        <FloatingChatbot />
      </body>
    </html>
  )
}