import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
          <Button asChild size="default" className="gap-2">
            <Link to="/devices">
              {t('home.exploreDevices')}
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="default">
            <a href="https://mycistern.com/" target="_blank" rel="noopener noreferrer">
              {t('home.learnMore')}
            </a>
          </Button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t('home.features.title')}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="space-y-3 pb-3">
              <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">{t('home.features.monitoring.title')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                {t('home.features.monitoring.description')}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="space-y-3 pb-3">
              <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">{t('home.features.search.title')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                {t('home.features.search.description')}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="space-y-3 pb-3">
              <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">{t('home.features.control.title')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">
                {t('home.features.control.description')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-muted/50 rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold text-primary">10+</div>
            <div className="text-xs md:text-sm text-muted-foreground">{t('home.stats.devices')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold text-primary">99.9%</div>
            <div className="text-xs md:text-sm text-muted-foreground">{t('home.stats.uptime')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <div className="text-xs md:text-sm text-muted-foreground">{t('home.stats.monitoring')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
            <div className="text-xs md:text-sm text-muted-foreground">{t('home.stats.events')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
