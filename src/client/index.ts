import { notifications } from "@mantine/notifications";
import { navigate } from "wouter/use-browser-location";

import type {
  Category,
  ChangeUserPasswordDto,
  Collection,
  CreateCollectionDto,
  CreateRecipeDto,
  LoginDto,
  Recipe,
  RegisterDto,
  UploadFileResponse,
  User,
  UserProfile,
} from "@/client/types";
import { API_BASE_URL, IMAGE_BASE_URL } from "@/consts";

export function logout() {
  localStorage.removeItem("token");
  notifications.show({
    title: "退出登录成功",
    message: "您已成功退出登录",
    color: "blue",
    position: "top-center",
  });
  navigate("/", { replace: true });
}

export function getUrl(path: string) {
  return new URL(`/v1${path}`, API_BASE_URL);
}

export function getImageUrl(image: string) {
  return new URL(image, IMAGE_BASE_URL);
}

export function transformBody(body?: unknown) {
  if (!body) return {};
  if (body instanceof FormData) return { body };

  return { body: JSON.stringify(body) };
}

export function getContentType(
  method: string,
  body?: unknown,
): Record<string, string> {
  if (method !== "GET") {
    return body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" };
  }

  return {};
}

export async function fetchWithToken(
  method: string,
  path: string,
  body?: unknown,
) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    ...getContentType(method, body),
  };
  const response = await fetch(getUrl(path), {
    method,
    headers,
    ...transformBody(body),
  });
  const json = await response.json();

  if (json?.message == "Unauthorized") {
    localStorage.removeItem("token");
    notifications.show({
      id: "login-expired",
      title: "登录失效",
      message: "请重新登录",
      color: "red",
      position: "top-center",
    });
  }

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function getUser(id = "me"): Promise<User> {
  return fetchWithToken("GET", `/users/${id}`);
}

export async function login(
  loginDto: LoginDto,
): Promise<{ accessToken: string }> {
  return fetchWithToken("POST", "/auth/login", loginDto);
}

export async function register(registerDto: RegisterDto) {
  return fetchWithToken("POST", "/auth/register", registerDto);
}

export async function createRecipe(createRecipeDto: CreateRecipeDto) {
  return fetchWithToken("POST", "/recipes", createRecipeDto);
}

export async function updateRecipe(
  id: string,
  updateRecipeDto: Partial<CreateRecipeDto>,
) {
  return fetchWithToken("PATCH", `/recipes/${id}`, updateRecipeDto);
}

export async function getRecipes(): Promise<Recipe[]> {
  return fetchWithToken("GET", "/recipes");
}

export async function getRecipesByUserId(
  userId: number | string,
): Promise<Recipe[]> {
  return fetchWithToken("GET", `/recipes?userId=${userId}`);
}

export async function getRecipesByCategoryId(
  categoryId: number | string,
): Promise<Recipe[]> {
  return fetchWithToken("GET", `/recipes?categoryId=${categoryId}`);
}

export async function getRecipe(id: string): Promise<Recipe> {
  return fetchWithToken("GET", `/recipes/${id}`);
}

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return fetchWithToken("POST", "/upload", formData);
}

export async function uploadFiles(files: File[]) {
  return Promise.allSettled(files.map(uploadFile));
}

export async function getUserProfile(id: string): Promise<UserProfile> {
  return fetchWithToken("GET", `/users/${id}/profile`);
}

export async function updateMe(body: Partial<User>) {
  return fetchWithToken("PATCH", "/users/me", body);
}

export async function changePassword(body: ChangeUserPasswordDto) {
  return fetchWithToken("POST", "/users/me/changePassword", body);
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  return fetchWithToken("GET", `/recipes/search?query=${query}`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchWithToken("GET", "/categories");
}

export async function getCategory(id: string): Promise<Category> {
  return fetchWithToken("GET", `/categories/${id}`);
}

export async function getRecipeDrafts(): Promise<Recipe[]> {
  return fetchWithToken("GET", "/recipes/drafts");
}

export async function getCollections(
  userId?: string | number,
): Promise<Collection[]> {
  return fetchWithToken(
    "GET",
    `/collections${userId ? `?userId=${userId}` : ""}`,
  );
}

export async function createCollection(
  createCollectionDto: CreateCollectionDto,
): Promise<Collection> {
  return fetchWithToken("POST", "/collections", createCollectionDto);
}

export async function getCollection(id: string | number): Promise<Collection> {
  return fetchWithToken("GET", `/collections/${id}`);
}

export async function updateCollection(
  id: string | number,
  updateCollectionDto: Partial<CreateCollectionDto>,
): Promise<Collection> {
  return fetchWithToken("PATCH", `/collections/${id}`, updateCollectionDto);
}

export async function deleteCollection(id: string | number) {
  return fetchWithToken("DELETE", `/collections/${id}`);
}

export async function getCollectionsByRecipeId(
  recipeId: string | number,
): Promise<Collection[]> {
  return fetchWithToken("GET", `/collections/recipes/${recipeId}`);
}

export async function addRecipeToCollections(
  collectionIds: number[],
  recipeId: string | number,
): Promise<Collection> {
  return fetchWithToken("POST", `/recipes/${recipeId}/addToCollections`, {
    collectionIds,
  });
}
