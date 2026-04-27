// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { LanguageProvider } from '../hooks/LanguageContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    InterRegular: require('../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),
    InterSemiBold: require('../assets/fonts/Anton-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Always start here */}
        <Stack.Screen name="login" />
        {/* Main app with tabs */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </LanguageProvider>
  );
}
