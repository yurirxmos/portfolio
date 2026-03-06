export type Language = "br" | "en" | "cn";

export const LANGUAGE_STORAGE_KEY = "portfolio-language";

export const detectLanguageFromBrowser = (
  browserLanguage: string,
): Language => {
  const normalizedLanguage = browserLanguage.toLowerCase();

  if (normalizedLanguage.startsWith("zh")) {
    return "cn";
  }

  if (normalizedLanguage.startsWith("en")) {
    return "en";
  }

  return "br";
};

export const isSupportedLanguage = (value: string): value is Language => {
  return value === "br" || value === "en" || value === "cn";
};
