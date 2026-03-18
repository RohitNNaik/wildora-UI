import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme';

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
      <Text style={styles.text}>{post.text || post.caption}</Text>
      <Text style={styles.meta}>{post.author || post.user || 'Unknown'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(1.5), margin: theme.spacing(1), borderRadius: theme.radius, ...theme.shadow },
  image: { width: '100%', height: 220, borderRadius: 10, marginBottom: theme.spacing(1) },
  text: { marginBottom: 6, color: theme.colors.text },
  meta: { color: theme.colors.muted, fontSize: theme.scale(12) }
});
