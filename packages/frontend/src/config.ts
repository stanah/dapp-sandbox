import { createConfig, http } from "wagmi";
import { polygon, polygonAmoy } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_WC_PROJECT_ID is not set");
}

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [polygon, polygonAmoy],
    transports: {
      [polygon.id]: http(),
      [polygonAmoy.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
