import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/services/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    trackPageView(document.title, location.pathname);
  }, [location]);
};

// Hook for tracking specific events
export const useTrackEvent = () => {
  const trackEvent = (eventName, eventParams) => {
    // Import dynamically to avoid circular dependencies
    import('@/services/analytics').then(({ logEvent }) => {
      logEvent(eventName, eventParams);
    });
  };

  return { trackEvent };
};

export default useAnalytics;
