import { Button, Paper, PasswordInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const PASSWORD_FORM_CONFIG = {
  initialValues: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  validate: {
    currentPassword: (value: string) => (!value ? "请输入当前密码" : null),
    newPassword: (value: string) => {
      if (!value) return "请输入新密码";
      if (value.length < 8) return "密码长度至少为8位";
      if (!/[A-Z]/.test(value)) return "密码需要包含至少一个大写字母";
      if (!/[a-z]/.test(value)) return "密码需要包含至少一个小写字母";
      if (!/[0-9]/.test(value)) return "密码需要包含至少一个数字";
      return null;
    },
    confirmPassword: (value: string, values: { newPassword: string }) =>
      value !== values.newPassword ? "两次输入的密码不匹配" : null,
  },
};

export default function UserSettingsPasswordTab() {
  const [loading, setLoading] = useState(false);
  const passwordForm = useForm(PASSWORD_FORM_CONFIG);

  const handlePasswordUpdate = async (values) => {
    setLoading((prev) => ({ ...prev, password: true }));
    try {
      // Call your API to update password
      console.log("Updating password");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      notifications.show({
        title: "密码已更新",
        message: "您的密码已成功更新",
        color: "green",
        icon: <TbCheck />,
      });

      passwordForm.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      notifications.show({
        title: "更新失败",
        message: "无法更新密码，请稍后重试",
        color: "red",
        icon: <TbX />,
      });
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  return (
    <Paper withBorder p="md" radius="md">
      <form onSubmit={passwordForm.onSubmit(handlePasswordUpdate)}>
        <Stack>
          <PasswordInput
            withAsterisk
            label="当前密码"
            placeholder="输入当前密码"
            {...passwordForm.getInputProps("currentPassword")}
          />
          <PasswordInput
            withAsterisk
            label="新密码"
            placeholder="输入新密码"
            {...passwordForm.getInputProps("newPassword")}
          />
          <PasswordInput
            withAsterisk
            label="确认密码"
            placeholder="再次输入新密码"
            {...passwordForm.getInputProps("confirmPassword")}
          />
          <Text size="xs" c="dimmed">
            密码必须至少包含8个字符、一个大写字母、一个小写字母和一个数字
          </Text>
          <Button type="submit" loading={loading}>
            更新密码
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
