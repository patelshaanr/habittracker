// screens/AddHabitScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';

export default function AddHabitScreen({ navigation, route }) {
  const [habit, setHabit] = useState('');
  const { setHabits } = route.params;

  const addHabit = () => {
    const name = habit.trim();

    if (!name) {
      Alert.alert('Invalid habit', 'Please enter a habit name.');
      return;
    }

    // Works with setHabitsCompat in HomeScreen
    setHabits((prevHabits) => [...prevHabits, name]);

    Keyboard.dismiss();
    navigation.goBack(); // Return to HomeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Habit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Habit Name"
        value={habit}
        onChangeText={setHabit}
        returnKeyType="done"
        onSubmitEditing={addHabit}
        autoFocus
      />
      <Button title="Save Habit" onPress={addHabit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
});
