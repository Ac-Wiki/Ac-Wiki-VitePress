<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const input = ref('# Hello Markdown\n\n欢迎使用在线编辑器！\n\n- 支持实时预览\n- 支持标准 Markdown 语法\n\n尝试在这里输入一些内容吧...')
const output = ref('')
let timer = null

const render = () => {
  try {
    output.value = md.render(input.value)
  } catch (e) {
    console.error('Render error:', e)
  }
}

// 防抖处理
const debouncedRender = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    render()
    timer = null
  }, 300)
}

watch(input, debouncedRender)

onMounted(() => {
  render()
})

// 组件卸载时清理定时器，释放内存
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})
</script>

<template>
  <div class="editor-wrapper">
    <div class="editor-header">
      <span>Markdown 编辑器</span>
      <span class="preview-label">实时预览</span>
    </div>
    <div class="editor-container">
      <div class="editor-pane">
        <textarea v-model="input" class="editor-input" placeholder="在此输入 Markdown..."></textarea>
      </div>
      <div class="preview-pane vp-doc">
        <div v-html="output"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-wrapper {
  margin-top: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.editor-container {
  display: flex;
  height: 500px;
}

.editor-pane, .preview-pane {
  flex: 1;
  overflow: auto;
  padding: 1rem;
}

.editor-pane {
  border-right: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.editor-input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.preview-pane {
  background-color: var(--vp-c-bg);
}

@media (max-width: 768px) {
  .editor-container {
    flex-direction: column;
    height: 700px;
  }
  
  .editor-pane {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
    height: 50%;
  }
  
  .preview-pane {
    height: 50%;
  }
}
</style>
