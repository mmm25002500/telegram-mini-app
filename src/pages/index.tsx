import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/types'; // 引入类型
import { useRouter } from 'next/router';

const IndexPage = () => {
  const [platform, setPlatform] = useState<WebApp['platform']>(); // 使用 WebApp 类型中的 platform
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      setPlatform(window.Telegram.WebApp.platform);
    }
  }, []);

  if (platform === 'unknown') {
    return (
      <div>
        <p>請使用 Telegram App</p>
      </div>
    );
  }

  return (
    <div>
      <p>你正在使用 {platform} 平台</p>
      <button onClick={() => router.push('/wallet')}>go to wallet</button>
    </div>
  );
};

export default IndexPage;
