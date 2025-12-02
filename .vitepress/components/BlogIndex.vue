<script setup lang="ts">
// @ts-ignore
import { data as posts } from '../data/blog.data.mjs'
import authorsData from '../data/authors.json'

function formatDate(date: any) {
  const d = date?.created ? date.created : date
  if (!d) return ''
  return new Date(d).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getAuthor(name: string) {
  return (authorsData as any)[name]
}
</script>

<template>
  <div class="blog-index">
    <div v-for="post in posts" :key="post.url" class="blog-post-card">
      <a :href="post.url" class="post-link">
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-meta">
          <span v-if="post.date" class="post-date">{{ formatDate(post.date) }}</span>
          <div v-if="post.authors" class="post-authors">
            <span v-for="(author, index) in post.authors" :key="author" class="post-author">
              <span v-if="index > 0">, </span>
              <template v-if="getAuthor(author)">
                <img :src="getAuthor(author).avatar" class="author-avatar" :alt="author">
                <span class="author-name">{{ getAuthor(author).name }}</span>
              </template>
              <template v-else>
                {{ author }}
              </template>
            </span>
          </div>
        </div>
        <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>
        <div v-if="post.tags" class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">#{{ tag }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.blog-index {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.blog-post-card {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.2s, box-shadow 0.2s;
}

.blog-post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: var(--vp-c-bg-soft-up);
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border: none;
}

.post-meta {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.post-authors {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.post-author {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-dimm);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
