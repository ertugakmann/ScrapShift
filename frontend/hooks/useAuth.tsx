"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/axios";

type AuthUser = {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  created_at: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
};

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<AuthUser>("/auth/me");
      setIsAuthenticated(true);
      setUser(response.data);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAuth();

    const handleAuthChanged = () => {
      refreshAuth();
    };

    window.addEventListener("authChanged", handleAuthChanged);

    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
    };
  }, [refreshAuth]);

  return { isAuthenticated, user, isLoading, refreshAuth };
};
