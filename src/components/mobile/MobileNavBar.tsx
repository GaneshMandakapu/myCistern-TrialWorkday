import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Button } from '@/components/ui/button';
import { useCapacitor } from '@/hooks/useCapacitor';

interface MobileNavBarProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ 
  title, 
  showBack = false, 
  rightAction 
}) => {
  const navigate = useNavigate();
  const { isNative } = useCapacitor();

  const handleBackPress = async () => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
    navigate(-1);
  };

  return (
    <div className="bg-background border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackPress}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h1 className="text-lg font-semibold truncate">{title}</h1>
      </div>
      
      {rightAction && (
        <div className="flex items-center space-x-2">
          {rightAction}
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
