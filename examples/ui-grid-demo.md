---
layout: doc
outline: deep
title: UI 网格布局示例
---

# UI 网格布局示例

本页面展示了在文档中常用的几种网格布局实现方式，您可以直接复制 CSS 代码到您的项目中使用。

## 1. 响应式卡片网格 (Responsive Grid)

最常用的布局，根据屏幕宽度自动调整列数（Auto-fit）。

<div class="grid-container">
  <div class="card" v-for="i in 6" :key="i">
    <div class="card-icon">📦</div>
    <div class="card-content">
      <div class="card-title">功能模块 {{ i }}</div>
      <div class="card-desc">这是一个自适应网格卡片，宽度会随容器变化。</div>
    </div>
  </div>
</div>

## 2. 特性介绍网格 (Feature Grid)

适用于展示产品特性，通常为 2 列或 3 列布局。

<div class="feature-grid">
  <div class="feature-item" v-for="i in 4" :key="'f'+i">
    <div class="feature-icon">✨</div>
    <h3>核心特性 {{ i }}</h3>
    <p>这里是特性的详细描述文本，通常比较简短，用于概括亮点的核心价值。</p>
  </div>
</div>

## 3. 横向滚动网格 (Horizontal Scroll)

适用于展示大量同类项目（如成员列表、工具栏），支持横向滑动。

<div class="scroll-grid-wrapper">
  <div class="scroll-grid">
    <div class="scroll-item" v-for="n in 10" :key="'s'+n">
      <div class="scroll-avatar">{{ n }}</div>
      <div class="scroll-info">
        <div class="scroll-name">用户 {{ n }}</div>
        <div class="scroll-role">贡献者</div>
      </div>
    </div>
  </div>
</div>

<style>
/* 1. 响应式卡片网格 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  transition: border-color 0.25s, background-color 0.25s;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft-up);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* 2. 特性介绍网格 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

.feature-item {
  padding: 1rem;
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: var(--vp-c-default-soft);
  font-size: 24px;
  margin-bottom: 1rem;
}

.feature-item h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.feature-item p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* 3. 横向滚动网格 */
.scroll-grid-wrapper {
  margin: 2rem -24px; /* 负边距让滚动条贴边 */
  padding: 0 24px;
  overflow: hidden;
}

.scroll-grid {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  /* 隐藏滚动条但保留功能 (Chrome/Safari) */
  scrollbar-width: thin;
}

.scroll-item {
  flex: 0 0 auto;
  width: 140px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.scroll-item:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.scroll-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.scroll-name {
  font-weight: 500;
  font-size: 0.9rem;
}

.scroll-role {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
</style>
