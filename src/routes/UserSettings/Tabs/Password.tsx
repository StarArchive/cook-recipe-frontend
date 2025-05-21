import { Button, Paper, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { TbCheck, TbX } from "react-icons/tb";

import { useUserPasswordMutation } from "@/client/hooks";

const PASSWORD_FORM_CONFIG = {
  initialValues: {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  validate: {
    oldPassword: (value: string) => (!value ? "请输入当前密码" : null),
    newPassword: (value: string) => (!value ? "请输入新密码" : null),
    confirmPassword: (value: string, values: { newPassword: string }) =>
      value !== values.newPassword ? "两次输入的密码不匹配" : null,
  },
};

export default function UserSettingsPasswordTab() {
  const { trigger, isMutating } = useUserPasswordMutation();
  const passwordForm = useForm(PASSWORD_FORM_CONFIG);

  const handlePasswordUpdate = async (values: typeof passwordForm.values) => {
    const { oldPassword, newPassword } = values;

    try {
      await trigger({ oldPassword, newPassword });

      notifications.show({
        title: "密码已更新",
        message: "您的密码已成功更新",
        color: "green",
        icon: <TbCheck />,
        position: "top-center",
      });

      passwordForm.reset();
    } catch (e) {
      console.error(e);
      notifications.show({
        title: "更新失败",
        message: "无法更新密码，请稍后重试",
        color: "red",
        icon: <TbX />,
        position: "top-center",
      });
    }
  };

  return (
    <Paper withBorder p="md" radius="md">
      <form onSubmit={passwordForm.onSubmit(handlePasswordUpdate)}>
        <Stack>
          <PasswordInput
            withAsterisk
            label="旧密码"
            placeholder="输入旧密码"
            {...passwordForm.getInputProps("oldPassword")}
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
          <Button type="submit" loading={isMutating}>
            更新密码
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
