import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
const API_URL = import.meta.env.VITE_API_URL;

interface User {
  userId: string;
  username: string;
  role: "user" | "admin";
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfilePicture: (base64: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async function updateProfilePicture(base64: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile/picture`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profilePicture: base64 }),
        credentials: "include",
      });

      const res = await response.json();

      if (res.success) {
        setUser((prev) => (prev ? { ...prev, profilePicture: base64 } : null));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Upload failed:", error);
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: user !== null,
        isAdmin: user?.role === "admin",
        loading,
        logout,
        updateProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
