import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { useLocation } from "wouter";

import RootLayout from "@/layouts/RootLayout";

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <RootLayout>
      <Container>
        <Stack align="center" gap="lg" py="xl">
          <Title order={1} size="3rem">
            404
          </Title>
          <Title order={2}>页面未找到</Title>
          <Text c="dimmed">抱歉，您访问的页面不存在或已被删除。</Text>
          <Button size="lg" onClick={() => navigate("/")}>
            返回首页
          </Button>
        </Stack>
      </Container>
    </RootLayout>
  );
}
