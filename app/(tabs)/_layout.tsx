// app/(tabs)/_layout.tsx
import { AssessmentProvider } from '@/hooks/useAssessment';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { HeaderLogo } from '../../components/ui/HeaderLogo';
import { LanguageToggle } from '../../components/ui/LanguageToggle';
import { useLangContext } from '../../hooks/LanguageContext';

export default function TabLayout() {
  const { lang, change } = useLangContext();

  return (
    <AssessmentProvider>
      <Tabs
        screenOptions={{
          headerTitle: () => <HeaderLogo />,
          headerStyle: { backgroundColor: '#2F52A2' },
          headerTintColor: '#051650',
          headerTitleStyle: { fontSize: 20, fontWeight: '700' },
          tabBarStyle: { backgroundColor: '#2F52A2', borderTopColor: '#2F52A2' },
          tabBarActiveTintColor: '#F7F6EE',
          tabBarInactiveTintColor: '#F7F6EE',
          tabBarLabelStyle: {
            fontSize: 18,
            fontWeight: '600',
          },
          headerRight: () => (
            <LanguageToggle lang={lang} onChange={change} />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={25}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: 'News',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={25}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="assessment"
          options={{
            title: 'Assessment',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'clipboard' : 'clipboard-outline'}
                size={25}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="score"
          options={{
            title: 'Score',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'analytics' : 'analytics-outline'}
                size={25}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: 'Scan',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'scan' : 'scan-outline'}
                size={25}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused
                    ? 'ellipsis-horizontal'
                    : 'ellipsis-horizontal-outline'
                }
                size={25}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </AssessmentProvider>
  );
}
