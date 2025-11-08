import React from 'react';
import { Wifi, WifiOff, Smartphone, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCapacitor } from '@/hooks/useCapacitor';

const MobileStatusBar: React.FC = () => {
  const { isNative, deviceInfo, networkInfo } = useCapacitor();

  if (!isNative) return null;

  return (
    <div className="bg-muted/30 px-4 py-2 text-xs flex items-center justify-between border-b">
      <div className="flex items-center space-x-2">
        {isNative ? (
          <Smartphone className="h-3 w-3" />
        ) : (
          <Monitor className="h-3 w-3" />
        )}
        <span className="font-medium">
          {deviceInfo?.platform} App
        </span>
        {deviceInfo?.model && (
          <Badge variant="secondary" className="text-xs py-0">
            {deviceInfo.model}
          </Badge>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {networkInfo?.connected ? (
            <Wifi className="h-3 w-3 text-green-600" />
          ) : (
            <WifiOff className="h-3 w-3 text-red-600" />
          )}
          <span className={`text-xs ${networkInfo?.connected ? 'text-green-600' : 'text-red-600'}`}>
            {networkInfo?.connected ? 'Online' : 'Offline'}
          </span>
        </div>
        {networkInfo?.connectionType && (
          <Badge variant="outline" className="text-xs py-0">
            {networkInfo.connectionType}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default MobileStatusBar;
