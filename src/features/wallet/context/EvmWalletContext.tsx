import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { PropsWithChildren, useMemo, useState } from 'react';
import { WagmiProvider, createConfig } from 'wagmi';

import { ProtocolType } from '@hyperlane-xyz/utils';

import { getWarpCore } from '../../../context/context';
import { Color } from '../../../styles/Color';
import { getWagmiChainConfig } from '../../chains/metadata';
import { tryGetChainMetadata } from '../../chains/utils';

export function getWagmiConfig() {
  return createConfig(getWagmiChainConfig());
}

export function EvmWalletContext({ children }: PropsWithChildren<unknown>) {
  const [config] = useState(getWagmiConfig());

  const initialChain = useMemo(() => {
    const tokens = getWarpCore().tokens;
    const firstEvmToken = tokens.filter((token) => token.protocol === ProtocolType.Ethereum)?.[0];
    return tryGetChainMetadata(firstEvmToken?.chainName)?.chainId as number;
  }, []);

  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: Color.primary,
          borderRadius: 'small',
          fontStack: 'system',
        })}
        initialChain={initialChain}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
