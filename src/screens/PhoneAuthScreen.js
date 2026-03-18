import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth, firebaseConfig } from '../firebase/config';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';
import { useAuth } from '../../App';

export default function PhoneAuthScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [code, setCode] = useState('');
  const { setUser } = useAuth();

  async function sendVerification() {
    try {
      const formatted = phone.startsWith('+') ? phone : `+${phone}`;
      const confirmationResult = await signInWithPhoneNumber(auth, formatted, recaptchaVerifier.current);
      setConfirmation(confirmationResult);
      Alert.alert('Code sent', 'A verification code was sent to your phone');
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', err.message || 'Failed to send verification');
    }
  }

  async function confirmCode() {
    if (!confirmation) return Alert.alert('No code', 'Request a code first');
    try {
      const userCredential = await confirmation.confirm(code);
      // set user in auth context
      setUser({ id: userCredential.user.uid, phone: userCredential.user.phoneNumber });
      navigation.navigate('Feed');
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', err.message || 'Failed to confirm code');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <View style={styles.card}>
        <Text style={styles.title}>Phone sign-in</Text>
        <Text style={styles.subtitle}>Enter your phone number with country code (e.g. +14155551234)</Text>
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" placeholder="+1234567890" />
        <PrimaryButton title="Send code" onPress={sendVerification} style={{ marginTop: theme.scale(10) }} />

        {verificationId ? (
          <>
            <TextInput value={code} onChangeText={setCode} style={[styles.input, { marginTop: theme.scale(12) }]} keyboardType="number-pad" placeholder="123456" />
            <PrimaryButton title="Confirm code" onPress={confirmCode} style={{ marginTop: theme.scale(10) }} />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing(2) },
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(2), borderRadius: theme.radius, ...theme.shadow },
  title: { fontSize: theme.scale(20), fontWeight: '700', marginBottom: theme.spacing(0.5), color: theme.colors.text },
  subtitle: { color: theme.colors.muted, marginBottom: theme.spacing(1) },
  input: { borderWidth: 1, borderColor: '#E6EEF2', padding: theme.scale(12), borderRadius: 10, backgroundColor: '#FBFDFF' },
});
