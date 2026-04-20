import React from 'react'
import type { Metadata } from 'next'
import { Inter, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from './components/ThemeProvider'
import { Navbar } from './components/Navbar'
import './globals.css'

// Font configuration with display swap for performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://olabodeolusegun.com'),
  title: {
    default: 'Olabode Olusegun - Full-Stack Engineer',
    template: '%s | Olabode Olusegun'
  },
  description: 'Lagos-based full-stack software engineer with 5+ years of experience building production-grade web products across fintech, marketplace, and AI-powered systems.',
  keywords: ['Full-Stack Engineer', 'Software Engineer', 'Lagos', 'Nigeria', 'React', 'Node.js', 'TypeScript', 'AI Integration', 'Fintech', 'Marketplace'],
  authors: [{ name: 'Olabode Olusegun' }],
  creator: 'Olabode Olusegun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://olabodeolusegun.com',
    title: 'Olabode Olusegun - Full-Stack Engineer',
    description: 'Lagos-based full-stack software engineer with 5+ years of experience building production-grade web products.',
    siteName: 'Olabode Olusegun Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olabode Olusegun - Full-Stack Engineer',
    description: 'Lagos-based full-stack software engineer with 5+ years of experience building production-grade web products.',
    creator: '@thewebguyy',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-background text-text-primary selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-background px-4 py-2 rounded-md">
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content">
            {children}
          </main>

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}