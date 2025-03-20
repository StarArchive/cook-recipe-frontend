import { SimpleGrid, Skeleton } from "@mantine/core";

import type { Recipe } from "@/client/types";
import RecipeGrid from "@/components/RecipeGrid";

import EmptyState from "./EmptyState";

interface Props {
  userId: number;
}

export default function UserPageStarredRecipesTab({ userId }: Props) {
  const likedRecipes: Recipe[] = [];
  const isLoading = false;

  return isLoading ? (
    <SimpleGrid cols={3} spacing="md">
      {new Array(3).map((i) => (
        <Skeleton key={i} height={320} radius="md" />
      ))}
    </SimpleGrid>
  ) : likedRecipes.length > 0 ? (
    <RecipeGrid recipes={likedRecipes} />
  ) : (
    <EmptyState type="starred" />
  );
}
