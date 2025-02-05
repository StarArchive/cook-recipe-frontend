import {
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      acceptTOS: false,
      password: "",
      password2: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "无效邮箱"),
      acceptTOS: (value) => (value ? null : "请同意使用协议"),
      password2: (value, values) => {
        return value === values.password ? null : "两次密码不一致";
      },
    },
  });
  const navigate = useNavigate();

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log("[LoginForm] got values:", values);
        navigate("/");
      })}
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

      <PasswordInput
        label="密码"
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
