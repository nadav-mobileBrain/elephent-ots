import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Plus, ChevronRight, X, CreditCard as Edit2, Save, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { saveJournalEntry, loadJournalEntries, deleteJournalEntry } from '@/utils/storage';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
}

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    loadEntries();
  }, []);
  
  const loadEntries = async () => {
    const savedEntries = await loadJournalEntries();
    if (savedEntries) {
      setEntries(savedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  };
  
  const handleAddEntry = async () => {
    if (!title.trim() && !content.trim()) return;
    
    const newEntry: JournalEntry = {
      id: editingEntry?.id || Date.now().toString(),
      date: editingEntry?.date || new Date().toISOString(),
      title: title.trim() || 'Untitled Entry',
      content: content.trim(),
    };
    
    // If editing, update the entry, otherwise add new
    if (editingEntry) {
      const updatedEntries = entries.map(entry => 
        entry.id === editingEntry.id ? newEntry : entry
      );
      await saveJournalEntry(updatedEntries);
      setEntries(updatedEntries);
    } else {
      const updatedEntries = [newEntry, ...entries];
      await saveJournalEntry(updatedEntries);
      setEntries(updatedEntries);
    }
    
    // Reset form
    setTitle('');
    setContent('');
    setShowForm(false);
    setEditingEntry(null);
  };
  
  const handleEditEntry = (entry: JournalEntry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setEditingEntry(entry);
    setShowForm(true);
  };
  
  const handleDeleteEntry = async (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    await deleteJournalEntry(id, updatedEntries);
    setEntries(updatedEntries);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Your Ele-log Journal</Text>
      <Text style={styles.emptyText}>
        Record your thoughts, observations, and memories inspired by elephants.
        Tap the + button to create your first entry.
      </Text>
    </View>
  );
  
  const renderEntryItem = ({ item }: { item: JournalEntry }) => (
    <Animated.View
      entering={SlideInRight.springify().damping(15)}
      exiting={SlideOutRight.springify().damping(15)}
    >
      <Card style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{item.title}</Text>
          <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
        </View>
        <Text style={styles.entryContent} numberOfLines={3}>
          {item.content}
        </Text>
        <View style={styles.entryActions}>
          <Pressable 
            style={styles.actionButton} 
            onPress={() => handleEditEntry(item)}
          >
            <Edit2 size={18} color={Colors.primary} />
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>
          <Pressable 
            style={styles.actionButton} 
            onPress={() => handleDeleteEntry(item.id)}
          >
            <Trash2 size={18} color="#EF4444" />
            <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete</Text>
          </Pressable>
        </View>
      </Card>
    </Animated.View>
  );
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      {!showForm ? (
        <>
          <FlatList
            data={entries}
            renderItem={renderEntryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
          />
          
          <Pressable 
            style={styles.addButton}
            onPress={() => setShowForm(true)}
          >
            <Plus size={24} color="#fff" />
          </Pressable>
        </>
      ) : (
        <Animated.View 
          style={styles.formContainer}
          entering={FadeInUp.duration(300)}
          exiting={FadeOutDown.duration(300)}
        >
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>
              {editingEntry ? 'Edit Entry' : 'New Entry'}
            </Text>
            <Pressable onPress={() => {
              setShowForm(false);
              setEditingEntry(null);
              setTitle('');
              setContent('');
            }}>
              <X size={24} color={Colors.textSecondary} />
            </Pressable>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a title"
              placeholderTextColor={Colors.textSecondary}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>What's on your mind?</Text>
            <TextInput
              style={styles.textArea}
              value={content}
              onChangeText={setContent}
              placeholder="Write your thoughts..."
              placeholderTextColor={Colors.textSecondary}
              multiline
              textAlignVertical="top"
            />
          </View>
          
          <Button
            title="Save Entry"
            onPress={handleAddEntry}
            icon={<Save size={18} color="white" />}
          />
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 100,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 300,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  entryCard: {
    marginBottom: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  entryDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  entryContent: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.primary,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  formContainer: {
    flex: 1,
    padding: 16,
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
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
    minHeight: 150,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
});