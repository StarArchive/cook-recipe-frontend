import { notifications } from "@mantine/notifications";

import { BASE_URL } from "@/consts";

import type {
  CreateRecipeDto,
  LoginDto,
  Recipe,
  RegisterDto,
  UploadRecipeCoverResponse,
  User,
} from "./types";

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
  return new URL(`/v1${path}`, BASE_URL);
}

export function getImageUrl(image: string) {
  return new URL(image, BASE_URL);
}

export async function getUser(id = "me"): Promise<User> {
  const response = await fetch(getUrl(`/users/${id}`), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function login(loginDto: LoginDto) {
  const response = await fetch(getUrl("/auth/login"), {
    method: "POST",
    body: JSON.stringify(loginDto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function register(registerDto: RegisterDto) {
  const response = await fetch(getUrl("/auth/register"), {
    method: "POST",
    body: JSON.stringify(registerDto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function createRecipe(createRecipeDto: CreateRecipeDto) {
  const response = await fetch(getUrl("/recipes"), {
    method: "POST",
    body: JSON.stringify(createRecipeDto),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(getUrl("/recipes"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function uploadRecipeCover(
  file: File,
): Promise<UploadRecipeCoverResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(getUrl("/recipes/cover/upload"), {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function uploadRecipeCovers(files: File[]) {
  return Promise.allSettled(files.map(uploadRecipeCover));
}
