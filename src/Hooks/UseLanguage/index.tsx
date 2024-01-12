import { useContext } from "react";
import { Language } from "../../context/LanguageContext";

const useLanguage = () => {
  const context = useContext(Language);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default useLanguage;
