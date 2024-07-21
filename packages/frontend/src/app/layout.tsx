import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MantineColorsTuple, MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

import { ConfigProvider } from "@/context/ConfigProvider";
import { Web3Provider } from "@/context/Web3Provider";
import { checkEnvVars } from "@/loadEnv";
import BaseAppShell from "@/components/BaseAppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dapp Sandbox",
  description: "Web3Modal Example",
};

const myColor: MantineColorsTuple = ["#f6eeff", "#e7daf7", "#cab1ea", "#ad86dd", "#9562d2", "#854bcb", "#7d3ec9", "#6b31b2", "#5f2aa0", "#52228d"];
// ["#eef3ff", "#dce4f5", "#b9c7e2", "#94a8d0", "#748dc1", "#5f7cb8", "#5474b4", "#44639f", "#39588f", "#2d4b81"];

const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    custom: myColor,
  },
  primaryColor: "custom",
});

// 環境変数をチェック
checkEnvVars();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider>
          <Web3Provider>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
              <BaseAppShell>{children}</BaseAppShell>
            </MantineProvider>
          </Web3Provider>
        </ConfigProvider>
      </body>
    </html>
  );
}
