"use client";

import { useAccount, useReadContract } from "wagmi";
import { readContract } from "@wagmi/core";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import ERC3525GettingStarted from "../../../artifacts/contracts/ERC3525GettingStarted.sol/ERC3525GettingStarted.json";
import { getEnvVar } from "@/loadEnv";
import { config } from "@/config";

// TODO: ネットワークに応じたコントラクトアドレスを取得する
// const contractAddress = process.env.NEXT_PUBLIC_LOCALHOST_CONTRACT_ADDRESS;
// const contractAddress = process.env.NEXT_PUBLIC_AMOY_CONTRACT_ADDRESS;
const CONTRACT_ADDRESS = getEnvVar("NEXT_PUBLIC_AMOY_CONTRACT_ADDRESS");
interface Token {
  id: number;
  name: string;
}

export default function Tokens() {
  const router = useRouter();
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
        const owner = await readContract(config, {
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: ERC3525GettingStarted.abi,
          functionName: "ownerOf",
          args: [id],
        });

        if (owner === address) {
          return { id, name: `${tokenName} #${id}` };
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
      <div className="overflow-x-auto">
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.id} className="hover cursor-pointer" onClick={() => router.push(`/tokens/${token.id}`)}>
                  <th>{token.id}</th>
                  <td>{token.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!loading && tokens.length === 0 && <p>トークンがありません</p>}
    </main>
  );
}
