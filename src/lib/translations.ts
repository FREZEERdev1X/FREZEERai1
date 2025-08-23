export type Language = 'en' | 'ar';

export type Translations = {
  appName: string;
  sendMessagePlaceholder: string;
  sendMessage: string;
  lightTheme: string;
  darkTheme: string;
  language: string;
  english: string;
  arabic: string;
  errorTitle: string;
  errorMessage: string;
  welcomeTitle: string;
  welcomeMessage: string;
};

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'FREZEER AI',
    sendMessagePlaceholder: 'Send a message...',
    sendMessage: 'Send Message',
    lightTheme: 'Switch to Light Theme',
    darkTheme: 'Switch to Dark Theme',
    language: 'Language',
    english: 'English',
    arabic: 'Arabic',
    errorTitle: 'Error',
    errorMessage: 'Something went wrong. Please try again.',
    welcomeTitle: 'Welcome to Frezeer AI',
    welcomeMessage: 'I am an intelligent assistant. How can I help you today?',
  },
  ar: {
    appName: 'فريزر AI',
    sendMessagePlaceholder: 'أرسل رسالة...',
    sendMessage: 'إرسال رسالة',
    lightTheme: 'التبديل إلى الوضع الفاتح',
    darkTheme: 'التبديل إلى الوضع الداكن',
    language: 'اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    errorTitle: 'خطأ',
    errorMessage: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    welcomeTitle: 'مرحباً بك في فريزر AI',
    welcomeMessage: 'أنا مساعد ذكي. كيف يمكنني مساعدتك اليوم؟',
  },
};
