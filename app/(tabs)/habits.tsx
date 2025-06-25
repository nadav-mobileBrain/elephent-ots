import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArrowLeft, Share2, Repeat, Circle as XCircle, ClipboardList, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import LeafAnimation from '@/components/LeafAnimation';

const habitPresets = [
  {
    id: 'trending',
    title: 'Habits in trend',
    subtitle: 'Move Fast, Stay Relevant',
    icon: <Repeat size={24} color={Colors.primary} />
  },
  {
    id: 'essential',
    title: 'Essential habits',
    subtitle: 'Simplicity Sparks Daily Joy',
    icon: <ClipboardList size={24} color={Colors.primary} />
  },
  {
    id: 'stress',
    title: 'Ease stress',
    subtitle: 'Breaks Build Better You',
    icon: <XCircle size={24} color={Colors.primary} />
  },
  {
    id: 'morning',
    title: 'Good morning',
    subtitle: 'Start Strong, Shine Bright',
    icon: <Share2 size={24} color={Colors.primary} />
  }
];

export default function HabitsScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.accent, Colors.backgroundSecondary]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Animated leaves */}
      {Array.from({ length: 5 }).map((_, i) => (
        <LeafAnimation 
          key={i} 
          delay={i * 2000} 
          duration={3000 + i * 500}
          size={16 + Math.random() * 16}
        />
      ))}

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Create a new habit</Text>
        <Pressable style={styles.iconButton}>
          <Share2 size={24} color={Colors.text} />
        </Pressable>
      </View>

      {/* Habit Types */}
      <View style={styles.habitTypes}>
        <Animated.View 
          entering={FadeInDown.delay(100).duration(400)}
          style={styles.habitTypeRow}
        >
          <Card style={styles.habitTypeButton}>
            <Repeat size={24} color={Colors.primary} />
            <Text style={styles.habitTypeText}>Regular</Text>
          </Card>
          <Card style={styles.habitTypeButton}>
            <XCircle size={24} color={Colors.primary} />
            <Text style={styles.habitTypeText}>Negative</Text>
          </Card>
          <Card style={styles.habitTypeButton}>
            <ClipboardList size={24} color={Colors.primary} />
            <Text style={styles.habitTypeText}>One Task</Text>
          </Card>
        </Animated.View>

        {/* Create Custom Button */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Pressable style={styles.createButton}>
            <Text style={styles.createButtonText}>+ Create your own</Text>
          </Pressable>
        </Animated.View>

        {/* Presets Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <Text style={styles.presetsTitle}>Or Choose From Presets</Text>
          
          {habitPresets.map((preset, index) => (
            <Animated.View 
              key={preset.id}
              entering={FadeInDown.delay(400 + index * 100).duration(400)}
            >
              <Card style={styles.presetButton}>
                <View style={styles.presetContent}>
                  <View style={styles.presetIcon}>
                    {preset.icon}
                  </View>
                  <View style={styles.presetText}>
                    <Text style={styles.presetTitle}>{preset.title}</Text>
                    <Text style={styles.presetSubtitle}>{preset.subtitle}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.textSecondary} />
              </Card>
            </Animated.View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  habitTypes: {
    padding: 16,
  },
  habitTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  habitTypeButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  habitTypeText: {
    color: Colors.text,
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  createButtonText: {
    color: Colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  presetsTitle: {
    color: Colors.textSecondary,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  presetButton: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  presetContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  presetText: {
    flex: 1,
  },
  presetTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  presetSubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});