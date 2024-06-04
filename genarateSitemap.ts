import type { MetadataRoute } from 'next'

const serverUrl = 'http://localhost:3001'

const generateSitemap = async (): Promise<string> => {
  const fetchPages = await fetch(`${serverUrl}/api/pages?limit=0`).then(res => res.json())
  const fetchProducts = await fetch(`${serverUrl}/api/products?limit=0`).then(res => res.json())

  const pages = fetchPages.docs || []
  const products = fetchProducts.docs || []

  const urls: MetadataRoute.Sitemap = []

  pages.forEach(page => {
    urls.push({
      url: `${serverUrl}/${page.slug === 'home' ? '' : page.slug}`,
      lastModified: new Date(page.updatedAt).toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    })
  })

  products.forEach(product => {
    urls.push({
      url: `${serverUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      url => `
      <url>
        <loc>${url.url}</loc>
        <lastmod>${url.lastModified}</lastmod>
        <changefreq>${url.changeFrequency}</changefreq>
        <priority>${url.priority}</priority>
      </url>`,
    )
    .join('\n')}\n</urlset>`
}

export default generateSitemap
