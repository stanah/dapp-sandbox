"use client";

import { useRouter } from "next/navigation";
import ConnectButton from "./ConnectButton";

export default function Header() {
  const router = useRouter();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a onClick={() => router.push("/")} className="btn btn-ghost text-xl">
          App
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => router.push("/page1")}>トークン発行ページ</a>
          </li>
          <li>
            <a onClick={() => router.push("/page2")}>トークン一覧</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ConnectButton />
      </div>
    </div>
  );
}
