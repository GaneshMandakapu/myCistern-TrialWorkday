import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useCapacitor } from '@/hooks/useCapacitor';
import { useToast } from '@/hooks/use-toast';
import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Shield,
  Database,
  Smartphone,
  Sun,
  Moon,
  User,
  LogOut,
  Trash2,
  Download,
  RefreshCw,
  Languages
} from 'lucide-react';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { deviceInfo, isNative } = useCapacitor();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    deviceAlerts: true,
    systemUpdates: true,
    maintenance: false,
  });

  const [privacy, setPrivacy] = useState({
    analytics: true,
    crashReports: true,
  });

  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const handleLanguageChange = async (newLang: string) => {
    setIsChangingLanguage(true);
    try {
      await i18n.changeLanguage(newLang);
      toast({
        title: t('settings.languageUpdated'),
        description: `${t('settings.languageChangedTo')} ${newLang === 'en' ? 'English' : 'Deutsch'}`,
      });
    } catch (error) {
      console.error('Language change error:', error);
    } finally {
      setIsChangingLanguage(false);
    }
  };

  const handleClearCache = () => {
    // Simulate cache clearing
    toast({
      title: 'Cache Cleared',
      description: 'Application cache has been cleared successfully.',
    });
  };

  const handleExportData = () => {
    // Simulate data export
    toast({
      title: 'Data Export Started',
      description: 'Your data export will be ready shortly.',
    });
  };

  const handleResetSettings = () => {
    setNotifications({
      deviceAlerts: true,
      systemUpdates: true,
      maintenance: false,
    });
    setPrivacy({
      analytics: true,
      crashReports: true,
    });
    toast({
      title: 'Settings Reset',
      description: 'All settings have been reset to default values.',
    });
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-lg font-semibold">{t('settings.title')}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content with mobile-optimized spacing */}
      <div className="p-4 pb-20 space-y-4">
        {/* User Profile Card */}
        {user && (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {user.role}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex-shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appearance */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{t('settings.appearance')}</CardTitle>
            </div>
            <CardDescription className="text-sm">
              {t('settings.appearanceDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">{t('settings.theme')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.themeDesc')}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="ml-4 flex-shrink-0"
              >
                {theme === 'dark' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="ml-2">
                  {theme === 'dark' ? t('theme.dark') : t('theme.light')}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Languages className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{t('settings.language')}</CardTitle>
            </div>
            <CardDescription className="text-sm">
              {t('settings.languageDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">{t('settings.appLanguage')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.current')}: {currentLanguage === 'en' ? 'English' : 'Deutsch'}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={currentLanguage === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLanguageChange('en')}
                  disabled={isChangingLanguage}
                >
                  {isChangingLanguage && currentLanguage !== 'en' ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    'EN'
                  )}
                </Button>
                <Button
                  variant={currentLanguage === 'de' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLanguageChange('de')}
                  disabled={isChangingLanguage}
                >
                  {isChangingLanguage && currentLanguage !== 'de' ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    'DE'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{t('settings.notifications')}</CardTitle>
            </div>
            <CardDescription className="text-sm">
              {t('settings.notificationsDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">{t('settings.deviceAlerts')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.deviceAlertsDesc')}
                </p>
              </div>
              <Switch
                checked={notifications.deviceAlerts}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, deviceAlerts: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">{t('settings.systemUpdates')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.systemUpdatesDesc')}
                </p>
              </div>
              <Switch
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, systemUpdates: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">{t('settings.maintenanceReminders')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.maintenanceRemindersDesc')}
                </p>
              </div>
              <Switch
                checked={notifications.maintenance}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, maintenance: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{t('settings.privacy')}</CardTitle>
            </div>
            <CardDescription className="text-sm">
              {t('settings.privacyDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">{t('settings.analytics')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.analyticsDesc')}
                </p>
              </div>
              <Switch
                checked={privacy.analytics}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, analytics: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">{t('settings.crashReports')}</label>
                <p className="text-xs text-muted-foreground">
                  {t('settings.crashReportsDesc')}
                </p>
              </div>
              <Switch
                checked={privacy.crashReports}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, crashReports: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{t('settings.dataManagement')}</CardTitle>
            </div>
            <CardDescription className="text-sm">
              {t('settings.dataManagementDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCache}
              className="w-full justify-start"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('settings.clearCache')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              className="w-full justify-start"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('settings.exportData')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetSettings}
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('settings.resetSettings')}
            </Button>
          </CardContent>
        </Card>

        {/* Device Information (Mobile Only) */}
        {isNative && deviceInfo && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{t('settings.deviceInfo')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('settings.platform')}</p>
                  <p className="font-medium">{deviceInfo.platform}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('settings.os')}</p>
                  <p className="font-medium">{deviceInfo.operatingSystem}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('settings.model')}</p>
                  <p className="font-medium">{deviceInfo.model}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('settings.type')}</p>
                  <Badge variant="outline" className="text-xs">
                    {deviceInfo.isVirtual ? t('settings.simulator') : t('settings.physical')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
