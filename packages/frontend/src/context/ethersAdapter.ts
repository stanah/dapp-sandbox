import * as React from "react";
import { type WalletClient, useWalletClient, useAccount } from "wagmi";
import { providers } from "ethers";

export function walletClientToSigner(walletClient: WalletClient) {
  // if (contractAddress == null || !isAddress(contractAddress)) throw new Error("CONTRACT_ADDRESS is not set");
  const { address } = useAccount();
  // const { account, chain, transport } = walletClient;
  // const network = {
  //   chainId: chain.id,
  //   name: chain.name,
  //   ensAddress: chain.contracts?.ensRegistry?.address,
  // };
  // const provider = new providers.Web3Provider(transport, network);
  // const signer = provider.getSigner(account.address);
  if (!window.ethereum) return undefined;
  const provider = new providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(() => (walletClient ? walletClientToSigner(walletClient) : undefined), [walletClient]);
}
