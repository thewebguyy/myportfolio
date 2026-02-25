/**
 * Blog data structure
 * Centralized source of truth for portfolio blog posts
 */

export interface BlogPost {
    slug: string
    title: string
    excerpt: string
    date: string
    readTime: number
    category: string
    featured: boolean
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'edge-computing-2026',
        title: 'Why Edge Computing Will Define Web Development in 2026',
        excerpt: 'Exploring how edge computing is transforming application architecture, reducing latency, and enabling new use cases for distributed systems.',
        date: '2024-12-15',
        readTime: 8,
        category: 'System Design',
        featured: true,
    },
    {
        slug: 'ai-agents-production',
        title: 'Building Production-Ready AI Agents: Lessons Learned',
        excerpt: 'A practical guide to integrating AI agents into web applications, covering prompt engineering, error handling, and cost optimization.',
        date: '2024-11-28',
        readTime: 12,
        category: 'AI/ML',
        featured: true,
    },
    {
        slug: 'green-coding-practices',
        title: 'Green Coding: Writing Sustainable Software for 2026',
        excerpt: 'How to measure and reduce the carbon footprint of your applications through efficient algorithms, optimized queries, and smart caching.',
        date: '2024-10-10',
        readTime: 10,
        category: 'Performance',
        featured: false,
    },
]

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(p => p.slug === slug)
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(): BlogPost[] {
    return blogPosts.filter(p => p.featured)
}
