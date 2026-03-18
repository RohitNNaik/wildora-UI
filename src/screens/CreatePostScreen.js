import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { createPost } from '../api';
import theme from '../theme';
import PrimaryButton from '../components/PrimaryButton';

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState('');

  async function submit() {
    if (!text.trim()) return Alert.alert('Empty', 'Write something for your post');
    try {
      await createPost({ text });
      Alert.alert('Posted', 'Your post was created');
      setText('');
      navigation.navigate('Feed');
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', err.message || 'Could not create post');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <TextInput multiline placeholder="Share something..." value={text} onChangeText={setText} style={styles.input} />
        <PrimaryButton title="Post" onPress={submit} style={{ marginTop: theme.scale(12) }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing(2) },
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(2), borderRadius: theme.radius, ...theme.shadow },
  input: { borderWidth: 1, borderColor: '#E6EEF2', padding: theme.scale(12), borderRadius: 10, height: 160, textAlignVertical: 'top', backgroundColor: '#FBFDFF' },
});
