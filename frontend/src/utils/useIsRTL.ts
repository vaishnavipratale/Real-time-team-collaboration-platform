import { useTranslation } from "react-i18next";

const RTL_LANGUAGES = new Set(["ar"]);

export default function useIsRTL(): boolean {
  const { i18n } = useTranslation();
  return RTL_LANGUAGES.has(i18n.language);
}
