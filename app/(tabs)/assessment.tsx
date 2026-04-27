// app/(tabs)/assessment.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from '../../constants/i18n';
import { useLangContext } from '../../hooks/LanguageContext';
import {
  AnswerValue,
  AssessmentAnswers,
  useAssessment,
} from '../../hooks/useAssessment';

type QuestionConfig = {
  key: keyof AssessmentAnswers;
  labelKey: string;
  options: { labelKey: string; value: AnswerValue }[];
};

export default function AssessmentScreen() {
  const { lang } = useLangContext();
  const router = useRouter();
  const { answers, setAnswers } = useAssessment(); // no setScore here
  const [started, setStarted] = useState(false);

  const questions: QuestionConfig[] = [
    {
      key: 'deviceLock',
      labelKey: 'q_device_lock',
      options: [
        { labelKey: 'q_device_lock_opt1', value: 0 },
        { labelKey: 'q_device_lock_opt2', value: 1 },
        { labelKey: 'q_device_lock_opt3', value: 2 },
      ],
    },
    {
      key: 'publicWifi',
      labelKey: 'q_public_wifi',
      options: [
        { labelKey: 'q_public_wifi_opt1', value: 0 },
        { labelKey: 'q_public_wifi_opt2', value: 1 },
        { labelKey: 'q_public_wifi_opt3', value: 2 },
      ],
    },
    {
      key: 'permissions',
      labelKey: 'q_permissions',
      options: [
        { labelKey: 'q_permissions_opt1', value: 0 },
        { labelKey: 'q_permissions_opt2', value: 1 },
        { labelKey: 'q_permissions_opt3', value: 2 },
      ],
    },
    {
      key: 'socialSharing',
      labelKey: 'q_social_sharing',
      options: [
        { labelKey: 'q_social_sharing_opt1', value: 0 },
        { labelKey: 'q_social_sharing_opt2', value: 1 },
        { labelKey: 'q_social_sharing_opt3', value: 2 },
      ],
    },
    {
      key: 'passwords',
      labelKey: 'q_passwords',
      options: [
        { labelKey: 'q_passwords_opt1', value: 0 },
        { labelKey: 'q_passwords_opt2', value: 1 },
        { labelKey: 'q_passwords_opt3', value: 2 },
      ],
    },
    {
      key: 'twoFA',
      labelKey: 'q_2fa',
      options: [
        { labelKey: 'q_2fa_opt1', value: 0 },
        { labelKey: 'q_2fa_opt2', value: 1 },
        { labelKey: 'q_2fa_opt3', value: 2 },
      ],
    },
    {
      key: 'socialApps',
      labelKey: 'q_social_apps',
      options: [
        { labelKey: 'q_social_apps_opt1', value: 0 },
        { labelKey: 'q_social_apps_opt2', value: 1 },
        { labelKey: 'q_social_apps_opt3', value: 2 },
      ],
    },
    {
      key: 'passwordManager',
      labelKey: 'q_password_manager',
      options: [
        { labelKey: 'q_password_manager_opt1', value: 0 },
        { labelKey: 'q_password_manager_opt2', value: 1 },
        { labelKey: 'q_password_manager_opt3', value: 2 },
      ],
    },
    {
      key: 'browsingHistory',
      labelKey: 'q_browsing_history',
      options: [
        { labelKey: 'q_browsing_history_opt1', value: 0 },
        { labelKey: 'q_browsing_history_opt2', value: 1 },
        { labelKey: 'q_browsing_history_opt3', value: 2 },
      ],
    },
  ];

  const handleSelect = (key: keyof AssessmentAnswers, value: AnswerValue) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleSubmit = () => {
    // ensure all answers are present
    for (const q of questions) {
      if (answers[q.key] === undefined) {
        Alert.alert('Incomplete', 'Please answer all questions.');
        return;
      }
    }

    // score is computed inside useAssessment from answers
    router.push('/(tabs)/score');
  };

  const handleReset = () => {
    setAnswers({});
    setStarted(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t(lang, 'assessment_title')}</Text>
      <Text style={styles.subtitle}>{t(lang, 'assessment_subtitle')}</Text>

      {!started ? (
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => setStarted(true)}
        >
          <Text style={styles.primaryText}>{t(lang, 'assessment_start')}</Text>
        </TouchableOpacity>
      ) : (
        <>
          {questions.map((q) => (
            <View key={q.key as string} style={styles.questionCard}>
              <Text style={styles.questionText}>{t(lang, q.labelKey)}</Text>
              <View style={styles.optionsRow}>
                {q.options.map((opt) => {
                  const selected = answers[q.key] === opt.value;
                  return (
                    <TouchableOpacity
                      key={opt.labelKey}
                      style={[
                        styles.option,
                        selected && styles.optionSelected,
                      ]}
                      onPress={() => handleSelect(q.key, opt.value)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {t(lang, opt.labelKey)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit}>
              <Text style={styles.primaryText}>
                {t(lang, 'assessment_submit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={handleReset}>
              <Text style={styles.secondaryText}>
                {t(lang, 'assessment_reset')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F6EE' },
  container: { padding: 16, paddingBottom: 36 },
  title: {
    fontFamily: 'Antonio-Bold',
    color: '#051650',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#080808ff',
    fontSize: 20,
    marginBottom: 12,
  },
  questionCard: {
    backgroundColor: '#f9fdfcff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2F52A2',
    padding: 12,
    marginBottom: 10,
  },
  questionText: {
    fontFamily: 'Antonio-Bold',
    color: '#051650',
    fontSize: 20,
    marginBottom: 8,
  },
  optionsRow: { gap: 6 },
  option: {
    backgroundColor: '#f9fdfcff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#051650',
    marginBottom: 6,
  },
  optionSelected: {
    backgroundColor: '#051650',
    borderColor: '#051650',
  },
  optionText: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#2F52A2',
    fontSize: 18,
  },
  optionTextSelected: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#f9fdfcff',
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: '#051650',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryText: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#f8fcfbff',
    fontWeight: '700',
    fontSize: 20,
  },
  secondaryBtn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4b5563',
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryText: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#9ca3af',
    fontSize: 18,
  },
  bottomButtons: { marginTop: 8 },
});
