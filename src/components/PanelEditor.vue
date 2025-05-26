<template>
  <Teleport to="body">
    <div v-if="show" class="dialog-backdrop">
      <div class="dialog">
        <h3>
          {{ isNew ? 'Add Panel' : 'Edit Panel' }}
        </h3>
        <div class="form-group">
          <label>Label:</label>
          <input v-model="panel.label" />
        </div>
        <div class="form-group">
          <label>Color:</label>
          <div class="color-grid">
            <div
              v-for="color in panelColors"
              :key="color.value"
              class="color-swatch"
              :class="{ selected: panel.color === color.value }"
              :style="{ backgroundColor: color.value }"
              @click="panel.color = color.value"
              :title="color.name"
            />
          </div>
        </div>
        <div class="form-group">
          <label>Bookmarks:</label>
          <draggable
            v-model="panel.bookmarks"
            item-key="url + idx"
            handle=".dnd-icon"
            class="bookmarks-list"
            :animation="180"
          >
            <template #item="{ element: bookmark, index: idx }">
              <div class="bookmark-item-row">
                <DndIcon />
                <input v-model="bookmark.label" placeholder="Label" />
                <input v-model="bookmark.url" placeholder="URL" />
                <button @click="removeBookmark(idx)" title="Delete"></button>
              </div>
            </template>
          </draggable>
          <button class="add-bookmark-btn" @click="addBookmark">Add Bookmark</button>
        </div>
        <div class="dialog-actions">
          <button class="cancel" @click="handleCancel">Cancel</button>
          <button v-if="!isNew" class="delete outlined" @click="handleDelete">Delete</button>
          <button @click="handleSave">OK</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import draggable from 'vuedraggable';
import DndIcon from './PanelEditor.dnd-icon.vue';
import { getContrastYIQ, panelColors } from '../utils/color';
import type { IBookmarkPanel } from '../model/schema';

const props = defineProps<{
  show: boolean;
  panelData?: IBookmarkPanel;
  isNew?: boolean;
}>();
const emit = defineEmits(['save', 'cancel', 'delete']);

const panel = ref<IBookmarkPanel>(props.panelData ? { ...props.panelData } : {
  label: '',
  color: '#3a8eff',
  bookmarks: [],
});

watch(() => props.panelData, (newVal) => {
  if (newVal) panel.value = { ...newVal };
});

function handleSave() {
  emit('save', { ...panel.value });
}
function handleCancel() {
  emit('cancel');
}
function addBookmark() {
  panel.value.bookmarks.push({ label: '', url: '' });
}
function removeBookmark(idx: number) {
  panel.value.bookmarks.splice(idx, 1);
}
function handleDelete() {
  if (confirm('Are you sure you want to delete this panel? This action cannot be undone.')) {
    emit('delete', { ...panel.value });
  }
}
</script>

<style scoped lang="scss">
@use "../styles/_variables" as variables;
.dialog-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog {
  background: variables.$color-bg-hover;
  border-radius: variables.$radius-large;
  padding: 40px 48px 28px 48px;
  min-width: 620px;
  max-width: 820px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.45);
  color: variables.$color-text-secondary;
  .dialog-title {
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .dialog-desc {
    font-size: 0.95em;
    margin-bottom: 12px;
    color: variables.$color-text-muted;
  }
  .form-group {
    margin-bottom: 16px;
  }
  .color-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
    .color-swatch {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      border: 2px solid transparent;
      cursor: pointer;
      transition: border 0.2s;
      box-shadow: 0 1px 2px rgba(0,0,0,0.15);
      &.selected {
        border: 2px solid variables.$color-text;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      }
    }
  }
  .bookmarks-list {
    margin-bottom: 8px;
    .bookmark-item-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
      input[placeholder="Label"] {
        flex: 0 0 120px;
        min-width: 80px;
        max-width: 180px;
      }
      input[placeholder="URL"] {
        flex: 1 1 0%;
        min-width: 180px;
        max-width: none;
      }
      button {
        background: none;
        border: none;
        padding: 0 6px;
        font-size: 1.2em;
        cursor: pointer;
        color: #b3b3b3;
        transition: color 0.2s, background 0.2s;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #232323;
          color: #ff5252;
        }
        &::after {
          content: '\1F5D1';
          font-size: 1.2em;
          color: #b3b3b3;
          filter: brightness(0.8);
        }
      }
    }
  }
  .add-bookmark-btn {
    background: variables.$color-accent;
    color: variables.$color-text;
    border: none;
    border-radius: variables.$radius-small;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 0.95em;
    margin-top: 4px;
    &:hover {
      background: variables.$color-accent-dark;
    }
  }
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
    button {
      border-radius: variables.$radius-small;
      padding: 4px 12px;
      cursor: pointer;
      font-size: 1em;
      transition: background 0.2s, color 0.2s;
      &.cancel {
        background: none;
        color: variables.$color-text-muted;
        border: 1px solid #444;
      }
      &.contained, &:not(.cancel) {
        background: variables.$color-accent;
        color: variables.$color-text;
        border: none;
      }
      &:hover {
        background: variables.$color-accent-dark;
        color: variables.$color-text;
      }
      &.delete.outlined {
        background: none;
        border: 1.5px solid #ff5252;
        color: #ff5252;
        margin-right: auto;
        &:hover {
          background: #232323;
          color: #fff;
          border-color: #ff5252;
        }
      }
    }
  }
}
input[type="text"], input[type="url"], input {
  background: variables.$color-bg;
  border: 1px solid variables.$color-border;
  color: variables.$color-text-secondary;
  border-radius: variables.$radius-small;
  padding: 4px 8px;
  margin-right: 6px;
  font-size: 1em;
  &:focus {
    outline: 2px solid variables.$color-accent;
  }
}
</style>