import { SimpleGrid } from "@mantine/core";

import type { Recipe } from "@/client/types";

import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
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
  );
}
