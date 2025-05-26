import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFromLocalStorage, saveToLocalStorage } from './localStorage';
import { sampleData } from '../model/sampleData';

const STORAGE_KEY = 'bookmarks-data';

// Helper to mock localStorage for all tests
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
vi.stubGlobal('localStorage', localStorageMock);

// Helper to reset localStorage mock
function resetLocalStorage() {
  localStorage.clear();
}

describe('localStorage utils', () => {
  beforeEach(() => {
    resetLocalStorage();
    vi.restoreAllMocks();
  });

  it('saveToLocalStorage stores data as JSON', () => {
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    saveToLocalStorage(sampleData);
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(sampleData));
  });

  it('readFromLocalStorage returns parsed data if present', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    const data = readFromLocalStorage();
    expect(data).toMatchObject(sampleData);
  });

  it('readFromLocalStorage initializes and saves sampleData if nothing in storage', () => {
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    const data = readFromLocalStorage();
    expect(data).toMatchObject(sampleData);
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('readFromLocalStorage handles invalid JSON gracefully', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid json');
    const data = readFromLocalStorage();
    expect(data).toMatchObject(sampleData);
  });

  it('readFromLocalStorage initializes missing panel sequence', () => {
    const noSeq = {
      ...sampleData,
      panels: sampleData.panels.map(({ sequence, ...rest }, i) => rest),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noSeq));
    const data = readFromLocalStorage();
    expect(data.panels.every((p, i) => typeof p.sequence === 'number' && p.sequence === i)).toBe(true);
  });
});
