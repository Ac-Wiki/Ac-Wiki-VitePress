<template>
    <!-- 下拉菜单组件，基于 Tooltip 组件实现 -->
     <!-- 交互式提示框，可以点击内容 -->
      <!-- 提示框显示在触发元素下方 -->
       <!-- 不显示箭头 -->
         <!-- 偏移量设置为 0 -->
        
    <Tooltip
        class="dropdown"
        interactive 
        placement="bottom" 
        :arrow="false" 
        :hide-on-click="false" 
        :offset="[0, 0]"
    >
        <!-- 触发元素插槽 -->
        <slot />
        <!-- 下拉内容插槽，传递 hide 函数给子组件 -->
        <template #content="{ hide }">
            <slot name="content" :hide />
        </template>
    </Tooltip>
</template>

<style scoped>
/* 深度选择器样式，用于自定义 Tooltip 组件的内部样式 */
/* 参考：https://vue-tippy.netlify.app/props#appendto
   Tooltip 位于组件根部时，interactive tippy 会插入到父组件 */

/* 自定义 tippy 容器样式 */
:deep() ~ [data-tippy-root] > .tippy-box {
    overflow: auto; /* 内容溢出时显示滚动条 */
    max-height: clamp(4rem, 50vh, 20rem); /* 最大高度：最小 4rem，首选 50vh，最大 20rem */
    padding: 0; /* 移除内边距 */
    font-size: inherit; /* 继承父元素字体大小 */
    scrollbar-width: thin; /* 设置滚动条宽度为细 */
}

/* 自定义 tippy 内容区域样式 */
:deep() ~ [data-tippy-root] .tippy-content {
    display: grid; /* 使用网格布局 */
}

/* 自定义 tippy 内容中按钮的样式 */
:deep() ~ [data-tippy-root] .tippy-content button {
    padding: 0.1em 0.5em; /* 按钮内边距：上下 0.1em，左右 0.5em */
    text-align: start; /* 文本左对齐 */
    transition: color 0.1s, background-color 0.2s; /* 颜色和背景色过渡动画 */
    cursor: pointer; /* 鼠标指针样式 */
}

/* 按钮悬停效果 */
:deep() ~ [data-tippy-root] .tippy-content button:hover {
    background-color: var(--vp-c-default-soft); /* 悬停时使用 VitePress 主题的默认软色背景 */
}
</style>
