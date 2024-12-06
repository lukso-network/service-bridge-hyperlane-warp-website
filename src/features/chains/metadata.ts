import type { Chain } from '@wagmi/chains';

import { chainMetadataToWagmiChain } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';

import { http, Transport } from 'viem';
import { APP_NAME } from '../../consts/app';
import { config } from '../../consts/config';
import { getWarpContext } from '../../context/context';

// Metadata formatted for use in Wagmi config
export function getWagmiChainConfig(): {
  chains: [Chain, ...Chain[]];
  transports: Record<number, Transport>;
  appName: string;
  projectId: string;
} {
  const evmChains = Object.values(getWarpContext().chains).filter(
    (c) => !c.protocol || c.protocol === ProtocolType.Ethereum,
  );

  const chains = evmChains.map(chainMetadataToWagmiChain) as [Chain, ...Chain[]];
  const transports = {};
  chains.forEach((chain) => (transports[chain.id] = http()));

  return {
    chains,
    transports,
    appName: APP_NAME,
    projectId: config.walletConnectProjectId,
  };
}
