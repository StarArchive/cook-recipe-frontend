import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import useSWRMutation from "swr/mutation";
import { useLocation } from "wouter";

import { login } from "@/client";

interface Props {
  className?: string;
}

const LOGIN_FORM_CONFIG = {
  mode: "uncontrolled",
  initialValues: {
    email: "",
    password: "",
  },
  validate: {
    email: (value: string) =>
      /^\S+@\S+\.\S+$/.test(value) ? null : "无效邮箱",
    password: (value: string) => (value.length >= 6 ? null : "密码至少6位"),
  },
} as const;

export default function LoginForm({ className }: Props) {
  const [, navigate] = useLocation();
  const form = useForm(LOGIN_FORM_CONFIG);

  const { trigger, isMutating } = useSWRMutation(
    "/auth/login",
    (_url, { arg }: { arg: typeof form.values }) => login(arg),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.accessToken);

        notifications.show({
          title: "登录成功",
          message: "欢迎回来！\n即将跳转到首页",
          color: "green",
          position: "top-center",
          autoClose: 1500,
        });
        navigate("/");
      },
    },
  );

  return (
    <form
      className={className}
      onSubmit={form.onSubmit((values) => trigger(values))}
    >
      <TextInput
        withAsterisk
        label="邮箱"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <PasswordInput
        label="密码"
        placeholder="请输入密码"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <Group justify="flex-end" mt="md">
        <Button disabled={isMutating} fullWidth type="submit">
          提交
        </Button>
      </Group>
    </form>
  );
}
