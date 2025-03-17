import { notifications } from "@mantine/notifications";

import type {
  CreateRecipeDto,
  LoginDto,
  Recipe,
  RecipeListItem,
  RegisterDto,
  UploadRecipeCoverResponse,
  User,
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
  window.location.reload();
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
  if (method === "POST") {
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

export async function getRecipes(): Promise<RecipeListItem[]> {
  return fetchWithToken("GET", "/recipes");
}

export async function getRecipe(id: string): Promise<Recipe> {
  return fetchWithToken("GET", `/recipes/${id}`);
}

export async function uploadRecipeCover(
  file: File,
): Promise<UploadRecipeCoverResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return fetchWithToken("POST", "/upload", formData);
}

export async function uploadRecipeCovers(files: File[]) {
  return Promise.allSettled(files.map(uploadRecipeCover));
}
