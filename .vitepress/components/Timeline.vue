<template>
  <div class="timeline">
    <slot />
  </div>
</template>

<style>
.timeline {
  position: relative;
  margin: 0 auto;
  padding-left: 20px;
  border-left: 2px solid var(--vp-c-divider);
}

/* 时间节点（标题）样式 */
.timeline h2 {
  position: relative;
  margin-top: 1.5rem !important;
  margin-bottom: 1rem;
  padding-top: 0;
  border-top: none;
  font-size: 1.2rem;
  line-height: 1.5;
}

/* 时间节点圆点 */
.timeline h2::before {
  content: '';
  position: absolute;
  left: -27px; /* 20px padding + 2px border + 5px offset */
  top: 0.4em;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  z-index: 1;
  transition: all 0.3s;
}

.timeline h2:hover::before {
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}

/* 内容卡片样式 */
/* 我们假设 h2 之后的内容是时间轴的内容。
   为了实现卡片效果，我们无法直接选择 h2 之间的所有元素，
   但我们可以给 h2 之后的第一个块级元素（通常是 ul, p, 或 div）添加样式，
   或者建议用户在 markdown 中使用容器。
   这里我们为常见的内容元素添加左边距和背景，模拟卡片效果。
*/

.timeline > ul,
.timeline > p,
.timeline > div[class*="language-"],
.timeline > .vp-doc {
  position: relative;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  transition: background-color 0.3s;
}

.timeline > ul:hover,
.timeline > p:hover {
  background-color: var(--vp-c-bg-soft-up);
}

/* 调整列表样式 */
.timeline ul {
  list-style: none;
  margin-left: 0;
  padding-left: 1rem;
}

.timeline li {
  position: relative;
  margin-bottom: 0.5rem;
}

/* 适配移动端 */
@media (max-width: 640px) {
  .timeline {
    padding-left: 16px;
  }
  .timeline h2::before {
    left: -23px;
  }
}
</style>
