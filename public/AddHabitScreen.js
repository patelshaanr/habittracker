// screens/AddHabitScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from 'react-native';

export default function AddHabitScreen({ navigation, route }) {
  const [habit, setHabit] = useState('');
  const { setHabits } = route.params;

  // simple inline validation: non-empty & at least 2 visible chars
  const trimmed = useMemo(() => habit.trim(), [habit]);
  const isValid = trimmed.length >= 2;
  const errorMsg = !trimmed
    ? 'Please enter a habit name.'
    : trimmed.length < 2
    ? 'Habit name is too short.'
    : '';

  const addHabit = () => {
    if (!isValid) return; // guard; button is disabled anyway
    setHabits((prevHabits) => [...prevHabits, trimmed]);
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Habit</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Habit name</Text>
          <TextInput
            style={[
              styles.input,
              !isValid && trimmed.length >= 0 && styles.inputError,
            ]}
            placeholder="e.g., Drink 2L of water"
            value={habit}
            onChangeText={setHabit}
            returnKeyType="done"
            onSubmitEditing={addHabit}
            autoFocus
          />
          {!isValid && (
            <Text style={styles.helperText}>{errorMsg}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
          activeOpacity={isValid ? 0.85 : 1}
          onPress={addHabit}
          disabled={!isValid}
        >
          <Text style={styles.saveButtonText}>Save Habit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16, color: '#0F172A' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 20,
  },
  label: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CBD5E1',
  },
  inputError: {
    borderBottomColor: '#EF4444',
  },
  helperText: {
    marginTop: 8,
    fontSize: 12,
    color: '#EF4444',
  },

  saveButton: {
    backgroundColor: '#16A34A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    shadowColor: '#16A34A',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#86EFAC',
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});
