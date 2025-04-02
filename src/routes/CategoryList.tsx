import { Container, Flex, Grid, SimpleGrid, Text, Title } from "@mantine/core";

import { useCategoriesTree } from "@/client/hooks";
import RootLayout from "@/layouts/RootLayout";

export default function CategoryList() {
  const { categories, isLoading } = useCategoriesTree();

  if (isLoading) {
    return (
      <RootLayout>
        <Container>
          <Title order={1}>加载中...</Title>
        </Container>
      </RootLayout>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <RootLayout>
        <Container>
          <Title order={1}>当前分类列表为空</Title>
        </Container>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <Container>
        <Title order={1}>分类列表</Title>

        {categories.map((category) => (
          <div key={category.id} className="mt-4">
            <Grid mb="md">
              <Grid.Col span={4}>
                <Title order={2}>{category.name}</Title>
              </Grid.Col>
              <Grid.Col span={6}>
                <Flex direction="column" gap="xl">
                  {category.children.map((subCategory) => (
                    <div key={subCategory.id}>
                      <Text className="mb-4" c="dimmed">
                        {subCategory.name}
                      </Text>
                      <SimpleGrid cols={5} verticalSpacing="xs">
                        {subCategory.children.map((subSubCategory) => (
                          <Text key={subSubCategory.id}>
                            {subSubCategory.name}
                          </Text>
                        ))}
                      </SimpleGrid>
                    </div>
                  ))}
                </Flex>
              </Grid.Col>
            </Grid>
          </div>
        ))}
      </Container>
    </RootLayout>
  );
}
