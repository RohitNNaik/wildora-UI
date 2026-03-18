import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import { getFeed } from '../api';
import PostCard from '../components/PostCard';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    setRefreshing(true);
    try {
      const data = await getFeed();
      setPosts(data.posts || data || []);
    } catch (err) {
      console.warn(err.message || err);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.controls}>
        <PrimaryButton title="Upload" onPress={() => navigation.navigate('UploadPhoto')} style={styles.ctrlBtn} />
        <PrimaryButton title="New Post" onPress={() => navigation.navigate('CreatePost')} style={styles.ctrlBtn} />
        <PrimaryButton title="Destinations" onPress={() => navigation.navigate('Destinations')} style={styles.ctrlBtn} />
        <PrimaryButton title="Recs" onPress={() => navigation.navigate('Recommendations')} style={styles.ctrlBtn} />
        <PrimaryButton title="Profile" onPress={() => navigation.navigate('Profile')} style={styles.ctrlBtn} />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, i) => item.id?.toString() || String(i)}
        renderItem={({ item }) => <PostCard post={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  controls: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: theme.spacing(1), backgroundColor: theme.colors.surface },
  ctrlBtn: { marginVertical: theme.spacing(0.5), minWidth: 100 },
});
