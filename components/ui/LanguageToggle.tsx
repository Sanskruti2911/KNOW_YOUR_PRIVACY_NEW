// components/ui/LanguageToggle.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lang, t } from '../../constants/i18n';

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

export const LanguageToggle: React.FC<Props> = ({ lang, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t(lang, 'language')}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, lang === 'en' && styles.buttonActive]}
          onPress={() => onChange('en')}
        >
          <Text style={[styles.buttonText, lang === 'en' && styles.buttonTextActive]}>
            EN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, lang === 'hi' && styles.buttonActive]}
          onPress={() => onChange('hi')}
        >
          <Text style={[styles.buttonText, lang === 'hi' && styles.buttonTextActive]}>
            हि
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  label: { color: '#9ca3af', marginRight: 8, fontSize: 12 },
  buttons: { flexDirection: 'row', gap: 4 },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  buttonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  buttonText: { color: '#9ca3af', fontSize: 12, fontWeight: '600' },
  buttonTextActive: {
    color: '#0b1120',
  },
});
