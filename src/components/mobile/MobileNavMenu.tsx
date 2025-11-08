import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/logo';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import ThemeToggle from '@/shared/components/ThemeToggle';
import { useAuth, useRole } from '@/context/AuthContext';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useCapacitor } from '@/hooks/useCapacitor';
import { 
  Menu, 
  Activity, 
  BarChart3, 
  Monitor, 
  Settings, 
  User, 
  LogOut,
  Palette,
  Languages
} from 'lucide-react';

const MobileNavMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isAdmin, canView } = useRole();
  const { isNative } = useCapacitor();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuItemClick = async () => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
    setIsOpen(false);
  };

  const handleLanguageToggle = async () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    await i18n.changeLanguage(newLang);
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
  };

  const navigationItems = [
    {
      path: '/dashboard',
      icon: Activity,
      label: t('nav.dashboard'),
      show: true
    },
    {
      path: '/analytics',
      icon: BarChart3,
      label: t('nav.analytics'),
      show: canView
    },
    {
      path: '/devices',
      icon: Monitor,
      label: t('nav.devices'),
      show: true
    },
    {
      path: '/settings',
      icon: Settings,
      label: t('nav.settings'),
      show: true
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle>
            <Logo size="md" linkTo="/dashboard" clickable={false} />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          {user && (
            <div className="px-6 pb-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">
                      {user.role}
                    </Badge>
                    {isAdmin && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 px-6">
            <nav className="space-y-1">
              {navigationItems
                .filter(item => item.show)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = item.path === '/dashboard' 
                    ? location.pathname === '/dashboard' || location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                  return (
                    <Button
                      key={item.path}
                      asChild
                      variant={isActive ? 'default' : 'ghost'}
                      className="w-full justify-start h-11"
                      onClick={handleMenuItemClick}
                    >
                      <Link to={item.path}>
                        <Icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })
              }
            </nav>

            <Separator className="my-4" />

            {/* Theme and Language Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('settings.theme')}</span>
                </div>
                <ThemeToggle />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('settings.language')}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLanguageToggle}
                  className="h-8 px-3 text-xs"
                >
                  {i18n.language === 'en' ? 'EN' : 'DE'} → {i18n.language === 'en' ? 'DE' : 'EN'}
                </Button>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          {user && (
            <div className="p-6 pt-4">
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive h-11"
                onClick={() => {
                  logout();
                  handleMenuItemClick();
                }}
              >
                <LogOut className="mr-3 h-4 w-4" />
                {t('auth.signOut')}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavMenu;
