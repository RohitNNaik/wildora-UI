import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { getRecommendations } from '../api';
import theme from '../theme';

export default function RecommendationsScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getRecommendations();
        setItems(data.recommendations || data || []);
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={items} keyExtractor={(i, idx) => i.id?.toString() || String(idx)} renderItem={({ item }) => (
        <View style={styles.card}><Text style={styles.title}>{item.title || item.name}</Text><Text style={styles.desc}>{item.summary || item.description}</Text></View>
      )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing(1) },
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(1.5), borderRadius: theme.radius, marginBottom: theme.spacing(1), ...theme.shadow },
  title: { fontWeight: '700', color: theme.colors.text, marginBottom: theme.spacing(0.5) },
  desc: { color: theme.colors.muted },
});
