import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { stories } from '@/data/stories';

export default function StoryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const story = stories.find((s) => s.id === id);
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedPosition = await AsyncStorage.getItem(
          `story-progress-${id}`
        );
        if (savedPosition !== null) {
          const position = parseFloat(savedPosition);
          setScrollPosition(position);
          scrollViewRef.current?.scrollTo({ y: position, animated: false });
        }
      } catch (e) {
        console.error('Failed to load scroll position.', e);
      }
    };

    loadProgress();
  }, [id]);

  const handleScroll = async (event: any) => {
    const position = event.nativeEvent.contentOffset.y;
    setScrollPosition(position);
    try {
      await AsyncStorage.setItem(`story-progress-${id}`, position.toString());
    } catch (e) {
      console.error('Failed to save scroll position.', e);
    }
  };

  if (!story) {
    return <Text>Story not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={100} // Save progress every 100ms of scrolling
      >
        <Animated.View entering={FadeIn.duration(500)}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.content}>{story.content}</Text>
        </Animated.View>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft color="#FFF" size={32} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 40,
  },
  content: {
    fontSize: 20,
    lineHeight: 32,
    color: Colors.textSecondary,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
});
