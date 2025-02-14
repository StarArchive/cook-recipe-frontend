import { useUser } from "@/hooks/useUser";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Button,
  Group,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const computedColorScheme = useComputedColorScheme("light");
  const user = useUser();

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
            {user?.userName ? (
              <>
                <Text>{user.userName}</Text>
                <ActionIcon
                  size={32}
                  variant="default"
                  aria-label="Logout"
                  onClick={user.logout}
                >
                  <TbLogout size={24} />
                </ActionIcon>
              </>
            ) : (
              <>
                <Button component={Link} to="/register" variant="subtle">
                  注册
                </Button>
                <Button component={Link} to="/login">
                  登录
                </Button>
              </>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
