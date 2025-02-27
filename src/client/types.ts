export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
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
}

export interface RecipeListItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  published: boolean;
  authorId: number;
  images: string[];
}
export interface RecipeAuthor {
  id: number;
  name: string;
  roles: Role[];
}

export interface RecipeIngredient {
  quantity: string;
  ingredient: {
    name: string;
  };
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
}

export interface UploadRecipeCoverResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
