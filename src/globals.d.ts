// src/globals.d.ts
interface TelegramWebApp {
    initData: string;
    initDataUnsafe: object;
    version: string;
    platform: string;
    colorScheme: string;
    themeParams: object;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    BackButton: any;
    HapticFeedback: any;
    MainButton: {
      setText: (text: string) => void;
      onClick: (callback: () => void) => void;
      show: () => void;
    };
    close: () => void;
    ready: () => void;
    sendData: (data: string) => void;
    expand: () => void;
    setHeaderColor: (color: string) => void;
    setBackgroundColor: (color: string) => void;
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  