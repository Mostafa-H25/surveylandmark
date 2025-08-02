import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "super_admin" | "admin" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Demo authentication logic
    const demoUsers = {
      "superadmin@landmark.com": {
        id: "1",
        name: "Super Admin",
        email: "superadmin@landmark.com",
        role: "super_admin" as UserRole,
      },
      "admin@landmark.com": {
        id: "2",
        name: "Admin User",
        email: "admin@landmark.com",
        role: "admin" as UserRole,
      },
      "member@landmark.com": {
        id: "3",
        name: "Member User",
        email: "member@landmark.com",
        role: "member" as UserRole,
      },
    };

    const foundUser = demoUsers[email as keyof typeof demoUsers];

    if (foundUser && password === "password123") {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
