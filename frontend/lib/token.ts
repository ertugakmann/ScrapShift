export const TOKEN_KEY = "token";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function setToken(token: string) {
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function removeToken() {
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export function getClientToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  for (const cookie of document.cookie.split(";")) {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (name === TOKEN_KEY) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}

export async function getServerToken(): Promise<string | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value ?? null;
}
