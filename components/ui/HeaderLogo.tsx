// components/ui/HeaderLogo.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const HeaderLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/kavach_Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>KAVACH</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 36,
    height: 36,
  },
  text: {
    color: '#F7F6EE',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
