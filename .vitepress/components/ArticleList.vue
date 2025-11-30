<script setup lang="ts">
// 导入文章类型定义
import type { Article } from '../utils/article'
// 导入成员类型定义
import type { Member } from '../utils/member'
// 导入 VueUse 的交叉观察器钩子
import { useIntersectionObserver } from '@vueuse/core'
// 导入 Pinia 的存储引用转换函数
import { storeToRefs } from 'pinia'
// 导入 Vue 的响应式 API
import { computed, ref, useTemplateRef } from 'vue'
// 导入成员数据
import members from '../data/members.json'
// 导入文章状态管理存储
import { useArticleStore } from '../stores/article'
// 导入链接构建工具
import { queryBuild } from '../utils/link'
// 导入成员相关工具函数
import { getMembers, grades } from '../utils/member'
// 导入文章项目组件
import ArticleItem from './ArticleItem.vue'
// 导入文章偏好设置组件
import ArticlePreference from './ArticlePreference.vue'

// 从文章存储中解构出偏好设置和尺寸设置
const { preference, size } = storeToRefs(useArticleStore())
// 获取文章存储的 API 方法
const { api } = useArticleStore()

// 加载状态标识
const loading = ref(false)
// 根据 API 返回的数据格式定义初始页面状态
const initPageStatus = {
    page: 0, // 当前页码
    totalPages: 1, // 总页数，初始为1保证触发 loadMore()
    total: 0, // 总文章数
    limit: 24, // 每页文章数量限制
}
// 页面状态响应式引用
const pageStatus = ref({ ...initPageStatus })
// 文章列表响应式引用
const articleList = ref<Article[]>([])

// 搜索关键词
const search = ref('')
// 当前选中的年级
const activeGrade = ref('')
// 当前选中的成员
const activeMember = ref<Member>()
// 根据搜索和年级筛选的活跃成员列表
const activeMembers = computed(() => (search.value
    ? getMembers(search.value) // 有搜索关键词时，根据关键词筛选
    : members.filter(member => member.grade === activeGrade.value || !activeGrade.value) // 否则根据年级筛选
).filter(member => member.feed)) // 只保留有 feed 的成员

