'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

/**
 * Footer Component
 * Site footer with copyright and back-to-top button
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gray-950 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} Olabode Olusegun. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/case-studies"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Case Studies
            </Link>
            <Link
              href="/blog"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            
              href="https://github.com/thewebguyy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gray-800 hover:bg-primary rounded-lg transition-colors 
                     group focus:outline-none focus:ring-4 focus:ring-primary/50"
            aria-label="Back to top"
          >
            <ArrowUpIcon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
          </motion.button>
        </div>

        {/* Decoration line */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              Designed and developed with ❤️ in Lagos, Nigeria
            </p>
            <div className="flex gap-4">
              <span>Performance: 100/100</span>
              <span>•</span>
              <span>Accessibility: WCAG 2.2 AA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}