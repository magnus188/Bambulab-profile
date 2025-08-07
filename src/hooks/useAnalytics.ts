'use client';

import { useEffect, useState } from 'react';
import { type Analytics } from 'firebase/analytics';
import { initializeAnalytics } from '../lib/firebase';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const analyticsInstance = await initializeAnalytics();
        setAnalytics(analyticsInstance);
      } catch (error) {
        console.warn('Failed to initialize Firebase Analytics:', error);
      }
    };

    init();
  }, []);

  return analytics;
};