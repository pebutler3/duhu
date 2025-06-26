import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from '../app';

// MOCK LOCALSTORAGE
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  describe('actions', () => {
    it('setActiveStep should set the correct step as active', () => {
      const store = useAppStore();
      store.setActiveStep(1);

      expect(store.steps[1].active).toBe(true);
      expect(store.steps[0].active).toBe(false);
    });

    it('selectOption should toggle the selected state of an option', () => {
      const store = useAppStore();
      const initialState = store.steps[0].options[0].selected;

      store.selectOption(0, 0);
      expect(store.steps[0].options[0].selected).toBe(!initialState);

      store.selectOption(0, 0);
      expect(store.steps[0].options[0].selected).toBe(initialState);
    });

    // TODO: Implement saveDraft test
  });

  describe('getters', () => {
    it('activeStep should return the active step', () => {
      const store = useAppStore();
      store.setActiveStep(1);

      expect(store.activeStep).toBe(store.steps[1]);
    });

    it('selectedRecordTypes should return titles of selected record types', () => {
      const store = useAppStore();
      const types = store.steps[0].options[1].types;

      types[0].selected = true;
      types[2].selected = true;

      expect(store.selectedRecordTypes).toEqual([types[0].title, types[2].title]);
    });

    it('firstThreeStepsValid should check if first three steps are valid', () => {
      const store = useAppStore();

      expect(store.firstThreeStepsValid).toBe(false);

      store.setValidStep(0);
      store.setValidStep(1);
      store.setValidStep(2);

      expect(store.firstThreeStepsValid).toBe(true);

      store.setInvalidStep(1);

      expect(store.firstThreeStepsValid).toBe(false);
    });
  });
});
