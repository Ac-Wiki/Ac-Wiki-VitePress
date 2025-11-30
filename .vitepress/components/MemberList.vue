<script setup lang="ts">
// 导入 Vue 的响应式 API
import { computed, ref } from 'vue'
// 导入成员数据
import members from '../data/members.json'
// 导入成员相关工具函数
import { getMembers, grades } from '../utils/member'
// 导入成员卡片组件
import MemberCard from './MemberCard.vue'

// 定义组件属性
const props = defineProps<{
    showNewestNum?: number // 显示最新年级的数量，可选
}>()

// 当前选中的年级列表，默认显示最新的年级
const activeGrade = ref<string[]>(
    grades.map(entry => entry.grade).slice(0, props.showNewestNum ?? 1),
)

// 搜索关键词
const search = ref('')

// 根据搜索和年级筛选的活跃成员列表
const activeMembers = computed(() =>
    search.value
        ? getMembers(search.value) // 有搜索关键词时，根据关键词筛选
        : members.filter(member => activeGrade.value.includes(member.grade)), // 否则根据选中的年级筛选
)

// 设置活跃年级的函数
function setActiveGrade(e: MouseEvent, ...grade: string[]) {
    search.value = '' // 清空搜索关键词
    
    // 支持 Ctrl 或 Shift 键进行多选
    if (e.ctrlKey || e.shiftKey) {
        if (activeGrade.value.includes(grade[0]))
            activeGrade.value = activeGrade.value.filter(g => g !== grade[0]) // 如果已选中则移除
        else
            activeGrade.value.push(grade[0]) // 如果未选中则添加
    }
    else {
        activeGrade.value = grade // 普通点击时替换为当前年级
    }
}
</script>

<template>
    <!-- 成员列表容器 -->
    <div class="tabs-container">
        <!-- 年级标签页，固定在顶部 -->
        <div class="sticky-header">
            <div class="scrollcheck-x">
                <div class="tabs">
                    <!-- 年级标签按钮 -->
                    <button
                        v-for="{ grade, length } in grades"
                        :key="grade"
                        :class="{ active: activeGrade.includes(grade) && !search }"
                        @click="setActiveGrade($event, grade)"
                    >
                        <!-- 年级名称 -->
                        <!-- <span class="grade">{{ grade }}</span>
                        该年级成员数量徽章 -->
                        <!-- <span class="badge">{{ length }}</span> -->
                    </button>
                </div>
            </div>
        </div>

        <!-- 成员搜索框 -->
        <input
            v-model="search"
            class="search"
            type="search"
            placeholder="搜索成员"
        >

        <!-- 成员卡片内容区域 -->
        <div class="tab-content">
            <!-- 渲染成员卡片列表 -->
            <MemberCard
                v-for="member in activeMembers"
                :key="member.github || member.name"
                v-bind="member"
            />
        </div>
    </div>
</template>

<style scoped>
/* 成员列表容器样式 */
.tabs-container {
    margin: 2rem 0;
}

/* 固定头部样式 */
.sticky-header {
    margin: 0 -1rem;
}

/* 水平滚动检查容器 */
.scrollcheck-x {
    --guessed-scrollbar-height: 0px; /* 自定义属性：猜测的滚动条高度 */
}

/* 标签页样式 */
.tabs {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    justify-content: center; /* 水平居中 */
    gap: 0.5rem; /* 标签间距 */
}

/* 移动端响应式样式 */
/* stylelint-disable-next-line media-feature-range-notation */
@media (max-width: 50rem) {
    .tabs {
        display: grid; /* 使用网格布局 */
        grid-auto-flow: column; /* 自动流向列 */
        grid-template-rows: 1fr 1fr; /* 两行等分 */
        width: max-content; /* 宽度自适应内容 */
        margin: 0 auto; /* 水平居中 */
    }
}

/* 标签按钮样式 */
.tabs button {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    overflow: hidden; /* 隐藏溢出内容 */
    border: none; /* 移除边框 */
    border-radius: 4px; /* 圆角 */
    background-color: var(--vp-c-bg-soft); /* 使用主题软背景色 */
    cursor: pointer; /* 鼠标指针样式 */
}

/* 年级名称样式 */
.tabs button > .grade {
    padding: 0 4px; /* 左右内边距 */
}

/* 数量徽章样式 */
.tabs button > .badge {
    flex-grow: 1; /* 占据剩余空间 */
    padding: 0 2px; /* 左右内边距 */
    background-color: var(--vp-c-default-soft); /* 使用主题默认软色背景 */
    vertical-align: middle; /* 垂直居中对齐 */
}

/* 激活状态的标签按钮样式 */
.tabs button.active {
    background-color: var(--vp-c-brand); /* 使用主题品牌色背景 */
    color: var(--vp-c-bg); /* 使用主题背景色文字 */
}

/* 搜索框样式 */
.search {
    display: block;
    margin: 0 auto 2rem; /* 水平居中，下边距 2rem */
}

/* 标签内容区域样式 */
.tab-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(3.1415926793rem, 1fr)); /* 响应式网格，最小宽度 7rem */
    gap: 8px; /* 网格间距 */
    position: relative; /* 为子绝对定位提供参照，不创建新裁剪上下文 */
    overflow: visible; /* 允许悬浮卡片超出网格单元格显示 */
    align-items: start; /* 固定单元格起始位置，避免抖动 */
    /* 限制每行最多 10 列：10 个卡片宽度 + 9 个间距 */
    max-width: calc(10 * 7rem + 9 * 8px);
    margin-left: auto;
    margin-right: auto;
}
</style>
