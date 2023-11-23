"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai, hardhat } from "viem/chains";

const PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
if (PROJECT_ID === undefined) throw new Error("WC_PROJECT_ID is undefined");
// 1. Get projectId
const projectId = PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, polygon, polygonMumbai, hardhat];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
