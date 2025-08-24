'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { useEffect, useState } from 'react';
import { useSidebar } from './ui/sidebar';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { translations } = useLanguage();
  const { state } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // On the server, we don't know the theme, so render a placeholder.
    if (state === 'collapsed') {
      return <div className="h-8 w-8 rounded-md border" />;
    }
    return <div className="h-10 w-full rounded-md border" />;
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  if (state === 'collapsed') {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={toggleTheme}
        aria-label={isDark ? translations.lightTheme : translations.darkTheme}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label={isDark ? translations.lightTheme : translations.darkTheme}
      className="w-full justify-start"
    >
      <div className="flex items-center gap-2">
        <Sun className={cn('h-4 w-4', isDark && 'hidden')} />
        <Moon className={cn('h-4 w-4', !isDark && 'hidden')} />
        <span>{isDark ? translations.lightTheme : translations.darkTheme}</span>
      </div>
    </Button>
  );
}
