import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});