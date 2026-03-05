import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate Limiting Utility
 * Persistent rate limiting using Upstash Redis for serverless environments
 */

// Initialize Upstash Redis client
// Note: If these are not defined, we fall back to in-memory limiting
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
  : null

// Define types to maintain compatibility
interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (fallback for local dev or misconfiguration)
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
  remaining: number
  reset: number
  limit: number
}

/**
 * Check if request should be rate limited
 */
export async function rateLimit(config: RateLimitConfig): Promise<RateLimitResult> {
  const { identifier, limit, windowInSeconds } = config

  // Attempt to use Upstash Redis first
  if (redis) {
    try {
      const ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowInSeconds} s`),
        analytics: true,
      })

      const { success, remaining, reset } = await ratelimit.limit(identifier)
      return { success, remaining, reset, limit }
    } catch (error) {
      console.error('Upstash rate limit error, falling back to in-memory:', error)
    }
  }

  // Fallback: In-memory limiting (original logic)
  const now = Date.now()
  const windowInMs = windowInSeconds * 1000
  let entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetTime) {
    entry = { count: 1, resetTime: now + windowInMs }
    rateLimitStore.set(identifier, entry)
    return { success: true, remaining: limit - 1, reset: entry.resetTime, limit }
  }

  entry.count++
  if (entry.count > limit) {
    return { success: false, remaining: 0, reset: entry.resetTime, limit }
  }

  return { success: true, remaining: limit - entry.count, reset: entry.resetTime, limit }
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  const headers = request.headers
  const ip = headers.get('x-vercel-forwarded-for') ||
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0] ||
    headers.get('x-real-ip') ||
    'unknown'
  return ip
}

/**
 * Create a rate limiter function for a specific route
 */
export function createRateLimiter(config: Omit<RateLimitConfig, 'identifier'>) {
  return async function checkRateLimit(request: Request) {
    const identifier = getClientIdentifier(request)
    return await rateLimit({ ...config, identifier })
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