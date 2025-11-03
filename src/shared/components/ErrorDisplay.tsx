// Shared error display component
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw, WifiOff, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    const iconClasses = cn(
      size === 'small' ? 'h-8 w-8' : size === 'large' ? 'h-16 w-16' : 'h-12 w-12',
      {
        'text-red-500': variant === 'error',
        'text-orange-500': variant === 'warning', 
        'text-blue-500': variant === 'info',
        'text-gray-500': variant === 'network'
      }
    );
    
    switch (variant) {
      case 'network':
        return <WifiOff className={iconClasses} />;
      case 'warning':
        return <AlertCircle className={iconClasses} />;
      case 'info':
        return <AlertCircle className={iconClasses} />;
      default:
        return <AlertTriangle className={iconClasses} />;
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
  
  const containerClasses = cn(
    'text-center space-y-4',
    size === 'small' ? 'p-4' : size === 'large' ? 'p-12' : 'p-8'
  );
  
  return (
    <Card className="border-dashed">
      <CardContent className={containerClasses}>
        <div className="flex justify-center">
          {getIcon()}
        </div>
        
        <div className="space-y-2">
          <h3 className={cn(
            'font-semibold',
            size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-lg'
          )}>
            {title || getDefaultTitle()}
          </h3>
          <p className={cn(
            'text-muted-foreground',
            size === 'small' ? 'text-xs' : 'text-sm'
          )}>
            {getDefaultMessage()}
          </p>
        </div>
        
        {showRetryCount && retryCount > 0 && (
          <p className="text-xs text-muted-foreground">
            {t('error.retryCount', { count: retryCount, max: maxRetries })}
          </p>
        )}
        
        {canRetry && (
          <Button 
            onClick={handleRetry} 
            disabled={isRetrying}
            variant="outline"
            size={size === 'small' ? 'sm' : 'default'}
            className="gap-2"
          >
            {isRetrying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {retryLabel || (isRetrying ? t('error.network.retrying') : t('error.retry'))}
          </Button>
        )}
        
        {showRetryCount && retryCount >= maxRetries && (
          <p className="text-xs text-destructive">
            {t('error.maxRetries')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default ErrorDisplay;
