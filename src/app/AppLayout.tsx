import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import ThemeToggle from '../shared/components/ThemeToggle';
import CookieBanner from '../shared/components/CookieBanner';
import { useCookieConsent } from '../hooks/useCookieConsent';
import './AppLayout.css';

function AppLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const { acceptAllCookies, rejectAllCookies } = useCookieConsent();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center space-x-4 md:space-x-8 min-w-0 flex-1">
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">mC</span>
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight">myCistern</span>
            </Link>
            
            <nav className="flex items-center space-x-1 sm:space-x-2 min-w-0">
              <Button
                asChild
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                size="sm"
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                <Link to="/">{t('nav.home')}</Link>
              </Button>
              <Button
                asChild
                variant={location.pathname.startsWith('/devices') ? 'default' : 'ghost'}
                size="sm"
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                <Link to="/devices">{t('nav.devices')}</Link>
              </Button>
            </nav>
          </div>
          
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer className="border-t border-border/40 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; 2025 myCistern IoT Platform. Built with React & shadcn/ui.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <Link to="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            <span>•</span>
            <span>Developed by myCistern Team</span>
          </div>
        </div>
      </footer>
      
      {/* Cookie Banner */}
      <CookieBanner 
        onAccept={acceptAllCookies}
        onReject={rejectAllCookies}
        onManage={() => console.log('Opening cookie preferences')}
      />
    </div>
  );
}

export default AppLayout;
