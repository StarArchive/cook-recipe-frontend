import RegisterForm from "@/components/RegisterForm";
import AccountFormLayout from "@/layouts/FormLayout";

export default function Register() {
  return (
    <AccountFormLayout title="注册账号">
      <RegisterForm />
    </AccountFormLayout>
  );
}
