// constants/deviceScan.ts
import { Platform } from 'react-native';

export type PermissionRiskLevel = 'low' | 'medium' | 'high';

export type AppRisk = {
  packageName: string;
  appName: string;
  category: string;              // social, utility, game, etc.
  installSource: 'playStore' | 'sideloaded';
  dataUsageMbLast30Days: number;
  lastUsedDaysAgo: number;
  permissions: string[];
  sensitivePermissions: string[];   // subset of permissions considered sensitive
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number;                // 0–100
  reasons: string[];                // why it is risky
  recommendedActions: string[];     // what user should do
};

export type ScanSummary = {
  totalApps: number;
  totalHighRiskApps: number;
  totalMediumRiskApps: number;
  totalLowRiskApps: number;
  totalSideloadedApps: number;
  totalSensitivePermissionsUsed: number;
  mostDataHungryApp: AppRisk | null;
  leastUsedHighRiskApp: AppRisk | null;
  appsByRisk: AppRisk[];
  generatedAt: string;              // ISO timestamp
  notes: string;                    // short human‑readable summary
};

export async function runDevicePrivacyScan(): Promise<ScanSummary> {
  if (Platform.OS !== 'android') {
    throw new Error('Scan is only available on Android.');
  }

  // Simulate scan time
  await new Promise((r) => setTimeout(r, 1500));

  const fakeApps: AppRisk[] = [
    {
      packageName: 'com.socialmega.app',
      appName: 'SocialMega',
      category: 'Social',
      installSource: 'playStore',
      dataUsageMbLast30Days: 920,
      lastUsedDaysAgo: 0,
      permissions: [
        'INTERNET',
        'ACCESS_FINE_LOCATION',
        'CAMERA',
        'RECORD_AUDIO',
        'READ_CONTACTS',
      ],
      sensitivePermissions: [
        'ACCESS_FINE_LOCATION',
        'CAMERA',
        'RECORD_AUDIO',
        'READ_CONTACTS',
      ],
      overallRisk: 'high',
      riskScore: 92,
      reasons: [
        'Uses camera and microphone in background.',
        'Has access to precise location and contacts.',
      ],
      recommendedActions: [
        'Review camera and microphone access in system settings.',
        'Disable background location if not needed.',
        'Remove contacts access if you do not use contact‑based features.',
      ],
    },
    {
      packageName: 'com.flash.light',
      appName: 'Super Flashlight',
      category: 'Utility',
      installSource: 'sideloaded',
      dataUsageMbLast30Days: 35,
      lastUsedDaysAgo: 14,
      permissions: ['INTERNET', 'ACCESS_COARSE_LOCATION', 'READ_PHONE_STATE'],
      sensitivePermissions: ['ACCESS_COARSE_LOCATION', 'READ_PHONE_STATE'],
      overallRisk: 'high',
      riskScore: 88,
      reasons: [
        'Requests location for a simple flashlight app.',
        'Can read phone state, which is unnecessary for its core function.',
      ],
      recommendedActions: [
        'Replace with a flashlight app that does not request location.',
        'Uninstall if you do not fully trust the developer.',
      ],
    },
    {
      packageName: 'com.game.puzzle',
      appName: 'Puzzle World',
      category: 'Game',
      installSource: 'playStore',
      dataUsageMbLast30Days: 210,
      lastUsedDaysAgo: 3,
      permissions: ['INTERNET'],
      sensitivePermissions: [],
      overallRisk: 'low',
      riskScore: 15,
      reasons: [],
      recommendedActions: [
        'No action needed. Permissions appear appropriate for a game.',
      ],
    },
  ];

  const mostDataHungryApp = fakeApps.reduce((a, b) =>
    a.dataUsageMbLast30Days > b.dataUsageMbLast30Days ? a : b
  );

  const highRiskApps = fakeApps.filter((a) => a.overallRisk === 'high');
  const mediumRiskApps = fakeApps.filter((a) => a.overallRisk === 'medium');
  const lowRiskApps = fakeApps.filter((a) => a.overallRisk === 'low');
  const sideloadedApps = fakeApps.filter((a) => a.installSource === 'sideloaded');

  const leastUsedHighRiskApp =
    highRiskApps.length === 0
      ? null
      : highRiskApps.reduce((a, b) =>
          a.lastUsedDaysAgo > b.lastUsedDaysAgo ? a : b
        );

  const totalSensitivePermissionsUsed = fakeApps.reduce(
    (sum, app) => sum + app.sensitivePermissions.length,
    0
  );

  const summary: ScanSummary = {
    totalApps: 87,
    totalHighRiskApps: highRiskApps.length,
    totalMediumRiskApps: mediumRiskApps.length,
    totalLowRiskApps: lowRiskApps.length,
    totalSideloadedApps: sideloadedApps.length,
    totalSensitivePermissionsUsed,
    mostDataHungryApp,
    leastUsedHighRiskApp,
    appsByRisk: fakeApps,
    generatedAt: new Date().toISOString(),
    notes:
      'This is a simulated privacy scan. Review high‑risk apps first, especially those with camera, microphone, or location access.',
  };

  return summary;
}
