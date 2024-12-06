import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { HexString, ProtocolType } from '@hyperlane-xyz/utils';

import { config } from '../../../consts/config';
import { logger } from '../../../utils/logger';
import { getChainProtocol, tryGetChainProtocol } from '../../chains/utils';

import {
  useEvmAccount,
  useEvmActiveChain,
  useEvmConnectFn,
  useEvmDisconnectFn,
  useEvmTransactionFns,
  useEvmWalletDetails,
} from './evm';
import { AccountInfo, ActiveChainInfo, ChainTransactionFns, WalletDetails } from './types';

export function useAccounts(): {
  accounts: Record<ProtocolType, AccountInfo>;
  readyAccounts: Array<AccountInfo>;
} {
  const evmAccountInfo = useEvmAccount();

  // Filtered ready accounts
  const readyAccounts = useMemo(() => [evmAccountInfo].filter((a) => a.isReady), [evmAccountInfo]);

  // Check if any of the ready accounts are blacklisted
  const readyAddresses = readyAccounts
    .map((a) => a.addresses)
    .flat()
    .map((a) => a.address.toLowerCase());
  if (readyAddresses.some((a) => config.addressBlacklist.includes(a))) {
    throw new Error('Wallet address is blacklisted');
  }

  return useMemo(
    () => ({
      accounts: {
        [ProtocolType.Ethereum]: evmAccountInfo,
        [ProtocolType.Cosmos]: {
          protocol: ProtocolType.Cosmos,
          addresses: [],
          isReady: false,
        },
        [ProtocolType.Sealevel]: {
          protocol: ProtocolType.Sealevel,
          addresses: [],
          isReady: false,
        },
      },
      readyAccounts,
    }),
    [evmAccountInfo, readyAccounts],
  );
}

export function useAccountForChain(chainName?: ChainName): AccountInfo | undefined {
  const { accounts } = useAccounts();
  if (!chainName) return undefined;
  const protocol = tryGetChainProtocol(chainName);
  if (!protocol) return undefined;
  return accounts?.[protocol];
}

export function useAccountAddressForChain(chainName?: ChainName): Address | undefined {
  return getAccountAddressForChain(chainName, useAccounts().accounts);
}

export function getAccountAddressForChain(
  chainName?: ChainName,
  accounts?: Record<ProtocolType, AccountInfo>,
): Address | undefined {
  if (!chainName || !accounts) return undefined;
  const protocol = getChainProtocol(chainName);
  const account = accounts[protocol];

  // Use first because only cosmos has the notion of per-chain addresses
  return account?.addresses[0]?.address;
}

export function getAccountAddressAndPubKey(
  chainName?: ChainName,
  accounts?: Record<ProtocolType, AccountInfo>,
): { address?: Address; publicKey?: Promise<HexString> } {
  const address = getAccountAddressForChain(chainName, accounts);
  if (!accounts || !chainName || !address) return {};
  const protocol = getChainProtocol(chainName);
  const publicKey = accounts[protocol]?.publicKey;
  return { address, publicKey };
}

export function useWalletDetails(): Record<ProtocolType, WalletDetails> {
  const evmWallet = useEvmWalletDetails();

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: evmWallet,
      [ProtocolType.Cosmos]: {},
      [ProtocolType.Sealevel]: {},
    }),
    [evmWallet],
  );
}

export function useConnectFns(): Record<ProtocolType, () => void> {
  const onConnectEthereum = useEvmConnectFn();

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: onConnectEthereum,
      [ProtocolType.Cosmos]: () => {},
      [ProtocolType.Sealevel]: () => {},
    }),
    [onConnectEthereum],
  );
}

export function useDisconnectFns(): Record<ProtocolType, () => Promise<void>> {
  const disconnectEvm = useEvmDisconnectFn();

  const onClickDisconnect =
    (env: ProtocolType, disconnectFn?: () => Promise<void> | void) => async () => {
      try {
        if (!disconnectFn) throw new Error('Disconnect function is null');
        await disconnectFn();
      } catch (error) {
        logger.error(`Error disconnecting from ${env} wallet`, error);
        toast.error('Could not disconnect wallet');
      }
    };

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: onClickDisconnect(ProtocolType.Ethereum, disconnectEvm),
      [ProtocolType.Cosmos]: async () => {},
      [ProtocolType.Sealevel]: async () => {},
    }),
    [disconnectEvm],
  );
}

export function useActiveChains(): {
  chains: Record<ProtocolType, ActiveChainInfo>;
  readyChains: Array<ActiveChainInfo>;
} {
  const evmChain = useEvmActiveChain();

  const readyChains = useMemo(() => [evmChain].filter((c) => !!c.chainDisplayName), [evmChain]);

  return useMemo(
    () => ({
      chains: {
        [ProtocolType.Ethereum]: evmChain,
        [ProtocolType.Cosmos]: {},
        [ProtocolType.Sealevel]: {},
      },
      readyChains,
    }),
    [evmChain, readyChains],
  );
}

export function useTransactionFns(): Record<ProtocolType, ChainTransactionFns> {
  const { switchNetwork: onSwitchEvmNetwork, sendTransaction: onSendEvmTx } =
    useEvmTransactionFns();

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: { sendTransaction: onSendEvmTx, switchNetwork: onSwitchEvmNetwork },
      [ProtocolType.Cosmos]: { sendTransaction: async () => ({}) as any },
      [ProtocolType.Sealevel]: { sendTransaction: async () => ({}) as any },
    }),
    [onSendEvmTx, onSwitchEvmNetwork],
  );
}
