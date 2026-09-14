import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isWide = width > 900;
const CONTENT_MAX = 1200;

export default function FaceShapeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const name = (params.name as string) || 'Face Shape';
  const emoji = (params.emoji as string) || '👤';
  const description = (params.description as string) || '';
  const maleImage = (params.maleImage as string) || '';
  const femaleImage = (params.femaleImage as string) || '';
  const bestFrames: string[] = params.bestFrames
    ? JSON.parse(params.bestFrames as string)
    : [];

  // Build slides — filter out empty images
  const slides = [
    { key: 'female', label: 'FEMALE', image: femaleImage },
    { key: 'male', label: 'MALE', image: maleImage },
  ].filter((s) => !!s.image);

  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () =>
    setActiveIndex((i) => (i + 1) % slides.length);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      <View style={styles.pageBorder}>

        {/* ─────────── HEADER ─────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.pageTag}>BEAUTY MATCH</Text>
            <Text style={styles.pageTitle}>
              {emoji}  {name}
            </Text>
            <Text style={styles.pageSubtitle}>Face Shape Guide</Text>
          </View>
        </View>

        {/* ─────────── SPLIT LAYOUT ─────────── */}
        <View style={[styles.split, !isWide && styles.splitNarrow]}>

          {/* ── LEFT: CAROUSEL ── */}
          <View style={[styles.leftPanel, !isWide && styles.leftPanelNarrow]}>

            {/* Images — absolute positioned inside a fixed-size box */}
            {slides.map((slide, idx) => (
              <Image
                key={slide.key}
                source={{ uri: slide.image }}
                style={[
                  styles.modelImage,
                  { opacity: idx === activeIndex ? 1 : 0 },
                ]}
                resizeMode="cover"
              />
            ))}

            {/* Bottom overlay */}
            <View style={styles.imageOverlay} pointerEvents="none" />

            {/* Top-left badge */}
            <View style={styles.modelBadge} pointerEvents="none">
              <Text style={styles.modelBadgeEmoji}>👤</Text>
              <Text style={styles.modelBadgeText}>
                {name} Face Shape · {slides[activeIndex]?.label ?? ''}
              </Text>
            </View>

            {/* Arrows */}
            {slides.length > 1 && (
              <>
                <TouchableOpacity
                  style={[styles.arrowBtn, styles.arrowLeft]}
                  onPress={goPrev}
                  activeOpacity={0.75}>
                  <Text style={styles.arrowText}>‹</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.arrowBtn, styles.arrowRight]}
                  onPress={goNext}
                  activeOpacity={0.75}>
                  <Text style={styles.arrowText}>›</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Dots */}
            {slides.length > 1 && (
              <View style={styles.dotsRow}>
                {slides.map((slide, idx) => (
                  <TouchableOpacity
                    key={slide.key}
                    style={[
                      styles.dot,
                      idx === activeIndex && styles.dotActive,
                    ]}
                    onPress={() => setActiveIndex(idx)}
                    activeOpacity={0.7}>
                    {idx === activeIndex && (
                      <Text style={styles.dotLabel}>{slide.label}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

          </View>

          {/* ── RIGHT: DETAILS ── */}
          <View style={[styles.rightPanel, !isWide && styles.rightPanelNarrow]}>

            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionLabel}>ABOUT THIS SHAPE</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>

            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionTitle}>BEST FRAME STYLES</Text>
              <View style={styles.sectionLine} />
            </View>

            <View style={styles.framesGrid}>
              {bestFrames.map((frame, index) => (
                <View key={index} style={styles.frameCard}>
                  <View style={styles.frameIconRing}>
                    <Text style={styles.frameEmoji}>👓</Text>
                  </View>
                  <Text style={styles.frameName}>{frame}</Text>
                </View>
              ))}
            </View>

            <View style={styles.tipBox}>
              <Text style={styles.tipTitle}>💡  Style Tip</Text>
              <Text style={styles.tipText}>
                For {name.toLowerCase()} face shapes, we recommend{' '}
                <Text style={styles.tipHighlight}>
                  {bestFrames.join(', ')}
                </Text>{' '}
                frames. These styles complement your natural features and
                create a balanced, harmonious look.
              </Text>
            </View>

            <TouchableOpacity style={styles.tryOnButton} activeOpacity={0.85}>
              <Text style={styles.tryOnButtonText}>👁  Try Virtual Try-On</Text>
            </TouchableOpacity>

          </View>

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
    padding: 20,
    backgroundColor: '#1A0A12',
  },

  // ─────────── HEADER ───────────
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.35)',
    backgroundColor: 'rgba(200, 80, 122, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  backText: {
    fontSize: 20,
    color: '#C8507A',
    fontWeight: '400',
    lineHeight: 22,
  },
  headerContent: { flex: 1 },
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
  pageSubtitle: { fontSize: 12, color: '#A08090' },

  // ─────────── SPLIT ───────────
  split: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'stretch',
  },
  splitNarrow: { flexDirection: 'column' },

  // ── LEFT PANEL (carousel container) ──
  leftPanel: {
    flex: 1,
    height: 520,               // ✅ FIXED height, not minHeight
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#3D1830',
    position: 'relative',      // anchor for absolute children
  },
  leftPanelNarrow: {
    height: 380,               // ✅ FIXED height on mobile too
  },

  // ✅ Image fills the entire parent via absolute coordinates
  modelImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: 'rgba(26, 10, 18, 0.65)',
  },

  // Badge
  modelBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(26, 10, 18, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.5)',
  },
  modelBadgeEmoji: { fontSize: 12 },
  modelBadgeText: {
    fontSize: 11,
    color: '#FFF0F5',
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Arrows
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 10, 18, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLeft: { left: 14 },
  arrowRight: { right: 14 },
  arrowText: {
    fontSize: 24,
    color: '#FFF0F5',
    fontWeight: '300',
    lineHeight: 26,
    marginTop: -2,
  },

  // Dots
  dotsRow: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 26,
    minWidth: 26,
    borderRadius: 13,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 240, 245, 0.25)',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: {
    backgroundColor: '#C8507A',
    borderColor: 'rgba(255, 240, 245, 0.4)',
  },
  dotLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#FFF0F5',
  },

  // ── RIGHT PANEL ──
  rightPanel: { flex: 1, gap: 16 },
  rightPanelNarrow: { flex: undefined },

  descriptionCard: {
    backgroundColor: '#2A1020',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  descriptionLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: '#FFF0F5',
    lineHeight: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  sectionLine: { flex: 1, height: 1, backgroundColor: '#3D1830' },
  sectionTitle: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
  },

  framesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  frameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#2A1020',
    borderWidth: 1,
    borderColor: '#3D1830',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minWidth: isWide ? 150 : '48%',
  },
  frameIconRing: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.35)',
    backgroundColor: 'rgba(200, 80, 122, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frameEmoji: { fontSize: 14 },
  frameName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF0F5',
    flex: 1,
  },

  tipBox: {
    backgroundColor: 'rgba(200, 80, 122, 0.08)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.2)',
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C8507A',
    marginBottom: 6,
  },
  tipText: { fontSize: 12, color: '#A08090', lineHeight: 19 },
  tipHighlight: { color: '#FFF0F5', fontWeight: '600' },

  tryOnButton: {
    backgroundColor: '#C8507A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  tryOnButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF0F5',
    letterSpacing: 0.4,
  },
});