<script setup lang="ts">
// 导入 Vue 的组件类型定义
import type { Component } from 'vue'
// 导入 Vue 的响应式计算函数和渲染函数
import { computed, h } from 'vue'

// 定义组件属性，text 为必需，tag 为可选，默认为 'span'
const props = withDefaults(defineProps<{
    text: string // 需要处理的文本内容
    tag?: string | Component // 渲染的 HTML 标签或组件，默认为 'span'
}>(), {
    tag: 'span',
})

// 自动代码高亮的计算属性
const autoCode = computed(() => {
    // 如果没有文本内容，返回空的标签元素
    if (!props.text)
        return h(props.tag)
    
    // 使用正则表达式分割文本，匹配反引号包围的代码片段
    // 正则 /`([^`]+)`/g 的含义：
    // - ` 匹配反引号
    // - ([^`]+) 捕获组，匹配一个或多个非反引号字符
    // - g 全局匹配
    const parts = props.text.split(/`([^`]+)`/g)
    
    // 将分割后的部分转换为 VNode 数组
    // 偶数索引（0, 2, 4...）是普通文本
    // 奇数索引（1, 3, 5...）是被反引号包围的代码，需要包装在 <code> 标签中
    const children = parts.map((part, i) => i % 2
        ? h('code', part) // 奇数索引：创建代码标签
        : part, // 偶数索引：保持原文本
    )
    
    // 返回最终的 VNode，使用指定的标签包装所有子元素
    return h(props.tag, children)
})
</script>

<template>
    <!-- 使用动态组件渲染计算后的 VNode -->
    <component :is="autoCode" />
</template>
