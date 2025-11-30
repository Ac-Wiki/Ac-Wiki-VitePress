<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import MemberCard from './MemberCard.vue'
import type { Member } from '../utils/member'
import members from '../data/members.json'

interface UnghContributor {
  id: number
  username: string
  contributions: number
}

const props = defineProps<{
  owner?: string
  repo?: string
  /** 是否包含机器人账号（用户名以 [bot] 结尾） */
  includeBots?: boolean
}>()
const owner = props.owner ?? 'ac-wiki'
const repo = props.repo ?? 'ac-wiki'
const includeBots = props.includeBots ?? false

const loading = ref(true)
const error = ref<string | null>(null)
const contributors = ref<UnghContributor[]>([])

async function fetchContributors() {
  loading.value = true
  error.value = null
  try {
    const url = `https://ungh.cc/repos/${owner}/${repo}/contributors`
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const unghList = (data.contributors as UnghContributor[]) || []

    // 过滤机器人（可选）
    const filteredUngh = unghList.filter(c => includeBots || !c.username.endsWith('[bot]'))

    // 来自本地 members.json 的 GitHub 用户集合
    const membersList = (members as unknown as Member[])
    const memberGithubs = new Set(
      membersList
        .map(m => m.github?.trim())
        .filter((x): x is string => !!x && (includeBots || !x.endsWith('[bot]')))
    )

    // 合并用户名：UNGH + 本地成员（保证零贡献者也出现）
    const map = new Map<string, UnghContributor>()
    for (const c of filteredUngh) {
      map.set(c.username, c)
    }
    for (const gh of memberGithubs) {
      if (!map.has(gh)) {
        map.set(gh, { id: -1, username: gh, contributions: 0 })
      }
    }

    // 输出为数组，按贡献数倒序、再按字母排序
    contributors.value = Array.from(map.values()).sort((a, b) => {
      if (b.contributions !== a.contributions) return b.contributions - a.contributions
      return a.username.localeCompare(b.username)
    })
  } catch (e: any) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchContributors)
</script>

<template>
  <div class="contributors">
    <div class="header">
      <h2 class="title">Contributors</h2>
      <p class="subtitle">Source: ungh.cc ({{ owner }}/{{ repo }})</p>
    </div>

    <div v-if="loading" class="state">加载中…</div>
    <div v-else-if="error" class="state error">加载失败：{{ error }}</div>

    <div v-else class="grid">
      <MemberCard
        v-for="c in contributors"
        :key="c.id"
        :name="c.username"
        :github="c.username"
        :title="'Contributor'"

        :link="`https://github.com/${c.username}`"
        :grade="''"
      >
      <!-- :tags="`贡献 ${c.contributions}`" -->
        <template #link-label>
            <Icon icon="mdi:github" />
        </template>
      </MemberCard>
    </div>
  </div>
</template>

<style scoped>
.contributors {
  margin: 2rem 0;
}
.header .title {
  margin: 0 0 .25rem 0;
}
.header .subtitle {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-3);
  font-size: .9em;
}
.state {
  padding: 1rem;
  color: var(--vp-c-text-2);
}
.state.error { color: var(--vp-c-danger-1); }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(3.2rem, 1fr));
  gap: 8px;
  align-items: start;
  max-width: calc(10 * 7rem + 9 * 8px);
  margin-left: auto;
  margin-right: auto;
}
</style>
