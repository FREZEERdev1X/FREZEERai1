'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { FrezeerLogo } from '@/components/icons';
import { useLanguage } from '@/hooks/use-language';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

type Mode = 'signIn' | 'signUp';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('signIn');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useAuth();
  const { translations } = useLanguage();

  const validateAndProceed = () => {
    setError(null);
    if (!emailRegex.test(email)) {
      setError(translations.invalidEmailError);
      return;
    }
    if (password.length < 6) {
      setError(translations.passwordLengthError);
      return;
    }
    if (mode === 'signUp' && !name) {
      setError(translations.nameRequiredError);
      return;
    }

    // In a real app, you'd send this to your backend for verification/creation
    // Here, we'll just log the user in.
    const userName = mode === 'signUp' ? name : email.split('@')[0];
    login({ name: userName, email });
    router.push('/');
  };

  const handleAuthAction = () => {
    validateAndProceed();
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'signIn' ? 'signUp' : 'signIn'));
    setError(null); // Clear errors when switching modes
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-8 flex items-center gap-2">
        <FrezeerLogo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tighter">{translations.appName}</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>
            {mode === 'signIn' ? translations.signInTitle : translations.signUpTitle}
          </CardTitle>
          <CardDescription>
            {mode === 'signIn' ? translations.signInDescription : translations.signUpDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
               <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            {mode === 'signUp' && (
              <div className="space-y-2">
                <Label htmlFor="name">{translations.nameLabel}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={translations.namePlaceholder}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{translations.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{translations.passwordLabel}</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuthAction()}
              />
            </div>
            <Button onClick={handleAuthAction} className="w-full">
              {mode === 'signIn' ? translations.signInButton : translations.signUpButton}
            </Button>
            <Button variant="link" onClick={toggleMode} className="w-full">
              {mode === 'signIn' ? translations.signUpLink : translations.signInLink}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
