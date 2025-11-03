import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../shared/components/ThemeToggle';
import './AppLayout.css';

function AppLayout() {
  const { t } = useTranslation();
  
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <h1 className="logo">myCistern IoT</h1>
          <nav className="nav">
            <Link to="/" className="nav-link">{t('nav.home')}</Link>
            <Link to="/devices" className="nav-link">{t('nav.devices')}</Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="app-main">
        <Outlet />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 myCistern. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AppLayout;
