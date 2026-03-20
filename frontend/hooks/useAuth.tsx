"use client";

import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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

const TOKEN_KEY = "token";

const readToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
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
    const token = readToken();

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      if (isExpired(decoded.exp)) {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(decoded);
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAuth();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === TOKEN_KEY) {
        refreshAuth();
      }
    };

    const handleAuthChanged = () => {
      refreshAuth();
    };

    const handleWindowFocus = () => {
      refreshAuth();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("authChanged", handleAuthChanged);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("authChanged", handleAuthChanged);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [refreshAuth]);

  return { isAuthenticated, user, isLoading, refreshAuth };
};
