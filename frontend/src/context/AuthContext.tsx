import { createContext, useContext, useState, useEffect } from "react";

type User = {
  name: string;
  role: "USER" | "ADMIN";
};

type AuthContextType = {
  user: User | null;
  login: (name: string, password: string, role: "USER" | "ADMIN") => { success: boolean; message: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "sweetShopAuth";

// Predefined credentials (in production, this would be in a secure backend)
const CREDENTIALS = {
  ADMIN: [
    { name: "admin", password: "admin123" },
    { name: "manik", password: "admin@2024" },
  ],
  USER: [
    { name: "user", password: "user123" },
    { name: "customer", password: "customer123" },
  ],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (name: string, password: string, role: "USER" | "ADMIN") => {
    if (!name.trim() || !password.trim()) {
      return { success: false, message: "Please enter both name and password" };
    }

    const validCredentials = CREDENTIALS[role];
    const isValid = validCredentials.some(
      (cred) => cred.name.toLowerCase() === name.toLowerCase() && cred.password === password
    );

    if (!isValid) {
      return { 
        success: false, 
        message: `Invalid ${role.toLowerCase()} credentials. Please check your name and password.` 
      };
    }

    const newUser = { name, role };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, message: "Login successful" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
