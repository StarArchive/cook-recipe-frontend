import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { convertToTree } from "./utils";

import {
  changePassword,
  getCategories,
  getCategory,
  getRecipe,
  getRecipesByCategoryId,
  getRecipesByUserId,
  getRecipeStarred,
  getUser,
  getUserProfile,
  getUserStarredRecipes,
  searchRecipes,
  starRecipe,
  updateMe,
} from ".";

import type { ChangeUserPasswordDto, User } from "./types";

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR(`/users/${id}`, () => getUser(id));

  return {
    user: data,
    isLoading,
    error,
  };
}

export function useUserProfile(id?: string) {
  const { data, error, isLoading } = useSWR(id && `/users/${id}/profile`, () =>
    getUserProfile(id!),
  );

  return {
    profile: data,
    isLoading,
    error,
  };
}

export function useCurrentUser() {
  const { data, error, isLoading } = useSWR("/users/me", () => getUser(), {
    shouldRetryOnError: false,
  });

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useRecipe(id: string) {
  const { data, error, isLoading } = useSWR(`/recipes/${id}`, () =>
    getRecipe(id),
  );

  return {
    recipe: data,
    isLoading,
    isError: error,
  };
}

export function useProfileMutation() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/users/me/profile",
    (_url, { arg }: { arg: Partial<User> }) => updateMe(arg),
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

export function useUserMutation() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/users/me",
    (_url, { arg }: { arg: Partial<User> }) => updateMe(arg),
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

export function useUserPasswordMutation() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/users/me/password",
    (_url, { arg }: { arg: ChangeUserPasswordDto }) => changePassword(arg),
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

export function useUserRecipes(userId: number) {
  const { data, error, isLoading } = useSWR(`/recipes?userId=${userId}`, () =>
    getRecipesByUserId(userId),
  );

  return {
    recipes: data,
    isLoading,
    isError: error,
  };
}

export function getUserDisplayName(user: {
  nickname?: string | null;
  name?: string | null;
}) {
  return user.nickname || user.name;
}

export function useUserStarredRecipes(userId: number) {
  const { data, error, isLoading } = useSWR(`/user/${userId}/starred`, () =>
    getUserStarredRecipes(userId),
  );

  return {
    starred: data,
    isLoading,
    isError: error,
  };
}

export function useRecipeStarred(recipeId: number | string) {
  const {
    data: { starred } = {},
    error,
    isLoading,
  } = useSWR(`/recipes/${recipeId}/starred`, () => getRecipeStarred(recipeId));

  return {
    starred,
    isLoading,
    isError: error,
  };
}

export function useRecipeStarredMutation(recipeId: number | string) {
  const { trigger, isMutating, error } = useSWRMutation(
    `/recipes/${recipeId}/starred`,
    () => starRecipe(recipeId),
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

export function useRecipeSearch(query: string) {
  const { data, error, isLoading } = useSWR(
    `/recipes/search?query=${query}`,
    () => searchRecipes(query),
  );

  return {
    recipes: data,
    isLoading,
    isError: error,
  };
}

export function useCategoryRecipes(categoryId: number | string) {
  const { data, error, isLoading } = useSWR(
    `/recipes?categoryId=${categoryId}`,
    () => getRecipesByCategoryId(categoryId),
  );

  return {
    recipes: data,
    isLoading,
    isError: error,
  };
}

export function useCategories() {
  const { data, error, isLoading } = useSWR("/categories", () =>
    getCategories(),
  );

  return {
    categories: data,
    isLoading,
    isError: error,
  };
}

export function useCategoriesTree() {
  const { data, error, isLoading } = useSWR("/categories/tree", () =>
    getCategories(),
  );

  return {
    categories: convertToTree(data || []),
    isLoading,
    isError: error,
  };
}

export function useCategory(id: string) {
  const { data, error, isLoading } = useSWR(`/categories/${id}`, () =>
    getCategory(id),
  );

  return {
    category: data,
    isLoading,
    isError: error,
  };
}
