import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AddPanelButton from './AddPanelButton.vue';
import type { IBookmarkPanel } from '../model/schema';

describe('AddPanelButton.vue', () => {
  it('shows PanelEditor when button is clicked', async () => {
    const onAdd = vi.fn();
    const wrapper = mount(AddPanelButton, {
      props: { onAdd },
    });
    await wrapper.find('button.add-panel-btn').trigger('click');
    expect(wrapper.findComponent({ name: 'PanelEditor' }).exists()).toBe(true);
  });

  it('emits onAdd when PanelEditor emits save', async () => {
    const onAdd = vi.fn();
    const wrapper = mount(AddPanelButton, {
      props: { onAdd },
    });
    await wrapper.find('button.add-panel-btn').trigger('click');
    // Simulate save event from PanelEditor
    const panel = { label: 'New', bookmarks: [] } as IBookmarkPanel;
    await wrapper.findComponent({ name: 'PanelEditor' }).vm.$emit('save', panel);
    expect(onAdd).toHaveBeenCalledWith(panel);
  });
});
