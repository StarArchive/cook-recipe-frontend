import LoginForm from "@/components/LoginForm";
import AccountFormLayout from "@/layouts/FormLayout";

export default function Login() {
  return (
    <AccountFormLayout title="账户登录">
      <LoginForm />
    </AccountFormLayout>
  );
}
