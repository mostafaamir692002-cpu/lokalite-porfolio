"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: <T extends { en: string; ar: string }>(item: T) => string;
  tArray: <T extends { en: string[]; ar: string[] }>(item: T) => string[];
  isRtl: boolean;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lokalita-lang", newLang);
      document.documentElement.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", newLang);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("lokalita-lang") as Language;
      if (savedLang === "ar" || savedLang === "en") {
        setLang(savedLang);
      } else {
        // Default to English, check navigator language
        const isArabic = navigator.language.startsWith("ar");
        setLang(isArabic ? "ar" : "en");
      }
    }
  }, []);

  const t = <T extends { en: string; ar: string }>(item: T): string => {
    return lang === "ar" ? item.ar : item.en;
  };

  const tArray = <T extends { en: string[]; ar: string[] }>(item: T): string[] => {
    return lang === "ar" ? item.ar : item.en;
  };

  const isRtl = lang === "ar";

  return (
    <LangContext.Provider value={{ lang, setLang, t, tArray, isRtl }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
}
