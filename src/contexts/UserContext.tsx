import { createContext } from "react";

interface UserContextType {
  userName: string | null;
  logout: () => void;
  syncUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);
