"use client";

import { useRouter } from "next/navigation";
export default function Page2({ params, searchParams }: any) {
  const router = useRouter();
  return (
    <main className="flex flex-col space-y-4 items-center justify-between p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">Page2&nbsp;{`リスト`}</code>
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover cursor-pointer" onClick={() => router.push("/page2/1")}>
              <th>1</th>
              <td>Token 1</td>
            </tr>
            {/* row 2 */}
            <tr className="hover cursor-pointer" onClick={() => router.push("/page2/2")}>
              <th>2</th>
              <td>Token 2</td>
            </tr>
            {/* row 3 */}
            <tr className="hover cursor-pointer" onClick={() => router.push("/page2/3")}>
              <th>3</th>
              <td>Token 3</td>
            </tr>
          </tbody>
        </table>
      </div>
      ※このデータはダミーです
    </main>
  );
}
