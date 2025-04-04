import { Container, Text, Title } from "@mantine/core";

import { useRecipeDrafts } from "@/client/hooks";
import RecipeGrid from "@/components/RecipeGrid";
import RootLayout from "@/layouts/RootLayout";

export default function Draft() {
  const { drafts } = useRecipeDrafts();

  if (!drafts || drafts.length === 0)
    return (
      <RootLayout>
        <Container>
          <Title order={1} mb="lg">
            没有草稿
          </Title>
          <Text>你还没有创建任何草稿。</Text>
        </Container>
      </RootLayout>
    );

  return (
    <RootLayout>
      <Container>
        <Title order={2} mb="md">
          草稿列表
        </Title>
        <RecipeGrid recipes={drafts} />
      </Container>
    </RootLayout>
  );
}
