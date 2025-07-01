import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Bell, Calendar, BookOpen, Brain } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { loadDailyFact, loadReminders } from '@/utils/storage';
import Card from '@/components/Card';
import { getDailyQuote } from '@/data/quotes';

// Get screen dimensions for responsive design
const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const isLargeTablet = screenWidth >= 1024;

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const router = useRouter();
  const [dailyFact, setDailyFact] = useState<string | null>(null);
  const [reminderCount, setReminderCount] = useState(0);
  const [dailyQuote, setDailyQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);
  const animationValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animationValue.value }],
    };
  });

  useEffect(() => {
    if (isFocused) {
      // Load daily fact from storage
      loadDailyFact().then((fact) => {
        if (fact) {
          setDailyFact(fact.content);
        }
      });

      // Load reminders to show count
      loadReminders().then((reminders) => {
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

  // Calculate responsive sizes
  const containerMaxWidth = isLargeTablet ? 1000 : isTablet ? 700 : '100%';
  const headerHeight = isTablet ? 280 : 200;
  const cardColumns = isLargeTablet ? 4 : isTablet ? 3 : 2;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { maxWidth: containerMaxWidth, alignSelf: 'center' },
      ]}
    >
      <Animated.View
        style={[styles.header, animatedStyle, { height: headerHeight }]}
        entering={FadeInDown.duration(800).springify()}
      >
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/133394/pexels-photo-133394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={[styles.headerImage, { height: headerHeight }]}
        />
        <View style={styles.headerContent}>
          <Text style={[styles.title, isTablet && styles.tabletTitle]}>
            Welcome to Elephant Mobile
          </Text>
          <Text style={[styles.subtitle, isTablet && styles.tabletSubtitle]}>
            Your elephant-inspired toolkit
          </Text>
        </View>
      </Animated.View>

      {dailyQuote && (
        <Animated.View
          entering={FadeInDown.delay(100).duration(800).springify()}
        >
          <Card
            style={
              isTablet
                ? StyleSheet.compose(styles.quoteCard, styles.tabletQuoteCard)
                : styles.quoteCard
            }
          >
            <Text
              style={
                isTablet
                  ? [styles.quoteText, styles.tabletQuoteText]
                  : styles.quoteText
              }
            >
              "{dailyQuote.quote}"
            </Text>
            <Text
              style={
                isTablet
                  ? [styles.quoteAuthor, styles.tabletQuoteAuthor]
                  : styles.quoteAuthor
              }
            >
              — {dailyQuote.author}
            </Text>
          </Card>
        </Animated.View>
      )}

      <Text
        style={[styles.sectionTitle, isTablet && styles.tabletSectionTitle]}
      >
        Today's Activities
      </Text>

      <View
        style={[
          styles.cardsContainer,
          cardColumns > 2 && styles.tabletCardsContainer,
        ]}
      >
        {cardColumns > 2 ? (
          // Tablet layout - all cards in one row
          <>
            <Animated.View
              style={[styles.cardColumn, styles.tabletCardColumn]}
              entering={FadeInDown.delay(200).duration(800).springify()}
            >
              <Pressable
                onPress={() => router.push('/(tabs)/memory')}
                style={({ pressed }) => [
                  styles.activityCard,
                  styles.tabletActivityCard,
                  pressed && styles.pressed,
                ]}
              >
                <Brain size={isTablet ? 32 : 24} color={Colors.primary} />
                <Text
                  style={[
                    styles.activityTitle,
                    isTablet && styles.tabletActivityTitle,
                  ]}
                >
                  Memory Game
                </Text>
                <Text
                  style={[
                    styles.activitySubtitle,
                    isTablet && styles.tabletActivitySubtitle,
                  ]}
                >
                  Train your memory
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View
              style={[styles.cardColumn, styles.tabletCardColumn]}
              entering={FadeInDown.delay(250).duration(800).springify()}
            >
              <Pressable
                onPress={() => router.push('/(tabs)/stories')}
                style={({ pressed }) => [
                  styles.activityCard,
                  styles.tabletActivityCard,
                  pressed && styles.pressed,
                ]}
              >
                <BookOpen size={isTablet ? 32 : 24} color={Colors.primary} />
                <Text
                  style={[
                    styles.activityTitle,
                    isTablet && styles.tabletActivityTitle,
                  ]}
                >
                  Ele-log Journal
                </Text>
                <Text
                  style={[
                    styles.activitySubtitle,
                    isTablet && styles.tabletActivitySubtitle,
                  ]}
                >
                  Record your thoughts
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View
              style={[styles.cardColumn, styles.tabletCardColumn]}
              entering={FadeInDown.delay(300).duration(800).springify()}
            >
              <Pressable
                onPress={() => router.push('/(tabs)/quiz')}
                style={({ pressed }) => [
                  styles.activityCard,
                  styles.tabletActivityCard,
                  pressed && styles.pressed,
                ]}
              >
                <Calendar size={isTablet ? 32 : 24} color={Colors.primary} />
                <Text
                  style={[
                    styles.activityTitle,
                    isTablet && styles.tabletActivityTitle,
                  ]}
                >
                  Daily Facts
                </Text>
                <Text
                  style={[
                    styles.activitySubtitle,
                    isTablet && styles.tabletActivitySubtitle,
                  ]}
                >
                  Learn something new
                </Text>
              </Pressable>
            </Animated.View>

            {cardColumns > 3 && (
              <Animated.View
                style={[styles.cardColumn, styles.tabletCardColumn]}
                entering={FadeInDown.delay(350).duration(800).springify()}
              >
                <Pressable
                  onPress={() => router.push('/(tabs)/habits')}
                  style={({ pressed }) => [
                    styles.activityCard,
                    styles.tabletActivityCard,
                    pressed && styles.pressed,
                  ]}
                >
                  <Bell size={isTablet ? 32 : 24} color={Colors.primary} />
                  <Text
                    style={[
                      styles.activityTitle,
                      isTablet && styles.tabletActivityTitle,
                    ]}
                  >
                    Mindful Reminders
                  </Text>
                  <Text
                    style={[
                      styles.activitySubtitle,
                      isTablet && styles.tabletActivitySubtitle,
                    ]}
                  >
                    {reminderCount} active
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </>
        ) : (
          // Mobile layout - 2 columns
          <>
            <Animated.View
              style={styles.cardColumn}
              entering={FadeInDown.delay(200).duration(800).springify()}
            >
              <Pressable
                onPress={() => router.push('/(tabs)/memory')}
                style={({ pressed }) => [
                  styles.activityCard,
                  pressed && styles.pressed,
                ]}
              >
                <Brain size={24} color={Colors.primary} />
                <Text style={styles.activityTitle}>Memory Game</Text>
                <Text style={styles.activitySubtitle}>Train your memory</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push('/(tabs)/stories')}
                style={({ pressed }) => [
                  styles.activityCard,
                  pressed && styles.pressed,
                ]}
              >
                <BookOpen size={24} color={Colors.primary} />
                <Text style={styles.activityTitle}>Ele-log Journal</Text>
                <Text style={styles.activitySubtitle}>
                  Record your thoughts
                </Text>
              </Pressable>
            </Animated.View>

            <Animated.View
              style={styles.cardColumn}
              entering={FadeInDown.delay(300).duration(800).springify()}
            >
              <Pressable
                onPress={() => router.push('/(tabs)/quiz')}
                style={({ pressed }) => [
                  styles.activityCard,
                  pressed && styles.pressed,
                ]}
              >
                <Calendar size={24} color={Colors.primary} />
                <Text style={styles.activityTitle}>Daily Facts</Text>
                <Text style={styles.activitySubtitle}>Learn something new</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push('/(tabs)/habits')}
                style={({ pressed }) => [
                  styles.activityCard,
                  pressed && styles.pressed,
                ]}
              >
                <Bell size={24} color={Colors.primary} />
                <Text style={styles.activityTitle}>Mindful Reminders</Text>
                <Text style={styles.activitySubtitle}>
                  {reminderCount} active
                </Text>
              </Pressable>
            </Animated.View>
          </>
        )}
      </View>

      {dailyFact && (
        <Animated.View
          entering={FadeInDown.delay(400).duration(800).springify()}
        >
          <Card
            style={
              isTablet
                ? StyleSheet.compose(styles.factCard, styles.tabletFactCard)
                : styles.factCard
            }
          >
            <Text
              style={
                isTablet
                  ? [styles.factTitle, styles.tabletFactTitle]
                  : styles.factTitle
              }
            >
              Elephant Fact of the Day
            </Text>
            <Text
              style={
                isTablet
                  ? [styles.factContent, styles.tabletFactContent]
                  : styles.factContent
              }
            >
              {dailyFact}
            </Text>
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
  tabletTitle: {
    fontSize: 32,
  },
  tabletSubtitle: {
    fontSize: 20,
  },
  tabletQuoteCard: {
    marginHorizontal: 32,
    marginVertical: 16,
    padding: 32,
  },
  tabletQuoteText: {
    fontSize: 24,
  },
  tabletQuoteAuthor: {
    fontSize: 20,
  },
  tabletSectionTitle: {
    fontSize: 24,
  },
  tabletCardsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  tabletCardColumn: {
    flex: 1,
    padding: 16,
  },
  tabletActivityCard: {
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
  tabletActivityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 12,
  },
  tabletActivitySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  tabletFactCard: {
    marginHorizontal: 32,
    marginVertical: 16,
    padding: 32,
  },
  tabletFactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  tabletFactContent: {
    fontSize: 18,
    color: Colors.text,
    lineHeight: 28,
  },
});
