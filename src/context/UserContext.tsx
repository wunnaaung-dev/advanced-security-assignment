import { createContext } from "react";
import { User } from "@/types/User";

interface UserContextProps {
    currentUser: User | null;
    updateUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);