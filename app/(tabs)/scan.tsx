// app/(tabs)/scan.tsx
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { runDevicePrivacyScan, ScanSummary } from '../../constants/deviceScan';

export default function ScanScreen() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<ScanSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (Platform.OS !== 'android') {
      setError('Scan is only available on Android.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await runDevicePrivacyScan();
      setSummary(result);
    } catch (e: any) {
      setError(e.message ?? 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#020617' }}
      contentContainerStyle={{ padding: 16 }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: '#22c55e',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
        }}
        onPress={handleScan}
        disabled={loading}
      >
        <Text style={{ color: '#022c22', fontWeight: '700' }}>
          Run free device scan
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator style={{ marginTop: 16 }} color="#22c55e" />
      )}

      {error && (
        <Text style={{ color: '#ef4444', marginTop: 12 }}>{error}</Text>
      )}

      {summary && !loading && (
        <View style={{ marginTop: 16 }}>
          {/* Overview */}
          <Text style={{ color: '#e5e7eb', fontSize: 16, fontWeight: '600' }}>
            Scan overview
          </Text>
          <Text style={{ color: '#9ca3af', marginTop: 4 }}>
            Total apps: {summary.totalApps}
          </Text>
          <Text style={{ color: '#9ca3af' }}>
            High‑risk apps: {summary.totalHighRiskApps}
          </Text>
          <Text style={{ color: '#9ca3af' }}>
            Medium‑risk apps: {summary.totalMediumRiskApps}
          </Text>
          <Text style={{ color: '#9ca3af' }}>
            Sideloaded apps: {summary.totalSideloadedApps}
          </Text>
          <Text style={{ color: '#64748b', marginTop: 4, fontSize: 12 }}>
            {summary.notes}
          </Text>

          {/* Data usage highlight */}
          {summary.mostDataHungryApp && (
            <View style={{ marginTop: 16 }}>
              <Text
                style={{ color: '#e5e7eb', fontSize: 15, fontWeight: '600' }}
              >
                Most data‑hungry app
              </Text>
              <Text style={{ color: '#9ca3af', marginTop: 4 }}>
                {summary.mostDataHungryApp.appName} (
                {summary.mostDataHungryApp.packageName})
              </Text>
              <Text style={{ color: '#9ca3af' }}>
                Last 30 days:{' '}
                {summary.mostDataHungryApp.dataUsageMbLast30Days} MB
              </Text>
            </View>
          )}

          {/* Per‑app risk list */}
          <View style={{ marginTop: 16 }}>
            <Text
              style={{ color: '#e5e7eb', fontSize: 15, fontWeight: '600' }}
            >
              Apps with sensitive access
            </Text>
            {summary.appsByRisk.map((app) => (
              <View
                key={app.packageName}
                style={{
                  marginTop: 8,
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor:
                    app.overallRisk === 'high' ? '#451a1a' : '#020617',
                  borderWidth: 1,
                  borderColor:
                    app.overallRisk === 'high' ? '#f97316' : '#4b5563',
                }}
              >
                <Text
                  style={{
                    color: '#e5e7eb',
                    fontWeight: '600',
                    marginBottom: 2,
                  }}
                >
                  {app.appName} · {app.overallRisk.toUpperCase()} risk
                </Text>
                <Text style={{ color: '#9ca3af', fontSize: 12 }}>
                  {app.packageName} · {app.category} ·{' '}
                  {app.installSource === 'sideloaded'
                    ? 'Sideloaded'
                    : 'Play Store'}
                </Text>
                <Text style={{ color: '#9ca3af', marginTop: 4 }}>
                  Data used (30 days): {app.dataUsageMbLast30Days} MB
                </Text>
                <Text style={{ color: '#9ca3af' }}>
                  Permissions: {app.permissions.join(', ')}
                </Text>
                {app.sensitivePermissions.length > 0 && (
                  <Text
                    style={{ color: '#f97316', marginTop: 2, fontSize: 12 }}
                  >
                    Sensitive: {app.sensitivePermissions.join(', ')}
                  </Text>
                )}

                {app.reasons.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={{ color: '#fb923c', fontWeight: '600' }}>
                      Why this app is risky
                    </Text>
                    {app.reasons.map((reason, i) => (
                      <Text
                        key={i}
                        style={{
                          color: '#fbbf24',
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        • {reason}
                      </Text>
                    ))}
                  </View>
                )}

                {app.recommendedActions.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={{ color: '#a3e635', fontWeight: '600' }}>
                      What you can do
                    </Text>
                    {app.recommendedActions.map((action, i) => (
                      <Text
                        key={i}
                        style={{
                          color: '#bef264',
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        • {action}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
