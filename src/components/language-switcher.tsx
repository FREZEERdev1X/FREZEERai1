'use client';

import { Languages } from 'lucide-react';

import { useLanguage } from '@/hooks/use-language';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSidebar } from './ui/sidebar';

export function LanguageSwitcher() {
  const { language, setLanguage, translations } = useLanguage();
  const { state } = useSidebar();

  if (state === 'collapsed') {
    return (
      <Select onValueChange={setLanguage} defaultValue={language}>
        <SelectTrigger
          className="h-8 w-8 p-0"
          aria-label={translations.language}
        >
          <SelectValue asChild>
            <Languages className="h-4 w-4" />
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="en">{translations.english}</SelectItem>
          <SelectItem value="ar">{translations.arabic}</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="w-full">
      <Select onValueChange={setLanguage} defaultValue={language}>
        <SelectTrigger aria-label={translations.language}>
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <SelectValue placeholder={translations.language} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{translations.english}</SelectItem>
          <SelectItem value="ar">{translations.arabic}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
