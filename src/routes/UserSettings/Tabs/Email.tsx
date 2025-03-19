import {
  Alert,
  Button,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { TbCheck, TbInfoCircle, TbX } from "react-icons/tb";

import type { User } from "@/client/types";

interface Props {
  user: User;
}

export default function UserSettingsEmailTab({ user }: Props) {
  const [loading, setLoading] = useState({ email: false });
  const emailForm = useForm({
    initialValues: {
      email: user.email,
      currentPassword: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "请输入有效的电子邮箱",
      currentPassword: (value) => (!value ? "请输入当前密码以验证身份" : null),
    },
  });

  const handleEmailUpdate = async (values: typeof emailForm.values) => {
    setLoading((prev) => ({ ...prev, email: true }));
    try {
      // Call your API to update email
      console.log("Updating email with:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifications.show({
        title: "邮箱已更新",
        message: "您的邮箱地址已成功更新",
        color: "green",
        icon: <TbCheck />,
      });
    } catch (error) {
      console.error("Error updating email:", error);
      notifications.show({
        title: "更新失败",
        message: "无法更新邮箱地址，请稍后重试",
        color: "red",
        icon: <TbX />,
      });
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <Paper withBorder p="md" radius="md">
      <form onSubmit={emailForm.onSubmit(handleEmailUpdate)}>
        <Stack>
          <Alert icon={<TbInfoCircle />} color="blue" variant="light" mb="md">
            更改邮箱需要验证您的身份，请输入当前密码。
          </Alert>
          <TextInput
            withAsterisk
            label="新邮箱地址"
            placeholder="your@email.com"
            type="email"
            {...emailForm.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="当前密码"
            placeholder="输入当前密码以验证身份"
            {...emailForm.getInputProps("currentPassword")}
          />
          <Button type="submit" loading={loading.email}>
            更改邮箱
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
