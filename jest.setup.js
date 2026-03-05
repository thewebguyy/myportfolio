// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'openai/shims/node'

// Mock environment variables for tests
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'mock-key-for-tests'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
