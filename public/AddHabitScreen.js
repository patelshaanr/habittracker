import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddHabitScreen({ navigation, route }) {
  const [habit, setHabit] = useState('');
  const { setHabits } = route.params;

  const addHabit = () => {
    if (habit.trim().length > 0) {
      setHabits((prevHabits) => [...prevHabits, habit]);
      navigation.goBack(); // Go back to HomeScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Habit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Habit Name"
        value={habit}
        onChangeText={(text) => setHabit(text)}
      />
      <Button title="Save Habit" onPress={addHabit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});