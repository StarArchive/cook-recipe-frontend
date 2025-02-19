import { Container, SimpleGrid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { getRecipes } from "@/client";
import RecipeCard from "@/components/RecipeCard";
import RootLayout from "@/layouts/RootLayout";

export default function Root() {
  const { data: recipes } = useQuery({
    queryKey: ["recipes/list"],
    queryFn: getRecipes,
    retry: false,
  });

  return (
    <RootLayout>
      <Container>
        <SimpleGrid cols={3}>
          {recipes?.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              // image={recipe.image}
              description={recipe.description || ""}
            />
          ))}
        </SimpleGrid>
      </Container>
    </RootLayout>
  );
}
