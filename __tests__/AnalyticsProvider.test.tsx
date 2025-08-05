/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import AnalyticsProvider from '../src/components/AnalyticsProvider';

// Mock Firebase Analytics
jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(() => ({})),
  isSupported: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('../src/lib/firebase', () => ({
  initializeAnalytics: jest.fn(() => Promise.resolve({})),
}));

describe('AnalyticsProvider', () => {
  it('renders without crashing', () => {
    render(<AnalyticsProvider />);
  });

  it('does not render any visible content', () => {
    const { container } = render(<AnalyticsProvider />);
    expect(container.firstChild).toBeNull();
  });
});