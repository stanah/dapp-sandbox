"use client";

import { formatEther } from "ethers";

import { UserAnnouncement } from "@umbracash/umbra-js";

function truncateString(str: string, preNum: number = 6, sufNum: number = 4) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= preNum + sufNum + 3) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, preNum) + "..." + str.slice(-sufNum);
}

function CopyButton({ value }: { value: string }) {
  return (
    <button className="btn btn-xs" onClick={() => navigator.clipboard.writeText(value)}>
      {copySvg}
    </button>
  );
}

const copySvg = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
    />
  </svg>
);

// userAnnouncementの内容を表示するコンポーネント
const UserAnnouncementRow = ({ userAnnouncement }: { userAnnouncement: UserAnnouncement }) => {
  return (
    <tr>
      <td>
        {truncateString(userAnnouncement.randomNumber)}
        <CopyButton value={userAnnouncement.randomNumber} />
      </td>
      <td>
        {truncateString(userAnnouncement.receiver)}
        <CopyButton value={userAnnouncement.receiver} />
      </td>
      <td>{formatEther(userAnnouncement.amount.toString())} MATIC</td>
      <td>
        {truncateString(userAnnouncement.token)}
        <CopyButton value={userAnnouncement.token} />
      </td>
      <td>
        {truncateString(userAnnouncement.from)}
        <CopyButton value={userAnnouncement.from} />
      </td>
      <td>
        {truncateString(userAnnouncement.txHash)}
        <CopyButton value={userAnnouncement.txHash} />
      </td>
      <td>
        {new Date(Number(userAnnouncement.timestamp) * 1000).toLocaleString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </td>
      {/* <td>{new Date(Number(userAnnouncement.timestamp) * 1000).toISOString()} </td> */}
      <td>{userAnnouncement.isWithdrawn ? "はい" : "いいえ"}</td>
    </tr>
  );
};

export default function UserAnnouncementTable({ userAnnouncements }: { userAnnouncements: UserAnnouncement[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ランダムナンバー</th>
            <th>受信者</th>
            <th>金額</th>
            <th>トークン</th>
            <th>送信者</th>
            <th>トランザクションハッシュ</th>
            <th>タイムスタンプ</th>
            <th>引き出し済み</th>
          </tr>
        </thead>
        <tbody>
          {userAnnouncements.map((userAnnouncement) => (
            <UserAnnouncementRow key={userAnnouncement.txHash} userAnnouncement={userAnnouncement} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
