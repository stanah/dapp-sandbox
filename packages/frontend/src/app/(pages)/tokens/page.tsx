"use client";

import { useAccount, useReadContract } from "wagmi";
import { readContracts, readContract } from "@wagmi/core";
import { useState, useEffect } from "react";

import ERC3525GettingStarted from "../../../artifacts/contracts/ERC3525GettingStarted.sol/ERC3525GettingStarted.json";
import { config } from "@/config";
import { Token } from "@/types";
import TokenList from "@/components/TokenList";
import { ContractFunctionParameters } from "viem";

// TODO: ネットワークに応じたコントラクトアドレスを取得する
// const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_AMOY_CONTRACT_ADDRESS;
// const CONTRACT_ADDRESS = getEnvVar("NEXT_PUBLIC_AMOY_CONTRACT_ADDRESS");

export default function Tokens() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC3525GettingStarted.abi,
    functionName: "totalSupply",
  });

  const { data: tokenName } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: ERC3525GettingStarted.abi,
    functionName: "name",
  });

  useEffect(() => {
    const fetchTokens = async () => {
      if (!address || !totalSupply) return;

      const tokenIds = Array.from({ length: Number(totalSupply) }, (_, i) => i + 1);
      const tokenPromises = tokenIds.map(async (id) => {
        const contract = {
          functionName: "",
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: ERC3525GettingStarted.abi,
        } as ContractFunctionParameters;

        const result = await readContracts(config, {
          contracts: [
            { ...contract, functionName: "ownerOf", args: [id] },
            { ...contract, functionName: "slotOf", args: [id] },
            { ...contract, functionName: "balanceOf", args: [id] },
            { ...contract, functionName: "tokenURI", args: [id] },
          ],
        });
        if (result[0].status !== "success") return null;
        if (result[0].result === address) {
          const token: Token = {
            id,
            owner: result[0].result,
            slot: Number(result[1].result) as number,
            value: Number(result[2].result) as number,
            tokenUri: result[3].result as string,
          };
          return token;
        }
        return null;
      });

      const userTokens = (await Promise.all(tokenPromises)).filter((token): token is Token => token !== null);
      setTokens(userTokens);
      setLoading(false);
    };

    fetchTokens();
  }, [address, totalSupply, tokenName]);

  return (
    <main className="flex flex-col space-y-4 items-center justify-between p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">トークン一覧</code>
        </p>
      </div>
      <div className="overflow-x-auto">{loading ? <p>読み込み中...</p> : <TokenList tokens={tokens}></TokenList>}</div>
      {!loading && tokens.length === 0 && <p>トークンがありません</p>}
    </main>
  );
}
