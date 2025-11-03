import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import './ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className="theme-toggle-container">
      {/* Language Toggle */}
      <button
        className="toggle-button"
        onClick={toggleLanguage}
        title={t('language.toggle')}
        aria-label={t('language.toggle')}
      >
        <Languages size={20} />
        <span className="toggle-label">{language.toUpperCase()}</span>
      </button>
      
      {/* Theme Toggle */}
      <button
        className="toggle-button"
        onClick={toggleTheme}
        title={t('theme.toggle')}
        aria-label={t('theme.toggle')}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        <span className="toggle-label">
          {theme === 'light' ? t('theme.dark') : t('theme.light')}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;
