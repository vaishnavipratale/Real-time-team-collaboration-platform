import { z } from "zod";
 
const COMMON_TLDS = new Set([
  "com",
  "net",
  "org",
  "info",
  "biz",
  "app",
  "dev",
  "tech",
  "shop",
  "store",
  "xyz",
  "online",
  "io",
  "ai",
  "co",
  "edu",
  "gov",
  "in",
  "uk",
  "us",
  "ca",
  "au",
  "de",
  "fr",
  "it",
  "es",
  "nl",
  "se",
  "no",
  "fi",
  "ch",
  "jp",
  "kr",
  "sg",
  "ae",
  "sa",
  "pk",
  "bd",
  "lk",
  "nz",
  "id",
  "ph",
  "my",
  "th",
  "vn",
  "hk",
]);
 
function isBusinessEmailDomain(domain: string) {
  const labels = domain.toLowerCase().split(".");
  if (labels.length < 2) return false;
  const tld = labels.pop()!;
 
  // reject runs of the same char 4+ in the TLD (e.g. "innnnnn")
  if (/(.)\1{3,}/.test(tld)) return false;
 
  // allow any 2-letter ccTLD, else require a common business TLD
  if (tld.length === 2 && /^[a-z]{2}$/.test(tld)) return true;
  return COMMON_TLDS.has(tld);
}
 
export const strictEmail = z
  .string()
  .trim()
  .min(1, "Email address is required")
  .email("Invalid email address")
  .refine(
    (v) => /^[A-Za-z0-9]/.test(v),
    "Email address must start with a letter or number"
  )
  .refine((v) => {
    const m = v.match(/@(.+)$/);
    return !!m && isBusinessEmailDomain(m[1]);
  }, "Enter a valid email address");