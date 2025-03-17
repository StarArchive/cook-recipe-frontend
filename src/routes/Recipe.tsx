import { Container, Stack, Title } from "@mantine/core";
import useSWR from "swr";

import { getRecipe } from "@/client";
import ImagesCarousel from "@/components/ImagesCarousel";
import IngredientsTable from "@/components/IngredientsTable";
import RecipeStep from "@/components/RecipeStep";
import RootLayout from "@/layouts/RootLayout";

interface Props {
  id: string;
}

export default function Recipe({ id }: Props) {
  const { data, error, isLoading } = useSWR(`/recipes/${id}`, () =>
    getRecipe(id),
  );

  if (isLoading)
    return (
      <RootLayout>
        <Container>Loading...</Container>
      </RootLayout>
    );

  if (error)
    return (
      <RootLayout>
        <Container>出错了：{error.message}</Container>
      </RootLayout>
    );

  if (!data)
    return (
      <RootLayout>
        <Container>结果为空</Container>
      </RootLayout>
    );

  return (
    <RootLayout>
      <Container>
        <Stack gap="xl">
          <Stack gap="lg">
            <Title order={1}>{data.title}</Title>
            <ImagesCarousel images={data.images} title={data.title} />
          </Stack>

          <Stack gap="lg">
            <Title order={2}>用料</Title>
            <IngredientsTable ingredients={data.ingredients} />
          </Stack>

          <Stack gap="lg">
            <Title order={2}>{data.title}的做法</Title>
            <RecipeStep steps={data.steps} />
          </Stack>
        </Stack>
      </Container>
    </RootLayout>
  );
}
