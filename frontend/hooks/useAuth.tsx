"use client";

import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getClientToken, removeToken } from "@/lib/token";

type DecodedToken = {
  exp?: number;
  email?: string;
  sub?: string;
  [key: string]: unknown;
};

type AuthState = {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  isLoading: boolean;
  refreshAuth: () => void;
};

const isExpired = (exp?: number) => {
  if (!exp) {
    return false;
  }

  return Date.now() >= exp * 1000;
};

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = useCallback(() => {
    const token = getClientToken();

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      if (isExpired(decoded.exp)) {
        removeToken();
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(decoded);
      }
    } catch {
      removeToken();
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
