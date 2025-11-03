import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

function ThemeToggle() {
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      {/* Language Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        title={t('language.toggle')}
        aria-label={t('language.toggle')}
        className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 sm:gap-2"
      >
        <Languages size={16} className="shrink-0" />
        <span className="hidden sm:inline text-sm whitespace-nowrap">{language.toUpperCase()}</span>
      </Button>
      
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        title={t('theme.toggle')}
        aria-label={t('theme.toggle')}
        className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 sm:gap-2"
      >
        {theme === 'light' ? <Moon size={16} className="shrink-0" /> : <Sun size={16} className="shrink-0" />}
        <span className="hidden sm:inline text-sm whitespace-nowrap">
          {theme === 'light' ? t('theme.dark') : t('theme.light')}
        </span>
      </Button>
    </div>
  );
}

export default ThemeToggle;
