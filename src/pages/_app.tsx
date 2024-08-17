import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [isInit, setIsInit] = useState(false);

  const canBeInited = () => {
    return (
      typeof window !== 'undefined' &&
      typeof window.Telegram !== 'undefined' &&
      typeof window.Telegram.WebApp !== 'undefined'
    );
  };

  useEffect(() => {
    const telegramDetected = canBeInited();
    setIsInit(telegramDetected);

    if (telegramDetected) {
      const tg = window.Telegram?.WebApp;
      tg?.ready();
      // console.log('Telegram Web App is ready.');
    } else {
      // console.log('Not running inside Telegram Web App.');
    }
  }, []);

  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
