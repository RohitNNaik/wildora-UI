import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../App';
import theme from '../theme';
import PrimaryButton from '../components/PrimaryButton';

export default function SignInScreen({ navigation }) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function signIn() {
    setUser({ id: 'user-1', email });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue exploring wildlife & tours</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
        <PrimaryButton title="Sign In" onPress={signIn} style={{ marginTop: theme.scale(12) }} />
        <PrimaryButton title="Create account" onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 12, backgroundColor: theme.colors.accent }} />
        <PrimaryButton title="Sign in with phone" onPress={() => navigation.navigate('PhoneAuth')} style={{ marginTop: 12, backgroundColor: '#0EA5A4' }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing(2), justifyContent: 'center' },
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(2), borderRadius: theme.radius, ...theme.shadow },
  title: { fontSize: theme.scale(22), fontWeight: '700', color: theme.colors.text, marginBottom: theme.spacing(0.5) },
  subtitle: { color: theme.colors.muted, marginBottom: theme.spacing(1) },
  input: { borderWidth: 1, borderColor: '#E6EEF2', padding: theme.scale(12), marginBottom: theme.spacing(1), borderRadius: 10, backgroundColor: '#FBFDFF' },
});
