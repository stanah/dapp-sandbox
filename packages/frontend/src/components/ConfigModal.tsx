// packages/frontend/src/components/ConfigModal.tsx

import { useState } from "react";

import { useConfig } from "@/context/ConfigProvider";

export default function ConfigModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [apiKey, setApiKey] = useState("");
  const { setConfig } = useConfig();

  const handleSave = () => {
    setConfig({ apiKey });
    onClose();
  };

  return (
    isOpen && (
      <div className="modal modal-open  z-50">
        <div className="modal-box z-50">
          <h2 className="text-xl">設定</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">APIキーを設定</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <div className="modal-action">
              <button onClick={handleSave} className="btn">
                保存
              </button>
              <button onClick={onClose} className="btn">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
