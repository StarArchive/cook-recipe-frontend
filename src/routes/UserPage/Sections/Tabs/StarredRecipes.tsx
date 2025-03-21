import { SimpleGrid, Skeleton } from "@mantine/core";

import RecipeGrid from "@/components/RecipeGrid";
import { useUserStarredRecipes } from "@/utils";

import EmptyState from "./EmptyState";

interface Props {
  userId: number;
}

export default function UserPageStarredRecipesTab({ userId }: Props) {
  const { starred, isLoading, isError } = useUserStarredRecipes(userId);

  if (isLoading || isError)
    return (
      <SimpleGrid cols={3} spacing="md">
        {new Array(3).map((i) => (
          <Skeleton key={i} height={320} radius="md" />
        ))}
      </SimpleGrid>
    );

  if (!starred || starred.recipes.length === 0)
    return <EmptyState type="starred" />;

  return <RecipeGrid recipes={starred.recipes} />;
}
