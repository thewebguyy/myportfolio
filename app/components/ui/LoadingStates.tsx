'use client'

import { motion } from 'framer-motion'

/**
 * Loading Spinner Component
 * Reusable loading indicator with animation
 */
export function LoadingSpinner({ size = 'md', message }: { size?: 'sm' | 'md' | 'lg'; message?: string }) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
            <motion.div
                className={`${sizeClasses[size]} border-4 border-gray-700 border-t-primary rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            {message && (
                <p className="text-gray-400 text-sm animate-pulse">{message}</p>
            )}
        </div>
    )
}

/**
 * Loading Skeleton Component
 * Placeholder for content while loading
 */
export function LoadingSkeleton({
    className = '',
    count = 1
}: {
    className?: string
    count?: number
}) {
    return (
        <>
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className={`loading-skeleton ${className}`}
                />
            ))}
        </>
    )
}

/**
 * Section Loading Component
 * Full section loading state
 */
export function SectionLoading({ title }: { title?: string }) {
    return (
        <section className="section bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <div className="text-center mb-16">
                        <LoadingSkeleton className="h-12 w-64 mx-auto mb-4" />
                        <LoadingSkeleton className="h-6 w-96 mx-auto" />
                    </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                    <LoadingSkeleton className="h-64 rounded-2xl" count={4} />
                </div>
            </div>
        </section>
    )
}

/**
 * Error Fallback Component
 * Displays when a component fails to load
 */
export function ErrorFallback({
    error,
    resetErrorBoundary
}: {
    error: Error
    resetErrorBoundary?: () => void
}) {
    return (
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto my-12">
            <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                    Something went wrong
                </h2>
                <p className="text-gray-400 mb-6">
                    {error.message || 'An unexpected error occurred'}
                </p>
                {resetErrorBoundary && (
                    <button
                        onClick={resetErrorBoundary}
                        className="btn btn-primary"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    )
}

/**
 * Empty State Component
 * Displays when no data is available
 */
export function EmptyState({
    icon = '📭',
    title = 'No data available',
    description,
    action
}: {
    icon?: string
    title?: string
    description?: string
    action?: {
        label: string
        onClick: () => void
    }
}) {
    return (
        <div className="text-center py-12">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            {description && (
                <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
            )}
            {action && (
                <button
                    onClick={action.onClick}
                    className="btn btn-primary"
                >
                    {action.label}
                </button>
            )}
        </div>
    )
}
