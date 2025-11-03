import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft, Search } from 'lucide-react';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToDevices = () => {
    navigate('/devices');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <Search size={120} />
        </div>
        
        <h1 className="not-found-title">{t('error.notFound.title')}</h1>
        <p className="not-found-message">{t('error.notFound.message')}</p>
        
        <div className="not-found-actions">
          <button 
            onClick={handleGoHome} 
            className="action-button primary"
          >
            <Home size={20} />
            {t('error.notFound.goHome')}
          </button>
          
          <button 
            onClick={handleGoToDevices} 
            className="action-button secondary"
          >
            <Search size={20} />
            {t('error.notFound.goDevices')}
          </button>
          
          <button 
            onClick={handleGoBack} 
            className="action-button tertiary"
          >
            <ArrowLeft size={20} />
            {t('error.notFound.goBack')}
          </button>
        </div>
        
        <div className="not-found-help">
          <p className="help-text">{t('error.notFound.help')}</p>
          <ul className="help-links">
            <li>
              <button onClick={handleGoHome} className="link-button">
                {t('nav.home')}
              </button>
            </li>
            <li>
              <button onClick={handleGoToDevices} className="link-button">
                {t('nav.devices')}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
