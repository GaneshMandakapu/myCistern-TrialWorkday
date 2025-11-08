import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/logo';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeToggle from '../shared/components/ThemeToggle';
import CookieBanner from '../shared/components/CookieBanner';
import MobileStatusBar from '../components/mobile/MobileStatusBar';
import MobileTabBar from '../components/mobile/MobileTabBar';
import MobileNavMenu from '../components/mobile/MobileNavMenu';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { useCapacitor } from '../hooks/useCapacitor';
import { useAuth, useRole } from '../context/AuthContext';
import { LogOut, Settings, BarChart3, Activity, Monitor } from 'lucide-react';

function AppLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const { acceptAllCookies, rejectAllCookies } = useCookieConsent();
  const { isNative } = useCapacitor();
  const { user, logout } = useAuth();
  const { isAdmin, canView } = useRole();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Status Bar - Only shown on native mobile apps */}
      <MobileStatusBar />
      
      {/* Optimized Header with Hamburger Menu */}
      <header className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        isNative ? 'hidden' : 'block'
      }`}>
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
          {/* Mobile Layout */}
          <div className="flex items-center space-x-3 md:hidden w-full">
            <MobileNavMenu />
            <div className="flex-1 flex justify-center">
              <Logo size="md" linkTo="/dashboard" />
            </div>
            <div className="w-8"> {/* Spacer for balance */}</div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center space-x-8 min-w-0 flex-1">
            <Logo size="md" linkTo="/dashboard" className="shrink-0" />
            
            <nav className="flex items-center space-x-2 min-w-0">
              <Button
                asChild
                variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                size="sm"
              >
                <Link to="/dashboard">
                  <Activity className="h-4 w-4 mr-2" />
                  {t('nav.dashboard')}
                </Link>
              </Button>
              
              {canView && (
                <Button
                  asChild
                  variant={location.pathname === '/analytics' ? 'default' : 'ghost'}
                  size="sm"
                >
                  <Link to="/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {t('nav.analytics')}
                  </Link>
                </Button>
              )}
              
              <Button
                asChild
                variant={location.pathname.startsWith('/devices') ? 'default' : 'ghost'}
                size="sm"
              >
                <Link to="/devices">
                  <Monitor className="h-4 w-4 mr-2" />
                  {t('nav.devices')}
                </Link>
              </Button>
            </nav>
          </div>
          
          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4 shrink-0">
            {user && (
              <>
                {isAdmin && (
                  <Badge variant="outline">
                    Admin
                  </Badge>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.firstName} />
                        <AvatarFallback>
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <Badge variant="outline" className="w-fit capitalize">
                          {user.role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t('nav.settings')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      {/* Desktop Footer - Hidden on mobile when native */}
      <footer className={`border-t border-border/40 py-6 md:py-0 ${
        isNative ? 'hidden' : 'block'
      }`}>
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
      
      {/* Mobile Tab Bar - Only shown on native mobile apps */}
      {isNative && <MobileTabBar />}
      
      {/* Cookie Banner - Only show on web */}
      {!isNative && (
        <CookieBanner 
          onAccept={acceptAllCookies}
          onReject={rejectAllCookies}
          onManage={() => console.log('Opening cookie preferences')}
        />
      )}
    </div>
  );
}

export default AppLayout;
