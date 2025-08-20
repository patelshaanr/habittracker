import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Habits</Text>
      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.habitItem}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add New Habit" onPress={() => navigation.navigate('AddHabit', { setHabits })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  habitItem: { padding: 15, backgroundColor: '#f0f0f0', marginVertical: 8, borderRadius: 5 },
});
<FlatList
  data={habits}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.habitItem,
        completedHabits.includes(item) && styles.completedHabit,
      ]}
      onPress={() => toggleCompletion(item)}
    >
      <Text style={styles.habitText}>{item}</Text>
    </TouchableOpacity>
  )}
  
/>
import AsyncStorage from '@react-native-async-storage/async-storage';

useEffect(() => {
  const loadHabits = async () => {
    const savedHabits = await AsyncStorage.getItem('habits');
    if (savedHabits) setHabits(JSON.parse(savedHabits));
  };
  loadHabits();
}, []);

const saveHabits = async (newHabits) => {
  setHabits(newHabits);
  await AsyncStorage.setItem('habits', JSON.stringify(newHabits));
};

// Modify addHabit to use saveHabits:
const addHabit = (habit) => {
  const updatedHabits = [...habits, habit];
  saveHabits(updatedHabits);
};