import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

import { config as dotenvConfig } from "dotenv";
import path from "path";

dotenvConfig({ path: path.resolve(__dirname, "../../.env") });

// 10000ETHをweiに変換した値
const valueInWei = "10000000000000000000000";

// デプロイに使う秘密鍵
const deployPrivateKey = process.env.DEPLOY_PRIVATE_KEY;
if (deployPrivateKey == null || deployPrivateKey.length == 0) throw new Error("DEPLOY_PRIVATE_KEY is not set");

const POLYGON_SCAN_API_KEY = process.env.POLYGON_SCAN_API_KEY;
if (POLYGON_SCAN_API_KEY == null) throw new Error("POLYGON_SCAN_API_KEY is not set");

// テストアカウント用の秘密鍵
const privateKey0 = process.env.PRIVATE_KEY_0 || "";
const privateKey1 = process.env.PRIVATE_KEY_1 || "";
const privateKey2 = process.env.PRIVATE_KEY_2 || "";
const privateKey3 = process.env.PRIVATE_KEY_3 || "";
const privateKey4 = process.env.PRIVATE_KEY_4 || "";
const privateKey5 = process.env.PRIVATE_KEY_5 || "";
const privateKey6 = process.env.PRIVATE_KEY_6 || "";
const privateKey7 = process.env.PRIVATE_KEY_7 || "";
const privateKey8 = process.env.PRIVATE_KEY_8 || "";
const privateKey9 = process.env.PRIVATE_KEY_9 || "";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: [
        { privateKey: deployPrivateKey, balance: valueInWei },
        { privateKey: privateKey0, balance: valueInWei },
        { privateKey: privateKey1, balance: valueInWei },
        { privateKey: privateKey2, balance: valueInWei },
        { privateKey: privateKey3, balance: valueInWei },
        { privateKey: privateKey4, balance: valueInWei },
        { privateKey: privateKey5, balance: valueInWei },
        { privateKey: privateKey6, balance: valueInWei },
        { privateKey: privateKey7, balance: valueInWei },
        { privateKey: privateKey8, balance: valueInWei },
        { privateKey: privateKey9, balance: valueInWei },
      ],
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      accounts: [deployPrivateKey],
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [deployPrivateKey],
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.22",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100000,
          },
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGON_SCAN_API_KEY,
    },
  },
};

export default config;
