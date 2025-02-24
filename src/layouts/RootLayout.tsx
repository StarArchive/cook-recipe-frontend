import {
  Anchor,
  AppShell,
  Burger,
  Group,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "wouter";

import UserActions from "@/components/UserActions";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const computedColorScheme = useComputedColorScheme("light");

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Anchor
              c={computedColorScheme === "dark" ? "gray" : "dark"}
              component={Link}
              to="/"
              underline="never"
            >
              <Text size="lg">在线食谱</Text>
            </Anchor>
          </Group>
          <Group>
            <UserActions />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main className="pb-20">{children}</AppShell.Main>
    </AppShell>
  );
}
