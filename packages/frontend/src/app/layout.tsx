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

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  fontFamilyMonospace: "Monaco, Courier, monospace",
  // fontFamilyMonospace:""
  colors: {
    custom: ["#f6eeff", "#e7daf7", "#cab1ea", "#ad86dd", "#9562d2", "#854bcb", "#7d3ec9", "#6b31b2", "#5f2aa0", "#52228d"],
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
