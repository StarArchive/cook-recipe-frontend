import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { convertToTree } from "./utils";

import {
  addRecipeToCollections,
  changePassword,
  createCollection,
  deleteCollection,
  getCategories,
  getCategory,
  getCollection,
  getCollections,
  getCollectionsByRecipeId,
  getRecipe,
  getRecipeDrafts,
  getRecipesByCategoryId,
  getRecipesByUserId,
  getUser,
  getUserProfile,
  searchRecipes,
  updateCollection,
  updateMe,
} from ".";

import type { ChangeUserPasswordDto, CreateCollectionDto, User } from "./types";

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
  const { data, error, isLoading } = useSWR("/users/me", () => getUser());

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

export function useRecipeDrafts() {
  const { data, error, isLoading } = useSWR("/recipes/drafts", () =>
    getRecipeDrafts(),
  );

  return {
    drafts: data,
    isLoading,
    isError: error,
  };
}

export function useCollections(userId?: string | number) {
  const { data, error, isLoading } = useSWR("/collections", () =>
    getCollections(userId),
  );

  return {
    collections: data,
    isLoading,
    isError: error,
  };
}

export function useCollectionMutation() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/collections",
    (_url, { arg }: { arg: CreateCollectionDto }) => createCollection(arg),
  );
  return {
    trigger,
    isMutating,
    error,
  };
}

export function useCollection(id: string | number) {
  const { data, error, isLoading } = useSWR(`/collections/${id}`, () =>
    getCollection(id),
  );

  return {
    collection: data,
    isLoading,
    isError: error,
  };
}

export function useCollectionEditMutation(id: string | number) {
  const { trigger, isMutating, error } = useSWRMutation(
    "/collections",
    (_url: string, { arg }: { arg: Partial<CreateCollectionDto> }) =>
      updateCollection(id, arg),
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

export function useCollectionDeleteMutation() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/collections",
    (_url, { arg }: { arg: string | number }) => deleteCollection(arg),
  );

  return {
    trigger,
    isMutating,
    error,
  };
}

export function useCollectionsByRecipeId(recipeId: string | number) {
  const { data, error, isLoading } = useSWR(
    `/collections/recipes/${recipeId}`,
    () => getCollectionsByRecipeId(recipeId),
  );

  return {
    collections: data,
    isLoading,
    isError: error,
  };
}

export function useAddRecipeToCollectionsMutation(recipeId: string | number) {
  const { trigger, isMutating, error } = useSWRMutation(
    `/collections/recipes/${recipeId}`,
    (_url: string, { arg }: { arg: { collectionIds: number[] } }) =>
      addRecipeToCollections(arg.collectionIds, recipeId),
  );

  return {
    trigger,
    isMutating,
    error,
  };
}
