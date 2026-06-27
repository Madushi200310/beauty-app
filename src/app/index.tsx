import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      <View style={styles.pageBorder}>

        {/* Hero + Skin Tone Card side by side */}
        <View style={styles.heroRow}>

          {/* Left: Hero Text */}
          <View style={styles.heroText}>
            <Text style={styles.heroTag}>YOUR PERSONAL BEAUTY GUIDE</Text>
            <Text style={styles.heroTitle}>Glow Up{'\n'}Your{'\n'}Style ✨</Text>
            <Text style={styles.heroSub}>Discover colors that match your skin tone and style perfectly.</Text>
          </View>

          {/* Right: Skin Tone Card */}
          <TouchableOpacity style={styles.skinToneCard} onPress={() => router.push('/skinTone')}>
            <Text style={styles.skinToneEmoji}>🎨</Text>
            <Text style={styles.skinToneTitle}>Skin Tone{'\n'}Finder</Text>
            <Text style={styles.skinToneDesc}>Find your perfect shade and get personalized color picks.</Text>
            <View style={styles.skinToneBtn}>
              <Text style={styles.skinToneBtnText}>Explore →</Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>FEATURES</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* 2x2 Feature Cards Grid */}
        <View style={styles.cardGrid}>

          <View style={styles.cardRow}>
            <TouchableOpacity style={[styles.card, styles.cardPurple]} onPress={() => router.push('/colorMatch')}>
              <Text style={styles.cardEmoji}>👗</Text>
              <Text style={styles.cardTitle}>Color{'\n'}Matching</Text>
              <Text style={styles.cardDesc}>Match your clothing colors for a flawless outfit.</Text>
              <Text style={styles.cardArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, styles.cardRose]} onPress={() => router.push('/skinTone')}>
              <Text style={styles.cardEmoji}>💄</Text>
              <Text style={styles.cardTitle}>Makeup{'\n'}Colors</Text>
              <Text style={styles.cardDesc}>Lipstick, eyeshadow & foundation tailored to you.</Text>
              <Text style={styles.cardArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardRow}>
            <TouchableOpacity style={[styles.card, styles.cardDark]} onPress={() => router.push('/skinTone')}>
              <Text style={styles.cardEmoji}>👁</Text>
              <Text style={styles.cardTitle}>Contact{'\n'}Lens</Text>
              <Text style={styles.cardDesc}>Find lens colors that complement your skin tone.</Text>
              <Text style={styles.cardArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, styles.cardTeal]} onPress={() => router.push('/skinTone')}>
              <Text style={styles.cardEmoji}>👓</Text>
              <Text style={styles.cardTitle}>Spectacles{'\n'}Shape</Text>
              <Text style={styles.cardDesc}>Find the best frame shape for your face.</Text>
              <Text style={styles.cardArrow}>→</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 💗 for your beauty journey</Text>
        </View>

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

  // Hero Row
  heroRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    alignItems: 'stretch',
  },

  // Hero Text
  heroText: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  heroTag: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFF0F5',
    lineHeight: 36,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 12,
    color: '#A08090',
    lineHeight: 18,
  },

  // Skin Tone Card (right side of hero)
  skinToneCard: {
    flex: 1,
    backgroundColor: '#2A1020',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C8507A',
    justifyContent: 'space-between',
  },
  skinToneEmoji: { fontSize: 32, marginBottom: 8 },
  skinToneTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF0F5',
    marginBottom: 8,
    lineHeight: 24,
  },
  skinToneDesc: {
    fontSize: 11,
    color: '#A08090',
    lineHeight: 16,
    marginBottom: 14,
  },
  skinToneBtn: {
    backgroundColor: '#C8507A',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  skinToneBtnText: {
    color: '#FFF0F5',
    fontSize: 12,
    fontWeight: '700',
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#3D1830' },
  dividerText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
    marginHorizontal: 10,
  },

  // Card Grid
  cardGrid: { gap: 12 },
  cardRow: { flexDirection: 'row', gap: 12 },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  cardPurple: { backgroundColor: '#1A102A', borderColor: '#8050C8' },
  cardRose: { backgroundColor: '#2A1018', borderColor: '#C85080' },
  cardDark: { backgroundColor: '#101A2A', borderColor: '#5080C8' },
  cardTeal: { backgroundColor: '#0A1A1A', borderColor: '#508080' },

  cardEmoji: { fontSize: 28, marginBottom: 10 },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF0F5',
    marginBottom: 6,
    lineHeight: 20,
  },
  cardDesc: {
    fontSize: 11,
    color: '#A08090',
    lineHeight: 16,
    marginBottom: 12,
  },
  cardArrow: {
    fontSize: 16,
    color: '#C8507A',
    fontWeight: '700',
    alignSelf: 'flex-end',
  },

  // Footer
  footer: { alignItems: 'center', paddingTop: 24 },
  footerText: { fontSize: 12, color: '#3D1830' },
});