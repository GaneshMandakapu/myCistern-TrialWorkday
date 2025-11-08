import React from 'react';
import { Home, List, Settings, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useCapacitor } from '@/hooks/useCapacitor';

interface TabItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const tabs: TabItem[] = [
  { path: '/', icon: <Home className="h-5 w-5" />, label: 'Home' },
  { path: '/devices', icon: <List className="h-5 w-5" />, label: 'Devices' },
  { path: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  { path: '/about', icon: <Info className="h-5 w-5" />, label: 'About' },
];

const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isNative } = useCapacitor();

  const handleTabPress = async (path: string) => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
    navigate(path);
  };

  // Don't show tab bar on device detail pages
  if (location.pathname.includes('/devices/') && location.pathname !== '/devices') {
    return null;
  }

  return (
    <div className="bg-background border-t px-2 py-2 flex items-center justify-around safe-area-inset-bottom">
      {tabs.map((tab) => {
        const isActive = tab.path === '/' 
          ? location.pathname === '/' 
          : location.pathname.startsWith(tab.path);

        return (
          <button
            key={tab.path}
            onClick={() => handleTabPress(tab.path)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {tab.icon}
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileTabBar;
