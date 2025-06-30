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
import * as SQLite from 'expo-sqlite';
import Colors from '@/constants/Colors';
import { Leaf } from 'lucide-react-native';

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

  return (
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

      <Pressable style={styles.button} onPress={handleSave}>
        <Leaf color={Colors.background} size={24} />
        <Text style={styles.buttonText}>Save Sighting</Text>
      </Pressable>
    </View>
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
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
