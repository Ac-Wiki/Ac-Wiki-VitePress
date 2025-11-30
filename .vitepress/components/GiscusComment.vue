<template>
  <div class="giscus-wrapper">
    <div ref="container" class="giscus-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
// VitePress runtime composables
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { isDark } = useData()
const container = ref<HTMLDivElement | null>(null)
let cleanup: (() => void) | null = null

// TODO: 填写你的 Giscus 参数。强烈建议使用固定的 repoId 和 categoryId 以避免改名带来的失效。
const GISCUS_CONFIG = {
  repo: 'ac-wiki/ac-wiki', // 仓库，如：owner/repo
  repoId: 'R_kgDONCnJnA', // 仓库 ID（从 giscus 复制）
  category: '', // 可留空，推荐用 categoryId
  categoryId: '', // 分类 ID（从 giscus 复制）
  mapping: 'pathname', // 对应 giscus 的 data-mapping
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '1',
  inputPosition: 'top',
  // 默认主题值将按颜色模式动态设置。可替换为你自己的主题或 CSS URL
  themeLight: 'light',
  themeDark: 'dark',
  lang: 'zh-CN',
  loading: 'lazy',
}

function currentTheme(): string {
  return isDark.value ? GISCUS_CONFIG.themeDark : GISCUS_CONFIG.themeLight
}

function injectGiscus() {
  if (!container.value) return

  // 清空旧内容，确保路由切换时重新渲染
  container.value.innerHTML = ''

  const scriptEl = document.createElement('script')
  scriptEl.src = 'https://giscus.app/client.js'
  scriptEl.crossOrigin = 'anonymous'
  scriptEl.async = true

  scriptEl.setAttribute('data-repo', GISCUS_CONFIG.repo)
  scriptEl.setAttribute('data-repo-id', GISCUS_CONFIG.repoId)
  if (GISCUS_CONFIG.category) scriptEl.setAttribute('data-category', GISCUS_CONFIG.category)
  if (GISCUS_CONFIG.categoryId) scriptEl.setAttribute('data-category-id', GISCUS_CONFIG.categoryId)
  scriptEl.setAttribute('data-mapping', GISCUS_CONFIG.mapping)
  scriptEl.setAttribute('data-strict', GISCUS_CONFIG.strict)
  scriptEl.setAttribute('data-reactions-enabled', GISCUS_CONFIG.reactionsEnabled)
  scriptEl.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata)
  scriptEl.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition)
  // 初始主题与站点模式同步
  scriptEl.setAttribute('data-theme', currentTheme())
  scriptEl.setAttribute('data-lang', GISCUS_CONFIG.lang)
  scriptEl.setAttribute('data-loading', GISCUS_CONFIG.loading)

  container.value.appendChild(scriptEl)

  // 返回清理函数：卸载时清空容器，避免重复实例
  cleanup = () => {
    if (container.value) container.value.innerHTML = ''
    cleanup = null
  }
}

function postThemeToGiscus(theme: string) {
  // giscus 会在容器内插入一个 iframe.giscus-frame
  const iframe = container.value?.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null
  if (!iframe || !iframe.contentWindow) return
  // 使用 setConfig 动态切换主题
  iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
}

onMounted(() => {
  injectGiscus()
  // 尝试在初始渲染后同步一次主题（脚本加载稍后才会生成 iframe）
  // 延迟发送，避免 iframe 尚未创建
  setTimeout(() => postThemeToGiscus(currentTheme()), 800)
})

onBeforeUnmount(() => {
  if (cleanup) cleanup()
})

// 监听 VitePress 路由变化，重新注入以更新讨论主题（按照 pathname 映射）
watch(
  () => route.path,
  () => {
    injectGiscus()
  }
)

// 监听暗色模式切换，动态切换 giscus 主题
watch(
  () => isDark.value,
  (d) => {
    postThemeToGiscus(d ? GISCUS_CONFIG.themeDark : GISCUS_CONFIG.themeLight)
  }
)
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
}
</style>
