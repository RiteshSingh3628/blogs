import { useState, useMemo, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { authApi } from "../api/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage once on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authApi.login(credentials);

      const token = data?.data?.token;
      const safeData = data?.data?.safeData;
      const message = data?.message;
      const status = data?.status;

      if (!token || !safeData) {
        console.warn("⚠️ Invalid response format:", data);
        return { ok: false, error: "Invalid response format", status };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeData));
      setUser(safeData);

      console.log("✅ Login successful:", safeData);
      return { ok: true, status, message };
    } catch (error) {
      const status = error?.response?.status || 500;
      const serverError =
        error?.response?.data?.message || error.message || "Login failed";
      console.error("❌ Login failed:", { status, serverError });
      return { ok: false, error: serverError, status };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    console.log("👋 Logged out successfully");
  };

  const value = useMemo(
    () => ({ user, login, logout, loading }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
