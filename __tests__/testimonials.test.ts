import { testimonials, getTestimonialById, getTestimonialsByRating, getTestimonialsByProject } from '@/lib/testimonials'

/**
 * Testimonials are intentionally empty until real ones (with verifiable LinkedIn URLs)
 * are added to lib/testimonials.ts. These tests assert the dormant state is correct
 * and will continue to pass until the array is populated.
 */
describe('Testimonials Data', () => {
    it('exports an array', () => {
        expect(Array.isArray(testimonials)).toBe(true)
    })

    it('is currently empty — real testimonials pending', () => {
        expect(testimonials.length).toBe(0)
    })

    describe('getTestimonialById', () => {
        it('returns undefined when array is empty', () => {
            const testimonial = getTestimonialById('testimonial-1')
            expect(testimonial).toBeUndefined()
        })

        it('returns undefined for non-existent IDs', () => {
            expect(getTestimonialById('non-existent-id')).toBeUndefined()
        })
    })

    describe('getTestimonialsByRating', () => {
        it('returns empty array when no testimonials exist', () => {
            expect(getTestimonialsByRating(5)).toEqual([])
            expect(getTestimonialsByRating(1)).toEqual([])
        })
    })

    describe('getTestimonialsByProject', () => {
        it('returns empty array when no testimonials exist', () => {
            expect(getTestimonialsByProject('ServiceBridge')).toEqual([])
        })

        it('returns empty array for non-existent projects', () => {
            expect(getTestimonialsByProject('NonExistentProject123')).toEqual([])
        })
    })
})
