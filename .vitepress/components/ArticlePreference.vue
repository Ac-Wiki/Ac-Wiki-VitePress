<script setup lang="ts">
// 导入 Pinia 的存储引用转换函数
import { storeToRefs } from 'pinia'
// 导入文章存储中的配置映射和存储实例
import { apiMap, authorMap, avatarMap, sizeMap, useArticleStore } from '../stores/article'

// 从文章存储中解构出偏好设置
const { preference } = storeToRefs(useArticleStore())
</script>

<template>
    <!-- 文章偏好设置表单 -->
    <form>
        <!-- 来源展示设置 -->
        <label for="author">来源展示</label>
        <select id="author" v-model="preference.author">
            <option v-for="(author, key) in authorMap" :key="key" :value="key">
                {{ author.label }}
            </option>
        </select>

        <!-- 头像展示设置 -->
        <label for="avatar">头像展示</label>
        <select id="avatar" v-model="preference.avatar">
            <option v-for="(avatar, key) in avatarMap" :key="key" :value="key">
                {{ avatar.label }}
            </option>
        </select>

        <!-- 卡片尺寸设置 -->
        <label for="size">卡片尺寸</label>
        <select id="size" v-model="preference.size">
            <option v-for="(size, key) in sizeMap" :key="key" :value="key">
                {{ size.label }}
            </option>
        </select>

        <!-- 宽屏模式设置 -->
        <label for="wide">宽屏</label>
        <input id="wide" v-model="preference.wide" type="checkbox">

        <!-- API 选择设置 -->
        <label for="api">API</label>
        <select id="api" v-model="preference.api">
            <option v-for="(api, key) in apiMap" :key="key" :value="key">
                {{ api.label }}
            </option>
        </select>
    </form>
</template>

<style scoped>
/* 表单样式：使用网格布局，标签在左，控件在右 */
form {
    display: grid;
    grid-template-columns: auto 1fr; /* 两列：标签列（自适应宽度）和控制列（剩余宽度） */
    gap: 0.5rem 1rem; /* 行间距 0.5rem，列间距 1rem */
    padding: 0.5rem; /* 内边距 */
    text-align: left; /* 左对齐文本 */
}
</style>
