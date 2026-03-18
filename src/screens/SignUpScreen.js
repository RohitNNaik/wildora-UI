import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../App';
import theme from '../theme';
import PrimaryButton from '../components/PrimaryButton';

export default function SignUpScreen() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function signUp() {
    setUser({ id: 'user-1', email });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
        <PrimaryButton title="Sign Up" onPress={signUp} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing(2), justifyContent: 'center' },
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(2), borderRadius: theme.radius, ...theme.shadow },
  title: { fontSize: theme.scale(20), fontWeight: '700', color: theme.colors.text, marginBottom: theme.spacing(0.5), textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#E6EEF2', padding: theme.scale(12), marginBottom: theme.spacing(1), borderRadius: 10, backgroundColor: '#FBFDFF' },
});
