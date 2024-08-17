import { AppProps } from 'next/app';
import { useEffect } from 'react';

// 我们不在顶部导入 WebApp，而是在 useEffect 中动态导入
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 动态导入 @twa-dev/sdk 并确保它只在客户端执行
      import('@twa-dev/sdk').then((WebApp) => {
        WebApp.default.ready();
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
