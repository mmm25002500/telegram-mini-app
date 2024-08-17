import { useEffect, useState } from 'react';

const IndexPage = () => {
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('Running useEffect...');
    if (window.Telegram) {
      setIsTelegramWebApp(true);
      console.log('Telegram Web App detected.');
      setIsReady(false);

      const tg = window.Telegram.WebApp;
      tg.ready();
      console.log('Telegram Web App is ready.');
      setIsReady(true);

      tg.MainButton.setText('Click me');
      tg.MainButton.show();

      tg.MainButton.onClick(() => {
        tg.sendData('Button clicked!');
        console.log('Main button clicked.');
      });
    } else {
      console.log('Telegram Web App not detected.');
      setIsTelegramWebApp(false);
    }
  }, []);

  return (
    <div>
      {isReady ? (
        <p>Telegram Web App is ready.</p>
      ) : (
          <p>Telegram Web App is not ready.</p>
        )}
      {isTelegramWebApp ? (
        <p>Telegram Web App detected.</p>
      ) : (
        <p>Telegram Web App not detected.</p>
      )}
    </div>
  );
};

export default IndexPage;
