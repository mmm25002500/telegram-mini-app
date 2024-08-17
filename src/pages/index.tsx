import { useEffect, useState } from 'react';

const IndexPage = () => {

  return (
    // <div>
    //   {isTelegramWebApp ? (
    //     <p>Telegram Web App detected.</p>
    //   ) : (
    //     <p>Telegram Web App not detected.</p>
    //   )}
    // </div>
    <p>平台：{window.Telegram?.WebApp.platform}</p>
  );
};

export default IndexPage;
