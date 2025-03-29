import {
  ActionIcon,
  Anchor,
  Avatar,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMemo } from "react";
import { TbEdit, TbStar } from "react-icons/tb";
import { Link, useLocation } from "wouter";

import { getImageUrl } from "@/client";
import ImagesCarousel from "@/components/ImagesCarousel";
import IngredientsTable from "@/components/IngredientsTable";
import RecipeStep from "@/components/RecipeStep";
import RootLayout from "@/layouts/RootLayout";
import {
  getUserDisplayName,
  useCurrentUser,
  useRecipe,
  useRecipeStarred,
  useRecipeStarredMutation,
} from "@/utils";

import NotFound from "./NotFound";

interface Props {
  id: string;
}

export default function Recipe({ id }: Props) {
  const [, navigate] = useLocation();
  const { user } = useCurrentUser();
  const { recipe, isLoading } = useRecipe(id);
  const { starred } = useRecipeStarred(id);
  const { trigger } = useRecipeStarredMutation(id);
  const avatarUrl = useMemo(
    () =>
      recipe?.author.profile.avatar &&
      getImageUrl(recipe.author.profile.avatar).toString(),
    [recipe?.author],
  );
  const displayName = useMemo(
    () => recipe?.author && getUserDisplayName(recipe.author),
    [recipe?.author],
  );

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
            <Title className="flex items-center gap-1" order={1}>
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
              <ActionIcon
                variant="subtle"
                size="lg"
                color={starred ? "yellow" : "gray"}
                onClick={() => {
                  trigger();
                }}
              >
                <TbStar size={20} />
              </ActionIcon>
            </Title>
            <ImagesCarousel images={recipe.images} title={recipe.title} />
            <Divider my="md" />

            <Group
              gap="xs"
              onClick={() => navigate(`/user/${recipe.author.id}`)}
            >
              <Avatar
                src={avatarUrl}
                alt={displayName}
                className="cursor-pointer"
              ></Avatar>
              <Anchor underline="never" component={Link}>{recipe.author.name}</Anchor>
            </Group>

            <Text>{recipe.description}</Text>
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
