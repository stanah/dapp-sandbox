// packages/frontend/src/components/ConfigModal.tsx
"use client";
import { useState } from "react";
import { useConfig } from "@/context/ConfigProvider";
import { Modal, TextInput, Button, Group } from "@mantine/core";

export default function ConfigModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const [apiKey, setApiKey] = useState("");
  const { setConfig } = useConfig();

  const handleSave = () => {
    setConfig({ apiKey });
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="設定" centered>
      <TextInput
        label="APIキーを設定"
        placeholder="APIキーを入力してください"
        value={apiKey}
        onChange={(event) => setApiKey(event.currentTarget.value)}
        mb="md"
      />
      <Group justify="flex-end">
        <Button onClick={onClose} variant="outline">
          キャンセル
        </Button>
        <Button onClick={handleSave}>保存</Button>
      </Group>
    </Modal>
  );
}
