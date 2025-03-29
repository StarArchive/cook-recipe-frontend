import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { useSearchParams } from "wouter";

import RecipeCard from "@/components/RecipeCard";
import RootLayout from "@/layouts/RootLayout";
import { useRecipeSearch } from "@/utils";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { recipes, isLoading } = useRecipeSearch(query);

  if (isLoading) {
    return (
      <RootLayout>
        <Container>
          <Title order={1}>加载中...</Title>
        </Container>
      </RootLayout>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <RootLayout>
        <Title order={1}>没有找到与 “{query}” 相关的食谱</Title>
        <Text>请尝试其他关键词或查看我们的热门食谱。</Text>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <Container>
        <Title order={1} mb="md">
          “{query}” 的搜索结果
        </Title>
        <SimpleGrid cols={3} spacing="md">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.images[0]}
              description={recipe.description || ""}
            />
          ))}
        </SimpleGrid>
      </Container>
    </RootLayout>
  );
}
