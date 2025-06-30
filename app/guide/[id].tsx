import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Linking,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Mail } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { guides } from '@/data/guides';

export default function GuideDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return <Text>Guide not found</Text>;
  }

  const handleContact = () => {
    Linking.openURL(
      `mailto:contact@elephantapp.com?subject=Inquiry about ${guide.name}`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View entering={FadeIn.duration(500)}>
          <Image source={guide.image} style={styles.image} />
          <View style={styles.header}>
            <Text style={styles.name}>{guide.name}</Text>
            <Text style={styles.expertise}>{guide.expertise}</Text>
          </View>
          <Text style={styles.bio}>{guide.bio}</Text>
        </Animated.View>
      </ScrollView>

      <Pressable style={styles.contactButton} onPress={handleContact}>
        <Mail color={Colors.background} size={24} />
        <Text style={styles.contactButtonText}>Contact</Text>
      </Pressable>

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
    paddingBottom: 120, // Space for the contact button
  },
  image: {
    width: '100%',
    height: 350,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
  },
  expertise: {
    fontSize: 18,
    color: Colors.primary,
    marginTop: 4,
  },
  bio: {
    fontSize: 18,
    lineHeight: 28,
    color: Colors.textSecondary,
    padding: 20,
  },
  contactButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  contactButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
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
