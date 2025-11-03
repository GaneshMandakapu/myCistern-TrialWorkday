// Shared error display component
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw, WifiOff, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  title?: string;
  variant?: 'error' | 'warning' | 'network' | 'info';
  showRetryCount?: boolean;
  maxRetries?: number;
  isRetrying?: boolean;
  size?: 'small' | 'medium' | 'large';
}

function ErrorDisplay({ 
  message, 
  onRetry, 
  retryLabel,
  title,
  variant = 'error',
  showRetryCount = false,
  maxRetries = 3,
  isRetrying = false,
  size = 'medium'
}: ErrorDisplayProps) {
  const { t } = useTranslation();
  const [retryCount, setRetryCount] = useState(0);
  
  // Reset retry count when component unmounts or when retry succeeds
  useEffect(() => {
    return () => setRetryCount(0);
  }, []);

  const handleRetry = () => {
    if (onRetry && retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      onRetry();
    }
  };

  const getIcon = () => {
    const iconSize = size === 'small' ? 32 : size === 'large' ? 64 : 48;
    
    switch (variant) {
      case 'network':
        return <WifiOff size={iconSize} />;
      case 'warning':
        return <AlertCircle size={iconSize} />;
      case 'info':
        return <AlertCircle size={iconSize} />;
      default:
        return <AlertTriangle size={iconSize} />;
    }
  };

  const getDefaultTitle = () => {
    switch (variant) {
      case 'network':
        return t('error.network.title');
      case 'warning':
        return t('error.title');
      case 'info':
        return t('error.title');
      default:
        return t('error.title');
    }
  };

  const getDefaultMessage = () => {
    switch (variant) {
      case 'network':
        return t('error.network.message');
      default:
        return message || t('error.unknown');
    }
  };

  const canRetry = onRetry && (!showRetryCount || retryCount < maxRetries);
  
  return (
    <div className={`error-container error-${variant} error-${size}`}>
      <div className="error-icon">
        {getIcon()}
      </div>
      <h3 className="error-title">{title || getDefaultTitle()}</h3>
      <p className="error-message">{getDefaultMessage()}</p>
      
      {showRetryCount && retryCount > 0 && (
        <p className="retry-count">
          {t('error.retryCount', { count: retryCount, max: maxRetries })}
        </p>
      )}
      
      {canRetry && (
        <button 
          onClick={handleRetry} 
          disabled={isRetrying}
          className={`retry-button ${isRetrying ? 'retrying' : ''}`}
        >
          <RefreshCw size={20} className={isRetrying ? 'spinning' : ''} />
          {retryLabel || (isRetrying ? t('error.network.retrying') : t('error.retry'))}
        </button>
      )}
      
      {showRetryCount && retryCount >= maxRetries && (
        <p className="max-retries-message">
          {t('error.maxRetries')}
        </p>
      )}
    </div>
  );
}

export default ErrorDisplay;
