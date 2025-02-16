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