// 设置筛选条件的函数
function setFilter(options: { member?: Member, grade?: string } = {}) {
    const { member, grade } = options
    // 重置页面状态和文章列表
    pageStatus.value = { ...initPageStatus }
    articleList.value = []

    // 清空搜索关键词
    search.value = ''
    // 设置年级：优先使用传入的年级，否则使用成员的年级，最后为空字符串
    activeGrade.value = grade || member?.grade || ''
    // 设置选中的成员
    activeMember.value = member

    // 平滑滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 加载更多文章的函数
async function loadMore() {
    if (loading.value)
        return
    loading.value = true

    // 构建 API 请求 URL
    const url = queryBuild(api('/articles'), {
        limit: pageStatus.value.limit,
        page: pageStatus.value.page + 1,
        feed: activeMember.value ? activeMember.value.feed || 'null' : undefined,
        tag: activeMember.value ? undefined : activeGrade.value,
    })

    // 发送请求获取文章数据
    const resp = await fetch(url)
    const { articles, pagination } = await resp.json()

    loading.value = false
    pageStatus.value = pagination
    articleList.value.push(...articles)
}

// 加载触发器的模板引用
const loadTrigger = useTemplateRef<Element[]>('load-trigger')
// 使用交叉观察器监听加载触发器，当进入视口时触发加载更多
// `useIntersectionObserver` | `useTemplateRef` of array type cannot be passed as argument
// @ts-expect-error https://github.com/vueuse/vueuse/issues/4712
useIntersectionObserver(loadTrigger, ([{ isIntersecting }]) => {
    if (isIntersecting)
        loadMore()
})
</script>

<template>
    <!-- 页面标题，显示当前选中的成员或年级 -->
    <h1>{{ activeMember?.name || activeGrade || "群博" }} - 文章列表</h1>
    <!-- 统计信息和相关链接 -->
    <p class="vp-doc stats">
        <span>共 {{ pageStatus.total }} 篇文章</span>
        <a :href="api('/opml')" target="_blank">OPML</a>
        <a :href="api('/rss')" target="_blank">RSS</a>
        <a href="https://github.com/xiyou-linuxer/blog-feed" target="_blank">API 源码</a>
    </p>

    <!-- 控制面板，固定在顶部 -->
    <div class="control sticky-header">
        <!-- 年级选择下拉框 -->
        <!-- @change 不会在 v-model 值改变时触发 -->
        <select
            v-model="activeGrade"
            class="bg-blur"
            aria-label="年级选择"
            @change="setFilter({ grade: activeGrade })"
        >
            <option value="">
                全部年级
            </option>
            <option v-for="{ grade } in grades" :key="grade" :value="grade">
                {{ grade }} 级
            </option>
        </select>

        <!-- 成员搜索下拉框 -->
        <Dropdown trigger="focusin" class="search-dropdown">
            <input
                v-model="search"
                class="bg-blur"
                type="search"
                placeholder="搜索成员"
            >
            <!-- 搜索结果下拉内容 -->
            <template v-if="activeMembers" #content="{ hide }">
                <!-- 显示当前年级全部成员的按钮 -->
                <button
                    v-if="activeMember && !search"
                    @click="hide(), setFilter({ grade: activeGrade })"
                >
                    {{ activeGrade }} 级全部
                </button>
                <!-- 显示搜索到的成员列表 -->
                <button
                    v-for="member in activeMembers"
                    :key="member.feed"
                    @click="hide(), setFilter({ member })"
                >
                    {{ member.name }} <Badge type="info" :text="member.grade" />
                </button>
            </template>
        </Dropdown>

        <!-- 重置筛选按钮 -->
        <Icon icon="ri:filter-off-line" class="cursor-pointer" title="重置筛选" @click="setFilter()" />

        <!-- 偏好设置下拉菜单 -->
        <Dropdown tag="button" title="偏好设置">
            <Icon icon="ri:list-settings-fill" class="cursor-pointer" />
            <template #content>
                <ArticlePreference />
            </template>
        </Dropdown>
    </div>

    <!-- 文章列表区域 -->
    <section class="article-list" :class="{ narrow: !preference.wide }" :style="{ '--size': size }">
        <!-- 渲染文章项目列表 -->
        <ArticleItem v-for="item in articleList" :key="item._id || item.link" v-bind="item" />
        <!-- 加载触发器，用于无限滚动 -->
        <div
            v-for="i in pageStatus.limit"
            v-show="pageStatus.page < pageStatus.totalPages"
            ref="load-trigger"
            :key="i"
            class="loading-item"
        />
    </section>
</template>

<style scoped>
/* 标题和统计信息样式 */
h1, .stats {
    margin: 2em 0 1rem;
    font: revert; /* 重置字体为默认值 */
    line-height: normal;
    text-align: center;
}

/* 统计信息中除第一个元素外的左边距 */
.stats > *:not(:first-child) {
    margin-left: 1rem;
}

/* 控制面板样式 */
.control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

/* 搜索下拉框样式 */
.search-dropdown {
    flex-shrink: 1; /* 允许收缩 */
}

.search-dropdown input {
    width: 100%;
}

/* 文章列表网格布局 */
.article-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--size, 20rem), 1fr)); /* 响应式列数，最小宽度由 CSS 变量控制 */
    gap: 1rem;
    margin: 2rem auto;
}

/* 支持 masonry 布局的浏览器使用瀑布流布局 */
@supports (grid-template-rows: masonry) {
    .article-list {
        grid-template-rows: masonry;
    }

    .article-item.article-item {
        max-height: none; /* 移除最大高度限制 */
    }
}

/* 窄版布局样式 */
.article-list.narrow {
    max-width: 83rem;
}

/* 加载项目样式 */
.loading-item {
    min-height: 10rem;
    border-radius: 0.5rem;
    background-color: var(--vp-c-bg-soft);
    animation: fade-in 1s both; /* 淡入动画 */
    animation-timeline: view(); /* 使用视口时间线 */
}

/* 淡入动画关键帧 */
@keyframes fade-in {
    0% { opacity: 0; }
    50% { opacity: 1; }
}
</style>
