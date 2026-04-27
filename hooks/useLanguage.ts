// hooks/useLanguage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Lang } from '../constants/i18n';

const KEY = 'kavach_language';

export function useLanguage() {
  const [lang, setLang] = useState<Lang>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((value) => {
      if (value === 'en' || value === 'hi') setLang(value);
      setReady(true);
    });
  }, []);

  const change = async (next: Lang) => {
    setLang(next);
    await AsyncStorage.setItem(KEY, next);
  };

  return { lang, change, ready };
}
