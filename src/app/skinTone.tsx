import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const skinTones = [
  { id: 1, name: 'Fair', color: '#FDDBB4' },
  { id: 2, name: 'Light', color: '#F5C5A3' },
  { id: 3, name: 'Medium', color: '#E8A87C' },
  { id: 4, name: 'Olive', color: '#C68642' },
  { id: 5, name: 'Tan', color: '#A0522D' },
  { id: 6, name: 'Deep', color: '#6B3A2A' },
];

export default function SkinToneScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Your Skin Tone</Text>
      <Text style={styles.subtitle}>We'll recommend the best colors for you!</Text>
      <View style={styles.grid}>
        {skinTones.map((tone) => (
          <TouchableOpacity
            key={tone.id}
            style={[styles.toneCard, { backgroundColor: tone.color },
              selected?.id === tone.id && styles.selected]}
            onPress={() => setSelected(tone)}>
            <Text style={styles.toneName}>{tone.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selected && (
        <View style={styles.result}>
          <Text style={styles.resultText}>You selected: {selected.name}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40 },
  subtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  toneCard: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  selected: { borderWidth: 4, borderColor: '#000' },
  toneName: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  result: { marginTop: 30, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10 },
  resultText: { fontSize: 16, textAlign: 'center' },
});