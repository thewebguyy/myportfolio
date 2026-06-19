'use client'

import React, { Component, ReactNode } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

/**
 * React Error Boundary Component
 * Catches errors in component tree and provides fallback UI
 * Use to wrap specific sections that might fail independently
 */

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="bg-surface border border-surface-2 p-8 my-8">
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Something went wrong in this section
              </h3>
              <p className="text-text-secondary mb-4">
                This component encountered an error. The rest of the page should still work fine.
              </p>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn btn-secondary text-sm"
              >
                Try Again
              </button>
              
              {/* Show error details in development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30">
                  <p className="text-sm font-mono text-red-400">
                    {this.state.error.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * HOC for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}