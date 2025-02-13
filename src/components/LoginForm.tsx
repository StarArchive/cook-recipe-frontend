import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export default function LoginForm({ className }: Props) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "无效邮箱"),
      password: (value) => (value.length >= 6 ? null : "密码至少6位"),
    },
  });

  async function handleSubmit(values: typeof form.values) {
    if (submitting) return;

    try {
      setSubmitting(true);
      const resp = await fetch("http://localhost:3000/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      const json = await resp.json();

      if (!resp.ok) {
        notifications.show({
          title: "登录失败",
          message: json.message || "未知错误",
          color: "red",
          position: "top-center",
        });
        setSubmitting(false);
        return;
      }

      localStorage.setItem("token", json.accessToken);
      notifications.show({
        title: "登录成功",
        message: "欢迎回来！\n即将跳转到首页",
        color: "green",
        position: "top-center",
      });
      setTimeout(() => navigate("/"), 2000);
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
        <Button disabled={submitting} fullWidth type="submit">
          提交
        </Button>
      </Group>
    </form>
  );
}
