import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Group,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const computedColorScheme = useComputedColorScheme("light");
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token.length > 0) setIsLogged(true);
  }, []);
  const onLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    notifications.show({
      title: "退出登录成功",
      message: "您已成功退出登录",
      color: "blue",
      position: "top-center",
    });
  };

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
            {isLogged ? (
              <Button onClick={onLogoutClick}>退出</Button>
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
