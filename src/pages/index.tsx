import { useEffect, useState } from 'react';

const IndexPage = () => {
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);

  useEffect(() => {
    console.log('Running useEffect...');

    if (window.Telegram) {
      console.log('Telegram object detected:', window.Telegram);
      
      if (window.Telegram.WebApp) {
        console.log('Telegram Web App object detected:', window.Telegram.WebApp);
        
        const tg = window.Telegram.WebApp;
        tg.ready();
        setIsTelegramWebApp(true);
        console.log('Telegram Web App is ready.');

        tg.MainButton.setText('Click me');
        tg.MainButton.show();

        tg.MainButton.onClick(() => {
          tg.sendData('Button clicked!');
          console.log('Main button clicked.');
        });
      } else {
        console.log('Telegram Web App is not ready.');
      }
    } else {
      console.log('Telegram Web App not detected.');
    }
  }, []);

  return (
    <div>
      {isTelegramWebApp ? (
        <p>Telegram Web App detected.</p>
      ) : (
        <p>Telegram Web App not detected.</p>
      )}
    </div>
  );
};

export default IndexPage;
