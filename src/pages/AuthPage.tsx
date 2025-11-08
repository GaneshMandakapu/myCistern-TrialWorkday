import { useState } from 'react';
import { LoginForm, RegisterForm } from '@/components/auth/AuthForms';
import { Toaster } from '@/components/ui/toaster';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
      <Toaster />
    </div>
  );
}
