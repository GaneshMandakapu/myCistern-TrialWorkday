import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { webSocketService, RealTimeDeviceData, SystemAnalytics } from '@/services/WebSocketService';
import { useAuth, useRole } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Users,
  Signal,
  AlertCircle,
  Info
} from 'lucide-react';

interface RecentAlert {
  id: string;
  deviceId: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

// Device name mapping for real-time display
const deviceNameMap: Record<string, string> = {
  'dev-001': 'Water Tank Sensor A1',
  'dev-002': 'Water Tank Sensor B2', 
  'dev-003': 'Pump Controller 1',
  'dev-004': 'Flow Meter X1',
  'dev-005': 'Temperature Sensor T1',
  'dev-006': 'Pressure Sensor P1',
  'dev-007': 'Valve Controller V1',
  'dev-008': 'Water Quality Sensor Q1',
  'dev-009': 'Humidity Sensor H1',
  'dev-010': 'Flow Meter X2',
  'dev-011': 'Pump Controller 2',
  'dev-012': 'Water Tank Sensor C3',
  'dev-013': 'Leak Detection Sensor L1',
  'dev-014': 'Energy Monitor E1',
  'dev-015': 'Smart Valve SV1'
};

// Helper function to get device name
const getDeviceName = (deviceId: string): string => {
  return deviceNameMap[deviceId] || deviceId;
};

export default function RealTimeDashboard() {
  const { user } = useAuth();
  const { canView } = useRole();
  const { t } = useTranslation();
  
  const [isConnected, setIsConnected] = useState(false);
  const [systemAnalytics, setSystemAnalytics] = useState<SystemAnalytics | null>(null);
  const [realtimeDevices, setRealtimeDevices] = useState<Map<string, RealTimeDeviceData>>(new Map());
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!canView || !isMounted) return;

    // Check if already connected
    setIsConnected(webSocketService.isSocketConnected());

    // Setup WebSocket listeners
    webSocketService.on('connected', () => {
      console.log('✅ Dashboard: WebSocket connected');
      setIsConnected(true);
    });

    webSocketService.on('disconnected', () => {
      console.log('❌ Dashboard: WebSocket disconnected');
      setIsConnected(false);
    });

    webSocketService.on('deviceUpdate', (data: RealTimeDeviceData) => {
      setRealtimeDevices(prev => new Map(prev).set(data.deviceId, data));
    });

    webSocketService.on('systemAnalytics', (data: SystemAnalytics) => {
      setSystemAnalytics(data);
    });

    webSocketService.on('deviceAlert', (alert) => {
      const newAlert: RecentAlert = {
        id: alert.id,
        deviceId: alert.deviceId,
        type: alert.type,
        message: alert.message,
        timestamp: alert.timestamp
      };
      
      setRecentAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep last 10 alerts
    });

    // Connect to WebSocket if not already connected
    if (!webSocketService.isSocketConnected()) {
      console.log('🔄 Dashboard: Initiating WebSocket connection...');
      webSocketService.connect();
    }

    return () => {
      webSocketService.off('connected');
      webSocketService.off('disconnected');
      webSocketService.off('deviceUpdate');
      webSocketService.off('systemAnalytics');
      webSocketService.off('deviceAlert');
    };
  }, [canView, isMounted]);

  if (!canView) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
              <p>You don't have permission to view the dashboard.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 pb-20 sm:pb-6">
      {/* Mobile-optimized Header */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <Badge variant={isConnected ? 'default' : 'secondary'} className="gap-2 w-fit">
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3" />
                {t('dashboard.connection.connected')}
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                {t('dashboard.connection.disconnected')}
              </>
            )}
          </Badge>
          
          {user && (
            <div className="text-left sm:text-right">
              <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile-optimized System Health Cards */}
      {systemAnalytics && (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">{t('dashboard.cards.totalDevices')}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{systemAnalytics.totalDevices}</div>
              <p className="text-xs text-muted-foreground">
                {systemAnalytics.onlineDevices} {t('dashboard.cards.online')}, {systemAnalytics.offlineDevices} {t('dashboard.cards.offline')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">{t('dashboard.cards.systemHealth')}</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-600">{systemAnalytics.systemHealth}%</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.cards.allSystemsOperational')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">{t('dashboard.cards.networkLatency')}</CardTitle>
              <Signal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{systemAnalytics.networkLatency}ms</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.cards.averageResponseTime')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">{t('dashboard.cards.dailyEvents')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{systemAnalytics.totalEvents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.cards.last24Hours')}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Real-time Device Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
              {t('dashboard.liveDeviceStatus.title')}
            </CardTitle>
            <CardDescription className="text-sm">
              {t('dashboard.liveDeviceStatus.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
              {Array.from(realtimeDevices.values())
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, 10)
                .map((device) => (
                  <div key={device.deviceId} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      {device.status === 'online' ? (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{getDeviceName(device.deviceId)}</p>
                        <p className="text-xs text-muted-foreground">
                          Updated {formatTimestamp(device.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant={device.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                        {device.status}
                      </Badge>
                      {device.metrics?.temperature && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {device.metrics.temperature}°C
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              
              {realtimeDevices.size === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">{t('dashboard.liveDeviceStatus.waiting')}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              {t('dashboard.recentAlerts.title')}
            </CardTitle>
            <CardDescription className="text-sm">
              {t('dashboard.recentAlerts.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 border rounded-lg">
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{getDeviceName(alert.deviceId)}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimestamp(alert.timestamp)}
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize text-xs flex-shrink-0">
                    {alert.type}
                  </Badge>
                </div>
              ))}
              
              {recentAlerts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">{t('dashboard.recentAlerts.noAlerts')}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Status - Mobile optimized */}
      {!isConnected && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <WifiOff className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm sm:text-base">{t('dashboard.connection.lost')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('dashboard.connection.lostMessage')}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => webSocketService.connect()}
                className="border-orange-200 w-fit self-start sm:self-center"
              >
                {t('dashboard.connection.retry')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
