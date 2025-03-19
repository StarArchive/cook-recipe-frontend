import { Avatar, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

import { getImageUrl } from "@/client";
import RootLayout from "@/layouts/RootLayout";
import { useUser, useUserProfile } from "@/utils";

interface Props {
  id: string;
}

export default function UserPage({ id }: Props) {
  const { user } = useUser(id);
  const { profile } = useUserProfile(id);

  if (!user || !profile) return <RootLayout>Loading...</RootLayout>;

  return (
    <RootLayout>
      <div className="mx-auto flex max-w-5xl flex-row gap-4 px-4 py-8">
        <div className="relative h-32 w-32 rounded-full">
          {profile.avatar ? (
            <Avatar
              src={getImageUrl(profile.avatar).toString()}
              alt={user.name}
              h="100%"
              w="100%"
            />
          ) : (
            <div className="absolute inset-0 animate-pulse rounded-full bg-gray-200" />
          )}
        </div>

        <Stack gap="xs" justify="center">
          <Title order={1}>{user.name}</Title>
          <Text c="dimmed">
            {dayjs(user.createdAt).format("YYYY-MM-DD")}&nbsp;加入
          </Text>
          <Text c="dimmed">
            {profile.bio || "是否输入一些东西来证明自己存在过"}
          </Text>
        </Stack>
      </div>
    </RootLayout>
  );
}
