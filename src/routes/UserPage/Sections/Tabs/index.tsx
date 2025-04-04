import { Tabs } from "@mantine/core";
import { TbChefHat, TbHeart } from "react-icons/tb";

import UserPageStarredRecipesTab from "./Collections";
import UserPageCreatedRecipeTab from "./CreatedRecipes";

interface Props {
  id: number;
  anchor: string;
  onChange: (value: string | null) => void;
}

const tabs = [
  {
    value: "created-recipes",
    icon: <TbChefHat size={16} />,
    label: "菜谱",
    panel: (userId: number) => <UserPageCreatedRecipeTab userId={userId} />,
  },
  {
    value: "starred-recipes",
    icon: <TbHeart size={16} />,
    label: "收藏",
    panel: (userId: number) => <UserPageStarredRecipesTab userId={userId} />,
  },
];

export default function UserPageTabs({ id, anchor, onChange }: Props) {
  return (
    <Tabs color="blue" value={anchor} onChange={onChange}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value} leftSection={tab.icon}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value} pt="xs">
          {tab.panel(id)}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
