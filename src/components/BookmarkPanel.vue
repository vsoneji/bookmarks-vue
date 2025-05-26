<template>
  <div class="bookmark-panel">
    <div class="panel-heading" :style="{ backgroundColor: panelData.color, color: getContrastYIQ(panelData.color || '#353535') }">
      <span>{{ panelData.label }}</span>
      <div class="panel-controls">
        <button v-if="onMoveUp" @click="onMoveUp(index)" title="Move Up">
          <span class="material-symbols-outlined icon">arrow_upward</span>
        </button>
        <button v-if="onMoveDown" @click="onMoveDown(index)" title="Move Down">
          <span class="material-symbols-outlined icon">arrow_downward</span>
        </button>
        <button @click="showEditor = true" title="Edit Panel">
          <span class="material-symbols-outlined icon">color_lens</span>
        </button>
      </div>
    </div>
    <draggable
      :list="panelData.bookmarks"
      :group="'bookmarks'"
      item-key="url"
      class="bookmark-list"
      @change="onDragChange"
      :clone="cloneBookmark"
    >
      <template #item="{ element }">
        <Bookmark :bookmark="element" />
      </template>
    </draggable>
    <PanelEditor
      v-if="showEditor"
      :show="showEditor"
      :panelData="panelData"
      @save="onEditorSave"
      @cancel="onEditorCancel"
      @delete="onEditorDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import Bookmark from './Bookmark.vue';
import PanelEditor from './PanelEditor.vue';
import { getContrastYIQ } from '../utils/color';
import type { IBookmark, IBookmarkPanel } from '../model/schema';

const props = defineProps<{
  panel: IBookmarkPanel;
  onChange?: (_orig: IBookmarkPanel, _changed: IBookmarkPanel) => void;
  index: number;
  onMoveUp?: (_index: number) => void;
  onMoveDown?: (_index: number) => void;
  onBookmarkDrop?: (_fromPanel: number, _toPanel: number, _fromIndex: number, _toIndex: number, _bookmark: IBookmark) => void;
}>();

const showEditor = ref(false);
const panelData = ref({ ...props.panel });

function onEditorSave(newData: IBookmarkPanel) {
  showEditor.value = false;
  props.onChange?.(panelData.value, newData);
  panelData.value = { ...newData };
}
function onEditorCancel() {
  showEditor.value = false;
}
function onEditorDelete(_panel: IBookmarkPanel) {
  showEditor.value = false;
  // Emit a custom event to parent to handle deletion
  // We'll use a new prop: onDeletePanel
  props.onChange?.(panelData.value, null as any); // null signals deletion
}

function onDragChange(evt: any) {
  // If moved between panels, emit event to parent
  if (evt.added && evt.moved == null && evt.removed) {
    // Cross-panel move
    props.onBookmarkDrop?.(evt.removed.from.parentIndex, props.index, evt.removed.oldIndex, evt.added.newIndex, evt.added.element);
  } else if (evt.moved) {
    // In-panel move, just update bookmarks order
    props.onChange?.(panelData.value, { ...panelData.value, bookmarks: [...panelData.value.bookmarks] });
  }
}
function cloneBookmark(_bookmark: IBookmark) {
  return { ..._bookmark };
}
</script>

<style scoped lang="scss">
@use "../styles/_variables" as variables;
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.bookmark-panel {
  background: variables.$color-panel;
  border-radius: variables.$radius-medium;
  box-shadow: variables.$box-shadow-panel;
  padding: variables.$gap-panel;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 50px;
}
.bookmark-panel:hover {
  transform: translateY(-2px);
  box-shadow: variables.$box-shadow-panel-hover;
  background-color: variables.$color-panel-hover;
}
.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: variables.$font-size-panel-title;
  font-weight: 600;
  margin-bottom: 6px;
  padding: 4px 6px;
  border-radius: variables.$radius-small;
  background-color: v-bind('panelData.color || "#353535"');
  color: variables.$color-text;
}
.panel-controls {
  display: flex;
  align-items: center;
  gap: variables.$gap-panel-controls;
  opacity: 0;
  transition: opacity 0.2s;
}
.panel-heading:hover .panel-controls {
  opacity: 1;
}
.panel-controls button {
  padding: 1px;
  color: rgba(255,255,255,0.7);
  background: none;
  border: none;
  border-radius: variables.$radius-small;
  transition: color 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.panel-controls button:hover {
  color: rgba(255,255,255,0.9);
  background: rgba(255,255,255,0.1);
}
.bookmark-list {
  display: flex;
  flex-direction: column;
  gap: variables.$gap-bookmark-list;
  flex: 1;
  min-height: 10px;
  margin-top: 4px;
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}
.icon {
  font-size: 16px;
  vertical-align: middle;
}
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
}
</style>
