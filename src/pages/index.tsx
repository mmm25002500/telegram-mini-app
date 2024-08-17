import { useEffect, useState } from 'react';

const IndexPage = () => {
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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {isInTelegram ? (
        <h1>Welcome to My Telegram Web App</h1>
      ) : (
        <div>
          <h1>请使用 <strong>Telegram</strong> 打开</h1>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
