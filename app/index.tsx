// app/index.tsx
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function StartScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#020617',
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: '#e5e7eb',
          fontSize: 22,
          fontWeight: '700',
          marginBottom: 24,
        }}
      >
        KAVACH – Privacy Debt
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#22c55e',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
          marginBottom: 12,
        }}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={{ color: '#022c22', fontWeight: '700' }}>
          Continue as guest
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#0ea5e9',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
        }}
        onPress={() => router.push('/login')}
      >
        <Text style={{ color: '#e5e7eb', fontWeight: '700' }}>
          Login with email
        </Text>
      </TouchableOpacity>

      <Text style={{ color: '#6b7280', marginTop: 16, fontSize: 12 }}>
        Guests can answer the questionnaire. Login is required only to run
        device scans and save results.
      </Text>
    </View>
  );
}
