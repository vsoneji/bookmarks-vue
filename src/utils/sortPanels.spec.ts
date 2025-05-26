import { describe, it, expect } from 'vitest';
import type { IBookmarkPanel } from '../model/schema';

// Copied from App.vue for test
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

describe('sortPanels', () => {
  it('sorts panels by sequence if present', () => {
    const panels = [
      { label: 'A', bookmarks: [], sequence: 2 },
      { label: 'B', bookmarks: [], sequence: 1 },
      { label: 'C', bookmarks: [], sequence: 3 },
    ];
    const sorted = sortPanels(panels);
    expect(sorted.map(p => p.label)).toEqual(['B', 'A', 'C']);
  });

  it('panels with sequence come before those without', () => {
    const panels = [
      { label: 'A', bookmarks: [], sequence: 1 },
      { label: 'B', bookmarks: [] },
      { label: 'C', bookmarks: [], sequence: 2 },
    ];
    const sorted = sortPanels(panels);
    expect(sorted.map(p => p.label)).toEqual(['A', 'C', 'B']);
  });

  it('panels without sequence retain original order among themselves', () => {
    const panels = [
      { label: 'A', bookmarks: [] },
      { label: 'B', bookmarks: [] },
    ];
    const sorted = sortPanels(panels);
    expect(sorted.map(p => p.label)).toEqual(['A', 'B']);
  });
});
