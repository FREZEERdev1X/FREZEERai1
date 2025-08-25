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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const { translations } = useLanguage();

  const handleLogin = () => {
    // In a real app, you'd validate credentials.
    // Here, we'll just log the user in with their email.
    if (email) {
      login({ name: email.split('@')[0], email });
      router.push('/');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-8 flex items-center gap-2">
        <FrezeerLogo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tighter">{translations.appName}</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Enter your email to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
