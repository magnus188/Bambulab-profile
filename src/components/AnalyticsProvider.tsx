'use client';

import { useAnalytics } from '../hooks/useAnalytics';

export default function AnalyticsProvider() {
  // Initialize analytics on the client side
  useAnalytics();
  
  return null; // This component doesn't render anything
}