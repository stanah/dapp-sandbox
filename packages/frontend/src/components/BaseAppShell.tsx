"use client";
import { ActionIcon, AppShell, Burger, Button, Group } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import { useDisclosure } from "@mantine/hooks";
import ConfigModal from "./ConfigModal";

export default function BaseAppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // const [isModalOpen, setModalOpen] = useState(false);
  const [configOpened, { toggle: configToggle, close: configClose }] = useDisclosure();
  // const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      // navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
          {/* <Image src="logo.png" h="100%" p={8} /> */}
          APP
          <Group h="100%" px="md" justify="space-between">
            <Button variant="subtle" onClick={() => router.push("/mint-token")}>
              トークン発行ページ
            </Button>
            <Button variant="subtle" onClick={() => router.push("/tokens")}>
              トークン一覧
            </Button>
          </Group>
          <Group h="100%" px="md" justify="space-between">
            <ConfigModal opened={configOpened} onClose={configClose} />
            <ActionIcon onClick={configToggle} variant="subtle" size="xl">
              <IconSettings />
            </ActionIcon>

            <ConnectKitButton />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
