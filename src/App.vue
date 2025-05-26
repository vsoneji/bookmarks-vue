<template>
  <div>
    <header class="app-bar">
      <button class="icon-btn" @click="showEditor = true" title="Edit JSON">
        <span class="material-symbols-outlined appbar-icon">settings</span>
      </button>
      <AddPanelButton :onAdd="handleAddPanel" />
      <span class="app-title">{{ data.title }}</span>
    </header>
    <main>
      <div class="bookmarks-grid">
        <BookmarkPanel
          v-for="(panel, idx) in visiblePanels"
          :key="panel.label + idx + updateKey"
          :panel="panel"
          :index="idx"
          :onChange="panelJsonChangeHandlerWithDelete"
          :onMoveUp="idx > 0 ? (i) => handleMovePanel(i, 'up') : undefined"
          :onMoveDown="idx < visiblePanels.length - 1 ? (i) => handleMovePanel(i, 'down') : undefined"
          :onBookmarkDrop="handleBookmarkDrop"
        />
      </div>
    </main>
    <FileEditor
      v-if="showEditor"
      :panelData="data"
      :show="showEditor"
      @save="onSaveHandler"
      @cancel="onCancelHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import BookmarkPanel from './components/BookmarkPanel.vue';
import AddPanelButton from './components/AddPanelButton.vue';
import FileEditor from './components/FileEditor.vue';
import { sampleData } from './model/sampleData';
import type { IBookmarkPanel, IBookmarkData } from './model/schema';
import { readFromLocalStorage, saveToLocalStorage } from './utils/localStorage';

function initializeSequences(data: IBookmarkData): IBookmarkData {
  return {
    ...data,
    panels: data.panels.map((panel, index) => ({
      ...panel,
      sequence: panel.sequence ?? index
    }))
  };
}

const data = ref<IBookmarkData>(readFromLocalStorage());
const showEditor = ref(false);
const updateKey = ref(0);

const visiblePanels = computed(() => sortPanels(data.value.panels.filter(p => !p.ignored)));

function sortPanels(panels: IBookmarkPanel[]) {
  return [...panels].sort((a, b) => {
    if (a.sequence !== undefined && b.sequence !== undefined) {
      if (a.sequence !== b.sequence) return a.sequence - b.sequence;
    } else if (a.sequence !== undefined) {
      return -1;
    } else if (b.sequence !== undefined) {
      return 1;
    }
    return panels.indexOf(a) - panels.indexOf(b);
  });
}

function onSaveHandler(newData: IBookmarkData) {
  data.value = newData;
  saveToLocalStorage(newData);
  showEditor.value = false;
}
function onCancelHandler() {
  showEditor.value = false;
}
function handleAddPanel(newPanel: IBookmarkPanel) {
  const newData = { ...data.value, panels: [...data.value.panels, newPanel] };
  data.value = newData;
  saveToLocalStorage(newData);
}
function panelJsonChangeHandler(orig: IBookmarkPanel, changed: IBookmarkPanel) {
  const newPanels = data.value.panels.map(p => p.label === orig.label ? changed : p);
  const newData = { ...data.value, panels: newPanels };
  data.value = newData;
  saveToLocalStorage(newData);
}
function panelJsonChangeHandlerWithDelete(orig: IBookmarkPanel, changed: IBookmarkPanel | null) {
  if (changed === null) {
    // Delete panel
    const newPanels = data.value.panels.filter(p => p.label !== orig.label);
    const newData = { ...data.value, panels: newPanels };
    data.value = newData;
    saveToLocalStorage(newData);
    updateKey.value++;
  } else {
    panelJsonChangeHandler(orig, changed);
  }
}
function handleMovePanel(index: number, direction: 'up' | 'down') {
  const panels = visiblePanels.value;
  const newIndex = direction === 'up' ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= panels.length) return;
  const panel = panels[index];
  const targetPanel = panels[newIndex];
  let newSequence = panel.sequence ?? panels.length;
  let targetSequence = targetPanel.sequence ?? (direction === 'up' ? newSequence - 1 : newSequence + 1);
  const updatedPanels = data.value.panels.map(p => {
    if (p.label === panel.label) return { ...p, sequence: targetSequence };
    if (p.label === targetPanel.label) return { ...p, sequence: newSequence };
    return p;
  });
  const newData = { ...data.value, panels: updatedPanels };
  data.value = newData;
  saveToLocalStorage(newData);
  updateKey.value++;
}

function handleBookmarkDrop(
  fromPanel: number,
  toPanel: number,
  fromIndex: number,
  toIndex: number
) {
  if (fromPanel === toPanel) return; // Already handled by vuedraggable in-panel
  // Remove from source panel
  const panels = [...data.value.panels];
  const srcPanel = panels[fromPanel];
  const destPanel = panels[toPanel];
  const removed = srcPanel.bookmarks.splice(fromIndex, 1)[0];
  destPanel.bookmarks.splice(toIndex, 0, removed);
  data.value = { ...data.value, panels };
  saveToLocalStorage(data.value);
  updateKey.value++;
}

function setPanelColumnsVar() {
  const cols = data.value.columns || 3;
  document.documentElement.style.setProperty('--panel-columns', cols.toString());
}

onMounted(setPanelColumnsVar);
watch(() => data.value.columns, setPanelColumnsVar);

watch(() => data.value.title, (title) => { document.title = title; });
</script>

<style scoped lang="scss">
@use "./styles/_variables" as variables;
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.app-bar {
  display: flex;
  align-items: center;
  background: variables.$color-bg;
  color: variables.$color-text;
  padding: variables.$padding-appbar;
  gap: 0.2em;
  justify-content: flex-start;
  border-radius: 0 0 variables.$radius-large variables.$radius-large;
  box-shadow: variables.$box-shadow-appbar;
}
.icon-btn, .add-panel-btn {
  margin-right: 0.1em;
  padding: variables.$padding-btn;
  font-size: 1.1em;
  background: none !important;
  border: none;
  color: variables.$color-text;
  border-radius: variables.$radius-small;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: variables.$color-bg-hover;
    color: variables.$color-accent;
  }
}
.appbar-icon {
  font-size: variables.$font-size-icon;
  vertical-align: middle;
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
}
.app-title {
  font-size: variables.$font-size-title;
  margin-left: 0;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(var(--panel-columns, 3), 200px);
  gap: variables.$gap-grid;
  margin: 0;
  justify-content: start;
  align-items: stretch;
}
body, html {
  background: variables.$color-bg !important;
  color: variables.$color-text-secondary;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: variables.$font-family-base;
  font-size: variables.$font-size-base;
}
</style>
