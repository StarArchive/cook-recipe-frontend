import {
  ActionIcon,
  Button,
  Flex,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { GiNoodles } from "react-icons/gi";
import { TbCake, TbEggs, TbFileX, TbFish, TbSoup, TbSun } from "react-icons/tb";
import useSWR from "swr";
import { useLocation } from "wouter";

import { getRecipes } from "@/client";
import type { Recipe } from "@/client/types";
import RecipeCard from "@/components/RecipeCard";
import RootLayout from "@/layouts/RootLayout";

const sidebarConfig = [
  {
    icon: <TbSun className="text-amber-500" size={32} />,
    text: "早餐",
    to: "/category/24",
  },
  {
    icon: <TbFish className="text-blue-500" size={32} />,
    text: "鱼",
    to: "/category/378",
  },
  {
    icon: <TbEggs className="text-yellow-500" size={32} />,
    text: "鸡蛋",
    to: "/category/422",
  },
  {
    icon: <TbSoup className="text-orange-400" size={32} />,
    text: "汤羹",
    to: "/category/321",
  },
  {
    icon: <TbCake className="text-pink-500" size={32} />,
    text: "烘焙",
    to: "/category/47",
  },
  {
    icon: <GiNoodles className="text-yellow-600" size={32} />,
    text: "面条",
    to: "/category/458",
  },
];

function SidebarItem({
  icon,
  text,
  to,
}: {
  icon: React.ReactNode;
  text: string;
  to: string;
}) {
  const [, navigate] = useLocation();

  return (
    <div
      className="pointer-events-auto flex cursor-pointer items-center gap-2"
      onClick={() => navigate(to)}
    >
      <ActionIcon variant="transparent" size={32}>
        {icon}
      </ActionIcon>
      <Text component="span" className="whitespace-nowrap" size="sm">
        {text}
      </Text>
    </div>
  );
}

function Sidebar() {
  return (
    <Flex className="max-md:hidden" direction="column" align="start" gap="lg">
      {sidebarConfig.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          text={item.text}
          to={item.to}
        />
      ))}
    </Flex>
  );
}

function RecipeCardList({ recipes }: { recipes?: Recipe[] }) {
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
    <div>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.id}
            title={recipe.title}
            image={recipe.images[0]}
            description={recipe.description || ""}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default function Root() {
  const { data: recipes, isLoading } = useSWR("/recipes", getRecipes);

  return (
    <RootLayout>
      <div className="flex gap-16 md:mx-auto md:max-w-4xl">
        <Sidebar />
        {!isLoading && <RecipeCardList recipes={recipes} />}
      </div>
    </RootLayout>
  );
}
