'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/lib/testimonials'
import { StarIcon } from '@heroicons/react/24/solid'

/**
 * Testimonials Section Component
 * Displays client testimonials with ratings and project context
 */
export function Testimonials() {
    return (
        <section id="testimonials" className="section bg-gray-900">
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
                        Trusted by founders, CTOs, and product managers to deliver high-quality solutions
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
            className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
        >
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
            <blockquote className="text-gray-300 leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                <div className="flex-1">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                        {testimonial.role} at {testimonial.company}
                    </div>
                    {testimonial.projectRelated && (
                        <div className="text-xs text-primary mt-1">
                            Project: {testimonial.projectRelated}
                        </div>
                    )}
                </div>
                <div className="text-xs text-gray-500">
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
