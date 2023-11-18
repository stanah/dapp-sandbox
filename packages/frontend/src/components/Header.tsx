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
            <a onClick={() => router.push("/page1")}>Page 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Page 2</summary>
              <ul className="p-2">
                <li>
                  <a onClick={() => router.push("/page2/1")}>ID: 1</a>
                </li>
                <li>
                  <a onClick={() => router.push("/page2/2")}>ID: 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ConnectButton />
      </div>
    </div>
  );
}
