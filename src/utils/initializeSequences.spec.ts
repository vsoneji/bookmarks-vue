import { describe, it, expect } from 'vitest';
import { initializeSequences } from './localStorage';

describe('initializeSequences', () => {
  it('adds sequence numbers to panels that are missing them', () => {
    const data = {
      title: 'Test',
      panels: [
        { label: 'A', bookmarks: [] },
        { label: 'B', bookmarks: [], sequence: 5 },
        { label: 'C', bookmarks: [] },
      ],
    };
    const result = initializeSequences(data);
    expect(result.panels[0].sequence).toBe(0);
    expect(result.panels[1].sequence).toBe(5);
    expect(result.panels[2].sequence).toBe(2);
  });

  it('does not overwrite existing sequence numbers', () => {
    const data = {
      title: 'Test',
      panels: [
        { label: 'A', bookmarks: [], sequence: 10 },
        { label: 'B', bookmarks: [], sequence: 20 },
      ],
    };
    const result = initializeSequences(data);
    expect(result.panels[0].sequence).toBe(10);
    expect(result.panels[1].sequence).toBe(20);
  });
});
