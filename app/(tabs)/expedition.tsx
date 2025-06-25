import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeIn,
  SlideInRight,
} from 'react-native-reanimated';
import {
  Compass,
  Users,
  Calendar,
  Clock,
  MapPin,
  SquareCheck as CheckSquare,
  CirclePlus as PlusCircle,
  X,
  Camera,
  Award,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface Expedition {
  id: string;
  title: string;
  type: 'real' | 'simulation';
  startDate: string;
  endDate?: string;
  location: string;
  duration: string;
  teamMembers: string[];
  notes: string;
  checklist: { task: string; completed: boolean }[];
  status: 'in-progress' | 'completed';
  photoUri?: string;
}

const defaultChecklist = [
  { task: 'Spotted herd', completed: false },
  { task: 'Made camp', completed: false },
  { task: 'Observed behavior', completed: false },
  { task: 'Documented findings', completed: false },
  { task: 'Checked for signs of poaching', completed: false },
  { task: 'Monitored water sources', completed: false },
];

export default function ExpeditionScreen() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'real' | 'simulation'>('all');
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    realExpeditions: 0,
    simulations: 0,
  });

  // Form state with all fields properly initialized
  const [formData, setFormData] = useState<Partial<Expedition>>({
    type: 'real',
    checklist: [...defaultChecklist],
    status: 'in-progress',
    title: '',
    location: '',
    duration: '',
    teamMembers: [],
    notes: '',
    startDate: new Date().toISOString(),
    photoUri: '',
  });

  useEffect(() => {
    loadExpeditions();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [expeditions]);

  const loadExpeditions = async () => {
    try {
      const stored = await AsyncStorage.getItem('elephant_expeditions');
      if (stored) {
        setExpeditions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading expeditions:', error);
    }
  };

  const saveExpeditions = async (newExpeditions: Expedition[]) => {
    try {
      await AsyncStorage.setItem(
        'elephant_expeditions',
        JSON.stringify(newExpeditions)
      );
      setExpeditions(newExpeditions);
    } catch (error) {
      console.error('Error saving expeditions:', error);
    }
  };

  const calculateStats = () => {
    const newStats = {
      total: expeditions.length,
      completed: expeditions.filter((e) => e.status === 'completed').length,
      inProgress: expeditions.filter((e) => e.status === 'in-progress').length,
      realExpeditions: expeditions.filter((e) => e.type === 'real').length,
      simulations: expeditions.filter((e) => e.type === 'simulation').length,
    };
    setStats(newStats);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.location) return;

    const newExpedition: Expedition = {
      id: Date.now().toString(),
      title: formData.title || '',
      type: formData.type || 'real',
      startDate: formData.startDate || new Date().toISOString(),
      location: formData.location || '',
      duration: formData.duration || '1 day',
      teamMembers: formData.teamMembers || [],
      notes: formData.notes || '',
      checklist: formData.checklist || [...defaultChecklist],
      status: formData.status || 'in-progress',
      photoUri: formData.photoUri,
    };

    const newExpeditions = [newExpedition, ...expeditions];
    saveExpeditions(newExpeditions);
    setShowForm(false);
    setFormData({
      type: 'real',
      checklist: [...defaultChecklist],
      status: 'in-progress',
      title: '',
      location: '',
      duration: '',
      teamMembers: [],
      notes: '',
      startDate: new Date().toISOString(),
      photoUri: '',
    });
  };

  const toggleChecklistItem = (expeditionId: string, taskIndex: number) => {
    const updatedExpeditions = expeditions.map((expedition) => {
      if (expedition.id === expeditionId) {
        const updatedChecklist = [...expedition.checklist];
        updatedChecklist[taskIndex].completed =
          !updatedChecklist[taskIndex].completed;
        return { ...expedition, checklist: updatedChecklist };
      }
      return expedition;
    });
    saveExpeditions(updatedExpeditions);
  };

  const toggleExpeditionStatus = (expeditionId: string) => {
    const updatedExpeditions = expeditions.map((expedition) => {
      if (expedition.id === expeditionId) {
        const newStatus: 'in-progress' | 'completed' =
          expedition.status === 'completed' ? 'in-progress' : 'completed';
        return { ...expedition, status: newStatus };
      }
      return expedition;
    });
    saveExpeditions(updatedExpeditions);
  };

  const filteredExpeditions = expeditions.filter((expedition) => {
    if (filter === 'all') return true;
    return expedition.type === filter;
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.duration(800).springify()}
          style={styles.header}
        >
          <Text style={styles.title}>Expedition Tracker</Text>
          <Text style={styles.subtitle}>
            Log and track your elephant observation journeys
          </Text>
        </Animated.View>

        {!showForm ? (
          <>
            <Card style={styles.statsCard}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Award size={24} color={Colors.primary} />
                  <Text style={styles.statValue}>{stats.total}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statItem}>
                  <CheckSquare size={24} color={Colors.quaternary} />
                  <Text style={styles.statValue}>{stats.completed}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={24} color={Colors.tertiary} />
                  <Text style={styles.statValue}>{stats.inProgress}</Text>
                  <Text style={styles.statLabel}>In Progress</Text>
                </View>
              </View>
            </Card>

            <View style={styles.filterContainer}>
              <Button
                title="All"
                variant={filter === 'all' ? 'primary' : 'outline'}
                size="small"
                onPress={() => setFilter('all')}
                style={styles.filterButton}
              />
              <Button
                title="Real"
                variant={filter === 'real' ? 'primary' : 'outline'}
                size="small"
                onPress={() => setFilter('real')}
                style={styles.filterButton}
              />
              <Button
                title="Simulation"
                variant={filter === 'simulation' ? 'primary' : 'outline'}
                size="small"
                onPress={() => setFilter('simulation')}
                style={styles.filterButton}
              />
            </View>

            {filteredExpeditions.map((expedition, index) => (
              <Animated.View
                key={expedition.id}
                entering={SlideInRight.delay(index * 100)
                  .duration(400)
                  .springify()}
              >
                <Card style={styles.expeditionCard}>
                  <View style={styles.expeditionHeader}>
                    <View style={styles.expeditionTitleContainer}>
                      <Text style={styles.expeditionTitle}>
                        {expedition.title}
                      </Text>
                      <View
                        style={[
                          styles.typeBadge,
                          expedition.type === 'simulation'
                            ? styles.simulationBadge
                            : styles.realBadge,
                        ]}
                      >
                        <Text style={styles.typeBadgeText}>
                          {expedition.type === 'simulation'
                            ? 'Simulation'
                            : 'Real'}
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      style={[
                        styles.statusBadge,
                        expedition.status === 'completed'
                          ? styles.completedBadge
                          : styles.inProgressBadge,
                      ]}
                      onPress={() => toggleExpeditionStatus(expedition.id)}
                    >
                      <Text style={styles.statusText}>
                        {expedition.status === 'completed'
                          ? 'Completed'
                          : 'In Progress'}
                      </Text>
                    </Pressable>
                  </View>

                  {expedition.photoUri && (
                    <Image
                      source={{ uri: expedition.photoUri }}
                      style={styles.expeditionImage}
                    />
                  )}

                  <View style={styles.expeditionDetails}>
                    <View style={styles.detailRow}>
                      <MapPin size={16} color={Colors.textSecondary} />
                      <Text style={styles.detailText}>
                        {expedition.location}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Calendar size={16} color={Colors.textSecondary} />
                      <Text style={styles.detailText}>
                        {new Date(expedition.startDate).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Clock size={16} color={Colors.textSecondary} />
                      <Text style={styles.detailText}>
                        {expedition.duration}
                      </Text>
                    </View>
                    {expedition.teamMembers.length > 0 && (
                      <View style={styles.detailRow}>
                        <Users size={16} color={Colors.textSecondary} />
                        <Text style={styles.detailText}>
                          {expedition.teamMembers.join(', ')}
                        </Text>
                      </View>
                    )}
                  </View>

                  {expedition.notes && (
                    <Text style={styles.notes}>{expedition.notes}</Text>
                  )}

                  <View style={styles.checklist}>
                    <Text style={styles.checklistTitle}>Checklist</Text>
                    {expedition.checklist.map((item, index) => (
                      <Pressable
                        key={index}
                        style={styles.checklistItem}
                        onPress={() =>
                          toggleChecklistItem(expedition.id, index)
                        }
                      >
                        <View
                          style={[
                            styles.checkbox,
                            item.completed && styles.checkboxChecked,
                          ]}
                        >
                          {item.completed && (
                            <CheckSquare size={16} color={Colors.accent} />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.checklistText,
                            item.completed && styles.checklistTextCompleted,
                          ]}
                        >
                          {item.task}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </Card>
              </Animated.View>
            ))}

            <View style={{ height: 80 }} />
          </>
        ) : (
          <Animated.View
            style={styles.formContainer}
            entering={FadeIn.duration(300)}
          >
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>New Expedition</Text>
              <Pressable
                onPress={() => {
                  setShowForm(false);
                  setFormData({
                    type: 'real',
                    checklist: [...defaultChecklist],
                    status: 'in-progress',
                    title: '',
                    location: '',
                    duration: '',
                    teamMembers: [],
                    notes: '',
                    startDate: new Date().toISOString(),
                    photoUri: '',
                  });
                }}
              >
                <X size={24} color={Colors.textSecondary} />
              </Pressable>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeButtons}>
                <Button
                  title="Real Expedition"
                  variant={formData.type === 'real' ? 'primary' : 'outline'}
                  size="small"
                  onPress={() => setFormData({ ...formData, type: 'real' })}
                  style={styles.typeButton}
                />
                <Button
                  title="Simulation"
                  variant={
                    formData.type === 'simulation' ? 'primary' : 'outline'
                  }
                  size="small"
                  onPress={() =>
                    setFormData({ ...formData, type: 'simulation' })
                  }
                  style={styles.typeButton}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) =>
                  setFormData({ ...formData, title: text })
                }
                placeholder="Enter expedition title"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
                placeholder="Enter location"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Duration</Text>
              <TextInput
                style={styles.input}
                value={formData.duration}
                onChangeText={(text) =>
                  setFormData({ ...formData, duration: text })
                }
                placeholder="e.g., 2 days"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Team Members (comma-separated)</Text>
              <TextInput
                style={styles.input}
                value={formData.teamMembers?.join(', ')}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    teamMembers: text.split(',').map((member) => member.trim()),
                  })
                }
                placeholder="Enter team members"
                placeholderTextColor={Colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={styles.textArea}
                value={formData.notes}
                onChangeText={(text) =>
                  setFormData({ ...formData, notes: text })
                }
                placeholder="Enter expedition notes"
                placeholderTextColor={Colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <Button
              title="Save Expedition"
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </Animated.View>
        )}
      </ScrollView>
      {!showForm && (
        <Pressable style={styles.addButton} onPress={() => setShowForm(true)}>
          <PlusCircle size={28} color={Colors.background} />
        </Pressable>
      )}
    </View>
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
  statsCard: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
  },
  expeditionCard: {
    marginBottom: 16,
  },
  expeditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  expeditionTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  expeditionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  realBadge: {
    backgroundColor: Colors.primary,
  },
  simulationBadge: {
    backgroundColor: Colors.quaternary,
  },
  typeBadgeText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedBadge: {
    backgroundColor: Colors.quinary,
  },
  inProgressBadge: {
    backgroundColor: Colors.tertiary,
  },
  statusText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  expeditionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  expeditionDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
  },
  notes: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  checklist: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checklistText: {
    fontSize: 14,
    color: Colors.text,
  },
  checklistTextCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  formContainer: {
    flex: 1,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  textArea: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  submitButton: {
    marginTop: 20,
  },
});
