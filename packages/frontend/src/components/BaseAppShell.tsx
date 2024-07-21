import { AppShell } from "@mantine/core";

export default function BaseAppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 60 }}
      // navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        hoge
        {/* <Header /> */}
      </AppShell.Header>
      {/* <AppShell.Navbar p="md">
                  Navbar
                  {Array(15)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
                </AppShell.Navbar> */}
      <AppShell.Main>fuga</AppShell.Main>
    </AppShell>
  );
}
