// app/(tabs)/score.tsx
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { t } from '../../constants/i18n';
import { useLangContext } from '../../hooks/LanguageContext';
import { useAssessment } from '../../hooks/useAssessment';

// Radial gauge component
function RadialGauge({
  value,
  size,
  strokeWidth,
  color,
}: {
  value: number;
  size: number;
  strokeWidth: number;
  color: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0DFD6"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
}

export default function ScoreScreen() {
  const { lang } = useLangContext();
  const { answers } = useAssessment();
  const router = useRouter();
  const { width } = useWindowDimensions();

  // 1. Compute raw RISK from answers (0,1,2; 2 = high risk)
  const { normalizedRisk, answeredCount } = useMemo(() => {
    const vals = Object.values(answers).filter(
      (v): v is 0 | 1 | 2 => v !== undefined,
    );
    if (vals.length === 0) {
      return { normalizedRisk: 0, answeredCount: 0 };
    }
    const raw = vals.reduce<number>((sum, v) => sum + v, 0); // 0..2*n
 // 0..2*n
    const maxRaw = vals.length * 2;
    return {
      normalizedRisk: (raw / maxRaw) * 100, // 0..100
      answeredCount: vals.length,
    };
  }, [answers]);

  // 2. Map normalizedRisk to strict bands:
  //   low    → 0–30
  //   medium → 30–60
  //   high   → 60–100
  const { numericScore, riskLabel, riskColor } = useMemo(() => {
    if (answeredCount === 0) {
      return {
        numericScore: 0,
        riskLabel: t(lang, 'score_risk_low'),
        riskColor: '#16A34A',
      };
    }

    let bandScore: number;
    let label: string;
    let color: string;

    if (normalizedRisk <= 33.33) {
      // LOW band
      const scaled = (normalizedRisk / 33.33) * 30; // 0..30
      bandScore = Math.min(30, Math.max(0, scaled));
      label = t(lang, 'score_risk_low');
      color = '#16A34A';
    } else if (normalizedRisk <= 66.66) {
      // MEDIUM band
      const scaled =
        ((normalizedRisk - 33.33) / (66.66 - 33.33)) * 30 + 30; // 30..60
      bandScore = Math.min(60, Math.max(30, scaled));
      label = t(lang, 'score_risk_med');
      color = '#FACC15';
    } else {
      // HIGH band
      const scaled =
        ((normalizedRisk - 66.66) / (100 - 66.66)) * 40 + 60; // 60..100
      bandScore = Math.min(100, Math.max(60, scaled));
      label = t(lang, 'score_risk_high');
      color = '#EF4444';
    }

    return {
      numericScore: Math.round(bandScore),
      riskLabel: label,
      riskColor: color,
    };
  }, [normalizedRisk, answeredCount, lang]);

  const gaugeSize = Math.min(width * 0.55, 220);
  const gaugeStroke = Math.max(10, gaugeSize * 0.08);

  // Exposure bars derived from numericScore
  const appsScore = Math.min(100, Math.max(0, numericScore - 10));
  const socialScore = Math.min(100, Math.max(0, numericScore + 5));
  const authScore = Math.min(100, Math.max(0, numericScore + 15));

  // Carbon footprint: higher risk => higher carbon
  const carbonFootprint = useMemo(
    () => (0.3 + (normalizedRisk / 100) * 1.7).toFixed(1),
    [normalizedRisk],
  );

  const carbonRiskLabel = useMemo(() => {
    if (normalizedRisk <= 33.33)
      return t(lang, 'carbon_low') || 'Low Carbon';
    if (normalizedRisk <= 66.66)
      return t(lang, 'carbon_medium') || 'Medium Carbon';
    return t(lang, 'carbon_high') || 'High Carbon';
  }, [normalizedRisk, lang]);

  const barWidth = (value: number) =>
    `${Math.max(0, Math.min(100, value))}%` as `${number}%`;

  const openDownload = () => {
    Linking.openURL('https://example.com/kavach-app-download');
  };

  const handleAgain = () => router.push('/(tabs)/assessment');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>{t(lang, 'score_title')}</Text>

      {/* Score */}
      <View style={styles.simpleCard}>
        <Text style={styles.sectionLabel}>{t(lang, 'score_overall')}</Text>
        <Text style={[styles.mainNumber, { color: riskColor }]}>
          {numericScore}
        </Text>
        <Text style={[styles.riskText, { color: riskColor }]}>
          {riskLabel}
        </Text>
      </View>

      {/* Carbon */}
      <View style={styles.simpleCard}>
        <Text style={styles.sectionLabel}>
          {t(lang, 'carbon_footprint_title') || 'Carbon Footprint'}
        </Text>
        <Text style={[styles.mainNumber, { color: riskColor }]}>
          {carbonFootprint} kg
        </Text>
        <Text style={[styles.carbonRiskText, { color: riskColor }]}>
          {carbonRiskLabel}
        </Text>
      </View>

      {/* Bars */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t(lang, 'score_exposure_title')}
        </Text>

        <View style={styles.barRow}>
          <Text style={styles.barLabel}>
            {t(lang, 'score_exposure_apps')}
          </Text>
          <View style={styles.barBackground}>
            <View
              style={[styles.barFill, { width: barWidth(appsScore) }]}
            />
          </View>
          <Text style={styles.barValue}>{appsScore}</Text>
        </View>

        <View style={styles.barRow}>
          <Text style={styles.barLabel}>
            {t(lang, 'score_exposure_social')}
          </Text>
          <View style={styles.barBackground}>
            <View
              style={[styles.barFill, { width: barWidth(socialScore) }]}
            />
          </View>
          <Text style={styles.barValue}>{socialScore}</Text>
        </View>

        <View style={styles.barRow}>
          <Text style={styles.barLabel}>
            {t(lang, 'score_exposure_auth')}
          </Text>
          <View style={styles.barBackground}>
            <View
              style={[styles.barFill, { width: barWidth(authScore) }]}
            />
          </View>
          <Text style={styles.barValue}>{authScore}</Text>
        </View>

        <View style={styles.barRow}>
          <Text style={styles.barLabel}>
            {t(lang, 'carbon_footprint_label') || 'Carbon Impact'}
          </Text>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                styles.carbonBarFill,
                {
                  width: barWidth(
                    Math.min(
                      100,
                      Math.max(0, parseFloat(carbonFootprint) * 40),
                    ),
                  ),
                },
              ]}
            />
          </View>
          <Text style={styles.barValue}>{carbonFootprint}kg</Text>
        </View>
      </View>

      {/* Gauge */}
      <View style={styles.gaugeCard}>
        <Text style={styles.sectionLabel}>
          {t(lang, 'score_gauge_title') || 'Risk Gauge'}
        </Text>
        <RadialGauge
          value={numericScore}
          size={gaugeSize}
          strokeWidth={gaugeStroke}
          color={riskColor}
        />
      </View>

      {/* Actions + banner */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t(lang, 'score_actions_title')}
        </Text>
        <Text style={styles.body}>{t(lang, 'score_action1')}</Text>
        <Text style={styles.body}>{t(lang, 'score_action2')}</Text>
        <Text style={styles.body}>{t(lang, 'score_action3')}</Text>
        <Text style={styles.body}>{t(lang, 'score_action4')}</Text>
        <Text style={styles.body}>
          {t(lang, 'carbon_action') ||
            'Improve privacy to reduce your digital carbon footprint'}
        </Text>
      </View>

      <View style={styles.appBanner}>
        <Text style={styles.bannerTitle}>
          {t(lang, 'score_app_banner_title')}
        </Text>
        <Text style={styles.bannerBody}>
          {t(lang, 'score_app_banner_body')}
        </Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={openDownload}>
          <Text style={styles.primaryText}>
            {t(lang, 'score_app_banner_cta')}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.secondaryBtn} onPress={handleAgain}>
        <Text style={styles.secondaryText}>
          {t(lang, 'score_again')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F6EE' },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontFamily: 'Antonio-Bold',
    color: '#111827',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
  },
  simpleCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0DFD6',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  gaugeCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0DFD6',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#6B7280',
    fontSize: 20,
    marginBottom: 6,
  },
  mainNumber: {
    color: '#111827',
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 4,
  },
  riskText: {
    fontSize: 18,
    fontWeight: '600',
  },
  carbonRiskText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: { width: '100%', marginBottom: 16 },
  sectionTitle: {
    fontFamily: 'Antonio-Bold',
    color: '#111827',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#4B5563',
    fontSize: 18,
    marginBottom: 4,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  barLabel: {
    color: '#4B5563',
    fontSize: 16,
    flex: 0.9,
  },
  barBackground: {
    flex: 2,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  barFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#16A34A',
  },
  carbonBarFill: { backgroundColor: '#3B82F6' },
  barValue: {
    color: '#111827',
    fontSize: 16,
    width: 40,
    textAlign: 'right',
  },
  appBanner: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 12,
  },
  bannerTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  bannerBody: { color: '#4B5563', fontSize: 15, marginBottom: 8 },
  primaryBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 999,
    paddingVertical: 9,
    alignItems: 'center',
  },
  primaryText: { color: '#F7F6EE', fontSize: 15, fontWeight: '700' },
  secondaryBtn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    paddingVertical: 9,
    alignItems: 'center',
  },
  secondaryText: { color: '#4B5563', fontSize: 15 },
});
