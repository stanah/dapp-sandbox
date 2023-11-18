"use client";

import { useContractRead, usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import { isAddress } from "viem";

// 新規にデプロイしたコントラクトのABIを取得する場合
// import { abi } from "../../../../../viem-sandbox/artifacts/contracts/ERC3525GettingStarted.sol/ERC3525GettingStarted.json";

// デプロイ済みのコントラクトのABIを取得する
import ERC3525GettingStarted from "../../../artifacts/contracts/ERC3525GettingStarted.sol/ERC3525GettingStarted.json";

// TODO: ネットワークに応じたコントラクトアドレスを取得する
// const contractAddress = process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS;
const contractAddress = process.env.NEXT_PUBLIC_MUMBAI_CONTRACT_ADDRESS;

export default function Page1() {
  if (contractAddress == null || !isAddress(contractAddress)) throw new Error("CONTRACT_ADDRESS is not set");
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: ERC3525GettingStarted.abi,
    functionName: "owner",
  });

  const { config, error } = usePrepareContractWrite({
    address: contractAddress,
    abi: ERC3525GettingStarted.abi,
    functionName: "mint",
    args: [address, 10, 100], // address to_, uint256 slot_, uint256 amount_
  });
  const { write } = useContractWrite(config);

  return (
    <main className="flex flex-col space-y-4 items-center justify-between p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">Page1</code>
        </p>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Contract Address</div>
          <div className="stat-value">{contractAddress}</div>
          <div className="stat-desc">実行するスマートコントラクトアドレス</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Contract Owner</div>
          <div className="stat-value">{`${data}`}</div>
          <div className="stat-desc">上記スマートコントラクトのデプロイオーナー</div>
        </div>
      </div>

      <button className="btn btn-primary" disabled={!write} onClick={() => write?.()}>
        Mint
      </button>
      {error && <div>An error occurred preparing the transaction: {error.message}</div>}
    </main>
  );
}
