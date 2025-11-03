import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Wifi, WifiOff } from 'lucide-react';
import { getDeviceDetails } from '../../api/client';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorDisplay from '../../shared/components/ErrorDisplay';
import './DeviceDetail.css';

function DeviceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch device details using React Query
  const { data: device, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['device', id],
    queryFn: () => getDeviceDetails(id!),
    enabled: !!id,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    refetch();
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
        <button onClick={handleBack} className="back-button" aria-label="Go back">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="detail-loading">
          <LoadingSpinner size="large" message="Loading..." />
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
                <h1 className="device-title">{device.name}</h1>
                <p className="device-subtitle">{device.type}</p>
              </div>
            </div>
            <div className={`status-badge-large ${device.status}`}>
              {device.status}
            </div>
          </div>

          {/* Device Information Card */}
          <div className="detail-card info-card">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Device ID</span>
                <span className="info-value">{device.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{device.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Firmware</span>
                <span className="info-value">{device.firmwareVersion}</span>
              </div>
              <div className="info-item">
                <span className="info-label">IP Address</span>
                <span className="info-value code">{device.ipAddress}</span>
              </div>
              <div className="info-item">
                <span className="info-label">MAC Address</span>
                <span className="info-value code">{device.macAddress}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Seen</span>
                <span className="info-value">{formatLastSeen(device.lastSeen)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Uptime</span>
                <span className="info-value">{formatUptime(device.uptime)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceDetail;
