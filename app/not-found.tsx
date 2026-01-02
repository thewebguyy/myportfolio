import Link from 'next/link'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

/**
 * Custom 404 Not Found Page
 * Provides helpful navigation options when users hit invalid routes
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <MagnifyingGlassIcon className="w-24 h-24 mx-auto text-gray-700 mb-4" />
          <h1 className="text-9xl font-bold gradient-text mb-2">404</h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link href="/case-studies" className="btn btn-secondary">
            View Projects
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Popular Pages</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link 
              href="/case-studies/servicebridge" 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              ServiceBridge Case Study
            </Link>
            <Link 
              href="/blog/edge-computing-2026" 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Edge Computing Blog
            </Link>
            <Link 
              href="/#contact" 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Contact Me
            </Link>
            <Link 
              href="/case-studies" 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              All Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}