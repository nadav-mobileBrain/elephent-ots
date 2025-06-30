import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { BookOpen } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { stories } from '@/data/stories';

const StoryCard = ({ story, index }: { story: any; index: number }) => {
  const router = useRouter();

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <Pressable onPress={() => router.push(`/story/${story.id}`)}>
        <View style={styles.card}>
          <BookOpen color={Colors.primary} size={32} />
          <Text style={styles.storyTitle}>{story.title}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default function StoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elephant Stories</Text>
      <FlatList
        data={stories}
        renderItem={({ item, index }) => (
          <StoryCard story={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
});
