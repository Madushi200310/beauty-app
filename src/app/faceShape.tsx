import { useRouter } from 'expo-router';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isWide = width > 900;
const CONTENT_MAX = 1100;

// ============================================
// FACE SHAPE DATA — with male & female images
// ============================================
const faceShapes = [
  {
    id: 1,
    name: 'Oval',
    emoji: '🥚',
    tagline: 'Balanced & versatile',
    description: 'Balanced proportions, slightly longer than wide',
    bestFrames: ['Wayfarer', 'Aviator', 'Cat-eye', 'Round'],
    maleImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    femaleImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
  },
  {
    id: 2,
    name: 'Round',
    emoji: '⭕',
    tagline: 'Soft & youthful',
    description: 'Soft curves, equal width and height',
    bestFrames: ['Angular', 'Square', 'Rectangle', 'Cat-eye'],
    maleImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    femaleImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
  },
  {
    id: 3,
    name: 'Square',
    emoji: '⬜',
    tagline: 'Strong & defined',
    description: 'Strong jawline, wide forehead, angular features',
    bestFrames: ['Round', 'Oval', 'Cat-eye', 'Aviator'],
    maleImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    femaleImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  },
  {
    id: 4,
    name: 'Heart',
    emoji: '❤️',
    tagline: 'Wide top, pointed chin',
    description: 'Wide forehead, narrow chin, cheekbones prominent',
    bestFrames: ['Cat-eye', 'Round', 'Aviator', 'Bottom-heavy'],
    maleImage:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    femaleImage:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
  },
  {
    id: 5,
    name: 'Diamond',
    emoji: '💎',
    tagline: 'Sharp cheekbones',
    description: 'Narrow forehead and jaw, wide cheekbones',
    bestFrames: ['Cat-eye', 'Oval', 'Rimless', 'Aviator'],
    maleImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    femaleImage:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
  },
  {
    id: 6,
    name: 'Oblong',
    emoji: '📏',
    tagline: 'Long & narrow',
    description: 'Longer than wide, narrow width',
    bestFrames: ['Oval', 'Round', 'Square', 'Wayfarer'],
    maleImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    femaleImage:
      'https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=800&q=80',
  },
];

// ============================================
// FACE SHAPE CARD
// ============================================
function FaceShapeCard({
  shape,
  index,
  onPress,
}: {
  shape: typeof faceShapes[0];
  index: number;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}>
      <View style={styles.emojiRing}>
        <Text style={styles.emoji}>{shape.emoji}</Text>
      </View>

      <Text style={styles.cardName}>{shape.name}</Text>
      <Text style={styles.cardTagline}>{shape.tagline}</Text>

      <Text style={styles.cardDesc} numberOfLines={2}>
        {shape.description}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={styles.cardIndex}>0{index + 1}</Text>
        <Text style={styles.cardArrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

// ============================================
// MAIN SCREEN
// ============================================
export default function FaceShapeScreen() {
  const router = useRouter();

  const handleSelect = (shape: typeof faceShapes[0]) => {
    router.push({
      pathname: '/faceShapeDetail',
      params: {
        id: shape.id,
        name: shape.name,
        emoji: shape.emoji,
        description: shape.description,
        bestFrames: JSON.stringify(shape.bestFrames),
        maleImage: shape.maleImage,
        femaleImage: shape.femaleImage,
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <View style={styles.pageBorder}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.pageTag}>BEAUTY MATCH</Text>
          <Text style={styles.pageTitle}>Face Shape Finder</Text>
          <Text style={styles.pageSubtitle}>
            Select your face shape to see the best frame styles for you.
          </Text>
        </View>

        {/* CHIP */}
        <View style={styles.chipRow}>
          <View style={styles.chip}>
            <Text style={styles.chipDot}>●</Text>
            <Text style={styles.chipText}>
              {faceShapes.length} shapes available
            </Text>
          </View>
        </View>

        {/* DIVIDER */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>CHOOSE YOUR SHAPE</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* GRID */}
        <View style={[styles.grid, !isWide && styles.gridNarrow]}>
          {faceShapes.map((shape, index) => (
            <View key={shape.id} style={styles.cardWrapper}>
              <FaceShapeCard
                shape={shape}
                index={index}
                onPress={() => handleSelect(shape)}
              />
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            👆 Tap any face shape to see frame recommendations
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0A12' },
  content: {
    padding: 16,
    paddingBottom: 48,
    alignItems: 'center',
  },

  pageBorder: {
    width: '100%',
    maxWidth: CONTENT_MAX,
    borderWidth: 1,
    borderColor: '#C8507A',
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#1A0A12',
  },

  // HEADER
  header: { marginBottom: 16 },
  pageTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#C8507A',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: isWide ? 34 : 26,
    fontWeight: '800',
    color: '#FFF0F5',
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#A08090',
    lineHeight: 20,
    maxWidth: 560,
  },

  // CHIP
  chipRow: { flexDirection: 'row', marginBottom: 24 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(200, 80, 122, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipDot: { color: '#C8507A', fontSize: 8 },
  chipText: {
    fontSize: 11,
    color: '#C8507A',
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // DIVIDER
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#3D1830' },
  dividerText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#C8507A',
    marginHorizontal: 12,
  },

  // GRID
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 20,
  },
  gridNarrow: { flexDirection: 'column' },
  cardWrapper: {
    flex: isWide ? 1 : undefined,
    minWidth: isWide ? 240 : '100%',
    width: isWide ? undefined : '100%',
  },

  // CARD
  card: {
    backgroundColor: '#2A1020',
    borderWidth: 1,
    borderColor: '#3D1830',
    borderRadius: 18,
    padding: 20,
    height: 240,
    justifyContent: 'flex-start',
  },
  emojiRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.4)',
    backgroundColor: 'rgba(200, 80, 122, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emoji: { fontSize: 26 },
  cardName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF0F5',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  cardTagline: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C8507A',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 12,
    color: '#A08090',
    lineHeight: 17,
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#3D1830',
    paddingTop: 12,
    marginTop: 12,
  },
  cardIndex: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#5A2838',
  },
  cardArrow: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C8507A',
  },

  // FOOTER NOTE
  footerNote: {
    marginTop: 8,
    padding: 14,
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