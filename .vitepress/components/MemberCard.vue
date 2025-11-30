<script setup lang="ts">
// 导入成员类型定义
import type { Member } from '../utils/member'
// 导入获取头像的工具函数
import { getAvatar } from '../utils/member'
import { Icon } from '@iconify/vue'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

// 定义组件属性，接收成员信息
const props = defineProps<Partial<Member>>()

// refs 用于测量与定位
const cardRef = ref<HTMLElement | null>(null)
const flyoutRef = ref<HTMLElement | null>(null)

// 定位状态：水平/垂直方向的锚点
const hAnchor = ref<'left' | 'right'>('left')
const vAnchor = ref<'top' | 'bottom'>('top')

function updatePlacement() {
  const card = cardRef.value
  const fly = flyoutRef.value
  if (!card || !fly) return

  // 视口尺寸
  const vw = window.innerWidth
  const vh = window.innerHeight

  // 触发测量：确保样式已应用
  const cardRect = card.getBoundingClientRect()

  // 获取浮层尺寸（即使透明也有尺寸）
  const flyRect = fly.getBoundingClientRect()
  const flyW = flyRect.width
  const flyH = flyRect.height

  // 默认从左上角展开的目标位置
  const wouldRight = cardRect.left + flyW > vw
  const wouldBottom = cardRect.top + flyH > vh

  hAnchor.value = wouldRight ? 'right' : 'left'
  vAnchor.value = wouldBottom ? 'bottom' : 'top'
}

function onInteract() {
  // 交互或聚焦时更新一次，适配移动端点击展开
  nextTick(updatePlacement)
}

function onResize() {
  updatePlacement()
}

onMounted(() => {
  updatePlacement()
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

// 头像加载失败时的回退
const imgError = ref(false)
</script>

<template>
    <!-- 成员卡片：默认仅显示头像，悬浮时展开悬浮信息面板 -->
    <div class="card" tabindex="0" ref="cardRef" @mouseenter="onInteract" @focus="onInteract" @touchstart.passive="onInteract">
        <!-- 折叠态头像（占位，不影响网格） -->
        <img v-if="!imgError" class="avatar avatar-small" :src="getAvatar($props)" alt="avatar" @error="imgError = true">
        <div v-else class="avatar avatar-small avatar-fallback" aria-label="missing avatar">
            <Icon icon="subway:missing" />
        </div>

        <!-- 悬浮展开的矩形信息卡片（绝对定位覆盖，不改变布局） -->
        <div class="flyout" role="dialog" aria-modal="false" ref="flyoutRef" :class="[hAnchor, vAnchor]">
            <div class="flyout-inner">
                <img v-if="!imgError" class="avatar avatar-large" :src="getAvatar($props)" alt="avatar-large" @error="imgError = true">
                <div v-else class="avatar avatar-large avatar-fallback" aria-label="missing avatar">
                    <Icon icon="subway:missing" />
                </div>
                <div class="meta">
                    <div class="name">{{ name }}</div>
                    <div class="title" v-if="title">{{ title }}</div>
                    <div class="extra">
                        <span v-if="grade" class="chip">
                            <i class="fa-solid fa-graduation-cap" /> {{ grade }}
                        </span>
                        <span v-if="tags" class="chip chip-muted">
                            <i class="fa-solid fa-tag" /> {{ tags }}
                        </span>
                    </div>
                    <div class="links">
                        
                        <a v-if="link" :href="link" target="_blank" rel="noreferrer noopener">
                            <slot name="link-label">
                                <i class="fa-solid fa-link" /> {{ linkText }}
                            </slot>
                        </a>
                        <a v-if="github" :href="`https://github.com/${github}`" target="_blank" rel="noreferrer noopener">
                            <i class="fa-brands fa-github" /> {{ github }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 容器：默认仅展示小头像，保持网格不抖动 */
.card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 4rem;
    outline: none;
}

.avatar {
    border-radius: 999px;
    box-shadow: 2px 4px 1rem var(--vp-c-divider);
}
.avatar-small {
    width: 3rem;
    height: 3rem;
}
.avatar-large {
    width: 4rem;
    height: 4rem;
}

.avatar-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--vp-c-bg-soft);
    color: var(--vp-c-text-3);
}
.avatar-small.avatar-fallback :deep(svg),
.avatar-small.avatar-fallback :deep(.icon) {
    font-size: 1.6rem;
}
.avatar-large.avatar-fallback :deep(svg),
.avatar-large.avatar-fallback :deep(.icon) {
    font-size: 2rem;
}

/* 悬浮卡片（覆盖浮层） */
.flyout {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-8%, -8%) scale(0.96);
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    transition: opacity 150ms ease, transform 150ms ease, z-index 0s linear 150ms;
}

/* 根据锚点自动翻转（避免溢出） */
.flyout.right {
    left: auto;
    right: 0;
    /* 从右上轻微位移进入 */
    transform: translate(8%, -8%) scale(0.96);
}
.flyout.bottom {
    top: auto;
    bottom: 0;
    /* 从左下轻微位移进入 */
    transform: translate(-8%, 8%) scale(0.96);
}
.flyout.right.bottom {
    /* 从右下进入 */
    transform: translate(8%, 8%) scale(0.96);
}

.card:hover,
.card:focus-visible {
    z-index: 1000; /* 悬浮时顶层遮挡其他头像 */
}
.card:hover .flyout,
.card:focus-visible .flyout {
    opacity: 1;
    transform: translate(0, 0) scale(1);
    pointer-events: auto;
    transition: opacity 160ms ease, transform 160ms ease;
}

.flyout-inner {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 12px;
    width: 18rem;
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    box-shadow: 0 8px 24px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08);
}

.meta {
    display: flex;
    flex-direction: column;
    min-width: 0;
}
.name {
    font-weight: 600;
}
.title {
    margin-top: 2px;
    font-size: 0.85em;
    color: var(--vp-c-text-3);
}
.extra {
    margin-top: 6px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}
.chip {
    display: inline-flex;
    gap: 4px;
    align-items: center;
    padding: 2px 6px;
    border-radius: 999px;
    font-size: 0.75em;
    background-color: var(--vp-c-default-soft);
    color: var(--vp-c-text-2);
}
.chip-muted {
    background-color: var(--vp-c-bg-soft);
}
.links {
    margin-top: 6px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.links a {
    overflow: hidden;
    max-width: 100%;
    background: unset;
    font-size: 0.85em;
    text-overflow: ellipsis;
    text-wrap: nowrap;
}
.links a[target]::after { content: unset; }
</style>
