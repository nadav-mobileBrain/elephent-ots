import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  JOURNAL_ENTRIES: 'elephant_journal_entries',
  DAILY_FACT: 'elephant_daily_fact',
  REMINDERS: 'elephant_reminders',
  MEMORY_GAME_STATS: 'elephant_memory_stats',
  LAST_FACT_DATE: 'elephant_last_fact_date',
};

// Journal functions
export async function saveJournalEntry(entries: any[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return false;
  }
}

export async function loadJournalEntries() {
  try {
    const entries = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error loading journal entries:', error);
    return [];
  }
}

export async function deleteJournalEntry(id: string, updatedEntries: any[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(updatedEntries));
    return true;
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return false;
  }
}

// Facts functions
export async function saveDailyFact(fact: any) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_FACT, JSON.stringify(fact));
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_FACT_DATE, new Date().toDateString());
    return true;
  } catch (error) {
    console.error('Error saving daily fact:', error);
    return false;
  }
}

export async function loadDailyFact() {
  try {
    const lastDateStr = await AsyncStorage.getItem(STORAGE_KEYS.LAST_FACT_DATE);
    const currentDate = new Date().toDateString();
    
    // If it's a new day, we'll get a new fact from the API
    if (lastDateStr !== currentDate) {
      return null;
    }
    
    const fact = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_FACT);
    return fact ? JSON.parse(fact) : null;
  } catch (error) {
    console.error('Error loading daily fact:', error);
    return null;
  }
}

// Reminders functions
export async function saveReminder(reminder: any) {
  try {
    const existingReminders = await loadReminders() || [];
    const updatedReminders = [...existingReminders, reminder];
    await AsyncStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updatedReminders));
    return true;
  } catch (error) {
    console.error('Error saving reminder:', error);
    return false;
  }
}

export async function loadReminders() {
  try {
    const reminders = await AsyncStorage.getItem(STORAGE_KEYS.REMINDERS);
    return reminders ? JSON.parse(reminders) : [];
  } catch (error) {
    console.error('Error loading reminders:', error);
    return [];
  }
}

export async function updateReminder(id: string, updatedReminder: any) {
  try {
    const reminders = await loadReminders() || [];
    const updatedReminders = reminders.map((reminder: any) => 
      reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
    );
    await AsyncStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updatedReminders));
    return true;
  } catch (error) {
    console.error('Error updating reminder:', error);
    return false;
  }
}

export async function deleteReminder(id: string) {
  try {
    const reminders = await loadReminders() || [];
    const updatedReminders = reminders.filter((reminder: any) => reminder.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updatedReminders));
    return true;
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return false;
  }
}

// Memory game stats
export async function saveGameStats(stats: any) {
  try {
    const existingStats = await loadGameStats() || [];
    const updatedStats = [...existingStats, stats];
    await AsyncStorage.setItem(STORAGE_KEYS.MEMORY_GAME_STATS, JSON.stringify(updatedStats));
    return true;
  } catch (error) {
    console.error('Error saving game stats:', error);
    return false;
  }
}

export async function loadGameStats() {
  try {
    const stats = await AsyncStorage.getItem(STORAGE_KEYS.MEMORY_GAME_STATS);
    return stats ? JSON.parse(stats) : [];
  } catch (error) {
    console.error('Error loading game stats:', error);
    return [];
  }
}