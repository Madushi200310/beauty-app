import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getRecommendations } from './skinTone';

const ColorGrid = ({ colors }: { colors: { name: string; color: string }[] }) => {
  const rows = [];
  for (let i = 0; i < colors.length; i += 3) {
    rows.push(colors.slice(i, i + 3));
  }

  return (
    <View style={styles.colorGrid}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.colorRow}>
          {row.map((item, index) => (
            <View key={index} style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: item.color }]} />
              <Text style={styles.colorName}>{item.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default function EyeshadowScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [colors, setColors] = useState<{ name: string; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const value = params.sliderValue ? parseInt(params.sliderValue as string) : 20;
    const rec = getRecommendations(value);
    setColors(rec.eyeshadow.colors);
    setLoading(false);
  }, [params.sliderValue]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      <View style={styles.pageBorder}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.pageTag}>BEAUTY MATCH</Text>
            <Text style={styles.pageTitle}>Eyeshadow Colors</Text>
            <Text style={styles.pageSubtitle}>Enhance your eyes with these shades</Text>
          </View>
        </View>

        <ColorGrid colors={colors} />

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>💡 These eyeshadow colors will make your eyes pop and complement your skin tone beautifully.</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0A12' },
  content: { padding: 16, paddingBottom: 48 },
  loadingContainer: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#FFF0F5', fontSize: 16 },

  pageBorder: {
    borderWidth: 1,
    borderColor: '#C8507A',
    borderRadius: 24,
    padding: 16,
    backgroundColor: '#1A0A12',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 14,
    paddingTop: 2,
  },
  backText: {
    fontSize: 24,
    color: '#C8507A',
    fontWeight: '300',
  },
  headerContent: {
    flex: 1,
  },
  pageTag: { 
    fontSize: 10, 
    fontWeight: '700', 
    letterSpacing: 3, 
    color: '#C8507A', 
    marginBottom: 4,
  },
  pageTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#FFF0F5', 
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 12,
    color: '#A08090',
    fontWeight: '400',
  },

  colorGrid: { gap: 8 },
  colorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  colorItem: {
    flex: 1,
    alignItems: 'center',
  },
  colorSwatch: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  colorName: {
    fontSize: 10,
    color: '#A08090',
    marginTop: 6,
    textAlign: 'center',
  },

  tipBox: {
    backgroundColor: '#2A1020',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  tipText: { 
    fontSize: 12, 
    color: '#C8507A', 
    lineHeight: 18, 
    textAlign: 'center' 
  },
});