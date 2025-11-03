import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cookie, X, Settings } from 'lucide-react';
import CookiePreferences from './CookiePreferences';

interface CookieBannerProps {
  onAccept?: () => void;
  onReject?: () => void;
  onManage?: () => void;
}

function CookieBanner({ onAccept, onReject, onManage }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice about cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    onAccept?.();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    onReject?.();
  };

  const handleManage = () => {
    setShowPreferences(true);
    onManage?.();
  };

  const handlePreferencesSave = (preferences: Record<string, boolean>) => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    setShowPreferences(false);
    onAccept?.();
  };

  const handleClose = () => {
    // Treat close as reject
    handleReject();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-6 md:right-6 lg:left-auto lg:right-6 lg:max-w-md">
        <Card className="border shadow-lg animate-in slide-in-from-bottom-2 duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20 flex-shrink-0">
              <Cookie className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">Cookie Preferences</h3>
                  <Badge variant="secondary" className="text-xs">
                    GDPR Compliant
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your experience, analyze site usage, and improve our platform. 
                  Your data is secure and used only to provide better IoT device management services.
                </p>
              </div>
              
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <Button 
                  onClick={handleAccept}
                  size="sm" 
                  className="flex-1 gap-1"
                >
                  Accept All
                </Button>
                <Button 
                  onClick={handleReject}
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  Reject
                </Button>
                <Button 
                  onClick={handleManage}
                  variant="ghost" 
                  size="sm"
                  className="gap-1"
                >
                  <Settings size={14} />
                  Manage
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Learn more in our{' '}
                <a 
                  href="/privacy" 
                  className="underline hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
                {' '}and{' '}
                <a 
                  href="/cookies" 
                  className="underline hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </a>
              </p>
            </div>
            
            <Button
              onClick={handleClose}
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              aria-label="Close cookie banner"
            >
              <X size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <CookiePreferences
      isOpen={showPreferences}
      onClose={() => setShowPreferences(false)}
      onSave={handlePreferencesSave}
    />
  </>
  );
}

export default CookieBanner;
