// components/ui/fraud-check-view.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { basicFraudCheck } from '../../constants/fraudCheck';
import { t } from '../../constants/i18n';
import { useLangContext } from '../../hooks/LanguageContext'; // or '../..' as needed

export const FraudCheckView: React.FC = () => {
  const { lang } = useLangContext();
  const [value, setValue] = useState('');
  const [result, setResult] = useState<'safe' | 'risky' | null>(null);

  const onCheck = () => {
    setResult(basicFraudCheck(value));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t(lang, 'fraudCheck_title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t(lang, 'fraudCheck_placeholder')}
        placeholderTextColor="#4b5563"
        value={value}
        onChangeText={setValue}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={onCheck}>
        <Text style={styles.buttonText}>{t(lang, 'fraudCheck_button')}</Text>
      </TouchableOpacity>
      {result && (
        <Text style={[styles.result, result === 'risky' && styles.resultRisky]}>
          {result === 'safe'
            ? t(lang, 'fraudCheck_safe')
            : t(lang, 'fraudCheck_risky')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 12,
    marginTop: 8,
  },
  title: { color: '#e5e7eb', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    minHeight: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    padding: 8,
    color: '#e5e7eb',
    fontSize: 13,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#022c22', fontWeight: '700', fontSize: 13 },
  result: {
    marginTop: 8,
    color: '#bbf7d0',
    fontSize: 13,
  },
  resultRisky: {
    color: '#fecaca',
  },
});
