import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../../App';
import theme from '../theme';
import PrimaryButton from '../components/PrimaryButton';

export default function ProfileScreen() {
  const { user, setUser } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.field}>ID: <Text style={styles.value}>{user?.id}</Text></Text>
        <Text style={styles.field}>Email: <Text style={styles.value}>{user?.email}</Text></Text>
        <View style={{ height: theme.spacing(1) }} />
        <PrimaryButton title="Sign out" onPress={() => setUser(null)} style={{ backgroundColor: '#E53E3E' }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing(2) },
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(2), borderRadius: theme.radius, ...theme.shadow },
  title: { fontSize: theme.scale(20), fontWeight: '700', color: theme.colors.text, marginBottom: theme.spacing(1) },
  field: { color: theme.colors.muted, marginBottom: theme.spacing(0.5) },
  value: { color: theme.colors.text, fontWeight: '600' },
});
