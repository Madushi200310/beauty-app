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
  { id: 9, name: 'Black', color: '#222222' },
  { id: 10, name: 'Brown', color: '#8B4513' },
  { id: 11, name: 'Navy', color: '#000080' },
  { id: 12, name: 'Beige', color: '#F5F0DC' },
  { id: 13, name: 'Teal', color: '#008080' },
  { id: 14, name: 'Coral', color: '#FF6B6B' },
  { id: 15, name: 'Lavender', color: '#E6E6FA' },
  { id: 16, name: 'Mint', color: '#98FF98' },
  { id: 17, name: 'Burgundy', color: '#800020' },
  { id: 18, name: 'Mustard', color: '#FFDB58' },
  { id: 19, name: 'Olive', color: '#808000' },
  { id: 20, name: 'Maroon', color: '#800000' },
  { id: 21, name: 'Peach', color: '#FFDAB9' },
  { id: 22, name: 'Slate', color: '#708090' },
  { id: 23, name: 'Cream', color: '#FFFDD0' },
  { id: 24, name: 'Fuchsia', color: '#FF00FF' },
  { id: 25, name: 'Emerald', color: '#50C878' },
  { id: 26, name: 'Rust', color: '#B7410E' },
  { id: 27, name: 'Lilac', color: '#C8A8E8' },
  { id: 28, name: 'Camel', color: '#C19A6B' },
  { id: 29, name: 'Cobalt', color: '#0047AB' },
  { id: 30, name: 'Rose', color: '#FF007F' },
];

const matchingColors: Record<string, string[]> = {
  Red: ['Black', 'White', 'Navy', 'Beige', 'Cream', 'Slate'],
  Blue: ['White', 'Beige', 'Brown', 'Orange', 'Cream', 'Mustard'],
  Green: ['Beige', 'Brown', 'White', 'Yellow', 'Camel', 'Cream'],
  Yellow: ['Navy', 'Purple', 'Black', 'Green', 'Brown', 'Burgundy'],
  Purple: ['Yellow', 'White', 'Beige', 'Pink', 'Mint', 'Cream'],
  Pink: ['Navy', 'White', 'Black', 'Purple', 'Lavender', 'Mint'],
  Orange: ['Navy', 'Blue', 'White', 'Brown', 'Olive', 'Teal'],
  White: ['Red', 'Blue', 'Black', 'Navy', 'Emerald', 'Cobalt'],
  Black: ['White', 'Red', 'Yellow', 'Pink', 'Fuchsia', 'Coral'],
  Brown: ['Beige', 'Green', 'Blue', 'Orange', 'Cream', 'Camel'],
  Navy: ['White', 'Yellow', 'Pink', 'Orange', 'Coral', 'Mint'],
  Beige: ['Brown', 'Green', 'Purple', 'Navy', 'Rust', 'Camel'],
  Teal: ['Coral', 'White', 'Navy', 'Orange', 'Mustard', 'Rust'],
  Coral: ['Teal', 'Navy', 'White', 'Mint', 'Mustard', 'Brown'],
  Lavender: ['Pink', 'White', 'Cream', 'Slate', 'Lilac', 'Mint'],
  Mint: ['Pink', 'White', 'Navy', 'Coral', 'Lavender', 'Brown'],
  Burgundy: ['Beige', 'Cream', 'Navy', 'Camel', 'Mustard', 'Olive'],
  Mustard: ['Burgundy', 'Navy', 'Brown', 'Olive', 'Black', 'Teal'],
  Olive: ['Camel', 'Mustard', 'Brown', 'Beige', 'Rust', 'Cream'],
  Maroon: ['Beige', 'Cream', 'Camel', 'Navy', 'Olive', 'Brown'],
  Peach: ['White', 'Brown', 'Coral', 'Beige', 'Navy', 'Teal'],
  Slate: ['White', 'Navy', 'Coral', 'Mustard', 'Lavender', 'Cream'],
  Cream: ['Brown', 'Navy', 'Burgundy', 'Rust', 'Olive', 'Black'],
  Fuchsia: ['Black', 'Navy', 'White', 'Teal', 'Cobalt', 'Emerald'],
  Emerald: ['White', 'Black', 'Navy', 'Cream', 'Camel', 'Rust'],
  Rust: ['Olive', 'Beige', 'Teal', 'Cream', 'Mustard', 'Brown'],
  Lilac: ['White', 'Lavender', 'Mint', 'Slate', 'Cream', 'Pink'],
  Camel: ['Burgundy', 'Navy', 'Brown', 'Olive', 'Black', 'Cream'],
  Cobalt: ['White', 'Mustard', 'Coral', 'Fuchsia', 'Beige', 'Cream'],
  Rose: ['Black', 'Navy', 'White', 'Slate', 'Teal', 'Emerald'],
};

