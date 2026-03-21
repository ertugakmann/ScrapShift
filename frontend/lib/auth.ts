import axios from "axios";

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
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      email,
      password,
      username,
      phone_number,
    },
  );
  notifyAuthChanged();
  return response.data;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password },
    );

    localStorage.setItem("token", response.data.access_token);
    notifyAuthChanged();

    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        throw new Error("Invalid email or password");
      }
    }

    throw new Error("Something went wrong");
  }
};
export const logout = async () => {
  localStorage.removeItem("token");
  notifyAuthChanged();
  return true;
};
