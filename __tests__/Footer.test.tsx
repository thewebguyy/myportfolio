import { render, screen } from '@testing-library/react'
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

    it('renders tech stack information', () => {
        render(<Footer />)
        expect(screen.getByText(/Built with Next.js, TypeScript, and Tailwind CSS/i)).toBeInTheDocument()
    })

    it('renders navigation links', () => {
        render(<Footer />)
        expect(screen.getByRole('link', { name: /Case Studies/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Blog/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument()
    })

    it('renders back to top button', () => {
        render(<Footer />)
        expect(screen.getByRole('button', { name: /Back to top/i })).toBeInTheDocument()
    })

    it('renders location information', () => {
        render(<Footer />)
        expect(screen.getByText(/Lagos, Nigeria/i)).toBeInTheDocument()
    })
})
