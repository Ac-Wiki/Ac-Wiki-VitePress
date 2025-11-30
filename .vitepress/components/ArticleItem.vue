<script setup lang="ts">
// 导入文章类型定义
import type { Article } from '../utils/article'
// 导入 Vue 的响应式计算函数
import { computed } from 'vue'
// 导入文章状态管理存储
import { useArticleStore } from '../stores/article'
// 导入根据 feed 获取成员信息的工具函数
import { getMemberByFeed } from '../utils/member'
// 导入自动代码高亮组件
import AutoCode from './AutoCode.vue'

// 定义组件的 props，接收文章数据
const props = defineProps<Article>()

// 使用文章状态管理存储
const article = useArticleStore()
// 格式化日期显示，使用中文地区设置，显示年月日时分
const dateLabel = new Date(props.date).toLocaleString('zh-CN', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })

// 根据 feed 获取成员信息
const member = getMemberByFeed(props.feed)
// 计算作者名称，优先使用存储中的作者信息，否则使用 props 中的作者
const author = computed(() => article.getAuthor(member) || props.author)
// 计算头像地址
const avatar = computed(() => article.getAvatar(member))
</script>

<template>
    <!-- 文章项目链接容器 -->
    <a
        class="article-item"
        v-scrollcheck
        :href="link"
        target="_blank"
    >
        <!-- 文章标题 -->
        <div class="title">{{ title }}</div>
        <!-- 文章摘要，使用自动代码高亮组件，支持滚动检查 -->
        <AutoCode class="summary scrollcheck-y" tag="p" :text="description" />
        <!-- 文章信息行：作者、日期等 -->
        <div class="info-line">
            <!-- 作者头像，如果存在则显示 -->
            <img v-if="avatar" :src="avatar" :alt="member.name" class="avatar">
            <!-- 作者名称 -->
            <span class="author">{{ author }}</span> ·
            <!-- 发布日期，使用语义化的 time 标签 -->
            <time class="date" :datetime="date">
                {{ dateLabel }}
            </time>
        </div>
    </a>
</template>

<style scoped>
/* 文章项目容器样式 */
.article-item.article-item {
    display: grid; /* 使用网格布局 */
    grid-template-rows: auto 1fr auto; /* 三行布局：标题、摘要、信息行 */
    gap: 0.5rem; /* 网格间距 */
    position: relative; /* 相对定位，为绝对定位的子元素提供参考 */
    overflow: hidden; /* 隐藏溢出内容 */
    max-height: 12rem; /* 最大高度限制 */
    padding: 1rem; /* 内边距 */
    border-radius: 0.5rem; /* 圆角边框 */
    outline: 1px solid transparent; /* 透明轮廓，hover 时显示 */
    background: var(--vp-c-bg-soft); /* 使用 VitePress 主题变量设置背景色 */
    line-height: normal; /* 正常行高 */
    color: var(--vp-c-text-1); /* 使用主题变量设置文字颜色 */
    z-index: 0; /* 层级设置 */
}

/* 鼠标悬停效果 & 激活效果（进入视口） */
.article-item:hover,
.article-item.active {
    outline-color: var(--vp-c-brand-1); /* 悬停时显示品牌色轮廓 */
    background: none; /* 移除背景 */
    color: var(--vp-c-brand-1); /* 悬停时使用品牌色文字 */
}

/* 重置多重选择器的样式 */
.article-item.article-item.article-item.article-item::after {
    content: unset;
}

/* 摘要段落样式 */
p.summary {
    --guessed-scrollbar-width: 0px; /* 自定义属性：猜测的滚动条宽度 */

    overflow: auto; /* 自动滚动条 */
    opacity: 0.8; /* 透明度 */
    margin: 0; /* 外边距 */
    font-size: 0.8rem; /* 字体大小 */
    line-height: 1.5; /* 行高 */
    scrollbar-width: none; /* 隐藏滚动条（Firefox） */
}

/* 信息行样式 */
.info-line {
    font-size: 0.8rem; /* 字体大小 */
    color: var(--vp-c-text-2); /* 使用主题变量设置次要文字颜色 */
}

/* 头像样式 */
.avatar {
    position: absolute; /* 绝对定位 */
    opacity: 0.2; /* 默认透明度较低 */
    right: 0.8rem; /* 右对齐 */
    bottom: 0.5rem; /* 底部对齐 */
    height: 3rem; /* 头像高度 */
    border-radius: 3rem; /* 圆形头像 */
    transition: opacity 0.2s; /* 透明度过渡动画 */
    z-index: -1; /* 置于内容下方 */
}

/* 悬停/激活时头像透明度变化 */
.article-item:hover .avatar,
.article-item.active .avatar {
    opacity: 0.5; /* 悬停时提高透明度 */
}
</style>
