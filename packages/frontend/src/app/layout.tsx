import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Web3Modal } from "../context/Web3Modal";
import Header from "@/components/Header";
import { ConfigProvider } from "@/context/ConfigProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dapp Sandbox",
  description: "Web3Modal Example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>
          <ConfigProvider>
            <div className="flex min-h-screen flex-col">
              <header className="p-4">
                <Header />
              </header>
              <div className="flex flex-1 flex-row">
                <main className="flex-1 p-4">{children}</main>
                {/* <nav className="order-first w-32 bg-blue-100 p-4">Navigation</nav> */}
                {/* <aside className="w-32 p-4">Side</aside> */}
              </div>
              {/* <footer className="bg-blue-200 p-4">Footer</footer> */}
            </div>
          </ConfigProvider>
        </Web3Modal>
      </body>
    </html>
  );
}
