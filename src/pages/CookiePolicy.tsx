import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Cookie, Eye, Database, Globe } from 'lucide-react';

function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to="/">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </Button>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="text-xl text-muted-foreground">
            Learn how myCistern IoT Platform uses cookies to enhance your experience
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Last updated: November 2025</Badge>
            <Badge variant="secondary">GDPR Compliant</Badge>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <Cookie className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle>What are cookies?</CardTitle>
              <CardDescription>
                Understanding how cookies work on our IoT platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences, 
            analyzing how you use our platform, and ensuring optimal performance for your IoT device management needs.
          </p>
        </CardContent>
      </Card>

      {/* Cookie Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Types of Cookies We Use</h2>
        
        <div className="grid gap-6">
          {/* Necessary Cookies */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Necessary Cookies</CardTitle>
                  <Badge variant="secondary">Always Active</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                These cookies are essential for the website to function properly and cannot be disabled.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">What they do:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Enable core functionality like user authentication</li>
                  <li>• Remember your login state and security preferences</li>
                  <li>• Maintain your session while navigating the platform</li>
                  <li>• Store critical settings for device management</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Cookies */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Analytics Cookies</CardTitle>
                  <Badge variant="outline">Optional</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Help us understand how you use our platform to improve performance and user experience.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">What they do:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Track page views and user interactions</li>
                  <li>• Analyze device management patterns</li>
                  <li>• Identify popular features and improve them</li>
                  <li>• Monitor platform performance and errors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Functional Cookies */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Functional Cookies</CardTitle>
                  <Badge variant="outline">Optional</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Enable enhanced functionality and personalization features.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">What they do:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Remember your theme preferences (light/dark mode)</li>
                  <li>• Store your language selection</li>
                  <li>• Save dashboard customizations</li>
                  <li>• Remember device grouping preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Managing Cookies */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
              <CardDescription>
                You have full control over how cookies are used
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium">You can manage cookies by:</h4>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Using the cookie banner that appears on your first visit</li>
              <li>• Adjusting your browser settings to block or delete cookies</li>
              <li>• Contacting us to update your preferences</li>
            </ul>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Note:</strong> Disabling necessary cookies may affect the functionality of our IoT platform 
              and your ability to manage devices effectively.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Questions?</CardTitle>
          <CardDescription>
            Contact us if you have any questions about our cookie policy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Email us at <a href="mailto:privacy@mycistern.com" className="underline hover:text-foreground">privacy@mycistern.com</a> 
            {' '}or visit our main <Link to="/" className="underline hover:text-foreground">website</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default CookiePolicy;
