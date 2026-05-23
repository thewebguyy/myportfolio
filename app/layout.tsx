import React from 'react'
import type { Metadata } from 'next'
import { Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from './components/ThemeProvider'
import { Navbar } from './components/Navbar'
import { FloatingChatbot } from './components/ai/FloatingChatbot'
import './globals.css'

// Font configuration with display swap for performance
const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olabode Olusegun - Systems Architect',
    description: 'Lagos-based full-stack engineer specialising in African fintech infrastructure and marketplace platforms.',
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
    <html lang="en" className={`${cormorant.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-mono antialiased bg-background text-text-primary selection:bg-text-accent selection:text-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />

          <main id="main-content">
            {children}
          </main>

          <Analytics />
          <SpeedInsights />
          <FloatingChatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}