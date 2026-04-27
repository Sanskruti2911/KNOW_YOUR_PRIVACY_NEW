// App.tsx
import { ExpoRoot } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ExpoRoot context={require.context('./app', true, /\.tsx?$/)} />
    </>
  );
}
