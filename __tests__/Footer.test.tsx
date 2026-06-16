import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Footer } from '@/app/components/sections/Footer'

describe('Footer Component', () => {
    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2026-01-01'))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('renders copyright with current year', () => {
        render(<Footer />)
        expect(screen.getByText(/© 2026/)).toBeInTheDocument()
    })

    it('renders navigation links', () => {
        render(<Footer />)
        expect(screen.getByRole('link', { name: /Work/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /AI/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Writing/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument()
    })

    it('renders external links', () => {
        render(<Footer />)
        expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /X/i })).toBeInTheDocument()
    })

    it('renders back to top button', () => {
        render(<Footer />)
        expect(screen.getByRole('button', { name: /Back to top/i })).toBeInTheDocument()
    })

    it('renders location information', () => {
        render(<Footer />)
        expect(screen.getByText(/Lagos — Worldwide/i)).toBeInTheDocument()
    })
})
