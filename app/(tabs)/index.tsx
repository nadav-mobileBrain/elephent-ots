import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Bell, Calendar, BookOpen, Brain } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { loadDailyFact, loadReminders } from '@/utils/storage';
import Card from '@/components/Card';
import { getDailyQuote } from '@/data/quotes';

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const [dailyFact, setDailyFact] = useState<string | null>(null);
  const [reminderCount, setReminderCount] = useState(0);
  const [dailyQuote, setDailyQuote] = useState<{quote: string, author: string} | null>(null);
  const animationValue = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animationValue.value }],
    };
  });

  useEffect(() => {
    if (isFocused) {
      // Load daily fact from storage
      loadDailyFact().then(fact => {
        if (fact) {
          setDailyFact(fact.content);
        }
      });
      
      // Load reminders to show count
      loadReminders().then(reminders => {
        setReminderCount(reminders?.length || 0);
      });
      
      // Get daily quote
      setDailyQuote(getDailyQuote());
      
      // Trigger animation
      animationValue.value = withSpring(1.05, { damping: 10 });
      setTimeout(() => {
        animationValue.value = withSpring(1, { damping: 15 });
      }, 300);
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animated.View 
        style={[styles.header, animatedStyle]}
        entering={FadeInDown.duration(800).springify()}
      >
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
          style={styles.headerImage} 
        />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome to Elephant Mobile</Text>
          <Text style={styles.subtitle}>Your elephant-inspired toolkit</Text>
        </View>
      </Animated.View>

      {dailyQuote && (
        <Animated.View entering={FadeInDown.delay(100).duration(800).springify()}>
          <Card style={styles.quoteCard}>
            <Text style={styles.quoteText}>"{dailyQuote.quote}"</Text>
            <Text style={styles.quoteAuthor}>— {dailyQuote.author}</Text>
          </Card>
        </Animated.View>
      )}
      
      <Text style={styles.sectionTitle}>Today's Activities</Text>
      
      <View style={styles.cardsContainer}>
        <Animated.View 
          style={styles.cardColumn}
          entering={FadeInDown.delay(200).duration(800).springify()}
        >
          <Pressable onPress={() => {}} style={({pressed}) => [styles.activityCard, pressed && styles.pressed]}>
            <Brain size={24} color={Colors.primary} />
            <Text style={styles.activityTitle}>Memory Game</Text>
            <Text style={styles.activitySubtitle}>Train your memory</Text>
          </Pressable>
          
          <Pressable onPress={() => {}} style={({pressed}) => [styles.activityCard, pressed && styles.pressed]}>
            <BookOpen size={24} color={Colors.primary} />
            <Text style={styles.activityTitle}>Ele-log Journal</Text>
            <Text style={styles.activitySubtitle}>Record your thoughts</Text>
          </Pressable>
        </Animated.View>
        
        <Animated.View 
          style={styles.cardColumn}
          entering={FadeInDown.delay(300).duration(800).springify()}
        >
          <Pressable onPress={() => {}} style={({pressed}) => [styles.activityCard, pressed && styles.pressed]}>
            <Calendar size={24} color={Colors.primary} />
            <Text style={styles.activityTitle}>Daily Facts</Text>
            <Text style={styles.activitySubtitle}>Learn something new</Text>
          </Pressable>
          
          <Pressable onPress={() => {}} style={({pressed}) => [styles.activityCard, pressed && styles.pressed]}>
            <Bell size={24} color={Colors.primary} />
            <Text style={styles.activityTitle}>Mindful Reminders</Text>
            <Text style={styles.activitySubtitle}>{reminderCount} active</Text>
          </Pressable>
        </Animated.View>
      </View>
      
      {dailyFact && (
        <Animated.View entering={FadeInDown.delay(400).duration(800).springify()}>
          <Card style={styles.factCard}>
            <Text style={styles.factTitle}>Elephant Fact of the Day</Text>
            <Text style={styles.factContent}>{dailyFact}</Text>
          </Card>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 16,
    backgroundColor: Colors.primary,
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    opacity: 0.7,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  title: {
    color: Colors.accent,
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: Colors.accent,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  cardColumn: {
    flex: 1,
    padding: 8,
  },
  activityCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 120,
    justifyContent: 'space-between',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 12,
  },
  activitySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quoteCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.text,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  factCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  factTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  factContent: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});