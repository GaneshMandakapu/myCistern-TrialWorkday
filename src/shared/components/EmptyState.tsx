import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  variant?: 'default' | 'search' | 'error' | 'loading';
  size?: 'small' | 'medium' | 'large';
}

function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  variant = 'default',
  size = 'medium'
}: EmptyStateProps) {
  const { t } = useTranslation();

  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return <Search size={size === 'large' ? 80 : size === 'small' ? 40 : 60} />;
      case 'error':
        return <RefreshCw size={size === 'large' ? 80 : size === 'small' ? 40 : 60} />;
      case 'loading':
        return <RefreshCw size={size === 'large' ? 80 : size === 'small' ? 40 : 60} className="spinning" />;
      default:
        return <Plus size={size === 'large' ? 80 : size === 'small' ? 40 : 60} />;
    }
  };

  const getDefaultTitle = () => {
    switch (variant) {
      case 'search':
        return t('empty.search.title');
      case 'error':
        return t('empty.error.title');
      case 'loading':
        return t('empty.loading.title');
      default:
        return t('empty.default.title');
    }
  };

  const getDefaultMessage = () => {
    switch (variant) {
      case 'search':
        return t('empty.search.message');
      case 'error':
        return t('empty.error.message');
      case 'loading':
        return t('empty.loading.message');
      default:
        return t('empty.default.message');
    }
  };

  return (
    <div className={`empty-state-container empty-state-${size} empty-state-${variant}`}>
      <div className="empty-state-content">
        <div className="empty-state-icon">
          {icon || getDefaultIcon()}
        </div>
        
        <h3 className="empty-state-title">
          {title || getDefaultTitle()}
        </h3>
        
        <p className="empty-state-message">
          {message || getDefaultMessage()}
        </p>
        
        {(onAction || onSecondaryAction) && (
          <div className="empty-state-actions">
            {onAction && (
              <button onClick={onAction} className="empty-action-button primary">
                {actionLabel || t('empty.action.primary')}
              </button>
            )}
            
            {onSecondaryAction && (
              <button onClick={onSecondaryAction} className="empty-action-button secondary">
                {secondaryActionLabel || t('empty.action.secondary')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
