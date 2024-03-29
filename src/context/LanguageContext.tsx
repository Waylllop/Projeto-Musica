import { createContext, useEffect, useState } from "react";

interface LanguageType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Language = createContext<LanguageType | undefined>(undefined);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setLanguage("en");
    }
  }, []);

  return <Language.Provider value={{ language, setLanguage }}>{children}</Language.Provider>;
};

export { Language, LanguageProvider };
