/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { useAnalytics } from '../src/hooks/useAnalytics';

// Mock Firebase Analytics
jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(() => ({})),
  isSupported: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('../src/lib/firebase', () => ({
  initializeAnalytics: jest.fn(() => Promise.resolve({})),
}));

describe('useAnalytics', () => {
  it('returns null initially', () => {
    const { result } = renderHook(() => useAnalytics());
    expect(result.current).toBeNull();
  });

  it('initializes without errors', () => {
    expect(() => {
      renderHook(() => useAnalytics());
    }).not.toThrow();
  });
});