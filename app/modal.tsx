import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { basicFraudCheck } from '../constants/fraudCheck';

export default function Modal() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);

  return (
    <View style={{ padding: 20 }}>
      <Text>Check suspicious link</Text>
      <TextInput
        value={url}
        onChangeText={setUrl}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Check" onPress={() => setResult(basicFraudCheck(url))} />
      {result && <Text>Risk: {result.risk}</Text>}
    </View>
  );
}
