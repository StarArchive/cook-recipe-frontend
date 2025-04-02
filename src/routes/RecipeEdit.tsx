import { Center, Container, Loader, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { useCurrentUser, useRecipe } from "@/client/hooks";
import type { CreateRecipeDto } from "@/client/types";
import RecipeForm from "@/components/RecipeForm";
import RootLayout from "@/layouts/RootLayout";

import NotFound from "./NotFound";

interface Props {
  id: string;
}

export default function RecipeEdit({ id }: Props) {
  const [, navigate] = useLocation();
  const { recipe, isLoading } = useRecipe(id);
  const { user } = useCurrentUser();
  const [initialValues, setInitialValues] = useState<CreateRecipeDto | null>(
    null,
  );

  useEffect(() => {
    if (recipe) {
      // Check if current user is the author
      if (user?.id !== recipe.author.id) {
        navigate("/");
        return;
      }

      // Transform recipe data to match form structure
      setInitialValues({
        title: recipe.title,
        description: recipe.description || "",
        published: true, // Assuming it's published since we're editing
        ingredients: recipe.ingredients,
        steps: recipe.steps.map((step) => ({
          content: step.content,
          images: step.images,
          order: step.order,
        })),
        images: recipe.images,
      });
    }
  }, [recipe, user, navigate]);

  if (isLoading) {
    return (
      <RootLayout>
        <Center style={{ height: "50vh" }}>
          <Loader size="lg" />
        </Center>
      </RootLayout>
    );
  }

  if (!recipe) return <NotFound />;

  return (
    <RootLayout>
      <Container>
        <Title order={2} mb="xl">
          编辑食谱
        </Title>
        {initialValues && (
          <RecipeForm values={initialValues} isEdit recipeId={id} />
        )}
      </Container>
    </RootLayout>
  );
}
