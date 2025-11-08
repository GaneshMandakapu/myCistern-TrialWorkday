import React from 'react';
import { 
  Info, 
  Github, 
  Mail, 
  Globe, 
  Shield, 
  Heart,
  ExternalLink,
  Smartphone,
  Monitor,
  Wifi
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileNavBar from '@/components/mobile/MobileNavBar';
import { useCapacitor } from '@/hooks/useCapacitor';

const AboutPage: React.FC = () => {
  const { isNative, deviceInfo, networkInfo } = useCapacitor();

  return (
    <div className="min-h-screen bg-background">
      {isNative && <MobileNavBar title="About" showBack={true} />}
      
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {!isNative && (
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Info className="h-6 w-6" />
              About myCistern
            </h1>
            <p className="text-muted-foreground">
              IoT Device Management Platform
            </p>
          </div>
        )}

        {/* App Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">mC</span>
                </div>
                <div>
                  <CardTitle>myCistern IoT</CardTitle>
                  <CardDescription>Device Management Platform</CardDescription>
                </div>
              </div>
              <Badge variant="outline">v1.0.0</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              A modern React-based IoT device management platform with real-time monitoring, 
              multi-language support, and mobile-first design. Built for managing smart 
              devices and systems with ease.
            </p>
          </CardContent>
        </Card>

        {/* Platform Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isNative ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
              Platform Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Environment:</span>
                <Badge variant={isNative ? "default" : "secondary"}>
                  {isNative ? "Mobile App" : "Web Browser"}
                </Badge>
              </div>
              
              {isNative && deviceInfo && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform:</span>
                    <span className="font-medium">{deviceInfo.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">OS Version:</span>
                    <span className="font-medium">{deviceInfo.osVersion}</span>
                  </div>
                </>
              )}
              
              {networkInfo && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connection:</span>
                  <div className="flex items-center gap-2">
                    <Wifi className={`h-4 w-4 ${networkInfo.connected ? 'text-green-600' : 'text-red-600'}`} />
                    <span className="font-medium">{networkInfo.connectionType}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>
              Built with modern web technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Frontend</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• React 18 + TypeScript</li>
                  <li>• Vite Build Tool</li>
                  <li>• Tailwind CSS</li>
                  <li>• shadcn/ui Components</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Features</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• TanStack Query</li>
                  <li>• React Router</li>
                  <li>• i18next Translations</li>
                  <li>• {isNative ? 'Capacitor Native' : 'PWA Ready'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>
              What makes myCistern special
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Real-time device monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>Multi-language support (EN/DE)</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-purple-600" />
                <span>Mobile-responsive design</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-600" />
                <span>Dark/Light theme support</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-orange-600" />
                <span>Offline-capable with PWA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Links */}
        <Card>
          <CardHeader>
            <CardTitle>Contact & Links</CardTitle>
            <CardDescription>
              Get in touch or explore more
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => window.open('https://github.com/GaneshMandakapu/myCistern-TrialWorkday', '_blank')}
            >
              <Github className="h-4 w-4" />
              View Source Code
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => window.open('mailto:support@mycistern.com', '_blank')}
            >
              <Mail className="h-4 w-4" />
              Contact Support
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => window.open('https://mycistern.com', '_blank')}
            >
              <Globe className="h-4 w-4" />
              Visit Website
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          </CardContent>
        </Card>

        {/* Legal */}
        <Card>
          <CardHeader>
            <CardTitle>Legal</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2025 myCistern Team. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ for IoT device management
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
