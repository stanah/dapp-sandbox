"use client";

import React, { useState } from "react";

interface ConfigState {
  apiKey: string;
  // 他の設定項目をここに追加します
}

const defaultConfig: ConfigState = {
  apiKey: "",
  // 他の設定項目のデフォルト値をここに設定します
};

const ConfigContext = React.createContext({
  config: defaultConfig,
  setConfig: (config: ConfigState) => {},
});

export function ConfigProvider({ children }: any) {
  // export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(defaultConfig);

  return <ConfigContext.Provider value={{ config, setConfig }}>{children}</ConfigContext.Provider>;
}

export const useConfig = () => React.useContext(ConfigContext);
