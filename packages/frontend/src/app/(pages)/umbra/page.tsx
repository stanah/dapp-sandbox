"use client";

import { Umbra, StealthKeyRegistry, UserAnnouncement } from "@umbracash/umbra-js";
import { isAddress, parseEther } from "viem";
import { ChangeEvent, useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import UserAnnouncementTable from "@/components/UserAnnouncementTable";
import { useEthersSigner } from "@/context/ethersAdapter";
import { EthersProvider } from "@umbracash/umbra-js/build/src/types";
import { useConfig } from "@/context/ConfigProvider";

const SEND_VALUE = "0.1";
const AMOUNT = parseEther(SEND_VALUE);

const scan = async (provider: EthersProvider) => {
  const signer = provider.getSigner();
  const chainId = await signer.getChainId();
  const umbra = new Umbra(provider, chainId);

  const { spendingKeyPair, viewingKeyPair } = await umbra.generatePrivateKeys(signer);
  const spendingPublicKey = spendingKeyPair.publicKeyHex;
  const viewingPrivateKey = viewingKeyPair.privateKeyHex;

  if (viewingPrivateKey == null) throw new Error("viewingPrivateKey is null");

  // 現在のブロックを取得
  const currentBlock = await provider.getBlockNumber();
  // 現在のブロックから100000ブロック前を開始ブロックとする
  const startBlock = currentBlock - 100000;
  // const startBlock = 50200000;
  // const endBlock = 50300000;
  // const overrides = { startBlock, endBlock };
  const overrides = { startBlock };

  const { userAnnouncements } = await umbra.scan(spendingPublicKey, viewingPrivateKey, overrides);
  return userAnnouncements;
};

const payment = async (provider: EthersProvider, recipient: string) => {
  if (!isAddress(recipient)) throw new Error("invalid recipient");
  const signer = provider.getSigner();
  const chainId = await signer.getChainId();
  const umbra = new Umbra(provider, chainId);
  const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const { tx, stealthKeyPair } = await umbra.send(signer, NATIVE_TOKEN_ADDRESS, AMOUNT, recipient, {});
  await tx.wait(); // transaction mined
};

const setStealthKeys = async (provider: EthersProvider) => {
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

const withdraw = async (provider: EthersProvider, randomNumber: string, tokenAddress: string, destinationAddress: string) => {
  // if (provider == null) throw new Error("provider is null");
  const signer = provider.getSigner();
  const chainId = await signer.getChainId();

  const umbra = new Umbra(provider, chainId);
  const { spendingKeyPair, viewingKeyPair } = await umbra.generatePrivateKeys(signer);
  const viewingPublicKey = viewingKeyPair.publicKeyHex;
  if (viewingPublicKey == null) throw new Error("viewingPublicKey is null");

  // Define the special address the Umbra contract uses to represent ETH
  const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  // Get the stealth private key needed for withdrawal
  const stealthKeyPair = spendingKeyPair.mulPrivateKey(randomNumber);
  const stealthPrivateKey = stealthKeyPair.privateKeyHex;
  if (stealthPrivateKey == null) throw new Error("stealthPrivateKey is null");
  // Handle withdraw based on token address
  if (tokenAddress === ETH_ADDRESS) {
    // Handle ETH withdrawal
    const tx = await umbra.withdraw(stealthPrivateKey, tokenAddress, destinationAddress);
    await tx.wait();
  } else {
    alert("WIP!!");
    // Define the sponsor address (who is relaying the transaction) and the fee they'll get
    // const sponsor = "0xAddressOfYourRelayer";
    // const sponsorFee = "123";
    // // Get a users signature to relay the withdrawal
    // const { v, r, s } = await Umbra.signWithdraw(
    //   stealthPrivateKey,
    //   chainId,
    //   umbra.chainConfig.umbraAddress,
    //   destinationAddress,
    //   tokenAddress,
    //   sponsor,
    //   sponsorFee,
    // );
    // // Relay the transaction
    // // Assume your app defines a signer called mySigner that sends the relay transaction
    // const tx = await umbra.withdrawOnBehalf(mySigner, stealthKeyPair.address, destinationAddress, tokenAddress, sponsor, sponsorFee, v, r, s);
  }
};

export default function SendEther() {
  const { address: myAddress } = useAccount();
  const [userAnnouncements, setUserAnnouncements] = useState<UserAnnouncement[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [recipent, setRecipent] = useState<string | undefined>();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [randomNumber, setRamdomNumber] = useState<string | undefined>();
  const signer = useEthersSigner();
  const provider = signer?.provider;

  const { config } = useConfig();

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

  useEffect(() => {
    process.env.INFURA_ID = config.apiKey || process.env.NEXT_PUBLIC_INFURA_ID;
  }, [config]);

  const handleRecepientChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecipent(e.target.value);
  };
  const handleAccordionClick = (accordionName: string) => {
    setActiveAccordion((prev) => (prev === accordionName ? null : accordionName));
  };

  const handleRandomNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRamdomNumber(e.target.value);
  };

  const onClickSetupAccount = async () => {
    if (provider == null) throw new Error("provider is null");
    await setStealthKeys(provider);
  };

  const onClickScan = async () => {
    if (provider == null) throw new Error("provider is null");
    const ret = await scan(provider);
    setUserAnnouncements(ret);
  };

  const onClickPayment = async () => {
    if (provider == null) throw new Error("provider is null");
    if (recipent == null) throw new Error("recipent is null");
    await payment(provider, recipent);
  };

  const onclickWithdraw = async () => {
    if (provider == null) throw new Error("provider is null");
    if (recipent == null) throw new Error("recipent is null");
    await withdraw(provider, "0", "0", recipent);
  };

  return (
    <main className="flex flex-col space-y-4 items-center justify-between p-10">
      <div className="collapse collapse-arrow  bg-base-200">
        <input type="radio" name="my-accordion-1" checked={activeAccordion === "stealthKeys"} onChange={() => handleAccordionClick("stealthKeys")} />
        <div className="collapse-title text-xl font-medium">ステルスキーの登録</div>
        <div className="collapse-content">
          <button className="btn btn-primary" disabled={!signer} onClick={onClickSetupAccount}>
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
          <select className="select select-bordered w-full max-w-xs" value={recipent} onChange={handleRecepientChange}>
            {accounts
              .filter((address) => address != myAddress)
              .map((address) => (
                <option key={address}>{address}</option>
              ))}
          </select>
          <br />
          <button className="btn btn-primary" disabled={!signer} onClick={onClickPayment}>
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
          <UserAnnouncementTable userAnnouncements={userAnnouncements} />
        </div>
      </div>
      <div className="collapse collapse-arrow  bg-base-200">
        <input type="radio" name="my-accordion-1" checked={activeAccordion === "withdraw"} onChange={() => handleAccordionClick("withdraw")} />
        <div className="collapse-title text-xl font-medium">出金</div>
        <div className="collapse-content">
          対象ランダムナンバー: &nbsp;
          <select className="select select-bordered w-full max-w-xs" value={randomNumber} onChange={handleRandomNumberChange}>
            {userAnnouncements.map((userAnnouncement) => (
              <option key={userAnnouncement.txHash}>{userAnnouncement.randomNumber}</option>
            ))}
          </select>
          <br />
          出金先アドレス: &nbsp;
          <select className="select select-bordered w-full max-w-xs" value={recipent} onChange={handleRecepientChange}>
            {accounts
              .filter((address) => address != myAddress)
              .map((address) => (
                <option key={address}>{address}</option>
              ))}
          </select>
          <br />
          <button className="btn btn-secondary" disabled={!signer} onClick={() => alert("未実装")}>
            Withdraw
          </button>
          <br />
        </div>
      </div>
    </main>
  );
}
