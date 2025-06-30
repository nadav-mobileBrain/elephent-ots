import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useRouter, useFocusEffect } from 'expo-router';
import { Plus, MapPin, Download } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface Pin {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
  herdSize: number;
  date: string;
}

const db = SQLite.openDatabaseSync('elephant_map.db');
const MAP_IMAGE = require('../../assets/images/map.png'); // Using a local map image

export default function MapScreen() {
  const router = useRouter();
  const [pins, setPins] = useState<Pin[]>([]);
  const [mapLayout, setMapLayout] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const setupDatabase = async () => {
      // Create table if it doesn't exist
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS pins (id INTEGER PRIMARY KEY AUTOINCREMENT, x REAL, y REAL, title TEXT, description TEXT, herdSize INTEGER, date TEXT);'
      );

      // Add demo pins only if the table is empty
      const existingPins = await db.getAllAsync<Pin>('SELECT * FROM pins');
      if (existingPins.length === 0) {
        await db.runAsync(
          'INSERT INTO pins (x, y, title, description, herdSize, date) VALUES (?, ?, ?, ?, ?, ?)',
          0.3,
          0.4,
          'Watering Hole',
          'Large herd gathering at dawn.',
          25,
          new Date().toISOString()
        );
        await db.runAsync(
          'INSERT INTO pins (x, y, title, description, herdSize, date) VALUES (?, ?, ?, ?, ?, ?)',
          0.65,
          0.7,
          'Acacia Grove',
          'A lone bull resting in the shade.',
          1,
          new Date().toISOString()
        );
      }
    };

    setupDatabase();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadPins = async () => {
        const allPins = await db.getAllAsync<Pin>('SELECT * FROM pins');
        setPins(allPins);
      };
      loadPins();
    }, [])
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setMapLayout({ width, height });
  };

  const handleMapPress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    const x = locationX / mapLayout.width;
    const y = locationY / mapLayout.height;

    router.push({
      pathname: '/add-pin',
      params: { x: x.toString(), y: y.toString() },
    });
  };

  const handleExport = async () => {
    const allPins = await db.getAllAsync<Pin>('SELECT * FROM pins');

    const features = allPins.map((pin) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [pin.x, pin.y, 0],
      },
      properties: {
        id: pin.id,
        title: pin.title,
        description: pin.description,
        herdSize: pin.herdSize,
        date: pin.date,
      },
    }));

    const geoJson = {
      type: 'FeatureCollection',
      features: features,
    };

    const geoJsonString = JSON.stringify(geoJson, null, 2);
    const fileUri = FileSystem.documentDirectory + 'sightings.geojson';

    await FileSystem.writeAsStringAsync(fileUri, geoJsonString);
    await Sharing.shareAsync(fileUri, {
      mimeType: 'application/geo+json',
      dialogTitle: 'Export sightings as GeoJSON',
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleMapPress}
        style={styles.mapContainer}
        onLayout={handleLayout}
      >
        <ImageBackground
          source={MAP_IMAGE}
          style={styles.map}
          resizeMode="cover"
        >
          {pins.map((pin) => (
            <View
              key={pin.id}
              style={[
                styles.pinContainer,
                { left: `${pin.x * 100}%`, top: `${pin.y * 100}%` },
              ]}
            >
              <MapPin color={Colors.primary} size={32} />
            </View>
          ))}
        </ImageBackground>
      </Pressable>

      <Pressable style={styles.exportButton} onPress={handleExport}>
        <Download color={Colors.background} size={28} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinContainer: {
    position: 'absolute',
    transform: [{ translateX: -16 }, { translateY: -32 }], // Center the pin on the tap location
  },
  exportButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 30,
    elevation: 5,
  },
});
