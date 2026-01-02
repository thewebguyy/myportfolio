/**
 * Rate Limiting Utility
 * In-memory rate limiting for API routes
 * For production, consider using Upstash Redis or Vercel Edge Config
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

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
 * Check if request should be rate limited
 * Returns success: false if limit exceeded
 */
export function rateLimit(config: RateLimitConfig): RateLimitResult {
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
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers (works with Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'

  // In production with auth, you might use:
  // const userId = await getUserIdFromSession(request)
  // return userId || ip

  return ip
}

/**
 * Rate limit middleware for API routes
 */
export function createRateLimiter(config: Omit<RateLimitConfig, 'identifier'>) {
  return function rateLimitMiddleware(request: Request): RateLimitResult {
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