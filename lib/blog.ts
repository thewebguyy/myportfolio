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
        slug: 'websocket-matching-layer',
        title: 'Why I Rewrote the Matching Layer with WebSockets',
        excerpt: 'Migrating from stateless polling to persistent stateful connections to achieve sub-100ms latency in a multi-sided marketplace.',
        date: '2026-05-22',
        readTime: 8,
        category: 'System Design',
        featured: true,
    },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(p => p.slug === slug)
}

export function getFeaturedBlogPosts(): BlogPost[] {
    return blogPosts.filter(p => p.featured)
}
