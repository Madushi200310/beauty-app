import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function FaceShapeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse params
  const name = params.name as string || 'Face Shape';
  const emoji = params.emoji as string || '👤';
  const description = params.description as string || '';
  const modelImage = params.modelImage as string || '';
  const bestFrames = params.bestFrames ? JSON.parse(params.bestFrames as string) : [];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      <View style={styles.pageBorder}>

        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.pageTag}>BEAUTY MATCH</Text>
            <Text style={styles.pageTitle}>{emoji} {name}</Text>
            <Text style={styles.pageSubtitle}>Face Shape Guide</Text>
          </View>
        </View>

        {/* 3D Model / Image Section */}
        <View style={styles.modelContainer}>
          {modelImage ? (
            <Image 
              source={{ uri: modelImage }} 
              style={styles.modelImage} 
              resizeMode="cover"
            />
          ) : (
            <View style={styles.modelPlaceholder}>
              <Text style={styles.modelEmoji}>👓</Text>
              <Text style={styles.modelPlaceholderText}>3D Model Preview</Text>
            </View>
          )}
          
          {/* Overlay badge */}
          <View style={styles.modelBadge}>
            <Text style={styles.modelBadgeText}>👤 {name} Face Shape</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        {/* Best Frames Section */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Best Frame Styles</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Best Frames Grid */}
        <View style={styles.framesGrid}>
          {bestFrames.map((frame: string, index: number) => (
            <View key={index} style={styles.frameCard}>
              <Text style={styles.frameEmoji}>👓</Text>
              <Text style={styles.frameName}>{frame}</Text>
            </View>
          ))}
        </View>

        {/* Style Tips */}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Style Tip</Text>
          <Text style={styles.tipText}>
            For {name} face shapes, we recommend {bestFrames.join(', ')} frames. 
            These styles will complement your natural features and create a balanced, 
            harmonious look.
          </Text>
        </View>

        {/* Try On Button */}
        <TouchableOpacity style={styles.tryOnButton} activeOpacity={0.7}>
          <Text style={styles.tryOnButtonText}>👁 Try Virtual Try-On</Text>
        </TouchableOpacity>

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
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    fontSize: 22,
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

  // Model / 3D Image Section
  modelContainer: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#3D1830',
    marginBottom: 16,
    position: 'relative',
  },
  modelImage: {
    width: '100%',
    height: '100%',
  },
  modelPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A0A12',
  },
  modelEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  modelPlaceholderText: {
    fontSize: 14,
    color: '#A08090',
  },
  modelBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(26, 10, 18, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.3)',
  },
  modelBadgeText: {
    fontSize: 12,
    color: '#FFF0F5',
    fontWeight: '600',
  },

  descriptionCard: {
    backgroundColor: '#2A1020',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  descriptionText: {
    fontSize: 13,
    color: '#A08090',
    textAlign: 'center',
    lineHeight: 20,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3D1830',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
    marginHorizontal: 10,
    textTransform: 'uppercase',
  },

  // Best Frames Grid - 3 per row
  framesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  frameCard: {
    width: (width - 62) / 3,
    backgroundColor: '#2A1020',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  frameEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  frameName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF0F5',
    textAlign: 'center',
  },

  tipBox: {
    backgroundColor: 'rgba(200, 80, 122, 0.08)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.15)',
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C8507A',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#A08090',
    lineHeight: 18,
  },

  tryOnButton: {
    backgroundColor: '#C8507A',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  tryOnButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF0F5',
  },
});