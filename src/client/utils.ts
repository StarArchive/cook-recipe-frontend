import type { Category, CategoryWithChildren } from "./types";

export function convertToTree(categories: Category[]) {
  const categoryMap: Record<Category["id"], CategoryWithChildren> = {};

  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, children: [] };
  });

  const rootCategories: CategoryWithChildren[] = [];

  categories.forEach((category) => {
    if (category.parentId === null) {
      rootCategories.push(categoryMap[category.id]);
    } else {
      if (categoryMap[category.parentId]) {
        categoryMap[category.parentId].children.push(categoryMap[category.id]);
      }
    }
  });

  return rootCategories;
}
