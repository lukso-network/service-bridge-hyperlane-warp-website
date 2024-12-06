import { GithubRegistry } from '@hyperlane-xyz/registry';
import { ChainMap, ChainMetadata, ChainMetadataSchema } from '@hyperlane-xyz/sdk';
import { z } from 'zod';
import { PROXY_DEPLOYED_URL } from '../consts/app.ts';
import { chains as ChainsTS } from '../consts/chains.ts';
import ChainsYaml from '../consts/chains.yaml';
import { config } from '../consts/config.ts';
import { logger } from '../utils/logger';

export async function assembleChainMetadata() {
  const result = z.record(ChainMetadataSchema).safeParse({
    ...ChainsYaml,
    ...ChainsTS,
  });

  if (!result.success) {
    logger.warn('Invalid chain config', result.error);
    throw new Error(`Invalid chain config: ${result.error.toString()}`);
  }
  const customChainMetadata = result.data as ChainMap<ChainMetadata>;

  const registry = new GithubRegistry({
    uri: config.registryUrl,
    proxyUrl: PROXY_DEPLOYED_URL,
  });
  const chains = { ...customChainMetadata };

  return { chains, registry };
}
