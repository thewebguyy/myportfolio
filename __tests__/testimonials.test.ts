import { testimonials, getTestimonialById, getTestimonialsByRating, getTestimonialsByProject } from '@/lib/testimonials'

describe('Testimonials Data', () => {
    it('exports an array of testimonials', () => {
        expect(Array.isArray(testimonials)).toBe(true)
        expect(testimonials.length).toBeGreaterThan(0)
    })

    it('each testimonial has required fields', () => {
        testimonials.forEach(testimonial => {
            expect(testimonial).toHaveProperty('id')
            expect(testimonial).toHaveProperty('name')
            expect(testimonial).toHaveProperty('role')
            expect(testimonial).toHaveProperty('company')
            expect(testimonial).toHaveProperty('content')
            expect(testimonial).toHaveProperty('rating')
            expect(testimonial).toHaveProperty('date')
        })
    })

    it('all testimonials have valid ratings (1-5)', () => {
        testimonials.forEach(testimonial => {
            expect(testimonial.rating).toBeGreaterThanOrEqual(1)
            expect(testimonial.rating).toBeLessThanOrEqual(5)
        })
    })

    describe('getTestimonialById', () => {
        it('returns testimonial when ID exists', () => {
            const testimonial = getTestimonialById('testimonial-1')
            expect(testimonial).toBeDefined()
            expect(testimonial?.id).toBe('testimonial-1')
        })

        it('returns undefined when ID does not exist', () => {
            const testimonial = getTestimonialById('non-existent-id')
            expect(testimonial).toBeUndefined()
        })
    })

    describe('getTestimonialsByRating', () => {
        it('returns only testimonials with rating >= minRating', () => {
            const highRated = getTestimonialsByRating(5)
            highRated.forEach(testimonial => {
                expect(testimonial.rating).toBeGreaterThanOrEqual(5)
            })
        })

        it('returns all testimonials when minRating is 1', () => {
            const allTestimonials = getTestimonialsByRating(1)
            expect(allTestimonials.length).toBe(testimonials.length)
        })
    })

    describe('getTestimonialsByProject', () => {
        it('returns testimonials related to a specific project', () => {
            const firstTestimonialWithProject = testimonials.find(t => t.projectRelated)
            if (!firstTestimonialWithProject) return;

            const projectName = firstTestimonialWithProject.company // Or just use company as a proxy
            const relatedTestimonials = getTestimonialsByProject(projectName)

            expect(relatedTestimonials.length).toBeGreaterThan(0)
            relatedTestimonials.forEach(testimonial => {
                expect(testimonial.projectRelated?.toLowerCase()).toContain(projectName.toLowerCase())
            })
        })

        it('returns empty array when no testimonials match project', () => {
            const nonExistentProject = getTestimonialsByProject('NonExistentProject123')
            expect(nonExistentProject).toEqual([])
        })
    })
})
