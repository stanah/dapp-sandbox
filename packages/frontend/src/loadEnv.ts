const requiredEnvVars = [
  "NEXT_PUBLIC_AMOY_CONTRACT_ADDRESS",
  "NEXT_PUBLIC_WC_PROJECT_ID",
  // 他の必要な環境変数をここに追加
] as const;

type EnvVar = (typeof requiredEnvVars)[number];

export function checkEnvVars(): void {
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `以下の環境変数が設定されていません: ${missingEnvVars.join(", ")}\n` + "アプリケーションを実行する前に、これらの環境変数を設定してください。",
    );
  }
}

export function getEnvVar(key: EnvVar): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`環境変数 ${key} が設定されていません。`);
  }
  return value;
}
