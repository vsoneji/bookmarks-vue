<template>
  <li class="bookmark-item">
    <a :href="bookmark.url" target="_blank" rel="noreferrer noopener" class="bookmark-link">
      {{ bookmark.label }}
    </a>
  </li>
</template>

<script setup lang="ts">
import type { IBookmark } from '../model/schema';

defineProps<{ bookmark: IBookmark }>();
</script>

<style scoped lang="scss">
@use "../styles/_variables" as variables;
.bookmark-item {
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: variables.$radius-small;
  transition: background-color 0.2s ease;
  cursor: grab;
}
.bookmark-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.bookmark-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: variables.$color-text-muted;
  font-size: variables.$font-size-bookmark;
  width: 100%;
}
.bookmark-link:hover {
  color: variables.$color-accent;
}
</style>
