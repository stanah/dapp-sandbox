"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConnectButton from "./ConnectButton";
import ConfigModal from "./ConfigModal";

export default function Header() {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
            <a onClick={() => router.push("/tokens")}>トークン一覧</a>
          </li>
          <li>
            <a onClick={() => router.push("/umbra")}>Umbra送金</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ConfigModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <button onClick={handleOpenModal} className="btn btn-ghost">
          設定
        </button>
        <ConnectButton />
      </div>
    </div>
  );
}
