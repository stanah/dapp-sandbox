`.env`ファイルを編集する (ファイル内コメント参照)

```bash
cp .env.example .env
vim .env
```

```bash
cd packages/viem-sandbox
# yarn install

# ローカルノード立ち上げ
npx hardhat node

# スマートコントラクトをデプロイ
npx hardhat run --network localhost scripts/deploy.ts
# npx hardhat run --network mumbai scripts/deploy.ts

cd ../frontend
# yarn install

yarn dev

```
