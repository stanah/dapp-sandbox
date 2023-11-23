"use client";

import { Umbra, StealthKeyRegistry, UserAnnouncement } from "@umbracash/umbra-js";
import { isAddress, parseEther } from "viem";
import { ethers, providers } from "ethers";
import { ChangeEvent, useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";

process.env.INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
const SEND_VALUE = "0.1";
const AMOUNT = parseEther(SEND_VALUE);

const scan = async (provider?: providers.Web3Provider) => {
  if (provider == null) throw new Error("provider is null");
  const signer = provider.getSigner();
  const chainId = await signer.getChainId();
  const umbra = new Umbra(provider, chainId);

  const { spendingKeyPair, viewingKeyPair } = await umbra.generatePrivateKeys(signer);
  const spendingPublicKey = spendingKeyPair.publicKeyHex;
  const viewingPrivateKey = viewingKeyPair.privateKeyHex;

  console.log("after generatePrivatekeys", spendingPublicKey, viewingPrivateKey);

  if (viewingPrivateKey == null) throw new Error("viewingPrivateKey is null");

  const startBlock = 50200000;
  // const endBlock = 50300000;
  // const overrides = { startBlock, endBlock };
  const overrides = { startBlock };
  // const overrides = {};

  const { userAnnouncements } = await umbra.scan(spendingPublicKey, viewingPrivateKey, overrides);
  return userAnnouncements;
};

const payment = async (provider?: providers.Web3Provider, recipient?: string) => {
  if (provider == null) throw new Error("provider is null");
  if (recipient == null || !isAddress(recipient)) throw new Error("invalid recipient");
  const signer = provider.getSigner();
  const chainId = await signer.getChainId();
  const umbra = new Umbra(provider, chainId);
  const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const { tx, stealthKeyPair } = await umbra.send(signer, NATIVE_TOKEN_ADDRESS, AMOUNT, recipient, {});
  await tx.wait(); // transaction mined
};

const setStealthKeys = async (provider?: providers.Web3Provider) => {
  if (provider == null) throw new Error("provider is null");
  const signer = provider.getSigner();
  const chainId = await signer.getChainId();

  const umbra = new Umbra(provider, chainId);
  const registry = new StealthKeyRegistry(signer);

  const { spendingKeyPair, viewingKeyPair } = await umbra.generatePrivateKeys(signer);
  const spendingPublicKey = spendingKeyPair.publicKeyHex;
  const viewingPublicKey = viewingKeyPair.publicKeyHex;
  if (viewingPublicKey == null) throw new Error("viewingPublicKey is null");

  const tx = await registry.setStealthKeys(spendingPublicKey, viewingPublicKey, signer);
  await tx.wait(); // transaction mined
};

// userAnnouncementの内容を表示するコンポーネント
const UserAnnouncement = ({ userAnnouncement }: { userAnnouncement: UserAnnouncement }) => {
  return (
    <div>
      <p>ランダムナンバー: {userAnnouncement.randomNumber}</p>
      <p>受信者: {userAnnouncement.receiver}</p>
      <p>金額: {ethers.utils.formatEther(userAnnouncement.amount)}</p>
      <p>トークン: {userAnnouncement.token}</p>
      <p>送信者: {userAnnouncement.from}</p>
      <p>トランザクションハッシュ: {userAnnouncement.txHash}</p>
      <p>タイムスタンプ: {new Date(Number(userAnnouncement.timestamp) * 1000).toISOString()}</p>
      <p>引き出し済み: {userAnnouncement.isWithdrawn ? "はい" : "いいえ"}</p>
    </div>
  );
};

export default function SendEther() {
  if (typeof window == "undefined" || !window.ethereum) throw new Error("no window.ethereum");

  const { address: myAddress } = useAccount();
  const [userAnnouncements, setUserAnnouncements] = useState<UserAnnouncement[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [recipent, setRecipent] = useState<string | undefined>();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const provider = new providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const { data: walletClient, isError, isLoading } = useWalletClient();
  useEffect(() => {
    async function exec() {
      if (walletClient == null) return;
      const accounts = await walletClient.getAddresses();
      if (accounts.length == 0) return;
      setAccounts(accounts);
      setRecipent(accounts[0]);
    }
    exec();
  }, [walletClient]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecipent(e.target.value);
  };
  const handleAccordionClick = (accordionName: string) => {
    setActiveAccordion((prev) => (prev === accordionName ? null : accordionName));
  };

  const onClickScan = async () => {
    const ret = await scan(provider);
    setUserAnnouncements(ret);
  };

  return (
    <main className="flex flex-col space-y-4 items-center justify-between p-10">
      <div className="collapse collapse-arrow  bg-base-200">
        <input type="radio" name="my-accordion-1" checked={activeAccordion === "stealthKeys"} onChange={() => handleAccordionClick("stealthKeys")} />
        <div className="collapse-title text-xl font-medium">ステルスキーの登録</div>
        <div className="collapse-content">
          <button className="btn btn-primary" disabled={!signer} onClick={async () => await setStealthKeys(provider)}>
            SetupAccount
          </button>
        </div>
      </div>
      <div className="collapse collapse-arrow  bg-base-200">
        <input type="radio" name="my-accordion-1" checked={activeAccordion === "payment"} onChange={() => handleAccordionClick("payment")} />
        <div className="collapse-title text-xl font-medium">送金</div>
        <div className="collapse-content">
          送金額(固定): &nbsp; {SEND_VALUE}
          <br />
          受け取りアドレス: &nbsp;
          <select className="select select-bordered w-full max-w-xs" value={recipent} onChange={handleChange}>
            {accounts
              .filter((address) => address != myAddress)
              .map((address) => (
                <option key={address}>{address}</option>
              ))}
          </select>
          &nbsp;
          <button className="btn btn-primary" disabled={!signer} onClick={async () => await payment(provider, recipent)}>
            Send
          </button>
        </div>
      </div>
      <div className="collapse collapse-arrow  bg-base-200">
        <input type="radio" name="my-accordion-1" checked={activeAccordion === "scan"} onChange={() => handleAccordionClick("scan")} />
        <div className="collapse-title text-xl font-medium">スキャン</div>
        <div className="collapse-content">
          <button className="btn btn-secondary" disabled={!signer} onClick={onClickScan}>
            Scan
          </button>
          <br />
          {userAnnouncements.map((userAnnouncement) => (
            <UserAnnouncement userAnnouncement={userAnnouncement} />
          ))}
        </div>
      </div>
    </main>
  );
}
