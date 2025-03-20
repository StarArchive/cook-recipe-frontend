import { Button, Paper, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { TbCheck, TbX } from "react-icons/tb";

import type { User } from "@/client/types";
import { useUserMutation } from "@/utils";

interface Props {
  user: User;
}

export default function UserSettingsEmailTab({ user }: Props) {
  const { trigger, isMutating } = useUserMutation();
  const emailForm = useForm({
    initialValues: {
      email: user.email,
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "请输入有效的电子邮箱",
    },
  });

  const handleEmailUpdate = async (values: typeof emailForm.values) => {
    try {
      await trigger({
        email: values.email,
      });

      notifications.show({
        title: "邮箱已更新",
        message: "您的邮箱地址已成功更新",
        color: "green",
        icon: <TbCheck />,
        position: "top-center",
      });
    } catch (error) {
      console.error("Error updating email:", error);
      notifications.show({
        title: "更新失败",
        message: "无法更新邮箱地址，请稍后重试",
        color: "red",
        icon: <TbX />,
        position: "top-center",
      });
    }
  };

  return (
    <Paper withBorder p="md" radius="md">
      <form onSubmit={emailForm.onSubmit(handleEmailUpdate)}>
        <Stack>
          <TextInput
            withAsterisk
            label="新邮箱地址"
            placeholder="your@email.com"
            type="email"
            {...emailForm.getInputProps("email")}
          />
          <Button type="submit" loading={isMutating}>
            更改邮箱
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
