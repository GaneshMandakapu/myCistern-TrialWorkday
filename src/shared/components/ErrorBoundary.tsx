import { Component, ReactNode, ErrorInfo } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback 
        error={this.state.error} 
        onReload={this.handleReload}
        onGoHome={this.handleGoHome}
      />;
    }

    return this.props.children;
  }
}

interface FallbackProps {
  error?: Error;
  onReload: () => void;
  onGoHome: () => void;
}

function ErrorBoundaryFallback({ error, onReload, onGoHome }: FallbackProps) {
  const { t } = useTranslation();

  return (
    <div className="error-boundary-container">
      <div className="error-boundary-content">
        <div className="error-icon">
          <AlertTriangle size={80} />
        </div>
        
        <h1 className="error-title">{t('error.boundary.title')}</h1>
        <p className="error-message">{t('error.boundary.message')}</p>
        
        {import.meta.env.DEV && error && (
          <details className="error-details">
            <summary className="error-details-summary">
              {t('error.boundary.details')}
            </summary>
            <pre className="error-stack">
              {error.toString()}
            </pre>
          </details>
        )}
        
        <div className="error-actions">
          <button onClick={onReload} className="error-action-button primary">
            <RefreshCw size={20} />
            {t('error.boundary.reload')}
          </button>
          
          <button onClick={onGoHome} className="error-action-button secondary">
            <Home size={20} />
            {t('error.boundary.goHome')}
          </button>
        </div>
        
        <p className="error-help">
          {t('error.boundary.help')}
        </p>
      </div>
    </div>
  );
}

// Wrapper component to use hooks
export default function ErrorBoundary({ children }: Props) {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>;
}
