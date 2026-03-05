'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/lib/testimonials'
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'

/**
 * Testimonials Section Component
 * Displays client testimonials with ratings and project context
 */
export function Testimonials() {
    return (
        <section id="testimonials" className="section bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                        Client Feedback
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
                        What <span className="gradient-text">Clients Say</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Verified recommendations from founders and engineering leads
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * Individual Testimonial Card Component
 */
function TestimonialCard({
    testimonial,
    delay
}: {
    testimonial: typeof testimonials[0]
    delay: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 relative group"
        >
            {/* Verification Badge */}
            {testimonial.verified && (
                <div className="absolute top-8 right-8 flex items-center gap-1 text-xs text-primary font-semibold">
                    <CheckBadgeIcon className="w-4 h-4" />
                    Verified Reference
                </div>
            )}

            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating
                            ? 'text-primary'
                            : 'text-gray-600'
                            }`}
                    />
                ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-gray-300 italic leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{testimonial.name}</span>
                        {testimonial.linkedinUrl && (
                            <a
                                href={testimonial.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-primary transition-colors"
                                aria-label={`${testimonial.name}'s LinkedIn Profile`}
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        )}
                    </div>
                    <div className="text-sm text-gray-400">
                        {testimonial.role} at <span className="text-gray-300">{testimonial.company}</span>
                    </div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                    {testimonial.projectRelated && (
                        <div className="text-primary/70 mb-1">
                            {testimonial.projectRelated}
                        </div>
                    )}
                    {formatDate(testimonial.date)}
                </div>
            </div>
        </motion.div>
    )
}

/**
 * Format date helper
 */
function formatDate(dateString: string): string {
    const [year, month] = dateString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    })
}
