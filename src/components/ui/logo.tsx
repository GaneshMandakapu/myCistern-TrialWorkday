import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** Size variant for different use cases */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show text alongside the logo */
  showText?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Where the logo should link to */
  linkTo?: string;
  /** Whether this is a clickable logo */
  clickable?: boolean;
}

export default function Logo({ 
  size = 'md', 
  showText = true, 
  className,
  linkTo = '/dashboard',
  clickable = true 
}: LogoProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      logoSize: 'h-6 w-6',
      textSize: 'text-base',
      spacing: 'space-x-1.5'
    },
    md: {
      logoSize: 'h-8 w-8',
      textSize: 'text-lg md:text-xl',
      spacing: 'space-x-2'
    },
    lg: {
      logoSize: 'h-10 w-10',
      textSize: 'text-xl md:text-2xl',
      spacing: 'space-x-3'
    }
  };

  const config = sizeConfig[size];

  const LogoContent = () => (
    <div className={cn(
      'flex items-center',
      config.spacing,
      className
    )}>
      <img 
        src="/images/mycistern-logo-compact.svg" 
        alt="myCistern Logo" 
        className={cn('object-contain', config.logoSize)}
      />
      {showText && (
        <span className={cn(
          'font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
          config.textSize
        )}>
          myCistern
        </span>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link to={linkTo} className="flex items-center">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
