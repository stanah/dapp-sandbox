`.env`ファイル

```bash
PRIVATE_KEY_0=0x...
PRIVATE_KEY_1=0x...
# ...
PRIVATE_KEY_9=0x...
NEXT_PUBLIC_WC_PROJECT_ID=xxx # WalletConnectのプロジェクトID
CONTRACT_ADDRESS=xxx # スマートコントラクトをデプロイ後に取得して書き込む
```

```bash
cd packages/viem-sandbox
# yarn install

# ローカルノード立ち上げ
npx hardhat node

# スマートコントラクトをデプロイ
npx hardhat run --network localhost scripts/deploy.ts

cd ../frontend
# yarn install

yarn dev

```
