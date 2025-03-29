import {
  Anchor,
  AppShell,
  Burger,
  Group,
  Text,
  TextInput,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { Link, useLocation } from "wouter";

import UserActions from "@/components/UserActions";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const computedColorScheme = useComputedColorScheme("light");
  const [, navigate] = useLocation();

  const handleSearch = () => {
    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    setSearchValue("");
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group
          className="items-center px-6 md:px-8 xl:px-12"
          h="100%"
          justify="space-between"
        >
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
            <TextInput
              placeholder="搜索食谱..."
              leftSection={<TbSearch size={16} />}
              className="w-full md:w-64 lg:w-80"
              radius="md"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
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
