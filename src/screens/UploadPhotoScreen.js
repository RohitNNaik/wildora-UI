import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadPhoto } from '../api';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function UploadPhotoScreen() {
  const [imageUri, setImageUri] = useState(null);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.cancelled) setImageUri(result.uri);
  }

  async function handleUpload() {
    if (!imageUri) return Alert.alert('No image', 'Please pick a photo first');
    const formData = new FormData();
    const filename = imageUri.split('/').pop();
    const match = filename?.match(/\.(\w+)$/);
    const type = match ? `image/${match[1]}` : 'image/jpeg';
    formData.append('photo', { uri: imageUri, name: filename, type });

    try {
      await uploadPhoto(formData);
      Alert.alert('Uploaded', 'Photo uploaded successfully');
      setImageUri(null);
    } catch (err) {
      console.warn(err);
      Alert.alert('Upload failed', err.message || 'Unknown error');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <PrimaryButton title="Pick Photo" onPress={pickImage} />
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}
        <PrimaryButton title="Upload" onPress={handleUpload} style={{ marginTop: theme.scale(10) }} disabled={!imageUri} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing(2) },
  card: { backgroundColor: theme.colors.surface, padding: theme.spacing(2), borderRadius: theme.radius, alignItems: 'center', ...theme.shadow },
  preview: { width: '100%', height: 360, marginVertical: theme.spacing(1), borderRadius: 12, resizeMode: 'cover' },
});
