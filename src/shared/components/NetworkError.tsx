import { useTranslation } from 'react-i18next';
import { WifiOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import './NetworkError.css';

interface NetworkErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  showConnectionStatus?: boolean;
  variant?: 'error' | 'warning' | 'info';
}

function NetworkError({
  title,
  message,
  onRetry,
  retryLabel,
  isRetrying = false,
  showConnectionStatus = true,
  variant = 'error'
}: NetworkErrorProps) {
  const { t } = useTranslation();

  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <AlertCircle size={48} />;
      case 'info':
        return <CheckCircle size={48} />;
      default:
        return <WifiOff size={48} />;
    }
  };

  const getVariantClass = () => {
    return `network-error-${variant}`;
  };

  return (
    <div className={`network-error-container ${getVariantClass()}`}>
      <div className="network-error-content">
        <div className="network-error-icon">
          {getIcon()}
        </div>
        
        <h3 className="network-error-title">
          {title || t('error.network.title')}
        </h3>
        
        <p className="network-error-message">
          {message || t('error.network.message')}
        </p>
        
        {showConnectionStatus && (
          <div className="connection-status">
            <div className={`status-indicator ${navigator.onLine ? 'online' : 'offline'}`}>
              <div className="status-dot"></div>
              <span className="status-text">
                {navigator.onLine ? t('error.network.online') : t('error.network.offline')}
              </span>
            </div>
          </div>
        )}
        
        {onRetry && (
          <button 
            onClick={onRetry} 
            disabled={isRetrying}
            className={`retry-button ${isRetrying ? 'retrying' : ''}`}
          >
            <RefreshCw 
              size={20} 
              className={isRetrying ? 'spinning' : ''} 
            />
            {retryLabel || (isRetrying ? t('error.network.retrying') : t('error.network.retry'))}
          </button>
        )}
        
        <div className="network-help">
          <p className="help-text">{t('error.network.help')}</p>
          <ul className="help-suggestions">
            <li>{t('error.network.suggestion1')}</li>
            <li>{t('error.network.suggestion2')}</li>
            <li>{t('error.network.suggestion3')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NetworkError;
