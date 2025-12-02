import { createContentLoader } from 'vitepress'

export interface BlogPost {
  title: string
  url: string
  date: string
  author?: string
  tags?: string[]
  excerpt?: string
}

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter((page) => page.frontmatter.title)
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map((page) => {
        return {
          title: page.frontmatter.title,
          url: page.url,
          date: page.frontmatter.date,
          author: page.frontmatter.author,
          tags: page.frontmatter.tags,
          excerpt: page.excerpt,
        }
      })
  }
})
