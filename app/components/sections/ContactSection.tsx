'use client'

import { motion } from 'framer-motion'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

/**
 * Contact Section Component
 * Features contact information and social links
 */
export function ContactSection() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/olabode-olusegun-8328141bb/' },
    { name: 'GitHub', url: 'https://github.com/thewebguyy' },
    { name: 'Twitter', url: 'https://twitter.com/thewebguyy' },
    { name: 'Instagram', url: 'https://www.instagram.com/thewebguyy/' },
  ]

  return (
    <section id="contact" className="section bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Connect With Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              I'm always open to discussions about design, technology, or potential collaborations. 
              Whether you have a question, want to talk about tech trends, are interested in learning 
              more about my work, or considering hiring me, feel free to reach out.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <ContactInfo
                icon={<EnvelopeIcon className="w-6 h-6" />}
                label="Email"
                value="olabodewebdesigns02@gmail.com"
                href="mailto:olabodewebdesigns02@gmail.com"
              />
              <ContactInfo
                icon={<PhoneIcon className="w-6 h-6" />}
                label="Phone"
                value="+234 808 013 8626"
                href="tel:+2348080138626"
              />
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Social Links</h3>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg 
                           hover:bg-gray-750 transition-colors group"
                >
                  <span className="text-gray-300 group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                  <ArrowRightIcon className="w-5 h-5 text-gray-500 group-hover:text-primary 
                                           transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            
              href="mailto:olabodewebdesigns02@gmail.com"
              className="btn btn-primary w-full mt-8 text-center"
            >
              Send Me a Message
            </a>

            {/* Download CV */}
            
              href="https://drive.google.com/file/d/1wr0ECLDq7hQFMAOQYRwXix9_aHMqsAfG/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full mt-4 text-center"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Contact Info Component
 * Displays a single contact method
 */
function ContactInfo({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}) {
  return (
    
      href={href}
      className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 
               transition-colors group"
    >
      <div className="text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">{label}</div>
        <div className="text-white group-hover:text-primary transition-colors">
          {value}
        </div>
      </div>
    </a>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}