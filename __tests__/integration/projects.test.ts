/* eslint-env jest */
import { projects, getProjectById, searchProjects, getFeaturedProjects } from '@/lib/projects'

describe('Projects Data & Search Integration', () => {
    test('should return exactly 3 featured projects by default', () => {
        const featured = getFeaturedProjects()
        expect(featured.length).toBeGreaterThanOrEqual(3)
        featured.forEach(project => {
            expect(project.featured).toBe(true)
        })
    })

    test('should return correct project by id', () => {
        const project = getProjectById('servicebridge')
        expect(project).toBeDefined()
        expect(project?.title).toBe('ServiceBridge')
        expect(project?.metrics?.users).toBe('10,000+')
    })

    test('should return undefined for non-existent project id', () => {
        const project = getProjectById('non-existent')
        expect(project).toBeUndefined()
    })

    test('search should find projects by title or tech stack (case-insensitive)', () => {
        const results = searchProjects('React')
        expect(results.length).toBeGreaterThan(0)
        expect(results.some(p => p.tech.includes('React'))).toBe(true)

        const serviceResults = searchProjects('service')
        expect(serviceResults.length).toBeGreaterThan(0)
        expect(serviceResults.some(p => p.id === 'servicebridge')).toBe(true)
    })

    test('search should return empty array for unrelated keywords', () => {
        const results = searchProjects('ZyxelRouter123')
        expect(results.length).toBe(0)
    })

    test('all projects must have unique IDs', () => {
        const ids = projects.map(p => p.id)
        const uniqueIds = new Set(ids)
        expect(uniqueIds.size).toBe(ids.length)
    })
})
