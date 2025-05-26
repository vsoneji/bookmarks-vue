import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BookmarkPanel from '../components/BookmarkPanel.vue';
import type { IBookmarkPanel } from '../model/schema';

const panelData: IBookmarkPanel = {
  label: 'Test Panel',
  color: '#3a8eff',
  bookmarks: [
    { label: 'Bookmark 1', url: 'https://example.com/1' },
    { label: 'Bookmark 2', url: 'https://example.com/2' },
  ],
};

describe('BookmarkPanel.vue', () => {
  it('renders panel label and bookmarks', () => {
    const wrapper = mount(BookmarkPanel, {
      props: { panel: panelData, index: 0 },
    });
    expect(wrapper.text()).toContain('Test Panel');
    expect(wrapper.text()).toContain('Bookmark 1');
    expect(wrapper.text()).toContain('Bookmark 2');
  });

  it('calls onMoveUp and onMoveDown when buttons are clicked', async () => {
    const onMoveUp = vi.fn();
    const onMoveDown = vi.fn();
    const wrapper = mount(BookmarkPanel, {
      props: { panel: panelData, index: 0, onMoveUp, onMoveDown },
    });
    const buttons = wrapper.findAll('.panel-controls button');
    await buttons[0].trigger('click');
    expect(onMoveUp).toHaveBeenCalledWith(0);
    await buttons[1].trigger('click');
    expect(onMoveDown).toHaveBeenCalledWith(0);
  });

  it('shows editor when edit button is clicked', async () => {
    const wrapper = mount(BookmarkPanel, {
      props: { panel: panelData, index: 0 },
    });
    const editBtn = wrapper.find('.panel-controls button:last-child');
    await editBtn.trigger('click');
    expect(wrapper.findComponent({ name: 'PanelEditor' }).exists()).toBe(true);
  });
});
