// app/login.tsx
import { useRouter } from 'expo-router';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../android/app/src/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ensureUserProfile = async (uid: string, userEmail: string | null) => {
    await setDoc(
      doc(db, 'users', uid),
      {
        email: userEmail,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const goToApp = () => {
    // go to home tabs – same as guest
    router.replace('/(tabs)');
  };

  const handleCreateAccount = async () => {
    if (!email || !password) {
      setError('Enter email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await ensureUserProfile(cred.user.uid, cred.user.email);
      goToApp();
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError('Account already exists. Use Login instead.');
      } else if (e.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError(e.message ?? 'Sign up failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Enter email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await ensureUserProfile(cred.user.uid, cred.user.email);
      goToApp();
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        setError('No account found. Use Create account.');
      } else if (e.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError(e.message ?? 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fake login only to test navigation
  const handleFakeLogin = () => {
    goToApp();
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#020617' }}
      contentContainerStyle={{ padding: 16, justifyContent: 'center', flexGrow: 1 }}
    >
      <Text
        style={{
          color: '#e5e7eb',
          fontSize: 22,
          fontWeight: '700',
          marginBottom: 12,
        }}
      >
        Login or create account
      </Text>

      {/* Why we ask for login */}
      <Text style={{ color: '#9ca3af', marginBottom: 8 }}>
        We use your account only to save your privacy assessment, scan summaries
        and settings across sessions.
      </Text>
      <Text style={{ color: '#9ca3af', marginBottom: 8 }}>
        We do not collect your photos, messages, contacts, files or contents of
        apps. Only app names, permissions and basic usage stats are analysed on
        your device.
      </Text>
      <Text style={{ color: '#9ca3af', marginBottom: 16 }}>
        You can also skip real login using the test button below to just try the
        navigation.
      </Text>

      <TextInput
        style={{
          backgroundColor: '#0f172a',
          borderRadius: 8,
          padding: 12,
          color: '#e5e7eb',
          borderWidth: 1,
          borderColor: '#4b5563',
          marginBottom: 8,
        }}
        placeholder="Email"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={{
          backgroundColor: '#0f172a',
          borderRadius: 8,
          padding: 12,
          color: '#e5e7eb',
          borderWidth: 1,
          borderColor: '#4b5563',
        }}
        placeholder="Password"
        placeholderTextColor="#64748b"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && (
        <Text style={{ color: '#ef4444', marginTop: 8 }}>{error}</Text>
      )}

      {/* Create account */}
      <TouchableOpacity
        onPress={handleCreateAccount}
        disabled={loading}
        style={{
          marginTop: 16,
          backgroundColor: '#22c55e',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#022c22', fontWeight: '700' }}>
          {loading ? 'Please wait…' : 'Create account'}
        </Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          marginTop: 8,
          backgroundColor: '#0ea5e9',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#0f172a', fontWeight: '700' }}>Login</Text>
      </TouchableOpacity>

      {/* Fake login / test navigation */}
      <TouchableOpacity
        onPress={handleFakeLogin}
        style={{
          marginTop: 12,
          backgroundColor: '#facc15',
          paddingVertical: 12,
          borderRadius: 999,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#1f2937', fontWeight: '700' }}>
          Test app without real login
        </Text>
      </TouchableOpacity>

      {/* Clear form */}
      <TouchableOpacity
        onPress={handleClear}
        style={{ marginTop: 10, alignItems: 'center' }}
      >
        <Text style={{ color: '#64748b', fontSize: 12 }}>Clear fields</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
