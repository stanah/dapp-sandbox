# DAppを色々試してみる

## やったこと / TODO

- ethers v6とviemを試す
- ERC3525リファレンス実装をデプロイ / トークン発行
- umbra-protocol
  - Polygon mainnetで動作確認
  - キー登録, 送金, スキャン
  - TODO
    - WithDraw
    - ローカル環境/テストネット環境でumbra-protocolを試す (スマートコントラクトのデプロイ)

## セットアップ

```bash
# `.env`ファイルを編集する (ファイル内コメント参照)
cp .env.example .env
vim .env

cd packages/viem-sandbox
# yarn install

# ローカルノード立ち上げ
npx hardhat node

# スマートコントラクトをデプロイ
npx hardhat run --network localhost scripts/deploy.ts
# npx hardhat run --network mumbai scripts/deploy.ts

cd ../frontend
# yarn install

# フロントエンド用の環境変数ファイルを編集する
cp .env.example .env
vim .env

yarn dev

```

コントラクトのverify

```bash
npx hardhat verify --network mumbai 0xee0a1a5f575ca95ec6b73c605667216954c46bb0 0x2d77A7210ffb43DF7Ea8Ac5d3d8d38d06F14a973
```

---

Next steps:

1. Run `graph auth` to authenticate with your deploy key.

2. Type `cd sandbox` to enter the subgraph.

3. Run `yarn deploy` to deploy the subgraph.

Make sure to visit the documentation on https://thegraph.com/docs/ for further information.
