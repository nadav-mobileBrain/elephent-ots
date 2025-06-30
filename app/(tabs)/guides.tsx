import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { guides } from '@/data/guides';

const GuideCard = ({ guide, index }: { guide: any; index: number }) => {
  const router = useRouter();

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <Pressable onPress={() => router.push(`/guide/${guide.id}`)}>
        <View style={styles.card}>
          <Image source={guide.image} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.guideName}>{guide.name}</Text>
            <Text style={styles.guideExpertise}>{guide.expertise}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default function GuidesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meet the Guides</Text>
      <FlatList
        data={guides}
        renderItem={({ item, index }) => (
          <GuideCard guide={item} index={index} />
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
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  guideName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  guideExpertise: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 4,
  },
});
