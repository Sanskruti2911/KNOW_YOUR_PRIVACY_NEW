// app/(tabs)/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from '../../constants/i18n';
import { useLangContext } from '../../hooks/LanguageContext';

export default function HomeScreen() {
  const { lang } = useLangContext();
  const router = useRouter();

  const handleAssessment = () => router.push('/(tabs)/assessment');
  const handleDownload = () => {
    // TODO: replace with real Play Store link
    Linking.openURL('https://example.com/kavach-app-download');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t(lang, 'home_title')}</Text>
      <Text style={styles.subtitle}>{t(lang, 'home_subtitle')}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t(lang, 'home_whatIs_title')}</Text>
        <Text style={styles.body}>{t(lang, 'home_whatIs_body')}</Text>
      </View>

      <View style={styles.cardRow}>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardTitle}>{t(lang, 'home_why_title')}</Text>
          <Text style={styles.body}>{t(lang, 'home_why_body')}</Text>
        </View>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardTitle}>{t(lang, 'home_facts_title')}</Text>
          <Text style={styles.body}>{t(lang, 'home_fact1')}</Text>
          <Text style={styles.body}>{t(lang, 'home_fact2')}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t(lang, 'home_prevent_title')}</Text>
        <Text style={styles.body}>{t(lang, 'home_prevent_body')}</Text>
      </View>

      <View style={styles.ctaRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleAssessment}>
          <Text style={styles.primaryText}>{t(lang, 'home_cta_assess')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleDownload}>
          <Text style={styles.secondaryText}>{t(lang, 'home_cta_download')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appFeatures}>
        <Text style={styles.sectionLabel}>App features</Text>
        <Text style={styles.featureTitle}>{t(lang, 'app_feature_scan_title')}</Text>
        <Text style={styles.body}>{t(lang, 'app_feature_scan_body')}</Text>

        <Text style={styles.featureTitle}>{t(lang, 'app_feature_report_title')}</Text>
        <Text style={styles.body}>{t(lang, 'app_feature_report_body')}</Text>

        <Text style={styles.featureTitle}>{t(lang, 'app_feature_alerts_title')}</Text>
        <Text style={styles.body}>{t(lang, 'app_feature_alerts_body')}</Text>

        <Text style={styles.featureTitle}>{t(lang, 'app_feature_fraud_title')}</Text>
        <Text style={styles.body}>{t(lang, 'app_feature_fraud_body')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F6EE' },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Antonio-Bold',
    color: '#051650',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#0a0a0aff',
    fontSize: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F7F6EE',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7DECC',
    padding: 14,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  cardHalf: { flex: 1 },
  cardTitle: {
    color: '#051650',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#0a0a0aff',
    fontSize: 16,
    lineHeight: 18,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
    marginBottom: 16,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#051650',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  primaryText: {
    color: '#F7F6EE',
    fontWeight: '700',
    fontSize: 18,
  },
  secondaryBtn: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E7DECC',
    paddingVertical: 10,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#051650',
    fontWeight: '600',
    fontSize: 18,
  },
  appFeatures: {
    paddingVertical: 8,
  },
  sectionLabel: {
    color: '#051650',
    fontSize: 15,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  featureTitle: {
    color: '#051650',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 2,
  },
});
