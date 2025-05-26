<template>
  <div v-if="show" class="dialog-backdrop">
    <div class="dialog">
      <div class="dialog-title">Edit: {{ panelData.title }}</div>
      <div class="dialog-desc">Edit the bookmarks in a panel and click save</div>
      <textarea v-model="jsonText" class="text-editor"></textarea>
      <div class="dialog-actions">
        <button class="outlined sample" @click="handleSample">Load Sample</button>
        <button class="outlined" @click="handleCancel">Cancel</button>
        <button class="contained" @click="handleOk">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { sampleData } from '../model/sampleData';
import type { IBookmarkData } from './model/schema';

const props = defineProps<{
  panelData: IBookmarkData;
  show: boolean;
}>();
const emit = defineEmits(['save', 'cancel']);

const jsonText = ref(JSON.stringify(props.panelData, null, 2));

watch(() => props.panelData, (newVal) => {
  jsonText.value = JSON.stringify(newVal, null, 2);
});

function handleOk() {
  try {
    const newData = JSON.parse(jsonText.value);
    emit('save', newData);
  } catch {
    // eslint-disable-next-line no-undef
    alert('Invalid JSON');
  }
}
function handleCancel() {
  emit('cancel');
}
function handleSample() {
  jsonText.value = JSON.stringify(sampleData, null, 2);
}
</script>

<style scoped lang="scss">
@use "../styles/_variables" as variables;
.dialog-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.dialog {
  background: variables.$color-panel;
  padding: 0 16px 8px 16px;
  border-radius: variables.$radius-large;
  min-width: 600px;
  max-width: 800px;
  width: 100%;
  box-sizing: border-box;
}
.dialog-title {
  color: variables.$color-text;
  padding: 12px 16px 0 16px;
  font-size: 18px;
  font-weight: 600;
}
.dialog-desc {
  color: variables.$color-text-muted;
  font-size: 14px;
  margin-bottom: 1em;
  margin-left: 16px;
}
.text-editor {
  width: 100%;
  height: 500px;
  font-family: monospace;
  padding: 8px;
  border-radius: 6px;
  background: variables.$color-panel;
  color: variables.$color-text-secondary;
  border: 1px solid variables.$color-border;
  font-size: 13px;
  box-sizing: border-box;
  margin-bottom: 0.5em;
}
.dialog-actions {
  padding: 8px 0 0 0;
  margin-top: 0;
  display: flex;
  gap: 1em;
  justify-content: flex-end;
}
button {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: variables.$radius-small;
  cursor: pointer;
  border: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
button.outlined {
  background: none;
  border: 1.5px solid variables.$color-accent;
  color: variables.$color-accent;
}
button.outlined.sample {
  border-color: variables.$color-accent-dark;
  color: variables.$color-accent-dark;
}
button.contained {
  background: variables.$color-accent;
  color: variables.$color-text;
  border: none;
}
button.contained:hover {
  background: variables.$color-accent-dark;
}
button.outlined:hover {
  background: variables.$color-bg-hover;
  color: variables.$color-text;
  border-color: variables.$color-accent;
}
</style>
