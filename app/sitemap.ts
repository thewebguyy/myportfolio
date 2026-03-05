import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'
import { projects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://olabode.tech'

    // Core pages
    const routes = ['', '/blog', '/case-studies'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Blog posts
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Case studies
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/case-studies/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...routes, ...blogRoutes, ...projectRoutes]
}
