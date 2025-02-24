import {
  ActionIcon,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TbFileX } from "react-icons/tb";

import { getRecipes } from "@/client";
import type { RecipeListItem } from "@/client/types";
import RecipeCard from "@/components/RecipeCard";
import RootLayout from "@/layouts/RootLayout";

function RecipeCardList({ recipes }: { recipes?: RecipeListItem[] }) {
  if (!recipes || recipes.length === 0) {
    return (
      <Flex justify="center" align="center" direction="column" mt={120}>
        <ActionIcon variant="transparent" color="gray.4" size={96}>
          <TbFileX size={96} />
        </ActionIcon>
        <Title order={1} mt="md">
          暂无食谱
        </Title>
        <Button mt={20} onClick={() => location.reload()}>
          刷新数据
        </Button>
      </Flex>
    );
  }

  return (
    <Container>
      <SimpleGrid cols={3}>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.id}
            title={recipe.title}
            image={recipe.images[0]?.url}
            description={recipe.description || ""}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default function Root() {
  const {
    data: recipes,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["recipes/list"],
    queryFn: getRecipes,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "拉取食谱失败",
        message: error.message || "未知错误",
        color: "red",
        position: "top-center",
        autoClose: 1500,
      });
    }
  }, [error]);

  return (
    <RootLayout>{isFetched && <RecipeCardList recipes={recipes} />}</RootLayout>
  );
}
