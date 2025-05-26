import type { IBookmarkData } from '../model/schema';
import { sampleData } from '../model/sampleData';

export function initializeSequences(data: IBookmarkData): IBookmarkData {
  return {
    ...data,
    panels: data.panels.map((panel, index) => ({
      ...panel,
      sequence: panel.sequence ?? index
    }))
  };
}

export function readFromLocalStorage(): IBookmarkData {
  try {
    const raw = localStorage.getItem('bookmarks-data');
    if (raw) {
      const data = JSON.parse(raw);
      return initializeSequences(data);
    }
  } catch {
    // intentionally left empty
  }
  // If nothing in storage, use sampleData
  const initialData = initializeSequences(sampleData);
  saveToLocalStorage(initialData);
  return initialData;
}

export function saveToLocalStorage(data: IBookmarkData) {
  localStorage.setItem('bookmarks-data', JSON.stringify(data));
}
