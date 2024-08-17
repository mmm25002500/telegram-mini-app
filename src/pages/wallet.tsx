import { useEffect, useState } from 'react';
import {
  TonConnect,
  isWalletInfoCurrentlyInjected,
  isWalletInfoRemote,
  WalletInfo,
  Wallet
} from '@tonconnect/sdk';
import { TonClient, Address, TonClient4Parameters } from 'ton';

// TON Clinet 設定
const clientParams: TonClient4Parameters = {
  endpoint: 'https://toncenter.com/api/v2/jsonRPC',
};

// init TON client
const tonClient = new TonClient(clientParams);

const TonConnectPage = () => {
  const [tonConnect, setTonConnect] = useState<TonConnect | null>(null); // TonConnect實例
  const [wallet, setWallet] = useState<Wallet | null>(null); // 已連接的錢包信息
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // 錢包地址
  const [balance, setBalance] = useState<string | null>(null); // 錢包餘額
  const [loading, setLoading] = useState(true); // 加載狀態，用於顯示加載指示
  const [walletInfoList, setWalletInfoList] = useState<WalletInfo[]>([]); // 可用的錢包列表
  const [isTonConnectInitialized, setIsTonConnectInitialized] = useState(false); // TonConnect是否初始化完成

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Init TonConnect
        const tonConnectInstance = new TonConnect();
        setTonConnect(tonConnectInstance);

        // 取得可用的錢包列表
        tonConnectInstance.getWallets().then(wallets => {
          console.log("可用的錢包列表:", wallets);
          setWalletInfoList(wallets);

          // 設置TonConnect初始化完成的狀態
          setIsTonConnectInitialized(true);

          // 檢查localStorage中是否有之前的連接狀態
          const previousWalletName = localStorage.getItem('connectedWalletName');
          if (previousWalletName) {
            const previousWallet = wallets.find(
              walletInfo => walletInfo.name === previousWalletName
            );
            if (previousWallet) {
              console.log('找到先前連接的錢包:', previousWallet);
              handleWalletConnection(previousWallet, tonConnectInstance); // 自動連接先前使用的錢包
            } else {
              console.log('未找到先前連接的錢包。');
              setLoading(false);
            }
          } else {
            console.log('localStorage中無先前連接的錢包。');
            setLoading(false); // 沒有先前連接，停止加載並等待用戶選擇錢包
          }
        }).catch(error => {
          console.error('獲取錢包列表時發生錯誤:', error);
          setLoading(false);
        });

        // 監聽TonConnect的狀態變化
        tonConnectInstance.onStatusChange((wallet: Wallet | null) => {
          if (wallet) {
            console.log('錢包已連接:', wallet);
            setWallet(wallet);
            setWalletAddress(wallet.account.address);
            fetchBalance(wallet.account.address); // 獲取並顯示餘額
            // 將連接的錢包信息存儲到localStorage中
            localStorage.setItem('connectedWalletName', wallet.device.appName);
            setLoading(false);
          } else {
            console.log('錢包已斷開連接');
            setWallet(null);
            setWalletAddress(null);
            setBalance(null);
            localStorage.removeItem('connectedWalletName'); // 移除localStorage中的錢包信息
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('TonConnect 初始化失敗:', error);
        setLoading(false);
      }
    }
  }, []);

  // 獲取指定錢包地址的餘額
  const fetchBalance = async (address: string) => {
    try {
      const walletAddress = Address.parse(address);
      const balance = await tonClient.getBalance(walletAddress);
      setBalance(balance.toString());
    } catch (error) {
      console.error('獲取餘額失敗:', error);
    }
  };

  // 處理錢包連接邏輯
  const handleWalletConnection = async (walletInfo: WalletInfo, tonConnectInstance: TonConnect) => {
    if (!tonConnectInstance || !isTonConnectInitialized) {
      console.error('TonConnect 未初始化');
      return;
    }

    try {
      setLoading(true); // 設置加載狀態
      console.log('嘗試連接錢包:', walletInfo);

      // 如果是遠程錢包，使用遠程連接
      if (isWalletInfoRemote(walletInfo)) {
        await tonConnectInstance.connect({
          universalLink: walletInfo.universalLink,
          bridgeUrl: walletInfo.bridgeUrl,
        });
        console.log('遠程連接錢包成功');
        setLoading(false);
        return;
      }

      // 如果是已注入的錢包，使用注入連接
      if (isWalletInfoCurrentlyInjected(walletInfo)) {
        await tonConnectInstance.connect({
          jsBridgeKey: walletInfo.jsBridgeKey,
        });
        console.log('注入錢包連接成功');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('連接錢包失敗:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>TON Connect 範例</h1>
      {loading ? (
        <p>正在連接錢包...</p>
      ) : walletAddress ? (
        <>
          <p>錢包地址: {walletAddress}</p>
          <p>餘額: {balance || '正在獲取餘額...'} nanoTONs</p>
        </>
      ) : (
        <div>
          <p>請選擇要連接的錢包：</p>
          <ul>
            {isTonConnectInitialized && walletInfoList.map((walletInfo, index) => (
              <li key={index}>
                <button onClick={() => handleWalletConnection(walletInfo, tonConnect!)}>
                  連接 {walletInfo.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TonConnectPage;
