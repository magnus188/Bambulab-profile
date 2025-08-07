import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

/**
 * Log a custom event to Google Analytics
 * @param eventName - The name of the event
 * @param eventParameters - Optional parameters for the event
 */
export const trackEvent = (eventName: string, eventParameters?: Record<string, any>) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParameters);
    } catch (error) {
      console.warn('Failed to log analytics event:', error);
    }
  }
};