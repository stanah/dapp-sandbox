import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider, createTheme, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";

import Header from "@/components/Header";
import { ConfigProvider } from "@/context/ConfigProvider";
import { Web3Provider } from "@/context/Web3Provider";
import { checkEnvVars } from "@/loadEnv";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dapp Sandbox",
  description: "Web3Modal Example",
};

const theme = createTheme({
  /** Put your mantine theme override here */
});

// 環境変数をチェック
checkEnvVars();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider>
          <Web3Provider>
            <MantineProvider theme={theme}>
              <AppShell
                header={{ height: 60 }}
                // navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
                padding="md"
              >
                <AppShell.Header>
                  hoge
                  {/* <Header /> */}
                </AppShell.Header>
                {/* <AppShell.Navbar p="md">
                  Navbar
                  {Array(15)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
                </AppShell.Navbar> */}
                <AppShell.Main>fuga</AppShell.Main>
              </AppShell>
            </MantineProvider>
          </Web3Provider>
        </ConfigProvider>
      </body>
    </html>
  );
}
