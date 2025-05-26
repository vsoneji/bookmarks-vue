<template>
  <span class="dnd-icon" title="Drag to reorder">≡</span>
</template>

<script setup lang="ts">
// No logic needed
</script>

<style scoped lang="scss">
@use "../styles/_variables" as variables;
.dnd-icon {
  cursor: grab;
  color: variables.$color-text-muted;
  font-size: 1.2em;
  margin-right: 0.5em;
  user-select: none;
}
</style>
