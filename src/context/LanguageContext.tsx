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
    console.log(storedLanguage);
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  return <Language.Provider value={{ language, setLanguage }}>{children}</Language.Provider>;
};

export { Language, LanguageProvider };
