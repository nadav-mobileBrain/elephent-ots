import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { ChartGantt as Elephant, BookOpen, CalendarDays, Brain, Compass, ListTodo } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarStyle: {
            ...styles.tabBar,
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
          },
          tabBarBackground: () => (
            <View style={styles.tabBarBackground} />
          ),
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarItemStyle: styles.tabBarItem,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Elephant size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="memory"
          options={{
            title: 'Memory',
            tabBarIcon: ({ color, size }) => <Brain size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="expedition"
          options={{
            title: 'Expeditions',
            tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="habits"
          options={{
            title: 'Habits',
            tabBarIcon: ({ color, size }) => <ListTodo size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: 'Ele-log',
            tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="guide"
          options={{
            title: 'Guide',
            tabBarIcon: ({ color, size }) => <CalendarDays size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 90 : 60,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabBarItem: {
    height: Platform.OS === 'ios' ? 50 : 60,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
});