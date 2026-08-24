import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const faceShapes = [
  {
    id: 1,
    name: 'Oval',
    emoji: '🥚',
    description: 'Balanced proportions, slightly longer than wide',
    bestFrames: ['Wayfarer', 'Aviator', 'Cat-eye', 'Round'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    modelImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    id: 2,
    name: 'Round',
    emoji: '⭕',
    description: 'Soft curves, equal width and height',
    bestFrames: ['Angular', 'Square', 'Rectangle', 'Cat-eye'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    modelImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
  },
  {
    id: 3,
    name: 'Square',
    emoji: '⬜',
    description: 'Strong jawline, wide forehead, angular features',
    bestFrames: ['Round', 'Oval', 'Cat-eye', 'Aviator'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    modelImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
  },
  {
    id: 4,
    name: 'Heart',
    emoji: '❤️',
    description: 'Wide forehead, narrow chin, cheekbones prominent',
    bestFrames: ['Cat-eye', 'Round', 'Aviator', 'Bottom-heavy'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    modelImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
  },
  {
    id: 5,
    name: 'Diamond',
    emoji: '💎',
    description: 'Narrow forehead and jaw, wide cheekbones',
    bestFrames: ['Cat-eye', 'Oval', 'Rimless', 'Aviator'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    modelImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    id: 6,
    name: 'Oblong',
    emoji: '📏',
    description: 'Longer than wide, narrow width',
    bestFrames: ['Oval', 'Round', 'Square', 'Wayfarer'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    modelImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
  },
];

export default function FaceShapeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      <View style={styles.pageBorder}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTag}>BEAUTY MATCH</Text>
          <Text style={styles.pageTitle}>Face Shape Finder</Text>
          <Text style={styles.pageSubtitle}>Select your face shape to see best frame styles</Text>
        </View>

        {/* ✅ SMALLER CARDS - 3 per row */}
        <View style={styles.grid}>
          {faceShapes.map((shape) => (
            <TouchableOpacity
              key={shape.id}
              style={styles.shapeCard}
              onPress={() => router.push({
                pathname: '/faceShapeDetail',
                params: { 
                  id: shape.id,
                  name: shape.name,
                  emoji: shape.emoji,
                  description: shape.description,
                  bestFrames: JSON.stringify(shape.bestFrames),
                  modelImage: shape.modelImage,
                }
              })}
              activeOpacity={0.7}>
              <View style={styles.cardContent}>
                <Text style={styles.shapeEmoji}>{shape.emoji}</Text>
                <Text style={styles.shapeName}>{shape.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>👆 Tap any face shape to see frame recommendations</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0A12' },
  content: { padding: 16, paddingBottom: 48 },

  pageBorder: {
    borderWidth: 1,
    borderColor: '#C8507A',
    borderRadius: 24,
    padding: 16,
    backgroundColor: '#1A0A12',
  },

  header: {
    marginBottom: 20,
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

  // ✅ SMALLER CARDS - 3 per row
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  shapeCard: {
    width: (width - 62) / 3, // 3 cards per row with gaps
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: '#2A1020',
    borderWidth: 1,
    borderColor: '#3D1830',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shapeEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  shapeName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF0F5',
  },

  footerNote: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(200, 80, 122, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.15)',
  },
  footerNoteText: {
    fontSize: 12,
    color: '#A08090',
    textAlign: 'center',
  },
});