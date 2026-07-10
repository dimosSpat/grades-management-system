import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
   
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();

        setUser(userData);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}