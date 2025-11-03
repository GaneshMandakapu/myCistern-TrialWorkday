import { useState, useEffect } from 'react';

interface CookieConsent {
  hasConsented: boolean;
  preferences: Record<string, boolean>;
  consentDate: string | null;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>({
    hasConsented: false,
    preferences: {},
    consentDate: null,
  });

  useEffect(() => {
    // Load consent from localStorage on mount
    const cookieConsent = localStorage.getItem('cookieConsent');
    const cookiePreferences = localStorage.getItem('cookiePreferences');
    const cookieConsentDate = localStorage.getItem('cookieConsentDate');

    if (cookieConsent) {
      setConsent({
        hasConsented: true,
        preferences: cookiePreferences ? JSON.parse(cookiePreferences) : {},
        consentDate: cookieConsentDate,
      });
    }
  }, []);

  const acceptAllCookies = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      functional: true,
    };
    
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(allPreferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    setConsent({
      hasConsented: true,
      preferences: allPreferences,
      consentDate: new Date().toISOString(),
    });
  };

  const rejectAllCookies = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      functional: false,
    };
    
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookiePreferences', JSON.stringify(minimalPreferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    setConsent({
      hasConsented: true,
      preferences: minimalPreferences,
      consentDate: new Date().toISOString(),
    });
  };

  const setCustomPreferences = (preferences: Record<string, boolean>) => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    setConsent({
      hasConsented: true,
      preferences,
      consentDate: new Date().toISOString(),
    });
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookiePreferences');
    localStorage.removeItem('cookieConsentDate');
    
    setConsent({
      hasConsented: false,
      preferences: {},
      consentDate: null,
    });
  };

  const isAnalyticsEnabled = () => consent.preferences.analytics === true;
  const isFunctionalEnabled = () => consent.preferences.functional === true;

  return {
    consent,
    acceptAllCookies,
    rejectAllCookies,
    setCustomPreferences,
    resetConsent,
    isAnalyticsEnabled,
    isFunctionalEnabled,
  };
}
