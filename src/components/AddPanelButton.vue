<template>
  <div>
    <button class="add-panel-btn" @click="open = true">
      +
    </button>
    <PanelEditor
      v-if="open"
      :show="open"
      @save="handleSave"
      @cancel="handleClose"
      isNew
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PanelEditor from './PanelEditor.vue';
import type { IBookmarkPanel } from '../model/schema';

const props = defineProps<{ onAdd: (_panel: IBookmarkPanel) => void }>();
const open = ref(false);

function handleClose() {
  open.value = false;
}
function handleSave(newPanel: IBookmarkPanel) {
  props.onAdd(newPanel);
  open.value = false;
}
</script>

<style scoped lang="scss">
@use "../styles/_variables" as variables;
.add-panel-btn {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: variables.$color-accent;
  margin-right: 0.5em;
}
</style>
