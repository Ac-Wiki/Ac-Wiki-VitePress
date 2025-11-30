<template>
  <div class="not-found-container">
    <div class="content">
      <div class="emoji">🍂</div>
      <h1 class="title">页面走丢了</h1>
      <p class="description">
        我们找不到您要访问的页面。它可能已被移动、删除，或者您输入的链接有误。
      </p>
      <div class="actions">
        <a href="/" class="action-button primary">返回首页</a>
        <a href="javascript:history.back()" class="action-button secondary">返回上一页</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* 占据大部分视口高度 */
  padding: 2rem;
  text-align: center;
}

.emoji {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: -webkit-linear-gradient(315deg, var(--vp-c-brand-1) 25%, var(--vp-c-brand-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2.5rem;
  max-width: 500px;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.action-button.primary {
  background-color: var(--vp-c-brand-1);
  color: white;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-1-rgb), 0.3);
}

.action-button.primary:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(var(--vp-c-brand-1-rgb), 0.4);
}

.action-button.secondary {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.action-button.secondary:hover {
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-text-2);
  transform: translateY(-2px);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 640px) {
  .title {
    font-size: 2rem;
  }
  .emoji {
    font-size: 4rem;
  }
}
</style>
