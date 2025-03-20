import { SimpleGrid, Skeleton } from "@mantine/core";

import RecipeGrid from "@/components/RecipeGrid";
import { useUserRecipes } from "@/utils";

import EmptyState from "./EmptyState";

interface Props {
  userId: number;
}

export default function UserPageCreatedRecipeTab({ userId }: Props) {
  const { recipes, isLoading } = useUserRecipes(userId);

  if (isLoading)
    return (
      <SimpleGrid cols={3} spacing="md">
        {new Array(3).map((i) => (
          <Skeleton key={i} height={320} radius="md" />
        ))}
      </SimpleGrid>
    );

  if (recipes && recipes.length > 0) return <RecipeGrid recipes={recipes} />;
  else return <EmptyState type="created" />;
}
