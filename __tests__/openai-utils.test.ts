/* eslint-env jest */
import { estimateTokens, validateTokenLimit, handleOpenAIError } from '@/lib/openai'
import OpenAI from 'openai'

describe('OpenAI Utilities', () => {
    describe('estimateTokens', () => {
        it('estimates tokens correctly for short text', () => {
            const text = 'Hello world'
            const tokens = estimateTokens(text)
            expect(tokens).toBeGreaterThan(0)
            expect(tokens).toBe(Math.ceil(text.length / 4))
        })

        it('estimates tokens correctly for longer text', () => {
            const text = 'This is a much longer text that should result in more tokens being estimated'
            const tokens = estimateTokens(text)
            expect(tokens).toBe(Math.ceil(text.length / 4))
        })

        it('handles empty string', () => {
            const tokens = estimateTokens('')
            expect(tokens).toBe(0)
        })
    })

    describe('validateTokenLimit', () => {
        it('returns true when text is within limit', () => {
            const shortText = 'Short text'
            expect(validateTokenLimit(shortText, 1000)).toBe(true)
        })

        it('returns false when text exceeds limit', () => {
            const longText = 'a'.repeat(40000) // ~10,000 tokens
            expect(validateTokenLimit(longText, 1000)).toBe(false)
        })

        it('uses default limit of 8000 when not specified', () => {
            const mediumText = 'a'.repeat(30000) // ~7,500 tokens
            expect(validateTokenLimit(mediumText)).toBe(true)
        })
    })

    describe('handleOpenAIError', () => {
        it('handles rate limit errors (429)', () => {
            const error = new OpenAI.APIError(429, { error: { message: 'Rate limit exceeded' } }, 'Rate limit', {})
            const message = handleOpenAIError(error)
            expect(message).toContain('high demand')
        })

        it('handles authentication errors (401)', () => {
            const error = new OpenAI.APIError(401, { error: { message: 'Invalid API key' } }, 'Auth error', {})
            const message = handleOpenAIError(error)
            expect(message).toContain('authentication')
        })

        it('handles bad request errors (400)', () => {
            const error = new OpenAI.APIError(400, { error: { message: 'Bad request' } }, 'Bad request', {})
            const message = handleOpenAIError(error)
            expect(message).toContain('Invalid request')
        })

        it('handles server errors (500+)', () => {
            const error = new OpenAI.APIError(500, { error: { message: 'Internal error' } }, 'Server error', {})
            const message = handleOpenAIError(error)
            expect(message).toContain('temporarily unavailable')
        })

        it('handles timeout errors', () => {
            const error = new Error('Request timeout')
            const message = handleOpenAIError(error)
            expect(message).toContain('timed out')
        })

        it('handles network errors', () => {
            const error = new Error('network error occurred')
            const message = handleOpenAIError(error)
            expect(message).toContain('Network error')
        })

        it('handles unknown errors', () => {
            const error = new Error('Something unexpected')
            const message = handleOpenAIError(error)
            expect(message).toContain('unexpected error')
        })
    })
})
