// app/students.tsx
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StudentContext } from './contexts/StudentContext';

export default function StudentsScreen() {
  const { students } = useContext(StudentContext);
  const checkedIn = students.filter(s => s.checkedIn);

  return (
    <View style={styles.container}>
      {checkedIn.length > 0 ? (
        <FlatList
          data={checkedIn}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>✓</Text></View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>Nenhum aluno registrado ainda</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: { fontSize: 16 },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
});
