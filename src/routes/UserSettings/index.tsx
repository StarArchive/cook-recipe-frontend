import { Container, Tabs, Title } from "@mantine/core";
import { TbLock, TbMail, TbUser } from "react-icons/tb";

import type { User, UserProfile } from "@/client/types";
import RootLayout from "@/layouts/RootLayout";
import { useCurrentUser, useUserProfile } from "@/utils";

import EmailTab from "./Tabs/email";
import PasswordTab from "./Tabs/password";
import ProfileTab from "./Tabs/profile";

const settingsTab = {
  defaultValue: "profile",
  items: [
    {
      value: "profile",
      label: "个人资料",
      icon: <TbUser size={16} />,
      panel: (user: User, profile: UserProfile) => (
        <ProfileTab user={user} profile={profile} />
      ),
    },
    {
      value: "email",
      label: "邮箱设置",
      icon: <TbMail size={16} />,
      panel: (user: User) => <EmailTab user={user} />,
    },
    {
      value: "password",
      label: "密码设置",
      icon: <TbLock size={16} />,
      panel: () => <PasswordTab />,
    },
  ],
};

export default function UserSettings() {
  const { user } = useCurrentUser();
  const { profile } = useUserProfile(user?.id.toString());

  return (
    <RootLayout>
      <Container size="md" py="xl">
        <Title order={2} mb="lg">
          账户设置
        </Title>

        <Tabs defaultValue={settingsTab.defaultValue}>
          <Tabs.List>
            {settingsTab.items.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                leftSection={tab.icon}
              >
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {user &&
            profile &&
            settingsTab.items.map((tab) => (
              <Tabs.Panel key={tab.value} value={tab.value} pt="xl">
                {tab.panel(user, profile)}
              </Tabs.Panel>
            ))}
        </Tabs>
      </Container>
    </RootLayout>
  );
}
