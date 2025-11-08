import React from 'react';
import { Settings2, Palette, Globe, Bell, Shield, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/shared/components/ThemeToggle';
import MobileNavBar from '@/components/mobile/MobileNavBar';
import { useCapacitor } from '@/hooks/useCapacitor';
import { Badge } from '@/components/ui/badge';

const SettingsPage: React.FC = () => {
  const { isNative, deviceInfo } = useCapacitor();

  return (
    <div className="min-h-screen bg-background">
      {isNative && <MobileNavBar title="Settings" showBack={true} />}
      
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {!isNative && (
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings2 className="h-6 w-6" />
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your app preferences and configuration
            </p>
          </div>
        )}

        {/* Device Information - Mobile Only */}
        {isNative && deviceInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Device Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Platform:</span>
                  <p className="font-medium">{deviceInfo.platform}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">OS:</span>
                  <p className="font-medium">{deviceInfo.operatingSystem} {deviceInfo.osVersion}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Model:</span>
                  <p className="font-medium">{deviceInfo.model}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant={deviceInfo.isVirtual ? "secondary" : "default"}>
                    {deviceInfo.isVirtual ? "Simulator" : "Physical"}
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
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Choose between light and dark mode
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
              Language
            </CardTitle>
            <CardDescription>
              Select your preferred language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">App Language</p>
                <p className="text-sm text-muted-foreground">
                  Currently: English (German support available)
                </p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
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
