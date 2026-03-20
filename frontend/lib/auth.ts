import axios from "axios";

const notifyAuthChanged = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("authChanged"));
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      },
    );
    localStorage.setItem("token", response.data.access_token);

    notifyAuthChanged();
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  localStorage.removeItem("token");
  notifyAuthChanged();
  return true;
};
