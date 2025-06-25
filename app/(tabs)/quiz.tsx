import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeIn, SlideInRight } from 'react-native-reanimated';
import { Trophy, Star, Award } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  type: 'quiz' | 'memory' | 'journal';
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which elephant species is the largest?",
    options: [
      "Asian Elephant",
      "African Bush Elephant",
      "African Forest Elephant",
      "Woolly Mammoth"
    ],
    correctAnswer: 1,
    explanation: "The African Bush Elephant is the largest living land animal, with males reaching up to 13 feet at the shoulder."
  },
  {
    id: 2,
    question: "How long is an elephant's pregnancy?",
    options: [
      "12 months",
      "16 months",
      "22 months",
      "24 months"
    ],
    correctAnswer: 2,
    explanation: "Elephants have the longest pregnancy of all mammals, lasting approximately 22 months."
  },
  // Add more questions here
];

const badges: Badge[] = [
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Complete 5 quizzes with perfect scores',
    icon: <Trophy size={24} color={Colors.primary} />,
    requirement: 5,
    type: 'quiz'
  },
  {
    id: 'memory_expert',
    name: 'Memory Expert',
    description: 'Win 10 memory games',
    icon: <Star size={24} color={Colors.primary} />,
    requirement: 10,
    type: 'memory'
  },
  {
    id: 'journal_keeper',
    name: 'Journal Keeper',
    description: 'Write 15 journal entries',
    icon: <Award size={24} color={Colors.primary} />,
    requirement: 15,
    type: 'journal'
  }
];

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [quizzesTaken, setQuizzesTaken] = useState(0);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const badges = await AsyncStorage.getItem('elephant_badges');
      if (badges) {
        setEarnedBadges(JSON.parse(badges));
      }
      const quizCount = await AsyncStorage.getItem('elephant_quiz_count');
      if (quizCount) {
        setQuizzesTaken(parseInt(quizCount, 10));
      }
    } catch (error) {
      console.error('Error loading badges:', error);
    }
  };

  const saveBadges = async (newBadges: string[]) => {
    try {
      await AsyncStorage.setItem('elephant_badges', JSON.stringify(newBadges));
    } catch (error) {
      console.error('Error saving badges:', error);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);

    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResult(true);
        handleQuizComplete();
      }
    }, 2000);
  };

  const handleQuizComplete = async () => {
    const newQuizCount = quizzesTaken + 1;
    await AsyncStorage.setItem('elephant_quiz_count', newQuizCount.toString());
    setQuizzesTaken(newQuizCount);

    // Check for new badges
    if (score === questions.length && newQuizCount >= 5) {
      const newBadges = [...earnedBadges];
      if (!newBadges.includes('quiz_master')) {
        newBadges.push('quiz_master');
        setEarnedBadges(newBadges);
        saveBadges(newBadges);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View
        entering={FadeInDown.duration(800).springify()}
        style={styles.header}
      >
        <Text style={styles.title}>Test Your Elephant IQ</Text>
        <Text style={styles.subtitle}>
          Challenge yourself with elephant trivia and earn badges!
        </Text>
      </Animated.View>

      {!showResult ? (
        <Animated.View
          entering={SlideInRight.duration(400).springify()}
          style={styles.questionContainer}
        >
          <Card>
            <Text style={styles.questionCount}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
            <Text style={styles.question}>
              {questions[currentQuestion].question}
            </Text>
            <View style={styles.options}>
              {questions[currentQuestion].options.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.option,
                    selectedAnswer === index && styles.selectedOption,
                    showExplanation && index === questions[currentQuestion].correctAnswer && styles.correctOption,
                    showExplanation && selectedAnswer === index && selectedAnswer !== questions[currentQuestion].correctAnswer && styles.wrongOption,
                  ]}
                  onPress={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={[
                    styles.optionText,
                    selectedAnswer === index && styles.selectedOptionText,
                  ]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
            {showExplanation && (
              <Animated.View
                entering={FadeIn.duration(300)}
                style={styles.explanation}
              >
                <Text style={styles.explanationText}>
                  {questions[currentQuestion].explanation}
                </Text>
              </Animated.View>
            )}
          </Card>
        </Animated.View>
      ) : (
        <Animated.View
          entering={FadeInDown.duration(800).springify()}
          style={styles.resultContainer}
        >
          <Card>
            <Text style={styles.resultTitle}>Quiz Complete!</Text>
            <Text style={styles.resultScore}>
              Your Score: {score}/{questions.length}
            </Text>
            <View style={styles.badgesContainer}>
              {badges.map((badge) => (
                <View key={badge.id} style={styles.badgeItem}>
                  {badge.icon}
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeProgress}>
                    {badge.type === 'quiz' ? `${quizzesTaken}/${badge.requirement} quizzes` : 'Progress tracked'}
                  </Text>
                </View>
              ))}
            </View>
            <Button
              title="Try Again"
              onPress={resetQuiz}
              style={styles.resetButton}
            />
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
  content: {
    padding: 16,
    paddingTop: 100,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 20,
  },
  options: {
    gap: 12,
  },
  option: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryLight,
  },
  correctOption: {
    backgroundColor: Colors.quinary,
    borderColor: Colors.quinary,
  },
  wrongOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  selectedOptionText: {
    color: Colors.accent,
    fontWeight: '600',
  },
  explanation: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
  },
  explanationText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  resultScore: {
    fontSize: 20,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  badgesContainer: {
    marginBottom: 24,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 12,
    flex: 1,
  },
  badgeProgress: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  resetButton: {
    marginTop: 16,
  },
});