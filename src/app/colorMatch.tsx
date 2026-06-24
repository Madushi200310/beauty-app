import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const colorOptions = [
  { id: 1, name: 'Red', color: '#FF0000' },
  { id: 2, name: 'Blue', color: '#0000FF' },
  { id: 3, name: 'Green', color: '#008000' },
  { id: 4, name: 'Yellow', color: '#FFD700' },
  { id: 5, name: 'Purple', color: '#800080' },
  { id: 6, name: 'Pink', color: '#FFC0CB' },
  { id: 7, name: 'Orange', color: '#FFA500' },
  { id: 8, name: 'White', color: '#F5F5F5' },
  { id: 9, name: 'Black', color: '#000000' },
  { id: 10, name: 'Brown', color: '#8B4513' },
  { id: 11, name: 'Navy', color: '#000080' },
  { id: 12, name: 'Beige', color: '#F5F0DC' },
];

const matchingColors: Record<string, string[]> = {
  Red: ['Black', 'White', 'Navy', 'Beige'],
  Blue: ['White', 'Beige', 'Brown', 'Orange'],
  Green: ['Beige', 'Brown', 'White', 'Yellow'],
  Yellow: ['Navy', 'Purple', 'Black', 'Green'],
  Purple: ['Yellow', 'White', 'Beige', 'Pink'],
  Pink: ['Navy', 'White', 'Black', 'Purple'],
  Orange: ['Navy', 'Blue', 'White', 'Brown'],
  White: ['Red', 'Blue', 'Black', 'Navy'],
  Black: ['White', 'Red', 'Yellow', 'Pink'],
  Brown: ['Beige', 'Green', 'Blue', 'Orange'],
  Navy: ['White', 'Yellow', 'Pink', 'Orange'],
  Beige: ['Brown', 'Green', 'Purple', 'Navy'],
};

export default function ColorMatchScreen() {
  const [selected, setSelected] = useState(null);

  const getMatches = () => {
    if (!selected) return [];
    return matchingColors[selected.name] || [];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Color Matching</Text>
      <Text style={styles.subtitle}>Select a clothing color to get matching suggestions!</Text>

      <View style={styles.grid}>
        {colorOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.colorCard, { backgroundColor: item.color },
              selected?.id === item.id && styles.selectedCard]}
            onPress={() => setSelected(item)}>
            <Text style={[styles.colorName, item.color === '#F5F5F5' || item.color === '#F5F0DC' || item.color === '#FFD700' ? { color: '#333' } : { color: '#fff' }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Best matches for {selected.name}:</Text>
          <View style={styles.matchGrid}>
            {getMatches().map((colorName) => {
              const match = colorOptions.find(c => c.name === colorName);
              return (
                <View key={colorName} style={[styles.matchCard, { backgroundColor: match?.color }]}>
                  <Text style={styles.matchName}>{colorName}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40 },
  subtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  colorCard: { width: 80, height: 80, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  selectedCard: { borderWidth: 4, borderColor: '#000' },
  colorName: { fontWeight: 'bold', fontSize: 11 },
  resultBox: { marginTop: 30, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 12 },
  resultTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  matchGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  matchCard: { width: 70, height: 70, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  matchName: { color: '#fff', fontWeight: 'bold', fontSize: 10 },
});