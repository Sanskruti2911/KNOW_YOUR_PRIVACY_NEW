// app/(tabs)/more.tsx - Complete More Screen with About Us
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { t } from '../../constants/i18n';
import { useLangContext } from '../../hooks/LanguageContext';

export default function MoreScreen() {
  const { lang } = useLangContext();

  const openEmail = () => {
    Linking.openURL('mailto:kavachsupport@gmail.com');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://kavach.app/privacy');
  };

  const openTerms = () => {
    Linking.openURL('https://kavach.app/terms');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t(lang, 'more_title')}</Text>

      {/* About Us Section */}
      <View style={styles.aboutCard}>
        <Text style={styles.sectionTitle}>{t(lang, 'more_about')}</Text>
        <Text style={styles.aboutBody}>{t(lang, 'more_about_body1')}</Text>
        <Text style={styles.aboutBody}>{t(lang, 'more_about_body2')}</Text>
        <Text style={styles.aboutBody}>{t(lang, 'more_about_body3')}</Text>
        <Text style={styles.aboutBody}>{t(lang, 'more_about_body4')}</Text>
      </View>

      {/* Support Section */}
      <View style={styles.supportCard}>
        <Text style={styles.sectionTitle}>{t(lang, 'more_support_title')}</Text>
        <Text style={styles.supportBody}>{t(lang, 'more_support_body')}</Text>
        <TouchableOpacity style={styles.emailButton} onPress={openEmail}>
          <Text style={styles.emailButtonText}>{t(lang, 'more_support_email')}</Text>
        </TouchableOpacity>
      </View>

      {/* Legal Links */}
      <View style={styles.legalSection}>
        <TouchableOpacity style={styles.legalLink} onPress={openPrivacyPolicy}>
          <Text style={styles.legalText}>{t(lang, 'more_privacy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.legalLink} onPress={openTerms}>
          <Text style={styles.legalText}>{t(lang, 'more_terms')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F6EE',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 25,
    fontFamily: 'Antonio-Bold',
  },
  aboutCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 12,
    fontFamily: 'Antonio-Bold',
  },
  aboutBody: {
    color: '#e5e7eb',
    fontSize: 20,
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  supportCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  supportBody: {
    color: '#9ca3af',
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Regular',
  },
  emailButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  emailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  legalSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  legalLink: {
    marginBottom: 16,
  },
  legalText: {
    color: '#60a5fa',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
  },
});