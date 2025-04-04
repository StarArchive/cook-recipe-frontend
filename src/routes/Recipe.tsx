import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMemo, useState } from "react";
import { TbEdit, TbStar } from "react-icons/tb";
import { Link, useLocation } from "wouter";

import { getImageUrl } from "@/client";
import {
  getUserDisplayName,
  useAddRecipeToCollectionsMutation,
  useCollections,
  useCollectionsByRecipeId,
  useCurrentUser,
  useRecipe,
} from "@/client/hooks";
import type { Collection, Recipe } from "@/client/types";
import ImagesCarousel from "@/components/ImagesCarousel";
import IngredientsTable from "@/components/IngredientsTable";
import RecipeStep from "@/components/RecipeStep";
import RootLayout from "@/layouts/RootLayout";

import NotFound from "./NotFound";

interface Props {
  id: string;
}

function RecipeStarForm({
  recipeId,
  collections,
  starredCollections,
}: {
  recipeId: string | number;
  collections: Collection[];
  starredCollections: Collection[];
}) {
  const [value, setValue] = useState<string[]>(
    starredCollections.map((c) => c.id.toString()),
  );
  const { trigger } = useAddRecipeToCollectionsMutation(recipeId);

  return (
    <>
      <Checkbox.Group value={value} onChange={setValue}>
        <Stack mt="xs">
          {collections.map((collection) => (
            <Checkbox
              key={collection.id}
              label={`${collection.name}${!collection.isPublic ? " [私密]" : ""}`}
              value={collection.id.toString()}
            />
          ))}
        </Stack>
      </Checkbox.Group>

      <Group justify="flex-end" mt="md">
        <Button
          fullWidth
          onClick={() => {
            trigger({
              collectionIds: value.map((collectionId) =>
                Number.parseInt(collectionId),
              ),
            });
            modals.closeAll();
          }}
        >
          确定
        </Button>
      </Group>
    </>
  );
}

function RecipeStar({ recipe }: { recipe: Recipe }) {
  const { collections } = useCollections();
  const { collections: starredCollections } = useCollectionsByRecipeId(
    recipe.id,
  );

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      color={
        starredCollections && starredCollections.length > 0 ? "yellow" : "gray"
      }
      onClick={() =>
        modals.open({
          title: "添加到收藏夹",
          children: (
            <RecipeStarForm
              recipeId={recipe.id}
              collections={collections!}
              starredCollections={starredCollections!}
            />
          ),
        })
      }
    >
      <TbStar size={20} />
    </ActionIcon>
  );
}

export default function Recipe({ id }: Props) {
  const [, navigate] = useLocation();
  const { user } = useCurrentUser();
  const { recipe, isLoading } = useRecipe(id);
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
              {recipe.published && <RecipeStar recipe={recipe} />}
            </Title>
            <ImagesCarousel images={recipe.images} title={recipe.title} />
            <Divider my="md" />

            <Group
              gap="xs"
              onClick={() => navigate(`/user/${recipe.author.id}`)}
            >
              <Avatar
                src={avatarUrl}
                alt={displayName || ""}
                className="cursor-pointer"
              ></Avatar>
              <Anchor underline="never" component={Link}>
                {recipe.author.name}
              </Anchor>
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
