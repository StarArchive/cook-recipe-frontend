import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";

import { register } from "@/client";

const REGISTER_FORM_CONFIG = {
  mode: "uncontrolled",
  initialValues: {
    name: "",
    email: "",
    acceptTOS: false,
    password: "",
    password2: "",
  },

  validate: {
    email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "无效邮箱"),
    acceptTOS: (value: boolean) => (value ? null : "请同意使用协议"),
    password: (value: string) => (value.length >= 6 ? null : "密码至少6位"),
    password2: (value: string, values: { password: string }) => {
      return value === values.password ? null : "两次密码不一致";
    },
  },
} as const;

export default function RegisterForm() {
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const form = useForm(REGISTER_FORM_CONFIG);
  const [pending, setPending] = useState(false);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["users/me"] });

      notifications.show({
        title: "注册成功",
        message: "欢迎回来！\n即将跳转到首页",
        color: "green",
        position: "top-center",
        autoClose: 1500,
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: "注册失败",
        message: error.message || "未知错误",
        color: "red",
        position: "top-center",
      });
      console.error(error);
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setPending(true);
    mutation.mutate(values, { onError: () => setPending(false) });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="用户名"
        placeholder="请输入用户名"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

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

      <PasswordInput
        label="确认密码"
        placeholder="请再次输入密码"
        key={form.key("password2")}
        {...form.getInputProps("password2")}
      />

      <Checkbox
        mt="md"
        label="我同意使用协议"
        key={form.key("acceptTOS")}
        {...form.getInputProps("acceptTOS", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button disabled={pending} fullWidth type="submit">
          提交
        </Button>
      </Group>
    </form>
  );
}
