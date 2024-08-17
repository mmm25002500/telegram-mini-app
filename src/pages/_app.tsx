import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [isInTelegram, setIsInTelegram] = useState(false);

  // 检测是否在 Telegram Web App 中
  const isInTelegramWebApp = () => {
    return (
      typeof window !== 'undefined' &&
      typeof window.Telegram !== 'undefined' &&
      typeof window.Telegram.WebApp !== 'undefined'
    );
  };

  useEffect(() => {
    const telegramDetected = isInTelegramWebApp();
    setIsInTelegram(telegramDetected);

    if (telegramDetected) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      console.log('Telegram Web App is ready.');

      // 设置主按钮
      tg.MainButton.setText('Click me');
      tg.MainButton.show();

      tg.MainButton.onClick(() => {
        tg.sendData('Button clicked!');
        console.log('Main button clicked.');
      });
    } else {
      console.log('Not running inside Telegram Web App.');
    }
  }, []);

  return (
    <div>
      {isInTelegram ? (
        <Component {...pageProps} />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>请使用 <strong>Telegram</strong> 打开</h1>
          <p>此应用程序只能在 Telegram Web App 中使用。</p>
        </div>
      )}
    </div>
  );
}

export default MyApp;
