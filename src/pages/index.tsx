import { useEffect, useState } from 'react';

const MyApp = () => {
  const [inTelegram, setInTelegram] = useState(false);

  useEffect(() => {
    const checkTelegram = isInTelegramWebApp();
    setInTelegram(checkTelegram);

    if (checkTelegram) {
      // 在 Telegram Web App 中，初始化 Web App
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.MainButton.setText('Click me');
      tg.MainButton.show();
    } else {
      // 不在 Telegram Web App 中，显示二维码或其他提示
      console.log('Not in Telegram Web App');
    }
  }, []);

  return (
    <div>
      {inTelegram ? (
        <div>Welcome to My Telegram Web App</div>
      ) : (
        <div>
          <h1>请使用 Telegram 打开</h1>
          <img src="path_to_your_qr_code_image" alt="Scan QR code to open in Telegram" />
        </div>
      )}
    </div>
  );
};

function isInTelegramWebApp() {
  return typeof window !== 'undefined' && typeof window.Telegram !== 'undefined' && typeof window.Telegram.WebApp !== 'undefined';
}

export default MyApp;
