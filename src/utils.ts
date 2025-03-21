import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  changePassword,
  getRecipe,
  getRecipesByUserId,
  getRecipeStarred,
  getUser,
  getUserProfile,
  getUserStarredRecipes,
  starRecipe,
  updateMe,
} from "./client";

import type { ChangeUserPasswordDto, User } from "./client/types";

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

export function getUserDisplayName(user: User) {
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
