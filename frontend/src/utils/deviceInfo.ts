export const getBrowserName = (): string => {
  const ua = navigator.userAgent;

  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";

  return "Unknown";
};

export const getOSName = (): string => {
  const platform = navigator.platform.toLowerCase();

  if (platform.includes("win")) return "Windows";
  if (platform.includes("mac")) return "macOS";
  if (platform.includes("linux")) return "Linux";
  if (/iphone|ipad|ipod/.test(platform)) return "iOS";
  if (platform.includes("android")) return "Android";

  return "Unknown";
};

export const getPublicIP = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");

    if (!response.ok) {
      throw new Error("Failed to fetch public IP");
    }

    const data = (await response.json()) as { ip?: string };
    return data.ip || "";
  } catch {
    return "";
  }
};
