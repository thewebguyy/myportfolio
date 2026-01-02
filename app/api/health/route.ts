import { NextResponse } from 'next/server'

/**
 * Health Check Endpoint
 * 
 * Used for monitoring and uptime checks
 * 
 * @route GET /api/health
 * @returns { status: string, timestamp: string }
 */
export async function GET() {
  try {
    // Check if OpenAI API key is configured
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'operational',
        openai: hasOpenAIKey ? 'configured' : 'not-configured',
      },
      version: '1.0.0',
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    )
  }
}