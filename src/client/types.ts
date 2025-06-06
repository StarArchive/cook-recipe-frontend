export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  nickname: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
  profile: UserProfile;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface CreateRecipeDto {
  title: string;
  description: string;
  published: boolean;
  ingredients: { name: string; quantity: string }[];
  steps: RecipeStep[];
  images: string[];
  categoryIds: number[];
}

export interface RecipeAuthor {
  id: number;
  name: string;
  roles: Role[];
  profile: UserProfile;
}

export interface RecipeIngredient {
  quantity: string;
  name: string;
  categoryId: number | null;
}

export interface RecipeStep {
  order: number;
  content: string;
  images: string[];
}

export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: RecipeAuthor;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  images: string[];
  published: boolean;
}

export interface UploadFileResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface UserProfile {
  bio?: string;
  avatar?: string;
}

export interface ChangeUserPasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

export const CollectionType = {
  DEFAULT: "DEFAULT",
  MANUAL: "MANUAL",
};

export type CollectionType = keyof typeof CollectionType;

export interface Collection {
  id: number;
  name: string;
  description: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  type: CollectionType;
  recipes: Recipe[];
}

export interface CreateCollectionDto {
  name: string;
  description?: string;
  type?: CollectionType;
  isPublic?: boolean;
  recipeIds?: number[];
}

enum MessageRole {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

export interface RecipeChatMessageDto {
  role: MessageRole;
  content: string;
}
