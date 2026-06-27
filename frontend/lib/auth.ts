import api from "@/lib/axios";

const notifyAuthChanged = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("authChanged"));
};

export const register = async (
  email: string,
  password: string,
  username: string,
  phone_number: string,
) => {
  const response = await api.post("/auth/register", {
    email,
    password,
    username,
    phone_number,
  });
  notifyAuthChanged();
  return response.data;
};

export const login = async (email: string, password: string) => {
  try {
    await api.post("/auth/login", { email, password });
    notifyAuthChanged();
  } catch (err: any) {
    if (err.response?.status === 401) {
      throw new Error("Invalid email or password");
    }
    throw new Error("Something went wrong");
  }
};

export const logout = async () => {
  await api.post("/auth/logout");
  notifyAuthChanged();
};
