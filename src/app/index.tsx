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
const CONTENT_MAX = 1180;

// ============================================
// FEATURE CARD (small tile)
// ============================================
type FeatureCardProps = {
  emoji: string;
  title: string;
  desc: string;
  accent: string;
  bg: string;
  tag: string;
  onPress: () => void;
};

function FeatureCard({
  emoji,
  title,
  desc,
  accent,
  bg,
  tag,
  onPress,
}: FeatureCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bg, borderColor: accent + '55' }]}
      onPress={onPress}
      activeOpacity={0.85}>

      {/* Top row: icon ring + tag */}
      <View style={styles.cardTopRow}>
        <View
          style={[
            styles.iconRing,
            {
              borderColor: accent + '88',
              backgroundColor: accent + '18',
            },
          ]}>
          <Text style={styles.icon}>{emoji}</Text>
        </View>

        <Text style={[styles.cardTag, { color: accent }]}>{tag}</Text>
      </View>

      {/* Bottom: title + desc + arrow */}
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {desc}
        </Text>
      </View>

      <View style={styles.cardArrowRow}>
        <View style={[styles.cardArrowCircle, { borderColor: accent + '88' }]}>
          <Text style={[styles.cardArrow, { color: accent }]}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ============================================
// HOME SCREEN
// ============================================
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      <View style={styles.pageBorder}>

        {/* ═══════════ EDITORIAL HERO ═══════════ */}
        <View style={styles.hero}>
          {/* Dot grid accent (top-right) */}
          <View style={styles.dotGrid} pointerEvents="none">
            {Array.from({ length: 12 }).map((_, i) => (
              <View key={i} style={styles.dotGridDot} />
            ))}
          </View>

          <View style={styles.heroTopRow}>
            <View style={styles.heroTagPill}>
              <Text style={styles.heroTagText}>
                ● YOUR PERSONAL BEAUTY GUIDE
              </Text>
            </View>

            <Text style={styles.heroIssue}>ISSUE 01 · 2026</Text>
          </View>

          <Text style={styles.heroTitle}>
            Glow Up{'\n'}
            Your Style{' '}
            <Text style={styles.heroSparkle}>✨</Text>
          </Text>

          <Text style={styles.heroSub}>
            A curated color guide for your skin tone — from wardrobe to
            makeup. Discover what truly flatters you.
          </Text>

          <View style={styles.heroCtaRow}>
            <TouchableOpacity
              style={styles.heroBtnPrimary}
              onPress={() => router.push('/skinTone')}
              activeOpacity={0.85}>
              <Text style={styles.heroBtnPrimaryText}>
                Start with Skin Tone
              </Text>
              <Text style={styles.heroBtnPrimaryArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.heroBtnGhost}
              onPress={() => router.push('/colorMatch')}
              activeOpacity={0.85}>
              <Text style={styles.heroBtnGhostText}>Explore Colors</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ═══════════ SPOTLIGHT: SKIN TONE ═══════════ */}
        <TouchableOpacity
          style={styles.spotlight}
          onPress={() => router.push('/skinTone')}
          activeOpacity={0.9}>

          {/* Left: content */}
          <View style={styles.spotlightContent}>
            <View style={styles.spotlightEyebrowRow}>
              <View style={styles.spotlightDot} />
              <Text style={styles.spotlightEyebrow}>START HERE</Text>
            </View>

            <Text style={styles.spotlightTitle}>
              Skin Tone{'\n'}Finder
            </Text>

            <Text style={styles.spotlightDesc}>
              Move the slider to your shade and unlock a palette tailored to
              your undertone.
            </Text>

            <View style={styles.spotlightBtn}>
              <Text style={styles.spotlightBtnText}>Find My Shade</Text>
              <Text style={styles.spotlightBtnArrow}>→</Text>
            </View>
          </View>

          {/* Right: decorative gradient stack */}
          <View style={styles.spotlightVisual} pointerEvents="none">
            <View style={[styles.swatch, { backgroundColor: '#FFE8D6' }]} />
            <View style={[styles.swatch, { backgroundColor: '#F0B27A' }]} />
            <View style={[styles.swatch, { backgroundColor: '#A0522D' }]} />
            <View style={[styles.swatch, { backgroundColor: '#5C2810' }]} />
            <Text style={styles.swatchLabel}>50 shades</Text>
          </View>
        </TouchableOpacity>

        {/* ═══════════ SECTION HEADER ═══════════ */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Text style={styles.sectionIndex}>02</Text>
            <View>
              <Text style={styles.sectionTag}>EXPLORE THE TOOLKIT</Text>
              <Text style={styles.sectionTitle}>More Features</Text>
            </View>
          </View>
          <View style={styles.sectionHeaderLine} />
        </View>

        {/* ═══════════ FEATURE GRID ═══════════ */}
        <View style={[styles.grid, !isWide && styles.gridNarrow]}>
          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="👗"
              title="Color Matching"
              desc="Pair wardrobe colors for a flawless look."
              accent="#B57CE0"
              bg="#1A102A"
              tag="STYLE"
              onPress={() => router.push('/colorMatch')}
            />
          </View>

          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="💄"
              title="Makeup Colors"
              desc="Lip, eye & base shades tailored to you."
              accent="#E87BA0"
              bg="#2A1018"
              tag="BEAUTY"
              onPress={() => router.push('/skinTone')}
            />
          </View>

          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="👁"
              title="Contact Lens"
              desc="Lens tones that complement your skin."
              accent="#7CA5E0"
              bg="#101A2A"
              tag="EYES"
              onPress={() => router.push('/skinTone')}
            />
          </View>

          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="👓"
              title="Face Shape"
              desc="Discover the best frames for you."
              accent="#7CC6C6"
              bg="#0A1A1A"
              tag="ACCESSORY"
              onPress={() => router.push('/faceShape')}
            />
          </View>
        </View>

        {/* ═══════════ FOOTER ═══════════ */}
        <View style={styles.footer}>
          <View style={styles.footerDot} />
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>
            Made with 💗 for your beauty journey
          </Text>
          <View style={styles.footerLine} />
          <View style={styles.footerDot} />
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
    padding: isWide ? 32 : 20,
    backgroundColor: '#1A0A12',
  },

  // ═══════════ HERO ═══════════
  hero: {
    position: 'relative',
    paddingVertical: 12,
    marginBottom: 32,
  },
  dotGrid: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 84,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    opacity: 0.35,
  },
  dotGridDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#C8507A',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
    flexWrap: 'wrap',
    gap: 12,
  },
  heroTagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.4)',
    backgroundColor: 'rgba(200, 80, 122, 0.08)',
  },
  heroTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
  },
  heroIssue: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#5A2838',
  },
  heroTitle: {
    fontSize: isWide ? 60 : 42,
    fontWeight: '800',
    color: '#FFF0F5',
    lineHeight: isWide ? 68 : 50,
    letterSpacing: -1.8,
    marginBottom: 18,
  },
  heroSparkle: {
    fontSize: isWide ? 48 : 34,
  },
  heroSub: {
    fontSize: 14,
    color: '#A08090',
    lineHeight: 22,
    maxWidth: 560,
    marginBottom: 26,
  },
  heroCtaRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  heroBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#C8507A',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
    boxShadow: '0px 8px 20px rgba(200, 80, 122, 0.35)',
    elevation: 6,
  },
  heroBtnPrimaryText: {
    color: '#FFF0F5',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  heroBtnPrimaryArrow: {
    color: '#FFF0F5',
    fontSize: 15,
    fontWeight: '700',
  },
  heroBtnGhost: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.4)',
    backgroundColor: 'rgba(200, 80, 122, 0.05)',
  },
  heroBtnGhostText: {
    color: '#C8507A',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  // ═══════════ SPOTLIGHT ═══════════
  spotlight: {
    flexDirection: isWide ? 'row' : 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 20,
    backgroundColor: '#2A1020',
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.5)',
    borderRadius: 24,
    padding: isWide ? 28 : 22,
    marginBottom: 36,
    overflow: 'hidden',
    position: 'relative',
  },
  spotlightContent: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  spotlightEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  spotlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C8507A',
  },
  spotlightEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: '#C8507A',
  },
  spotlightTitle: {
    fontSize: isWide ? 36 : 28,
    fontWeight: '800',
    color: '#FFF0F5',
    lineHeight: isWide ? 42 : 34,
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  spotlightDesc: {
    fontSize: 13,
    color: '#A08090',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 400,
  },
  spotlightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#C8507A',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },
  spotlightBtnText: {
    color: '#FFF0F5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  spotlightBtnArrow: {
    color: '#FFF0F5',
    fontSize: 14,
    fontWeight: '700',
  },
  spotlightVisual: {
    flexDirection: isWide ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minWidth: isWide ? 180 : undefined,
    paddingVertical: isWide ? 0 : 8,
  },
  swatch: {
    width: isWide ? 160 : 60,
    height: isWide ? 44 : 60,
    borderRadius: isWide ? 12 : 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 240, 245, 0.15)',
  },
  swatchLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#A08090',
    marginTop: isWide ? 8 : 0,
    marginLeft: isWide ? 0 : 8,
  },

  // ═══════════ SECTION HEADER ═══════════
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  sectionIndex: {
    fontSize: 28,
    fontWeight: '800',
    color: 'rgba(200, 80, 122, 0.35)',
    letterSpacing: -1,
  },
  sectionTag: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: '#C8507A',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF0F5',
    letterSpacing: -0.3,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3D1830',
  },

  // ═══════════ FEATURE GRID ═══════════
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 32,
  },
  gridNarrow: { flexDirection: 'column' },
  cardWrapper: {
    flex: isWide ? 1 : undefined,
    minWidth: isWide ? 230 : '100%',
    width: isWide ? undefined : '100%',
  },

  // ═══════════ FEATURE CARD ═══════════
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    minHeight: 220,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  iconRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 22 },
  cardTag: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFF0F5',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  cardDesc: {
    fontSize: 12,
    color: '#A08090',
    lineHeight: 17,
  },
  cardArrowRow: {
    alignItems: 'flex-end',
    marginTop: 14,
  },
  cardArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardArrow: {
    fontSize: 15,
    fontWeight: '700',
  },

  // ═══════════ FOOTER ═══════════
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 8,
  },
  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3D1830',
    maxWidth: 80,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C8507A',
  },
  footerText: {
    fontSize: 11,
    color: '#5A2838',
    letterSpacing: 0.4,
  },
});