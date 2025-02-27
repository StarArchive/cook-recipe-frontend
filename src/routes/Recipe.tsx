import { Container, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { getRecipe } from "@/client";
import ImagesCarousel from "@/components/ImagesCarousel";
import IngredientsTable from "@/components/IngredientsTable";
import RecipeStep from "@/components/RecipeStep";
import RootLayout from "@/layouts/RootLayout";

interface Props {
  id: string;
}

export default function Recipe({ id }: Props) {
  const { data, error, isFetched } = useQuery({
    queryKey: ["recipes", id],
    queryFn: () => getRecipe(id),
    retry: false,
  });

  if (!isFetched)
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
