import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
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
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const form = useForm(LOGIN_FORM_CONFIG);
  const [isPending, startTransition] = useTransition();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["users/me"] });

      notifications.show({
        title: "登录成功",
        message: "欢迎回来！\n即将跳转到首页",
        color: "green",
        position: "top-center",
        autoClose: 1500,
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: "登录失败",
        message: error.message || "未知错误",
        color: "red",
        position: "top-center",
      });
      console.error(error);
    },
  });

  async function handleSubmit(values: typeof form.values) {
    startTransition(async () => {
      await mutation.mutateAsync(values);
    });
  }

  return (
    <form className={className} onSubmit={form.onSubmit(handleSubmit)}>
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
        <Button disabled={isPending} fullWidth type="submit">
          提交
        </Button>
      </Group>
    </form>
  );
}
