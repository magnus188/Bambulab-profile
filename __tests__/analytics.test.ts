/**
 * @jest-environment jsdom
 */

import { trackEvent } from '../src/utils/analytics';

// Mock Firebase Analytics
jest.mock('firebase/analytics', () => ({
  logEvent: jest.fn(),
}));

jest.mock('../src/lib/firebase', () => ({
  analytics: {},
}));

// Import the mocked function after mocking
import { logEvent } from 'firebase/analytics';
const mockLogEvent = logEvent as jest.MockedFunction<typeof logEvent>;

describe('analytics utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('trackEvent', () => {
    it('calls logEvent when analytics is available', () => {
      trackEvent('test_event', { test_param: 'value' });
      expect(mockLogEvent).toHaveBeenCalledWith({}, 'test_event', { test_param: 'value' });
    });

    it('handles events without parameters', () => {
      trackEvent('test_event');
      expect(mockLogEvent).toHaveBeenCalledWith({}, 'test_event', undefined);
    });
  });
});