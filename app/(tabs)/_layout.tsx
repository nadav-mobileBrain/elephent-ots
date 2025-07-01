import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View, Dimensions } from 'react-native';
import {
  ChartGantt as Elephant,
  BookOpen,
  CalendarDays,
  Brain,
  Compass,
  ListTodo,
  Map,
  BookCopy,
  BookOpenText,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

// Get screen dimensions for responsive design
const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

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
            height:
              Platform.OS === 'ios'
                ? isTablet
                  ? 100
                  : 90
                : isTablet
                ? 80
                : 60,
          },
          tabBarBackground: () => <View style={styles.tabBarBackground} />,
          tabBarLabelStyle: {
            ...styles.tabBarLabel,
            fontSize: isTablet ? 14 : 12,
          },
          tabBarItemStyle: {
            ...styles.tabBarItem,
            height:
              Platform.OS === 'ios' ? (isTablet ? 70 : 50) : isTablet ? 80 : 60,
            paddingTop: Platform.OS === 'ios' ? (isTablet ? 15 : 10) : 0,
          },
          tabBarIconStyle: {
            marginBottom: isTablet ? 4 : 2,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Elephant size={isTablet ? size + 4 : size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="memory"
          options={{
            title: 'Memory',
            tabBarIcon: ({ color, size }) => (
              <Brain size={isTablet ? size + 4 : size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="expedition"
          options={{
            title: 'Expeditions',
            tabBarIcon: ({ color, size }) => (
              <Compass size={isTablet ? size + 4 : size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="habits"
          options={{
            title: 'Habits',
            tabBarIcon: ({ color, size }) => (
              <ListTodo size={isTablet ? size + 4 : size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="guides"
          options={{
            title: 'Guides',
            tabBarIcon: ({ color, size }) => (
              <Compass size={isTablet ? size + 4 : size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stories"
          options={{
            title: 'Stories',
            tabBarIcon: ({ color, size }) => (
              <BookOpenText size={isTablet ? size + 4 : size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: ({ color, size }) => (
              <Map size={isTablet ? size + 4 : size} color={color} />
            ),
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
