import { Space_Grotesk } from 'next/font/google';

import { Color } from '../styles/Color';

export const MAIN_FONT = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-main',
  preload: true,
  fallback: ['sans-serif'],
});
export const APP_NAME = 'Universal Bridge';
export const APP_DESCRIPTION =
  'A DApp that allows bridging assets from LUKSO to Ethereum and vice-versa.';
export const APP_URL = 'bridge.universaleverything.io';
export const BRAND_COLOR = Color.primary;
export const BACKGROUND_COLOR = Color.primary;
export const BACKGROUND_IMAGE = 'url(/backgrounds/background.jpg)';
export const PROXY_DEPLOYED_URL = 'https://proxy.hyperlane.xyz';

export const config = {
  metadata: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    featured_image: '/logos/ue.svg',
    icon: '/logos/ue.svg',
    url: APP_URL,
    keywords: '',
  },
  extension: {
    name: 'Universal Profiles',
    url: 'https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en',
  },
  walletTools: {
    // Exchange this value with your own project ID
    walletConnectProjectID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
};

export const supportedNetworks = [
  {
    name: 'LUKSO Mainnet',
    chainId: '42',
    rpcUrl: 'https://42.rpc.thirdweb.com',
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
    explorer: 'https://explorer.execution.mainnet.lukso.network/',
    token: 'LYX',
  },
  {
    name: 'Ethereum Mainnet',
    chainId: '1',
    rpcUrl: 'https://1.rpc.thirdweb.com',
    ipfsGateway: 'https://ipfs.io/ipfs',
    explorer: 'https://etherscan.io/',
    token: 'LYX',
  },
];
