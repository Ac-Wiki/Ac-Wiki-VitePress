<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  text?: string
  tip?: string
  icon?: string | boolean
  copy?: boolean
}>()

const tip = computed(() => ({
  content: props.tip || (props.copy ? '点击复制' : ''),
  inlinePositioning: true,
}))

const copied = ref(false)
async function doCopy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {}
}

const icon = computed(() => props.icon
  || (copied.value && 'ph:check-bold')
  || (props.copy && 'ph:copy-bold')
  || 'ph:question-bold')

function handleClick(el: HTMLElement) {
  if (!props.copy) return
  const text = el.textContent || ''
  doCopy(text)
}
</script>

<template>
  <span v-tip="tip" class="tip" @click="handleClick($event.currentTarget as HTMLElement)">
    <slot>{{ text }}</slot>
    <Icon v-if="typeof icon === 'string'" :icon="icon" class="tip-icon" />
  </span>
</template>

<style scoped>
.tip {
  position: relative;
  text-decoration: underline dashed var(--vp-c-text-3);
  cursor: pointer;
  text-underline-offset: 4px;
}

.tip-icon {
  display: inline-block;
  font-size: 1em;
  vertical-align: top;
}
</style>
