import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Wifi, WifiOff, Thermometer, Droplet, Gauge, Battery, Signal, Power, RefreshCw, Settings, AlertTriangle, Loader2 } from 'lucide-react';
import { getDeviceDetails, getDeviceMetrics, postDeviceCommand } from '../../api/client';
import type { DeviceCommand, CommandResponse } from '../../api/client';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorDisplay from '../../shared/components/ErrorDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

function DeviceDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch device details using React Query
  const { data: device, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['device', id],
    queryFn: () => getDeviceDetails(id!),
    enabled: !!id,
  });

  // Fetch device metrics with polling (every 5 seconds)
  // Only poll if device is online
  const { 
    data: metrics, 
    isLoading: isLoadingMetrics, 
    isError: isMetricsError, 
    error: metricsError,
    refetch: refetchMetrics 
  } = useQuery({
    queryKey: ['metrics', id],
    queryFn: () => getDeviceMetrics(id!),
    enabled: !!id && !!device && device.status === 'online', // Only fetch if device is online
    refetchInterval: device?.status === 'online' ? 5000 : false, // Only poll if online
    refetchIntervalInBackground: false, // Stop polling when tab is not active
  });

  // Command mutation
  const commandMutation = useMutation<CommandResponse, Error, DeviceCommand>({
    mutationFn: (command: DeviceCommand) => {
      console.log('🚀 Mutation started:', command.command);
      return postDeviceCommand(command);
    },
    onSuccess: (response: CommandResponse) => {
      console.log('✨ Mutation success:', response);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
          variant: "success"
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive"
        });
      }
    },
    onError: (error) => {
      console.error('💥 Mutation error:', error);
      toast({
        title: "Command Failed",
        description: error instanceof Error ? error.message : 'Failed to send command',
        variant: "destructive"
      });
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendCommand = (commandName: string, parameters?: Record<string, unknown>) => {
    console.log('🔵 handleSendCommand called:', {
      command: commandName,
      isPending: commandMutation.isPending,
      deviceStatus: device?.status,
      deviceId: id
    });
    
    // Prevent multiple submissions
    if (!device || !id || commandMutation.isPending || device.status !== 'online') {
      console.log('🔴 BLOCKED - Guard clause prevented submission:', {
        hasDevice: !!device,
        hasId: !!id,
        isPending: commandMutation.isPending,
        isOnline: device?.status === 'online'
      });
      return;
    }
    
    console.log('🟢 EXECUTING - Sending command to API');
    commandMutation.mutate({
      deviceId: id,
      command: commandName,
      parameters,
    });
  };

  const formatUptime = (seconds: number) => {
    if (seconds === 0) return 'Offline';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack} 
          className="gap-2" 
          aria-label={t('nav.back')}
        >
          <ArrowLeft size={16} />
          {t('nav.back')}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" message={t('devices.loading')} />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="py-8">
          <ErrorDisplay 
            message={error instanceof Error ? error.message : t('error.notFound')} 
            onRetry={refetch}
            variant="network"
            title={t('error.network.title')}
            showRetryCount={true}
            maxRetries={3}
            size="large"
          />
        </div>
      )}

      {/* Device Details */}
      {!isLoading && !isError && device && (
        <div className="space-y-4">
          {/* Device Header Card */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {device.status === 'online' ? (
                      <Wifi className="h-5 w-5 text-green-600" />
                    ) : (
                      <WifiOff className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{t(`deviceName.${device.name}`, device.name)}</CardTitle>
                    <CardDescription className="text-sm">{t(`deviceType.${device.type}`, device.type)}</CardDescription>
                  </div>
                </div>
                <Badge 
                  variant={device.status === 'online' ? 'success' : 'destructive'}
                  className="text-xs px-2 py-1"
                >
                  {t(`devices.${device.status}`)}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Device Information Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Device Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">{t('detail.deviceId')}</div>
                  <div className="text-sm">{device.id}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">{t('detail.location')}</div>
                  <div className="text-sm">{t(`location.${device.location}`, device.location)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">{t('detail.firmware')}</div>
                  <div className="text-sm">{device.firmwareVersion}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">{t('detail.ipAddress')}</div>
                  <div className="text-xs font-mono bg-muted px-2 py-1 rounded">{device.ipAddress}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">{t('detail.macAddress')}</div>
                  <div className="text-xs font-mono bg-muted px-2 py-1 rounded">{device.macAddress}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">{t('detail.lastSeen')}</div>
                  <div className="text-sm">{formatLastSeen(device.lastSeen)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">Uptime</div>
                  <div className="text-sm">{formatUptime(device.uptime)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Metrics Card */}
          <Card className={device.status === 'offline' ? 'opacity-60' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{t('metrics.title')}</CardTitle>
                {device.status === 'online' && (
                  <Badge variant="success" className="gap-1 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {t('metrics.updating')}
                  </Badge>
                )}
                {device.status === 'offline' && (
                  <Badge variant="secondary" className="text-xs">
                    {t('metrics.offline')}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {isLoadingMetrics && !metrics && (
                <div className="flex justify-center py-4">
                  <LoadingSpinner size="small" message={t('devices.loading')} />
                </div>
              )}

              {isMetricsError && (
                <ErrorDisplay 
                  message={metricsError instanceof Error ? metricsError.message : t('error.network.message')} 
                  onRetry={refetchMetrics}
                  variant="network"
                  title={t('metrics.title')}
                  showRetryCount={true}
                  maxRetries={3}
                  size="medium"
                />
              )}

              {/* Show message if device is offline */}
              {device.status === 'offline' && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">{t('metrics.offlineMessage')}</p>
                </div>
              )}

              {metrics && metrics.length > 0 && device.status === 'online' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {metrics[0].temperature !== undefined && (
                    <Card>
                      <CardContent className="flex items-center gap-2 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
                          <Thermometer className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">{t('metrics.temperature')}</p>
                          <p className="text-lg font-bold">{metrics[0].temperature.toFixed(1)}°C</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {metrics[0].humidity !== undefined && (
                    <Card>
                      <CardContent className="flex items-center gap-2 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                          <Droplet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">{t('metrics.humidity')}</p>
                          <p className="text-lg font-bold">{metrics[0].humidity.toFixed(1)}%</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {metrics[0].pressure !== undefined && (
                    <Card>
                      <CardContent className="flex items-center gap-2 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                          <Gauge className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">{t('metrics.pressure')}</p>
                          <p className="text-lg font-bold">{metrics[0].pressure.toFixed(0)} hPa</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {metrics[0].batteryLevel !== undefined && (
                    <Card>
                      <CardContent className="flex items-center gap-2 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                          <Battery className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">{t('metrics.battery')}</p>
                          <p className="text-lg font-bold">{metrics[0].batteryLevel.toFixed(0)}%</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {metrics[0].signalStrength !== undefined && (
                    <Card>
                      <CardContent className="flex items-center gap-2 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                          <Signal className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">{t('metrics.signal')}</p>
                          <p className="text-lg font-bold">{metrics[0].signalStrength.toFixed(0)} dBm</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {metrics && metrics.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">{t('metrics.noData')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Command Control Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{t('commands.title')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  onClick={() => handleSendCommand('PING')}
                  disabled={device.status !== 'online' || commandMutation.isPending}
                  title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.ping')}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  {commandMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Power size={14} />
                  )}
                  <span className="text-xs">{t('commands.ping')}</span>
                </Button>

                <Button
                  onClick={() => handleSendCommand('REBOOT')}
                  disabled={device.status !== 'online' || commandMutation.isPending}
                  title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.reboot')}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  {commandMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <RefreshCw size={14} />
                  )}
                  <span className="text-xs">{t('commands.reboot')}</span>
                </Button>

                <Button
                  onClick={() => handleSendCommand('VALVE_OPEN', { valve: 'primary' })}
                  disabled={device.status !== 'online' || commandMutation.isPending}
                  title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.openValve')}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  {commandMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Settings size={14} />
                  )}
                  <span className="text-xs">{t('commands.openValve')}</span>
                </Button>

                <Button
                  onClick={() => handleSendCommand('DIAGNOSTICS')}
                  disabled={device.status !== 'online' || commandMutation.isPending}
                  title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.diagnostics')}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  {commandMutation.isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <AlertTriangle size={14} />
                  )}
                  <span className="text-xs">{t('commands.diagnostics')}</span>
                </Button>
              </div>

              {device.status !== 'online' && (
                <div className="mt-3 p-2 bg-muted rounded-md">
                  <p className="text-xs text-muted-foreground">{t('commands.offlineNote')}</p>
                </div>
              )}
              {commandMutation.isPending && (
                <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <p className="text-xs text-blue-700 dark:text-blue-300">{t('commands.sending')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default DeviceDetail;
