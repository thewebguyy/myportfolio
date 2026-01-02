import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from './components/ThemeProvider'
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

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://olabodeolusegun.com'),
  title: {
    default: 'Olabode Olusegun - Full-Stack Engineer & AI Specialist',
    template: '%s | Olabode Olusegun'
  },
  description: 'Full-stack engineer specializing in high-scale distributed systems, AI integration, and sub-second performance optimization. 5+ years building production applications.',
  keywords: ['Full-Stack Developer', 'React', 'Node.js', 'TypeScript', 'AI Integration', 'System Design', 'Lagos Nigeria', 'Software Engineer'],
  authors: [{ name: 'Olabode Olusegun' }],
  creator: 'Olabode Olusegun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://olabodeolusegun.com',
    title: 'Olabode Olusegun - Full-Stack Engineer',
    description: 'Full-stack engineer specializing in high-scale distributed systems and AI integration',
    siteName: 'Olabode Olusegun Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olabode Olusegun - Full-Stack Engineer',
    description: 'Full-stack engineer specializing in high-scale distributed systems and AI integration',
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
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          {/* Main content */}
          <main id="main-content">
            {children}
          </main>

          {/* Analytics */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}