import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Bookmark from './Bookmark.vue';

describe('Bookmark.vue', () => {
  it('renders bookmark label and link', () => {
    const bookmark = { label: 'Test Bookmark', url: 'https://test.com' };
    const wrapper = mount(Bookmark, {
      props: { bookmark },
    });
    const link = wrapper.find('a');
    expect(link.text()).toBe('Test Bookmark');
    expect(link.attributes('href')).toBe('https://test.com');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toContain('noreferrer');
  });
});
