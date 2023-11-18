import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Web3Modal } from "../context/Web3Modal";
import Header from "@/components/Header";

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
          <div className="flex flex-col h-screen">
            <div className="sticky top-0">
              <Header />
            </div>
            <div className="flex-grow">{children}</div>
            {/* <div className="bg-blue-500 sticky bottom-0">footer</div> */}
          </div>
        </Web3Modal>
      </body>
    </html>
  );
}
