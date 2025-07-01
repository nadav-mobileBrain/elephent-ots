import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import Colors from '@/constants/Colors';
import { Leaf, ArrowLeft, X } from 'lucide-react-native';

const db = SQLite.openDatabaseSync('elephant_map.db');

export default function AddPinScreen() {
  const router = useRouter();
  const { x, y } = useLocalSearchParams<{ x: string; y: string }>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [herdSize, setHerdSize] = useState('');

  const handleSave = async () => {
    if (!title || !x || !y) {
      Alert.alert('Error', 'Title is required.');
      return;
    }

    const herdSizeNumber = parseInt(herdSize, 10) || 0;
    const posX = parseFloat(x);
    const posY = parseFloat(y);

    await db.runAsync(
      'INSERT INTO pins (x, y, title, description, herdSize, date) VALUES (?, ?, ?, ?, ?, ?)',
      posX,
      posY,
      title,
      description,
      herdSizeNumber,
      new Date().toISOString()
    );

    router.back();
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes?',
      'Are you sure you want to discard your new sighting?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'New Sighting',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerTitleStyle: {
            color: Colors.text,
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={styles.headerButton}
            >
              <ArrowLeft size={24} color={Colors.primary} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={handleCancel} style={styles.headerButton}>
              <X size={24} color={Colors.textSecondary} />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Add New Sighting</Text>

        <TextInput
          style={styles.input}
          placeholder="Sighting Title (e.g., 'Near the Baobab Tree')"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Herd Size (e.g., 5)"
          value={herdSize}
          onChangeText={setHerdSize}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Leaf color={Colors.background} size={24} />
            <Text style={styles.saveButtonText}>Save Sighting</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.textSecondary,
  },
  cancelButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 2,
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
});
