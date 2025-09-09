// screens/HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = 'habits';
const COMPLETED_KEY = 'completedHabits';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);             // array of strings (habit names)
  const [completedHabits, setCompletedHabits] = useState([]); // array of strings currently completed

  // Load saved data on mount
  useEffect(() => {
    (async () => {
      try {
        const [savedHabits, savedCompleted] = await Promise.all([
          AsyncStorage.getItem(HABITS_KEY),
          AsyncStorage.getItem(COMPLETED_KEY),
        ]);
        if (savedHabits) setHabits(JSON.parse(savedHabits));
        if (savedCompleted) setCompletedHabits(JSON.parse(savedCompleted));
      } catch (e) {
        console.warn('Failed to load habits:', e);
      }
    })();
  }, []);

  // Persist helpers
  const saveHabits = useCallback(async (next) => {
    setHabits(next);
    try { await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const saveCompleted = useCallback(async (next) => {
    setCompletedHabits(next);
    try { await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(next)); } catch {}
  }, []);

  // Compatibility wrapper so AddHabitScreen’s `setHabits((prev)=>...)` still works
  const setHabitsCompat = useCallback((updaterOrValue) => {
    setHabits(prev => {
      const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue;
      // persist
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  // Toggle complete for a habit (by name)
  const toggleCompletion = (name) => {
    const isDone = completedHabits.includes(name);
    const next = isDone
      ? completedHabits.filter(h => h !== name)
      : [...completedHabits, name];
    saveCompleted(next);
  };

  // Optional: long-press to delete a habit
  const deleteHabit = (name) => {
    const nextHabits = habits.filter(h => h !== name);
    const nextCompleted = completedHabits.filter(h => h !== name);
    saveHabits(nextHabits);
    saveCompleted(nextCompleted);
  };

  const renderItem = ({ item }) => {
    const done = completedHabits.includes(item);
    return (
      <TouchableOpacity
        style={[styles.habitItem, done && styles.completedHabit]}
        onPress={() => toggleCompletion(item)}
        onLongPress={() => deleteHabit(item)}
      >
        <Text style={[styles.habitText, done && styles.habitTextCompleted]}>
          {item}
        </Text>
        <Text style={styles.hint}>{done ? 'Completed (tap to undo)' : 'Tap to complete • long-press to delete'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Habits</Text>

      <FlatList
        data={habits}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No habits yet — add one.</Text>}
        contentContainerStyle={habits.length ? undefined : { flexGrow: 1, justifyContent: 'center' }}
      />

      <Button
        title="Add New Habit"
        onPress={() => navigation.navigate('AddHabit', { setHabits: setHabitsCompat })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  habitItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    borderRadius: 8,
  },
  completedHabit: { backgroundColor: '#e6ffe6' },
  habitText: { fontSize: 16 },
  habitTextCompleted: { textDecorationLine: 'line-through', color: '#16a34a', fontWeight: '600' },
  hint: { marginTop: 6, fontSize: 12, color: '#6b7280' },
  empty: { textAlign: 'center', color: '#6b7280' },
});
