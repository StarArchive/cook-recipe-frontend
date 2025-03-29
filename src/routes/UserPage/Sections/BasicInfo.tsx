import { Avatar, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";

import { getImageUrl } from "@/client";
import type { User, UserProfile } from "@/client/types";
import { getUserDisplayName } from "@/utils";

interface Props {
  user: User;
  profile: UserProfile;
}

export default function UserPageBasicInfo({ user, profile }: Props) {
  const avatarUrl = useMemo(
    () => profile.avatar && getImageUrl(profile.avatar).toString(),
    [profile.avatar],
  );
  const displayName = useMemo(() => getUserDisplayName(user), [user]);
  const joinedAt = useMemo(
    () => dayjs(user.createdAt).format("YYYY-MM-DD"),
    [user.createdAt],
  );

  return (
    <div className="flex flex-row gap-4 px-4 py-8">
      <div className="relative h-32 w-32 rounded-full">
        {profile.avatar ? (
          <Avatar src={avatarUrl} alt={displayName} h="100%" w="100%" />
        ) : (
          <div className="absolute inset-0 animate-pulse rounded-full bg-gray-200" />
        )}
      </div>

      <Stack gap="xs" justify="center">
        <Title order={1}>{displayName}</Title>
        <Text c="dimmed">{joinedAt}&nbsp;加入</Text>
        <Text c="dimmed">{profile.bio}</Text>
      </Stack>
    </div>
  );
}
