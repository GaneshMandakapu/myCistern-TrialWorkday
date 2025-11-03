import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Cookie, Shield, BarChart, Settings, X } from 'lucide-react';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  icon: React.ReactNode;
}

interface CookiePreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: Record<string, boolean>) => void;
}

function CookiePreferences({ isOpen, onClose, onSave }: CookiePreferencesProps) {
  const [categories, setCategories] = useState<CookieCategory[]>([
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'Essential for the website to function properly. These cannot be disabled.',
      required: true,
      enabled: true,
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how you use our IoT platform to improve performance.',
      required: false,
      enabled: true,
      icon: <BarChart className="h-5 w-5" />
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Enable enhanced functionality like theme preferences and language settings.',
      required: false,
      enabled: true,
      icon: <Settings className="h-5 w-5" />
    }
  ]);

  const toggleCategory = (categoryId: string) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId && !cat.required
          ? { ...cat, enabled: !cat.enabled }
          : cat
      )
    );
  };

  const handleSave = () => {
    const preferences = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.enabled;
      return acc;
    }, {} as Record<string, boolean>);
    
    onSave(preferences);
    onClose();
  };

  const handleAcceptAll = () => {
    const allEnabled = categories.reduce((acc, cat) => {
      acc[cat.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    onSave(allEnabled);
    onClose();
  };

  const handleRejectAll = () => {
    const onlyRequired = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.required;
      return acc;
    }, {} as Record<string, boolean>);
    
    onSave(onlyRequired);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <Cookie className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle>Cookie Preferences</CardTitle>
                <CardDescription>
                  Manage your cookie preferences for myCistern IoT Platform
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About Cookies</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies and similar technologies to provide, protect, and improve our IoT platform. 
                These help us remember your preferences, analyze usage patterns, and ensure optimal performance 
                for your device management experience.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Cookie Categories</h4>
              {categories.map((category) => (
                <Card key={category.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        {category.icon}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-sm">{category.name}</h5>
                          {category.required && (
                            <Badge variant="secondary" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={category.enabled}
                      onCheckedChange={() => toggleCategory(category.id)}
                      disabled={category.required}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAcceptAll} className="flex-1">
                Accept All Cookies
              </Button>
              <Button onClick={handleRejectAll} variant="outline" className="flex-1">
                Reject Non-Essential
              </Button>
            </div>
            <Button onClick={handleSave} variant="secondary" className="w-full">
              Save Preferences
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You can change these settings at any time in our{' '}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default CookiePreferences;
