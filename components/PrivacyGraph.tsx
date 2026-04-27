import { Text, View } from 'react-native';

export default function PrivacyGraph() {
  return (
    <View style={{ marginVertical: 15 }}>
      <Text>Data Exposure Breakdown</Text>
      <Text>📍 Location – 40%</Text>
      <Text>👤 Contacts – 30%</Text>
      <Text>🎤 Media – 20%</Text>
      <Text>📦 Others – 10%</Text>
    </View>
  );
}
