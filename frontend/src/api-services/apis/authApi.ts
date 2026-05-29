const BASE_URL = "http://localhost:3001";

const postJson = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
};

export const sendOtp = (email: string) => postJson("/auth/send-otp", { email });

export const verifyOtp = (email: string, otp: string) =>
  postJson("/auth/verify-otp", { email, otp });
