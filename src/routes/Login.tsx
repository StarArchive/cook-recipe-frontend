import { Container } from "@mantine/core";
import LoginForm from "../components/LoginForm";
import RootLayout from "../layouts/RootLayout";

export default function Login() {
  return (
    <RootLayout>
      <Container size="xs">
        <LoginForm />
      </Container>
    </RootLayout>
  );
}
