import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getContrastYIQ } from './color';

describe('getContrastYIQ', () => {
  it('returns black for light backgrounds', () => {
    expect(getContrastYIQ('#FFFFFF')).toBe('#222');
    expect(getContrastYIQ('#FFFF00')).toBe('#222');
  });

  it('returns white for dark backgrounds', () => {
    expect(getContrastYIQ('#000000')).toBe('#fff');
    expect(getContrastYIQ('#333333')).toBe('#fff');
  });

  it('handles invalid input gracefully', () => {
    expect(getContrastYIQ('not-a-color')).toBe('#fff');
    expect(getContrastYIQ('')).toBe('#fff');
  });
});
