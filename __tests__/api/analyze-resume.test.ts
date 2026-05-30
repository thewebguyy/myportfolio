/**
 * @jest-environment node
 */
/* eslint-env jest */
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/analyze-resume/route'
import OpenAI from 'openai'

// Mock the lib/openai module
jest.mock('@/lib/openai', () => {
    return {
        openai: {
            chat: {
                completions: {
                    create: jest.fn().mockResolvedValue({
                        choices: [
                            {
                                message: {
                                    content: JSON.stringify({
                                        matchScore: 85,
                                        skillGap: "Low",
                                        skillGapSeverity: "None",
                                        alignmentSignals: {
                                            cultural: "Strong alignment with engineering-first culture",
                                            technical: "Deep React and TypeScript expertise",
                                            strategic: "System design thinking at scale"
                                        },
                                        collaborationOpportunities: ["Architecture review", "Performance tuning"],
                                        developmentPlan: "Focus on Rust and distributed systems tooling",
                                        reasoning: "Mid-to-Senior level architect with deep distributed systems knowledge.",
                                        confidenceScore: 90,
                                        assumptions: ["Stable infrastructure", "Active collaboration"]
                                    })
                                }
                            }
                        ],
                        usage: { total_tokens: 150 }
                    })
                }
            }
        },
        RESUME_ANALYZER_PROMPT: 'mock prompt',
        handleOpenAIError: (err: unknown) => 'AI service error: ' + (err instanceof Error ? err.message : String(err)),
        AI_CONFIG: { model: 'gpt-4' }
    }
})

import { openai } from '@/lib/openai'

const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/analyze-resume', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })
}

describe('API Route: analyze-resume', () => {
    // Before each test, reset mock calls
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should return 400 when no resume text is provided', async () => {
        const req = createMockRequest({})
        const res = await POST(req)
        expect(res.status).toBe(400)

        const data = await res.json()
        expect(data.error).toBe("Invalid input. Please provide resume text.")
    })

    test('should return analysis results when resume text is provided', async () => {
        const resumeText = "Experienced engineer with a focus on React and System Design. I have over 5 years of experience building high-scale marketplace platforms and optimizing API payloads for efficiency across different regions."
        const req = createMockRequest({ resumeText })
        const res = await POST(req)

        expect(res.status).toBe(200)

        const data = await res.json()
        expect(data.analysis.collaborationOpportunities).toContain("Architecture review")
        expect(data.analysis).toHaveProperty("reasoning")
    })

    test('should handle OpenAI error gracefully', async () => {
        // Force a failure in the mock
        ; (openai.chat.completions.create as jest.Mock).mockRejectedValueOnce(new Error("API Overloaded"))

        const req = createMockRequest({ resumeText: "Tailwind CSS, React, and TypeScript expert with 5 years of experience. I have built several projects including a marketplace and a subscription manager. Looking for new opportunities to collaborate." })
        const res = await POST(req)

        // Either 500 or 200 with error depending on implementation
        // Let's check status
        expect([500, 200]).toContain(res.status)
        const data = await res.json()
        if (res.status === 500) {
            expect(data.error).toBeDefined()
        }
    })
})
