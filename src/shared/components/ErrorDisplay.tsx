// Shared error display component
import { useTranslation } from 'react-i18next';
import './ErrorDisplay.css';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  const { t } = useTranslation();
  
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">{t('error.title')}</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          {t('error.retry')}
        </button>
      )}
    </div>
  );
}

export default ErrorDisplay;
