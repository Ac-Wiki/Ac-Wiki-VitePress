<script setup lang="ts">
defineProps<{
  showNewestNum?: number
}>()
</script>

<template>
  <div class="member-list">
    <div class="info">
      成员列表正在建设中...
    </div>
  </div>
</template>

<style scoped>
.member-list {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-top: 20px;
}

.info {
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
