import { ActionIcon, Container, Stack, Title } from "@mantine/core";
import { TbEdit } from "react-icons/tb";
import { useLocation } from "wouter";

import ImagesCarousel from "@/components/ImagesCarousel";
import IngredientsTable from "@/components/IngredientsTable";
import RecipeStep from "@/components/RecipeStep";
import RootLayout from "@/layouts/RootLayout";
import { useCurrentUser, useRecipe } from "@/utils";

import NotFound from "./NotFound";

interface Props {
  id: string;
}

export default function Recipe({ id }: Props) {
  const [, navigate] = useLocation();
  const { user } = useCurrentUser();
  const { recipe, isLoading } = useRecipe(id);

  if (isLoading)
    return (
      <RootLayout>
        <Container>
          <Stack gap="xl">
            <Stack gap="lg">
              <Title order={1}>加载中...</Title>
            </Stack>
          </Stack>
        </Container>
      </RootLayout>
    );
  if (!recipe) return <NotFound />;

  return (
    <RootLayout>
      <Container>
        <Stack gap="xl">
          <Stack gap="lg">
            <Title className="flex items-center gap-2" order={1}>
              {recipe.title}
              {user?.id === recipe.author.id && (
                <ActionIcon
                  variant="subtle"
                  size="lg"
                  onClick={() => {
                    navigate(`/recipe/${id}/edit`);
                  }}
                >
                  <TbEdit size={20} />
                </ActionIcon>
              )}
            </Title>
            <ImagesCarousel images={recipe.images} title={recipe.title} />
          </Stack>

          <Stack gap="lg">
            <Title order={2}>用料</Title>
            <IngredientsTable ingredients={recipe.ingredients} />
          </Stack>

          <Stack gap="lg">
            <Title order={2}>{recipe.title}的做法</Title>
            <RecipeStep steps={recipe.steps} />
          </Stack>
        </Stack>
      </Container>
    </RootLayout>
  );
}
