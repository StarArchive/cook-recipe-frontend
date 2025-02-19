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
  steps: { step: number; content: string }[];
}

export interface Recipe {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  published: boolean;
  authorId: number;
}
