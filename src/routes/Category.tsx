import { Container, SimpleGrid, Title } from "@mantine/core";

import RecipeCard from "@/components/RecipeCard";
import RootLayout from "@/layouts/RootLayout";
import { useCategoryRecipes } from "@/utils";

interface Props {
  id: string;
  title: string;
}

export default function Category({ id, title }: Props) {
  const { recipes, isLoading } = useCategoryRecipes(id);

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
        <Container>
          <Title order={1}>当前分类 “{title}” 为空</Title>
        </Container>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <Container>
        <Title order={1} mb="md">
          {title}
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
