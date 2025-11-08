import React from 'react';
import { Activity, BarChart3, List, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useCapacitor } from '@/hooks/useCapacitor';
import { useAuth, useRole } from '@/context/AuthContext';

interface TabItem {
  path: string;
  icon: React.ReactNode;
  labelKey: string;
  requiresAuth?: boolean;
  roles?: string[];
}

const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNative } = useCapacitor();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { canView } = useRole();

  const tabs: TabItem[] = [
    { 
      path: '/dashboard', 
      icon: <Activity className="h-5 w-5" />, 
      labelKey: 'nav.dashboard',
      requiresAuth: true 
    },
    { 
      path: '/analytics', 
      icon: <BarChart3 className="h-5 w-5" />, 
      labelKey: 'nav.analytics',
      requiresAuth: true,
      roles: ['admin', 'user'] // Only admins and users can view analytics
    },
    { 
      path: '/devices', 
      icon: <List className="h-5 w-5" />, 
      labelKey: 'nav.devices',
      requiresAuth: true 
    },
    { 
      path: '/settings', 
      icon: <Settings className="h-5 w-5" />, 
      labelKey: 'nav.settings',
      requiresAuth: true 
    },
  ];

  // Filter tabs based on authentication and role permissions
  const visibleTabs = tabs.filter(tab => {
    if (tab.requiresAuth && !isAuthenticated) return false;
    if (tab.path === '/analytics' && !canView) return false;
    return true;
  });

  const handleTabPress = async (path: string) => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t px-1 py-2 flex items-center justify-around safe-area-inset-bottom z-50">
      {visibleTabs.map((tab) => {
        const isActive = tab.path === '/dashboard' 
          ? location.pathname === '/dashboard' || location.pathname === '/'
          : location.pathname.startsWith(tab.path);

        return (
          <button
            key={tab.path}
            onClick={() => handleTabPress(tab.path)}
            className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <div className="flex-shrink-0">
              {tab.icon}
            </div>
            <span className="text-xs font-medium truncate w-full text-center leading-tight">{t(tab.labelKey)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileTabBar;
