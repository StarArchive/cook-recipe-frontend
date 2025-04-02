import {
  Avatar,
  Box,
  Button,
  Divider,
  FileInput,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMemo, useState } from "react";
import { TbCheck, TbUpload, TbX } from "react-icons/tb";

import { getImageUrl, uploadFile } from "@/client";
import { useUserMutation } from "@/client/hooks";
import type { User, UserProfile } from "@/client/types";

interface Props {
  user: User;
  profile: UserProfile;
}

export default function UserSettingsProfileTab({ user, profile }: Props) {
  const { isMutating, trigger } = useUserMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const avatarUrl = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    if (profile.avatar) return getImageUrl(profile.avatar).toString();

    return null;
  }, [selectedFile, profile]);

  const profileForm = useForm({
    initialValues: {
      name: user.name || "",
      nickname: user.nickname || "",
      bio: profile.bio || "",
    },
  });

  const handleProfileUpdate = async (values: typeof profileForm.values) => {
    try {
      await trigger({
        name: values.name,
        nickname: values.nickname,
        profile: { bio: values.bio },
      });
      notifications.show({
        title: "个人资料已更新",
        message: "您的个人资料信息已成功更新",
        color: "green",
        icon: <TbCheck />,
        position: "top-center",
      });
    } catch (e) {
      console.error(e);
      notifications.show({
        title: "更新失败",
        message: "无法更新个人资料，请稍后重试",
        color: "red",
        icon: <TbX />,
        position: "top-center",
      });
    }
  };

  const updateAvatar = async () => {
    if (!selectedFile) return;

    const uploaded = await uploadFile(selectedFile);
    try {
      await trigger({ profile: { avatar: `/uploads/${uploaded.filename}` } });
      notifications.show({
        title: "头像已更新",
        message: "您的头像已成功更新",
        color: "green",
        icon: <TbCheck />,
        position: "top-center",
      });
    } catch (e) {
      console.error(e);
      notifications.show({
        title: "更新失败",
        message: "无法更新头像，请稍后重试",
        color: "red",
        icon: <TbX />,
        position: "top-center",
      });
    }
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Box mb={24}>
        <Text fw={500} size="lg" mb="xs">
          头像
        </Text>
        <Group>
          <Avatar src={avatarUrl} size={100} radius={100} />
          <div>
            <FileInput
              placeholder="选择图片"
              accept="image/png,image/jpeg,image/gif"
              leftSection={<TbUpload size={14} />}
              value={selectedFile}
              onChange={setSelectedFile}
              clearable
              mb="xs"
            />
            <Text size="xs" c="dimmed">
              支持JPG, PNG或GIF格式，最大文件大小为5MB
            </Text>
            <Button
              variant="light"
              mt="xs"
              size="xs"
              disabled={!selectedFile}
              loading={isMutating}
              onClick={() => updateAvatar()}
            >
              上传头像
            </Button>
          </div>
        </Group>
      </Box>

      <Divider my="md" />

      <form onSubmit={profileForm.onSubmit(handleProfileUpdate)}>
        <Stack>
          <TextInput
            label="用户名"
            placeholder="设置您的用户名"
            {...profileForm.getInputProps("name")}
          />
          <TextInput
            label="显示名称"
            placeholder="设置您的显示名称"
            {...profileForm.getInputProps("nickname")}
          />
          <TextInput
            label="个人简介"
            placeholder="是否输入一些东西来证明自己存在过"
            {...profileForm.getInputProps("bio")}
          />
          <Button type="submit" loading={isMutating}>
            保存更改
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
