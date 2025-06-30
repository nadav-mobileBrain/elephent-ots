import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import Colors from '@/constants/Colors';
import { Camera } from 'lucide-react-native';

const db = SQLite.openDatabaseSync('elephant_map.db');

export default function AddPinScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [herdSize, setHerdSize] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!title || !description) {
      alert('Please fill in all fields.');
      return;
    }

    // For simplicity, we'll use a fixed location for new pins.
    // In a real app, you'd get this from the map view.
    const latitude = -1.3;
    const longitude = 36.82;

    db.execSync(
      `INSERT INTO pins (latitude, longitude, title, description, photo, herdSize, date) VALUES (${latitude}, ${longitude}, "${title}", "${description}", "${image}", ${parseInt(
        herdSize,
        10
      )}, "${new Date().toISOString()}");`
    );

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Sighting</Text>

      <TextInput
        style={styles.input}
        placeholder="Sighting Title (e.g., 'Near the river')"
        placeholderTextColor={Colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={Colors.textSecondary}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Herd Size (e.g., 15)"
        placeholderTextColor={Colors.textSecondary}
        value={herdSize}
        onChangeText={setHerdSize}
        keyboardType="numeric"
      />

      <Pressable style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <>
            <Camera color={Colors.primary} size={32} />
            <Text style={styles.imagePickerText}>Add Photo</Text>
          </>
        )}
      </Pressable>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Sighting</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: Colors.primary,
    marginTop: 8,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
