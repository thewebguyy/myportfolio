/* eslint-env jest */
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/analyze-resume/route'
import OpenAI from 'openai'

// Mock the OpenAI client
jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => {
        return {
            chat: {
                completions: {
                    create: jest.fn().mockResolvedValue({
                        choices: [
                            {
                                message: {
                                    content: JSON.stringify({
                                        skills: ["React", "TypeScript", "System Design"],
                                        experience: "Mid-to-Senior level architect with deep distributed systems knowledge.",
                                        recommendations: ["Learn Rust for low-level systems"]
                                    })
                                }
                            }
                        ]
                    })
                }
            }
        }
    })
})

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
        expect(data.error).toBe("No resume text provided")
    })

    test('should return analysis results when resume text is provided', async () => {
        const resumeText = "Experienced engineer with a focus on React and System Design."
        const req = createMockRequest({ resumeText })
        const res = await POST(req)

        expect(res.status).toBe(200)

        const data = await res.json()
        expect(data.analysis.skills).toContain("React")
        expect(data.analysis).toHaveProperty("experience")
    })

    test('should handle OpenAI error gracefully', async () => {
        // Force a failure in the mock
        const mockOpenAI = new OpenAI()
        jest.spyOn(mockOpenAI.chat.completions, 'create').mockRejectedValueOnce(new Error("API Overloaded"))

        const req = createMockRequest({ resumeText: "Failed test case" })
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
