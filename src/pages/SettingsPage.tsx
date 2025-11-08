import React, { useState, useEffect } from 'react';
import { Settings2, Palette, Globe, Bell, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import ThemeToggle from '@/shared/components/ThemeToggle';
import MobileNavBar from '@/components/mobile/MobileNavBar';
import { useCapacitor } from '@/hooks/useCapacitor';
import { Badge } from '@/components/ui/badge';

const SettingsPage: React.FC = () => {
  const { isNative, deviceInfo } = useCapacitor();
  const { i18n, t } = useTranslation();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [hasLanguageChanged, setHasLanguageChanged] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setHasLanguageChanged(languageCode !== i18n.language);
  };

  const saveLanguageSettings = () => {
    i18n.changeLanguage(selectedLanguage);
    setHasLanguageChanged(false);
    
    // Show success toast
    const selectedLang = languages.find(lang => lang.code === selectedLanguage);
    toast({
      title: t('settings.languageUpdated'),
      description: `${t('settings.languageChangedTo')} ${selectedLang?.nativeName}`,
    });
    
    // Store preference in localStorage
    localStorage.setItem('preferred-language', selectedLanguage);
  };

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, [i18n]);

  const resetLanguageSettings = () => {
    setSelectedLanguage(i18n.language);
    setHasLanguageChanged(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {isNative && <MobileNavBar title={t('settings.title')} showBack={true} />}
      
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {!isNative && (
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings2 className="h-6 w-6" />
              {t('settings.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('settings.description')}
            </p>
          </div>
        )}

        {/* Device Information - Mobile Only */}
        {isNative && deviceInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                {t('settings.deviceInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('settings.platform')}:</span>
                  <p className="font-medium">{deviceInfo.platform}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('settings.os')}:</span>
                  <p className="font-medium">{deviceInfo.operatingSystem} {deviceInfo.osVersion}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('settings.model')}:</span>
                  <p className="font-medium">{deviceInfo.model}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('settings.type')}:</span>
                  <Badge variant={deviceInfo.isVirtual ? "secondary" : "default"}>
                    {deviceInfo.isVirtual ? t('settings.simulator') : t('settings.physical')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t('settings.appearance')}
            </CardTitle>
            <CardDescription>
              {t('settings.appearanceDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t('settings.theme')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('settings.themeDesc')}
                </p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('settings.language')}
            </CardTitle>
            <CardDescription>
              {t('settings.languageDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {languages.map((language) => (
                <div key={language.code} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={language.code}
                    name="language"
                    value={language.code}
                    checked={selectedLanguage === language.code}
                    onChange={() => handleLanguageChange(language.code)}
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <label htmlFor={language.code} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{language.nativeName}</p>
                        <p className="text-sm text-muted-foreground">{language.name}</p>
                      </div>
                      {i18n.language === language.code && (
                        <Badge variant="default" className="text-xs">
                          {t('settings.current')}
                        </Badge>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
            
            {hasLanguageChanged && (
              <div className="flex gap-2 pt-3 border-t">
                <Button onClick={saveLanguageSettings} size="sm" className="flex-1">
                  {t('settings.applyLanguage')}
                </Button>
                <Button variant="outline" onClick={resetLanguageSettings} size="sm">
                  {t('settings.cancel')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications - Mobile Only */}
        {isNative && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage push notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Device Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when devices go offline
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Notifications about app updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled device maintenance alerts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your privacy preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-muted-foreground">
                  Help improve the app by sharing usage data
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Crash Reports</p>
                <p className="text-sm text-muted-foreground">
                  Automatically send crash reports
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Manage your stored data and cache
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Clear Cache
            </Button>
            <Button variant="outline" className="w-full">
              Export Data
            </Button>
            <Button variant="destructive" className="w-full">
              Reset All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
