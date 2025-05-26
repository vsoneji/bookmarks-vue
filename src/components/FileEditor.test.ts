import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FileEditor from './FileEditor.vue';
import { sampleData } from '../model/sampleData';

describe('FileEditor.vue', () => {
  it('renders textarea with JSON', () => {
    const wrapper = mount(FileEditor, {
      props: { panelData: sampleData, show: true },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.exists()).toBe(true);
    expect(textarea.element.value).toContain('My Homepage');
  });

  it('emits save with parsed JSON when Save is clicked', async () => {
    const wrapper = mount(FileEditor, {
      props: { panelData: sampleData, show: true },
    });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('{"title":"Changed","panels":[]}');
    await wrapper.findAll('button').find(btn => btn.text().toLowerCase().includes('save'))?.trigger('click');
    expect(wrapper.emitted('save')).toBeTruthy();
    expect((wrapper.emitted('save')?.[0]?.[0] as any).title).toBe('Changed');
  });

  it('emits cancel when Cancel is clicked', async () => {
    const wrapper = mount(FileEditor, {
      props: { panelData: sampleData, show: true },
    });
    const cancelBtn = wrapper.findAll('button').find(btn => btn.text().toLowerCase().includes('cancel'));
    await cancelBtn?.trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });
});
