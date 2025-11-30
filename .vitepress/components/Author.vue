<script setup lang="ts">
import type { Member } from '../utils/member'
import { computed } from 'vue'
import { useData } from 'vitepress'
import { getAuthor } from '../utils/member'

const { frontmatter } = useData()

// 生成作者气泡内容（QQ 优先，其次 GitHub）
function genAuthorTip(author: Partial<Member>) {
  return {
    content: author.qq ? `QQ: ${author.qq}` : (author.github ? `GitHub@${author.github}` : ''),
    interactive: true,
  }
}

// 简单判断是否外链
function isExtLink(link?: string) {
  return !!link && /^(https?:)?\/\//.test(link)
}

const authors = computed(() => {
  const author = frontmatter.value.author
  const list = Array.isArray(author) ? author : (author ? [author] : [])
  return list.map(getAuthor)
})
</script>

<template>
  <section class="authors" v-if="authors.length">
    <a
      v-for="author in authors"
      :key="author.name"
      class="author"
      :href="author.link"
      :target="isExtLink(author.link) ? '_blank' : undefined"
      v-tip="genAuthorTip(author)"
    >
      <img v-if="author.avatar" :src="author.avatar" alt="" />
      <span class="name">{{ author.name }}</span>
    </a>
  </section>
</template>

<style scoped>
.authors {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin: 1em 0;
  font-size: 0.8rem;
}

.author {
  display: inline-flex;
  opacity: 0.8;
  height: 1.8em;
  border-radius: 1rem;
  outline: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  line-height: 1.8;
  transition: opacity 0.2s;
}

.author[href]:hover {
  opacity: 1;
}

.author > .name {
  padding: 0 0.5em;
}

.author > img {
  height: 100%;
  border-radius: 1em;
  object-fit: cover;
}

.author > img + .name {
  margin-left: -0.2em;
}
</style>
