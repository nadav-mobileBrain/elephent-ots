import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';
import { useRouter } from 'expo-router';
import { Plus, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface Pin {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  photo?: string;
  herdSize: number;
  date: string;
}

const db = SQLite.openDatabaseSync('elephant_map.db');

export default function MapScreen() {
  const router = useRouter();
  const [pins, setPins] = useState<Pin[]>([]);
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    // Create table if not exists
    db.execSync(
      'CREATE TABLE IF NOT EXISTS pins (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, title TEXT, description TEXT, photo TEXT, herdSize INTEGER, date TEXT);'
    );

    // Load pins from DB
    const allPins = db.getAllSync<Pin>('SELECT * FROM pins');
    setPins(allPins);

    // Add demo pins if table is empty
    if (allPins.length === 0) {
      db.execSync(
        'INSERT INTO pins (latitude, longitude, title, description, herdSize, date) VALUES (-1.286389, 36.817223, "Nairobi National Park", "Saw a large herd near the entrance.", 12, "2023-10-26T10:00:00.000Z")'
      );
      db.execSync(
        'INSERT INTO pins (latitude, longitude, title, description, herdSize, date) VALUES (-3.386925, 36.682995, "Lake Manyara", "A small family group by the water.", 5, "2023-10-25T15:30:00.000Z")'
      );
      const demoPins = db.getAllSync<Pin>('SELECT * FROM pins');
      setPins(demoPins);
    }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'To see your location on the map, please grant location permission in your settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : -1.2921,
          longitude: location ? location.longitude : 36.8219,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            title={pin.title}
            description={pin.description}
          >
            <MapPin color={Colors.primary} size={32} />
          </Marker>
        ))}
      </MapView>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push('/add-pin')}
      >
        <Plus color={Colors.background} size={32} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 30,
    elevation: 5,
  },
});
