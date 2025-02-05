import { Container } from "@mantine/core";
import RegisterForm from "../components/RegisterForm";
import RootLayout from "../layouts/RootLayout";

export default function Register() {
  return (
    <RootLayout>
      <Container size="xs">
        <RegisterForm />
      </Container>
    </RootLayout>
  );
}
