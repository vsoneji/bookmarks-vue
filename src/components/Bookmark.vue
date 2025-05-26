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
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  .bookmark-link {
    text-decoration: none;
    color: variables.$color-text-muted;
    font-size: variables.$font-size-bookmark;
    width: 100%;
    align-items: center;
    display: flex;
    &:hover {
      color: variables.$color-accent;
    }
  }
}
</style>
