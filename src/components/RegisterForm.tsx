import { useUser } from "@/hooks/useUser";
import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      acceptTOS: false,
      password: "",
      password2: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "无效邮箱"),
      acceptTOS: (value) => (value ? null : "请同意使用协议"),
      password: (value) => (value.length >= 6 ? null : "密码至少6位"),
      password2: (value, values) => {
        return value === values.password ? null : "两次密码不一致";
      },
    },
  });
  const navigate = useNavigate();
  const user = useUser();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    if (submitting) return;

    try {
      setSubmitting(true);
      const resp = await fetch("http://localhost:3000/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await resp.json();

      if (!resp.ok) {
        notifications.show({
          title: "注册失败",
          message: json.message || "未知错误",
          color: "red",
          position: "top-center",
        });
        setSubmitting(false);
        return;
      }

      localStorage.setItem("token", json.accessToken);
      notifications.show({
        title: "注册成功",
        message: "欢迎回来！\n即将跳转到首页",
        color: "green",
        position: "top-center",
      });
      user?.syncUser();
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      notifications.show({
        title: "错误",
        message: "网络错误，请稍后重试",
        color: "red",
        position: "top-center",
      });
      setSubmitting(false);
      console.error(error);
    }
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
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
