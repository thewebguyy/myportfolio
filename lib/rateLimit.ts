/**
 * Rate Limiting Utility
 * In-memory rate limiting for API routes
 * For production, consider using Upstash Redis or Vercel KV for persistence
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (resets on server restart/cold start)
const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  /** Unique identifier (IP, user ID, etc.) */
  identifier: string
  /** Maximum requests allowed in the time window */
  limit: number
  /** Time window in seconds */
  windowInSeconds: number
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Lazy cleanup of expired entries
 */
function cleanupExpired() {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Check if request should be rate limited
 * Returns success: false if limit exceeded
 */
export function rateLimit(config: RateLimitConfig): RateLimitResult {
  // Lazy cleanup occasionally (10% of calls to reduce overhead)
  if (Math.random() < 0.1) cleanupExpired()

  const { identifier, limit, windowInSeconds } = config
  const now = Date.now()
  const windowInMs = windowInSeconds * 1000

  // Get or create entry
  let entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    entry = {
      count: 1,
      resetTime: now + windowInMs,
    }
    rateLimitStore.set(identifier, entry)

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: entry.resetTime,
    }
  }

  // Increment count
  entry.count++

  // Check if limit exceeded
  if (entry.count > limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetTime,
    }
  }

  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetTime,
  }
}

/**
 * Get client identifier from request
 * Uses IP address or user ID if authenticated
 * Mitigates spoofing by prioritizing trusted infrastructure headers
 */
export function getClientIdentifier(request: Request): string {
  // Priority order for IP headers
  const headers = request.headers

  // Vercel's trusted IP header
  const vercelIp = headers.get('x-vercel-forwarded-for')
  // Cloudflare's trusted IP header
  const cfIp = headers.get('cf-connecting-ip')
  // Standard headers (less trusted, but better than nothing)
  const forwarded = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')

  const ip = vercelIp || cfIp || forwarded?.split(',')[0] || realIp || 'unknown'

  return ip
}

/**
 * Create a rate limiter function for a specific route
 */
export function createRateLimiter(config: Omit<RateLimitConfig, 'identifier'>) {
  return function checkRateLimit(request: Request): RateLimitResult {
    const identifier = getClientIdentifier(request)
    return rateLimit({ ...config, identifier })
  }
}

/**
 * Format rate limit headers for response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  }
}