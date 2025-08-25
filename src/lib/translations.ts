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
  
  // Auth translations
  signInTitle: string;
  signInDescription: string;
  signUpTitle: string;
  signUpDescription: string;
  emailLabel: string;
  passwordLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  signInButton: string;
  signUpButton: string;
  signUpLink: string;
  signInLink: string;
  invalidEmailError: string;
  passwordLengthError: string;
  nameRequiredError: string;
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

    // Auth translations
    signInTitle: 'Welcome Back',
    signInDescription: 'Enter your credentials to sign in to your account',
    signUpTitle: 'Create an Account',
    signUpDescription: 'Enter your information to create a new account',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    nameLabel: 'Name',
    namePlaceholder: 'John Doe',
    signInButton: 'Sign In',
    signUpButton: 'Sign Up',
    signUpLink: "Don't have an account? Sign Up",
    signInLink: 'Already have an account? Sign In',
    invalidEmailError: 'Please enter a valid email address.',
    passwordLengthError: 'Password must be at least 6 characters long.',
    nameRequiredError: 'Name is a required field.',
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
    
    // Auth translations
    signInTitle: 'مرحبا بعودتك',
    signInDescription: 'أدخل بياناتك لتسجيل الدخول إلى حسابك',
    signUpTitle: 'إنشاء حساب جديد',
    signUpDescription: 'أدخل معلوماتك لإنشاء حساب جديد',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    nameLabel: 'الاسم',
    namePlaceholder: 'جون دو',
    signInButton: 'تسجيل الدخول',
    signUpButton: 'إنشاء حساب',
    signUpLink: 'ليس لديك حساب؟ إنشاء حساب',
    signInLink: 'هل لديك حساب بالفعل؟ تسجيل الدخول',
    invalidEmailError: 'الرجاء إدخال عنوان بريد إلكتروني صالح.',
    passwordLengthError: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
    nameRequiredError: 'الاسم حقل مطلوب.',
  },
};
