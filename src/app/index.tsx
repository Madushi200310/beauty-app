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
// REUSABLE FEATURE CARD
// ============================================
type FeatureCardProps = {
  emoji: string;
  title: string;
  desc: string;
  accent: string;
  bg: string;
  onPress: () => void;
};

function FeatureCard({ emoji, title, desc, accent, bg, onPress }: FeatureCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bg, borderColor: accent }]}
      onPress={onPress}
      activeOpacity={0.85}>

      <View style={[styles.iconRing, { borderColor: accent }]}>
        <Text style={styles.icon}>{emoji}</Text>
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>

      <View style={styles.cardFooter}>
        <Text style={[styles.cardArrow, { color: accent }]}>→</Text>
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

        {/* ─────────── HERO ─────────── */}
        <View style={styles.hero}>
          <Text style={styles.heroTag}>YOUR PERSONAL BEAUTY GUIDE</Text>

          <Text style={styles.heroTitle}>
            Glow Up{'\n'}Your Style ✨
          </Text>

          <Text style={styles.heroSub}>
            Discover colors that match your skin tone and elevate every look —
            from makeup to wardrobe.
          </Text>

          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => router.push('/skinTone')}
            activeOpacity={0.85}>
            <Text style={styles.heroBtnText}>Start with Skin Tone →</Text>
          </TouchableOpacity>
        </View>

        {/* ─────────── PRIMARY CTA: SKIN TONE ─────────── */}
        <TouchableOpacity
          style={styles.primaryCard}
          onPress={() => router.push('/skinTone')}
          activeOpacity={0.85}>
          <View style={styles.primaryLeft}>
            <View style={styles.primaryIconRing}>
              <Text style={styles.primaryIcon}>🎨</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.primaryTitle}>Skin Tone Finder</Text>
              <Text style={styles.primaryDesc}>
                Find your perfect shade and get personalized color picks.
              </Text>
            </View>
          </View>
          <View style={styles.primaryCta}>
            <Text style={styles.primaryCtaText}>Explore →</Text>
          </View>
        </TouchableOpacity>

        {/* ─────────── DIVIDER ─────────── */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>FEATURES</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* ─────────── FEATURE GRID ─────────── */}
        <View style={[styles.grid, !isWide && styles.gridNarrow]}>
          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="👗"
              title="Color Matching"
              desc="Match your clothing colors for a flawless outfit."
              accent="#8050C8"
              bg="#1A102A"
              onPress={() => router.push('/colorMatch')}
            />
          </View>

          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="💄"
              title="Makeup Colors"
              desc="Lipstick, eyeshadow & foundation tailored to you."
              accent="#C85080"
              bg="#2A1018"
              onPress={() => router.push('/skinTone')}
            />
          </View>

          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="👁"
              title="Contact Lens"
              desc="Find lens colors that complement your skin tone."
              accent="#5080C8"
              bg="#101A2A"
              onPress={() => router.push('/skinTone')}
            />
          </View>

          <View style={styles.cardWrapper}>
            <FeatureCard
              emoji="👓"
              title="Face Shape"
              desc="Find the best frame shape for your face."
              accent="#508080"
              bg="#0A1A1A"
              onPress={() => router.push('/faceShape')}
            />
          </View>
        </View>

        {/* ─────────── FOOTER ─────────── */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>Made with 💗 for your beauty journey</Text>
        </View>

      </View>
    </ScrollView>
  );
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A12',
  },
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

  // ─────────── HERO ───────────
  hero: {
    marginBottom: 28,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#C8507A',
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: isWide ? 44 : 34,
    fontWeight: '800',
    color: '#FFF0F5',
    lineHeight: isWide ? 52 : 42,
    letterSpacing: -1,
    marginBottom: 14,
  },
  heroSub: {
    fontSize: 14,
    color: '#A08090',
    lineHeight: 22,
    maxWidth: 520,
    marginBottom: 22,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#C8507A',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  heroBtnText: {
    color: '#FFF0F5',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  // ─────────── PRIMARY SKIN TONE CARD ───────────
  primaryCard: {
    flexDirection: isWide ? 'row' : 'column',
    alignItems: isWide ? 'center' : 'stretch',
    justifyContent: 'space-between',
    gap: 16,
    backgroundColor: '#2A1020',
    borderWidth: 1,
    borderColor: '#C8507A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  primaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  primaryIconRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.4)',
    backgroundColor: 'rgba(200, 80, 122, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryIcon: {
    fontSize: 26,
  },
  primaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF0F5',
    marginBottom: 4,
  },
  primaryDesc: {
    fontSize: 12,
    color: '#A08090',
    lineHeight: 17,
  },
  primaryCta: {
    backgroundColor: '#C8507A',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryCtaText: {
    color: '#FFF0F5',
    fontSize: 13,
    fontWeight: '700',
  },

  // ─────────── DIVIDER ───────────
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3D1830',
  },
  dividerText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#C8507A',
    marginHorizontal: 12,
  },

  // ─────────── FEATURE GRID ───────────
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 24,
  },
  gridNarrow: {
    flexDirection: 'column',
  },
  cardWrapper: {
    flex: isWide ? 1 : undefined,
    minWidth: isWide ? 220 : '100%',
    width: isWide ? undefined : '100%',
  },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    height: 200,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  iconRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  icon: {
    fontSize: 22,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF0F5',
    marginBottom: 6,
    lineHeight: 21,
  },
  cardDesc: {
    fontSize: 11,
    color: '#A08090',
    lineHeight: 16,
    flex: 1,
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  cardArrow: {
    fontSize: 18,
    fontWeight: '700',
  },

  // ─────────── FOOTER ───────────
  footer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  footerLine: {
    width: 40,
    height: 1,
    backgroundColor: '#3D1830',
    marginBottom: 14,
  },
  footerText: {
    fontSize: 11,
    color: '#5A2838',
    letterSpacing: 0.4,
  },
});