import { Container } from "@mantine/core";

import RootLayout from "@/layouts/RootLayout";

export default function ErrorPage() {
  return (
    <RootLayout>
      <Container>
        <h1>糟糕</h1>
        <p>抱歉，发生了未知错误</p>
        <p>
          <i></i>
        </p>
      </Container>
    </RootLayout>
  );
}
