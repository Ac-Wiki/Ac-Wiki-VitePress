<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  owner: string
  repo: string
}>()

interface Contributor {
  id: number
  username: string
  avatar: string
  url: string
  contributions: number
}

const contributors = ref<Contributor[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`https://ungh.cc/repos/${props.owner}/${props.repo}/contributors`)
    if (!res.ok) throw new Error('Failed to fetch contributors')
    const data = await res.json()
    contributors.value = data.contributors
  } catch (e) {
    error.value = '无法加载贡献者列表'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="contributor-list">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="contributors">
      <a
        v-for="c in contributors"
        :key="c.id"
        :href="`https://github.com/${c.username}`"
        target="_blank"
        rel="noopener noreferrer"
        class="contributor"
        :title="`${c.username} (${c.contributions} contributions)`"
      >
        <img :src="c.avatar" :alt="c.username" class="avatar" />
        <span class="name">{{ c.username }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.contributors {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.contributor {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transition: transform 0.2s;
}

.contributor:hover {
  transform: translateY(-2px);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 8px;
  border: 2px solid var(--vp-c-divider);
}

.name {
  font-size: 12px;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loading, .error {
  padding: 20px;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
