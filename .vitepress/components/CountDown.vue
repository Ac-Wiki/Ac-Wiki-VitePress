<script setup lang="ts">
// 导入 Vue 的生命周期钩子和响应式 API
import { onMounted, ref } from 'vue'

// 定义组件属性
const props = defineProps<{
    event?: string // 事件名称，可选
    targetTime: string // 目标时间，必需，ISO 格式字符串
    endMessage?: string // 倒计时结束时的消息，可选
}>()

// 倒计时剩余时间的响应式数据
const timeLeft = ref({
    total: 0, // 总剩余毫秒数
    days: 0, // 剩余天数
    hours: 0, // 剩余小时数
    minutes: 0, // 剩余分钟数
    seconds: 0, // 剩余秒数
})

// 将目标时间字符串转换为 Date 对象
const targetDate = new Date(props.targetTime)

// 计算剩余时间的函数
function calculateTimeLeft() {
    const now = new Date() // 获取当前时间
    const remainingTime = targetDate.getTime() - now.getTime() // 计算剩余时间（毫秒）

    // 如果剩余时间小于等于 0，说明倒计时结束
    if (remainingTime <= 0) {
        resetTimeLeft() // 重置时间显示
        return
    }

    // 计算并更新剩余时间的各个部分
    timeLeft.value = {
        total: remainingTime, // 总剩余毫秒数
        days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)), // 剩余天数
        hours: Math.floor((remainingTime / (1000 * 60 * 60)) % 24), // 剩余小时数（24小时制）
        minutes: Math.floor((remainingTime / (1000 * 60)) % 60), // 剩余分钟数
        seconds: Math.floor((remainingTime / 1000) % 60), // 剩余秒数
    }
}

// 重置时间显示的函数
function resetTimeLeft() {
    timeLeft.value = {
        total: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }
}

// 组件挂载后的初始化
onMounted(() => {
    calculateTimeLeft() // 立即计算一次剩余时间
    setInterval(calculateTimeLeft, 1000) // 每秒更新一次倒计时
})
</script>

<template>
    <!-- 倒计时显示区域 -->
    <div v-if="timeLeft.total > 0">
        <!-- 倒计时提示文字 -->
        <p>
            距离 {{ event || '事件' }} 还有
        </p>
        <!-- 倒计时数字显示 -->
        <p>
            <span class="time">{{ timeLeft.days }}</span>天
            <span class="time">{{ timeLeft.hours }}</span>小时
            <span class="time">{{ timeLeft.minutes }}</span>分
            <span class="time">{{ timeLeft.seconds }}</span>秒
        </p>
    </div>
    <!-- 倒计时结束时的显示 -->
    <p v-else>
        {{ endMessage || '时间到！' }}
    </p>
</template>

<style scoped>
/* 段落文字样式 */
p {
    font-size: 1.2em;
}

/* 时间数字样式，使用等宽字体 */
.time {
    font-family: Consolas, monospace; /* 等宽字体，确保数字对齐 */
    font-size: 2em; /* 时间数字字体大小 */
}

/* 移动端响应式样式 */
@media (width <= 768px) {
    p {
        font-size: 1rem; /* 移动端字体大小调整 */
    }
}
</style>
