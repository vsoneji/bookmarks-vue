import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PanelEditor from './PanelEditor.vue';
import type { IBookmarkPanel } from '../model/schema';

const panelData: IBookmarkPanel = {
  label: 'Panel X',
  color: '#3a8eff',
  bookmarks: [
    { label: 'Bookmark X', url: 'https://x.com' },
  ],
};

afterEach(() => {
  document.body.innerHTML = '';
});

describe('PanelEditor.vue', () => {
  it('renders with given panel data', async () => {
    const wrapper = mount(PanelEditor, {
      props: { show: true, panelData },
      attachTo: document.body,
      global: { stubs: { Teleport: true } },
    });
    await new Promise(r => setTimeout(r, 0));
    expect(wrapper.html()).toContain('Edit Panel');
    const labelInput = wrapper.find('input');
    expect(labelInput.exists()).toBe(true);
    expect((labelInput.element as HTMLInputElement).value).toBe('Panel X');
  });

  it('emits save with updated data', async () => {
    const wrapper = mount(PanelEditor, {
      props: { show: true, panelData },
      attachTo: document.body,
      global: { stubs: { Teleport: true } },
    });
    await new Promise(r => setTimeout(r, 0));
    const labelInput = wrapper.find('input');
    await labelInput.setValue('New Label');
    // Log all button texts for debug
    const allBtns = wrapper.findAll('button');
    // eslint-disable-next-line no-console
    allBtns.forEach((btn, i) => console.log(`Button[${i}]:`, btn.text()));
    // Select OK button as the last button in dialog-actions
    const okBtn = wrapper.find('.dialog-actions').findAll('button').at(-1);
    await okBtn?.trigger('click');
    await new Promise(r => setTimeout(r, 0));
    const saveEmitted = wrapper.emitted('save');
    expect(saveEmitted).toBeTruthy();
    const label = (saveEmitted && saveEmitted[0] && saveEmitted[0][0] && typeof saveEmitted[0][0] === 'object' && 'label' in saveEmitted[0][0]) ? (saveEmitted[0][0] as any).label : undefined;
    expect(label).toBe('New Label');
  });

  it('emits cancel when cancel button is clicked', async () => {
    const wrapper = mount(PanelEditor, {
      props: { show: true, panelData },
      attachTo: document.body,
      global: { stubs: { Teleport: true } },
    });
    await new Promise(r => setTimeout(r, 0));
    // Select cancel button robustly from dialog-actions
    const cancelBtn = wrapper.find('.dialog-actions').findAll('button').find(btn => btn.text().toLowerCase().includes('cancel'));
    await cancelBtn?.trigger('click');
    await new Promise(r => setTimeout(r, 0));
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('emits delete when delete button is clicked and confirmed', async () => {
    vi.stubGlobal('confirm', () => true);
    const wrapper = mount(PanelEditor, {
      props: { show: true, panelData, isNew: false },
      attachTo: document.body,
      global: { stubs: { Teleport: true } },
    });
    await new Promise(r => setTimeout(r, 0));
    // Select delete button robustly from dialog-actions
    const deleteBtn = wrapper.find('.dialog-actions').findAll('button').find(btn => btn.text().toLowerCase().includes('delete'));
    await deleteBtn?.trigger('click');
    await new Promise(r => setTimeout(r, 0));
    expect(wrapper.emitted('delete')).toBeTruthy();
  });
});
