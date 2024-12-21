import React, { useState, ReactNode } from "react";
import { User } from "@/types/User";
import { UserContext } from "@/context/UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const updateUser = (user: User) => {
        setCurrentUser(user);
    };

    return (
        <UserContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};