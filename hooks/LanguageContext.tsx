// hooks/LanguageContext.tsx
import React, { createContext, useContext } from 'react';
import { Lang } from '../constants/i18n';
import { useLanguage } from './useLanguage';

type LanguageContextType = {
  lang: Lang;
  change: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// uses AsyncStorage + useLanguage internally
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, change, ready } = useLanguage();
  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ lang, change }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLangContext = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLangContext must be used inside LanguageProvider');
  return ctx;
};