const lightColors = ['#F5F5F5', '#F5F0DC', '#FFD700', '#FFDAB9', '#E6E6FA', '#98FF98', '#FFDB58', '#FFFDD0', '#C8A8E8', '#FFC0CB'];

export default function ColorMatchScreen() {
  const [selected, setSelected] = useState<typeof colorOptions[0] | null>(null);

  const getMatches = () => {
    if (!selected) return [];
    return (matchingColors[selected.name] || []).map(name =>
      colorOptions.find(c => c.name === name)
    ).filter(Boolean);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      {/* Page Border */}
      <View style={styles.pageBorder}>

        {/* Header */}
        <Text style={styles.pageTag}>BEAUTY MATCH</Text>
        <Text style={styles.pageTitle}>Color Matching</Text>
        <Text style={styles.pageSubtitle}>Pick a color to discover perfect combinations</Text>

        {/* Color Grid */}
        <View style={styles.selectorCard}>
          <Text style={styles.sectionLabel}>SELECT A COLOR</Text>
          <View style={styles.grid}>
            {colorOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.colorCard,
                  { backgroundColor: item.color },
                  selected?.id === item.id && styles.selectedCard,
                  lightColors.includes(item.color) && styles.lightCard,
                ]}
                onPress={() => setSelected(item)}>
                {selected?.id === item.id && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
                <Text style={[
                  styles.colorName,
                  lightColors.includes(item.color) ? { color: '#333' } : { color: '#fff' }
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results */}
        {selected && (
          <View style={styles.resultCard}>
            {/* Selected color display */}
            <View style={styles.selectedDisplay}>
              <View style={[
                styles.selectedCircle,
                { backgroundColor: selected.color },
                lightColors.includes(selected.color) && { borderWidth: 1, borderColor: '#555' }
              ]} />
              <View>
                <Text style={styles.selectedLabel}>Selected</Text>
                <Text style={styles.selectedName}>{selected.name}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>BEST MATCHES</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Match Cards */}
            <View style={styles.matchGrid}>
              {getMatches().map((match) => match && (
                <View key={match.id} style={styles.matchItem}>
                  <View style={[
                    styles.matchCircle,
                    { backgroundColor: match.color },
                    lightColors.includes(match.color) && { borderWidth: 1, borderColor: '#555' }
                  ]} />
                  <Text style={styles.matchName}>{match.name}</Text>
                </View>
              ))}
            </View>

            {/* Tip */}
            <View style={styles.tipBox}>
              <Text style={styles.tipText}>
                💡 {selected.name} pairs beautifully with these shades for a balanced and stylish outfit!
              </Text>
            </View>
          </View>
        )}

        {/* Empty state */}
        {!selected && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>👆</Text>
            <Text style={styles.emptyText}>Tap any color above to see matching combinations</Text>
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0A12' },
  content: { padding: 16, paddingBottom: 48 },

  // Page Border
  pageBorder: {
    borderWidth: 1,
    borderColor: '#C8507A',
    borderRadius: 24,
    padding: 16,
    backgroundColor: '#1A0A12',
  },

  // Header
  pageTag: { fontSize: 10, fontWeight: '700', letterSpacing: 3, color: '#C8507A', marginBottom: 4 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#FFF0F5', letterSpacing: -0.5, marginBottom: 6 },
  pageSubtitle: { fontSize: 13, color: '#A08090', marginBottom: 20 },

  // Selector Card
  selectorCard: {
    backgroundColor: '#2A1020',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  colorCard: {
    width: 70,
    height: 70,
    borderRadius: 14,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
    position: 'relative',
  },
  lightCard: {
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#C8507A',
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#C8507A',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  colorName: { fontSize: 9, fontWeight: '700', textAlign: 'center' },

  // Result Card
  resultCard: {
    backgroundColor: '#2A1020',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  selectedDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 14,
  },
  selectedCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  selectedLabel: { fontSize: 11, color: '#A08090', marginBottom: 4 },
  selectedName: { fontSize: 22, fontWeight: '700', color: '#FFF0F5' },

  // Divider
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#3D1830' },
  dividerText: { fontSize: 9, fontWeight: '700', letterSpacing: 2, color: '#C8507A', marginHorizontal: 10 },

  // Match Grid
  matchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 16,
  },
  matchItem: { alignItems: 'center', width: 64 },
  matchCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  matchName: { fontSize: 10, color: '#A08090', textAlign: 'center', fontWeight: '500' },

  // Tip
  tipBox: {
    backgroundColor: '#3D1830',
    borderRadius: 12,
    padding: 12,
  },
  tipText: { fontSize: 12, color: '#C8507A', lineHeight: 18 },

  // Empty State
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#A08090', textAlign: 'center', lineHeight: 22 },
});