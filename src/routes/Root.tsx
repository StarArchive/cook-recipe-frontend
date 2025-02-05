import { Container, SimpleGrid } from "@mantine/core";
import RecipeCard from "../components/RecipeCard";
import RootLayout from "../layouts/RootLayout";

const recipes = new Array(10).fill({
  title: "薄饼",
  image:
    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F17%2F21014-Good-old-Fashioned-Pancakes-mfs_002.jpg&q=60&c=sc&poi=auto&orient=true&h=512",
  description: "美味薄饼 适合早餐",
});

export default function Root() {
  return (
    <RootLayout>
      <Container>
        <SimpleGrid cols={3}>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              image={recipe.image}
              description={recipe.description}
            />
          ))}
        </SimpleGrid>
      </Container>
    </RootLayout>
  );
}
