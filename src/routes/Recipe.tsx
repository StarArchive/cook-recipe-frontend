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

  if (!isFetched) return <Container>Loading...</Container>;
  if (error) return <Container>出错了：{error.message}</Container>;
  if (!data) return <Container>结果为空</Container>;

  return (
    <RootLayout>
      <Container>
        <Stack gap="xl">
          <Stack gap="sm">
            <Title order={1}>{data.title}</Title>
            <ImagesCarousel images={data.images} title={data.title} />
          </Stack>

          <Stack gap="sm">
            <Title order={2}>用料</Title>
            <IngredientsTable ingredients={data.ingredients} />
          </Stack>

          <Stack gap="md">
            <Title order={2}>{data.title}的做法</Title>
            <RecipeStep steps={data.steps} />
          </Stack>
        </Stack>
      </Container>
    </RootLayout>
  );
}
