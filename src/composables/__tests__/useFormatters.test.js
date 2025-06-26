import { describe, it, expect } from 'vitest';
import { useFormatters } from '../useFormatters';

describe('useFormatters', () => {
  describe('formatList', () => {
    const { formatList } = useFormatters();

    it('returns empty string for empty array', () => {
      expect(formatList([])).toBe('');
    });

    it('returns empty string for null input', () => {
      expect(formatList(null)).toBe('');
    });

    it('returns the item for single item array', () => {
      expect(formatList(['Password'])).toBe('Password');
    });

    it('joins two items with "and"', () => {
      expect(formatList(['Password', 'Document'])).toBe('Password and Document');
    });

    it('formats three or more items with commas and "and"', () => {
      expect(formatList(['Password', 'Document', 'Image'])).toBe('Password, Document, and Image');
      expect(formatList(['A', 'B', 'C', 'D'])).toBe('A, B, C, and D');
    });
  });
});
