import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Wifi, WifiOff, Thermometer, Droplet, Gauge, Battery, Signal, Power, RefreshCw, Settings, AlertTriangle, Loader2 } from 'lucide-react';
import { getDeviceDetails, getDeviceMetrics, postDeviceCommand } from '../../api/client';
import type { DeviceCommand } from '../../api/client';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorDisplay from '../../shared/components/ErrorDisplay';
import toast from 'react-hot-toast';
import './DeviceDetail.css';

function DeviceDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
  const commandMutation = useMutation({
    mutationFn: (command: DeviceCommand) => {
      console.log('🚀 Mutation started:', command.command);
      return postDeviceCommand(command);
    },
    onSuccess: (response) => {
      console.log('✨ Mutation success:', response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      console.error('💥 Mutation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send command');
    },
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    refetch();
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
    <div className="device-detail">
      {/* Header with Back Button */}
      <div className="detail-header">
        <button onClick={handleBack} className="back-button" aria-label={t('nav.back')}>
          <ArrowLeft size={20} />
          <span>{t('nav.back')}</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="detail-loading">
          <LoadingSpinner size="large" message={t('devices.loading')} />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="detail-error">
          <ErrorDisplay 
            message={error instanceof Error ? error.message : 'Failed to load device'} 
            onRetry={handleRetry}
          />
        </div>
      )}

      {/* Device Details */}
      {!isLoading && !isError && device && (
        <div className="detail-content">
          {/* Device Header Card */}
          <div className="detail-card header-card">
            <div className="device-title-section">
              <div className="device-status-icon">
                {device.status === 'online' ? (
                  <Wifi className="status-icon online" size={28} />
                ) : (
                  <WifiOff className="status-icon offline" size={28} />
                )}
              </div>
              <div className="device-title-info">
                <h1 className="device-title">{t(`deviceName.${device.name}`, device.name)}</h1>
                <p className="device-subtitle">{t(`deviceType.${device.type}`, device.type)}</p>
              </div>
            </div>
            <div className={`status-badge-large ${device.status}`}>
              {t(`devices.${device.status}`)}
            </div>
          </div>

          {/* Device Information Card */}
          <div className="detail-card info-card">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">{t('detail.deviceId')}</span>
                <span className="info-value">{device.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('detail.location')}</span>
                <span className="info-value">{t(`location.${device.location}`, device.location)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('detail.firmware')}</span>
                <span className="info-value">{device.firmwareVersion}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('detail.ipAddress')}</span>
                <span className="info-value code">{device.ipAddress}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('detail.macAddress')}</span>
                <span className="info-value code">{device.macAddress}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('detail.lastSeen')}</span>
                <span className="info-value">{formatLastSeen(device.lastSeen)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Uptime</span>
                <span className="info-value">{formatUptime(device.uptime)}</span>
              </div>
            </div>
          </div>

          {/* Live Metrics Card */}
          <div className={`detail-card metrics-card ${device.status === 'offline' ? 'offline' : ''}`}>
            <div className="metrics-header">
              <h2 className="card-title-small">{t('metrics.title')}</h2>
              {device.status === 'online' && (
                <span className="update-indicator">{t('metrics.updating')}</span>
              )}
              {device.status === 'offline' && (
                <span className="update-indicator offline">{t('metrics.offline')}</span>
              )}
            </div>

            {isLoadingMetrics && !metrics && (
              <div className="metrics-loading">
                <LoadingSpinner size="small" message={t('devices.loading')} />
              </div>
            )}

            {isMetricsError && (
              <ErrorDisplay 
                message={metricsError instanceof Error ? metricsError.message : 'Failed to load metrics'} 
                onRetry={refetchMetrics}
              />
            )}

            {/* Show message if device is offline */}
            {device.status === 'offline' && (
              <div className="no-metrics">
                <p>{t('metrics.offlineMessage')}</p>
              </div>
            )}

            {metrics && metrics.length > 0 && device.status === 'online' && (
              <div className="metrics-grid">
                {metrics[0].temperature !== undefined && (
                  <div className="metric-card">
                    <div className="metric-icon">
                      <Thermometer size={20} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">{t('metrics.temperature')}</span>
                      <span className="metric-value">{metrics[0].temperature.toFixed(1)}°C</span>
                    </div>
                  </div>
                )}

                {metrics[0].humidity !== undefined && (
                  <div className="metric-card">
                    <div className="metric-icon">
                      <Droplet size={20} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">{t('metrics.humidity')}</span>
                      <span className="metric-value">{metrics[0].humidity.toFixed(1)}%</span>
                    </div>
                  </div>
                )}

                {metrics[0].pressure !== undefined && (
                  <div className="metric-card">
                    <div className="metric-icon">
                      <Gauge size={20} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">{t('metrics.pressure')}</span>
                      <span className="metric-value">{metrics[0].pressure.toFixed(0)} hPa</span>
                    </div>
                  </div>
                )}

                {metrics[0].batteryLevel !== undefined && (
                  <div className="metric-card">
                    <div className="metric-icon">
                      <Battery size={20} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">{t('metrics.battery')}</span>
                      <span className="metric-value">{metrics[0].batteryLevel.toFixed(0)}%</span>
                    </div>
                  </div>
                )}

                {metrics[0].signalStrength !== undefined && (
                  <div className="metric-card">
                    <div className="metric-icon">
                      <Signal size={20} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">{t('metrics.signal')}</span>
                      <span className="metric-value">{metrics[0].signalStrength.toFixed(0)} dBm</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {metrics && metrics.length === 0 && (
              <div className="no-metrics">
                <p>{t('metrics.noData')}</p>
              </div>
            )}
          </div>

          {/* Command Control Card */}
          <div className="detail-card command-card">
            <h2 className="card-title">{t('commands.title')}</h2>
            <div className="command-buttons">
              <button
                className="command-button"
                onClick={() => handleSendCommand('PING')}
                disabled={device.status !== 'online' || commandMutation.isPending}
                title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.ping')}
              >
                {commandMutation.isPending ? <Loader2 size={18} className="spinning" /> : <Power size={18} />}
                <span>{t('commands.ping')}</span>
              </button>

              <button
                className="command-button"
                onClick={() => handleSendCommand('REBOOT')}
                disabled={device.status !== 'online' || commandMutation.isPending}
                title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.reboot')}
              >
                {commandMutation.isPending ? <Loader2 size={18} className="spinning" /> : <RefreshCw size={18} />}
                <span>{t('commands.reboot')}</span>
              </button>

              <button
                className="command-button"
                onClick={() => handleSendCommand('VALVE_OPEN', { valve: 'primary' })}
                disabled={device.status !== 'online' || commandMutation.isPending}
                title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.openValve')}
              >
                {commandMutation.isPending ? <Loader2 size={18} className="spinning" /> : <Settings size={18} />}
                <span>{t('commands.openValve')}</span>
              </button>

              <button
                className="command-button"
                onClick={() => handleSendCommand('DIAGNOSTICS')}
                disabled={device.status !== 'online' || commandMutation.isPending}
                title={device.status !== 'online' ? t('commands.tooltip.offline') : t('commands.tooltip.diagnostics')}
              >
                {commandMutation.isPending ? <Loader2 size={18} className="spinning" /> : <AlertTriangle size={18} />}
                <span>{t('commands.diagnostics')}</span>
              </button>
            </div>
            {device.status !== 'online' && (
              <p className="command-note">{t('commands.offlineNote')}</p>
            )}
            {commandMutation.isPending && (
              <p className="command-note">{t('commands.sending')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceDetail;
