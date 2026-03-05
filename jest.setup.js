// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'openai/shims/node'

// Mock environment variables for tests
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'mock-key-for-tests'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'

// Global OpenAI Mock
jest.mock('openai', () => {
    const mockOpenAI = jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: jest.fn().mockResolvedValue({
                    choices: [{ message: { content: '{"matchScore": 85, "strengths": ["React"], "gaps": ["Rust"], "collaborationOpportunities": ["Web3"], "reasoning": "Good match"}' } }],
                }),
            },
        },
    }))

    // Add APIError to the mock class/function
    mockOpenAI.APIError = class APIError extends Error {
        constructor(status, error, message, headers) {
            super(message)
            this.status = status
            this.error = error
            this.headers = headers
        }
    }

    return mockOpenAI
})
