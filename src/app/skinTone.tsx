import Slider from '@react-native-community/slider';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebase';

const getSkinToneInfo = (value: number) => {
  if (value < 10) return { name: 'Porcelain', color: '#FFE8D6', undertone: 'Cool' };
  if (value < 20) return { name: 'Fair', color: '#FDDBB4', undertone: 'Cool/Neutral' };
  if (value < 30) return { name: 'Fair Light', color: '#F9C89B', undertone: 'Neutral' };
  if (value < 40) return { name: 'Light', color: '#F5C5A3', undertone: 'Warm/Neutral' };
  if (value < 50) return { name: 'Light Medium', color: '#F0B27A', undertone: 'Warm' };
  if (value < 58) return { name: 'Medium', color: '#E8A87C', undertone: 'Warm' };
  if (value < 65) return { name: 'Medium Tan', color: '#D4956A', undertone: 'Warm' };
  if (value < 72) return { name: 'Tan', color: '#C68642', undertone: 'Warm' };
  if (value < 78) return { name: 'Deep Tan', color: '#B5713A', undertone: 'Warm/Neutral' };
  if (value < 84) return { name: 'Caramel', color: '#A0522D', undertone: 'Warm' };
  if (value < 89) return { name: 'Deep', color: '#8B4513', undertone: 'Cool/Warm' };
  if (value < 94) return { name: 'Rich Deep', color: '#7B3510', undertone: 'Cool' };
  return { name: 'Espresso', color: '#6B3A2A', undertone: 'Cool' };
};

const getRecommendations = (value: number) => {
  if (value < 30) return {
    clothes: {
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
      colors: [
        { name: 'Soft Pink', color: '#FFB6C1' },
        { name: 'Light Blue', color: '#ADD8E6' },
        { name: 'Lavender', color: '#E6E6FA' },
        { name: 'Mint', color: '#98FF98' },
        { name: 'Ivory', color: '#FFFFF0' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'White', color: '#FFFFFF' },
        { name: 'Blush', color: '#FFE4E1' },
      ],
    },
    lipstick: {
      image: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&q=80',
      colors: [
        { name: 'Nude Pink', color: '#E8B4B8' },
        { name: 'Rose', color: '#FF007F' },
        { name: 'Peach', color: '#FFCBA4' },
        { name: 'Berry', color: '#8B0057' },
        { name: 'Mauve', color: '#E0B0FF' },
        { name: 'Coral', color: '#FF6B6B' },
        { name: 'Cherry', color: '#DE3163' },
        { name: 'Pink', color: '#FF69B4' },
      ],
    },
    foundation: {
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80',
      colors: [
        { name: 'Porcelain', color: '#F8DCC8' },
        { name: 'Ivory', color: '#F5D5B8' },
        { name: 'Fair Beige', color: '#F0C8A8' },
        { name: 'Light', color: '#ECC0A0' },
        { name: 'Shell', color: '#F2D0B0' },
        { name: 'Nude', color: '#EAC4A0' },
      ],
    },
    nailPolish: {
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
      colors: [
        { name: 'Lilac', color: '#C8A8E8' },
        { name: 'Baby Pink', color: '#FFB6C1' },
        { name: 'Nude', color: '#E8C8B8' },
        { name: 'Red', color: '#FF0000' },
        { name: 'White', color: '#FFFFFF' },
        { name: 'Lavender', color: '#E6E6FA' },
        { name: 'Rose', color: '#FF007F' },
        { name: 'Mint', color: '#98FF98' },
      ],
    },
    eyeshadow: {
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
      colors: [
        { name: 'Champagne', color: '#F7E7CE' },
        { name: 'Soft Brown', color: '#C4A882' },
        { name: 'Pink', color: '#FFB6C1' },
        { name: 'Purple', color: '#800080' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'Rose Gold', color: '#B76E79' },
        { name: 'Lilac', color: '#C8A8E8' },
        { name: 'Taupe', color: '#8B7355' },
      ],
    },
    contactLens: {
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80',
      colors: [
        { name: 'Blue', color: '#4169E1' },
        { name: 'Green', color: '#228B22' },
        { name: 'Grey', color: '#808080' },
        { name: 'Hazel', color: '#8E7618' },
        { name: 'Violet', color: '#8B00FF' },
        { name: 'Aqua', color: '#00FFFF' },
      ],
    },
  };
  if (value < 58) return {
    clothes: {
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
      colors: [
        { name: 'Coral', color: '#FF7F50' },
        { name: 'Peach', color: '#FFDAB9' },
        { name: 'Warm White', color: '#FAF0E6' },
        { name: 'Sky Blue', color: '#87CEEB' },
        { name: 'Yellow', color: '#FFD700' },
        { name: 'Camel', color: '#C19A6B' },
        { name: 'Orange', color: '#FFA500' },
        { name: 'Cream', color: '#FFFDD0' },
      ],
    },
    lipstick: {
      image: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&q=80',
      colors: [
        { name: 'Coral', color: '#FF6B6B' },
        { name: 'Warm Pink', color: '#FF69B4' },
        { name: 'Peach', color: '#FFCBA4' },
        { name: 'Brick Red', color: '#CB4154' },
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Mango', color: '#FF8C00' },
        { name: 'Salmon', color: '#FA8072' },
        { name: 'Nude', color: '#D4A88A' },
      ],
    },
    foundation: {
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80',
      colors: [
        { name: 'Light Beige', color: '#F0C8A0' },
        { name: 'Warm Ivory', color: '#EEC8A0' },
        { name: 'Natural', color: '#E8B890' },
        { name: 'Sand', color: '#E4B080' },
        { name: 'Bisque', color: '#E8C090' },
        { name: 'Golden', color: '#DCA870' },
      ],
    },
    nailPolish: {
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
      colors: [
        { name: 'Coral', color: '#FF7F50' },
        { name: 'Peach', color: '#FFDAB9' },
        { name: 'Gold', color: '#FFD700' },
        { name: 'Warm Red', color: '#CC3333' },
        { name: 'Orange', color: '#FFA500' },
        { name: 'Nude', color: '#E8C090' },
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Copper', color: '#B87333' },
      ],
    },
    eyeshadow: {
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
      colors: [
        { name: 'Gold', color: '#FFD700' },
        { name: 'Peach', color: '#FFCBA4' },
        { name: 'Bronze', color: '#CD7F32' },
        { name: 'Copper', color: '#B87333' },
        { name: 'Warm Brown', color: '#964B00' },
        { name: 'Champagne', color: '#F7E7CE' },
        { name: 'Amber', color: '#FFBF00' },
        { name: 'Coral', color: '#FF7F50' },
      ],
    },
    contactLens: {
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80',
      colors: [
        { name: 'Honey', color: '#C8A850' },
        { name: 'Hazel', color: '#8E7618' },
        { name: 'Green', color: '#228B22' },
        { name: 'Brown', color: '#8B4513' },
        { name: 'Amber', color: '#FFBF00' },
        { name: 'Auburn', color: '#922B21' },
      ],
    },
  };
  if (value < 78) return {
    clothes: {
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
      colors: [
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Olive', color: '#808000' },
        { name: 'Mustard', color: '#FFDB58' },
        { name: 'Rust', color: '#B7410E' },
        { name: 'Teal', color: '#008080' },
        { name: 'Burgundy', color: '#800020' },
        { name: 'Forest', color: '#228B22' },
        { name: 'Burnt Orange', color: '#CC5500' },
      ],
    },
    lipstick: {
      image: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&q=80',
      colors: [
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Warm Red', color: '#CC3333' },
        { name: 'Mauve', color: '#E0B0FF' },
        { name: 'Brown Red', color: '#AA4040' },
        { name: 'Nude Brown', color: '#A0785A' },
        { name: 'Brick', color: '#CB4154' },
        { name: 'Cinnamon', color: '#D2691E' },
        { name: 'Wine', color: '#722F37' },
      ],
    },
    foundation: {
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80',
      colors: [
        { name: 'Medium Beige', color: '#D4A574' },
        { name: 'Warm Sand', color: '#C8956C' },
        { name: 'Golden', color: '#C0874C' },
        { name: 'Honey', color: '#B8784C' },
        { name: 'Caramel', color: '#B06840' },
        { name: 'Amber', color: '#A85830' },
      ],
    },
    nailPolish: {
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
      colors: [
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Olive', color: '#808000' },
        { name: 'Bronze', color: '#CD7F32' },
        { name: 'Deep Red', color: '#8B0000' },
        { name: 'Mustard', color: '#FFDB58' },
        { name: 'Burgundy', color: '#800020' },
        { name: 'Rust', color: '#B7410E' },
        { name: 'Forest', color: '#228B22' },
      ],
    },
    eyeshadow: {
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
      colors: [
        { name: 'Bronze', color: '#CD7F32' },
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Gold', color: '#FFD700' },
        { name: 'Warm Brown', color: '#964B00' },
        { name: 'Copper', color: '#B87333' },
        { name: 'Olive', color: '#808000' },
        { name: 'Rust', color: '#B7410E' },
        { name: 'Amber', color: '#FFBF00' },
      ],
    },
    contactLens: {
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80',
      colors: [
        { name: 'Honey', color: '#C8A850' },
        { name: 'Brown', color: '#8B4513' },
        { name: 'Amber', color: '#FFBF00' },
        { name: 'Dark Brown', color: '#5C3317' },
        { name: 'Hazel', color: '#8E7618' },
        { name: 'Green', color: '#228B22' },
      ],
    },
  };
  return {
    clothes: {
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
      colors: [
        { name: 'Bright White', color: '#FFFFFF' },
        { name: 'Royal Blue', color: '#4169E1' },
        { name: 'Fuchsia', color: '#FF00FF' },
        { name: 'Yellow', color: '#FFFF00' },
        { name: 'Red', color: '#FF0000' },
        { name: 'Emerald', color: '#50C878' },
        { name: 'Orange', color: '#FFA500' },
        { name: 'Cobalt', color: '#0047AB' },
      ],
    },
    lipstick: {
      image: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=400&q=80',
      colors: [
        { name: 'Deep Plum', color: '#4B0082' },
        { name: 'Rich Berry', color: '#8B0057' },
        { name: 'Bold Red', color: '#FF0000' },
        { name: 'Dark Brown', color: '#5C3317' },
        { name: 'Fuchsia', color: '#FF00FF' },
        { name: 'Wine', color: '#722F37' },
        { name: 'Mulberry', color: '#C54B8C' },
        { name: 'Raisin', color: '#59263B' },
      ],
    },
    foundation: {
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80',
      colors: [
        { name: 'Deep', color: '#784830' },
        { name: 'Rich', color: '#6B3020' },
        { name: 'Espresso', color: '#5C2810' },
        { name: 'Mahogany', color: '#5C3010' },
        { name: 'Ebony', color: '#4A2010' },
        { name: 'Walnut', color: '#532810' },
      ],
    },
    nailPolish: {
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
      colors: [
        { name: 'Fuchsia', color: '#FF00FF' },
        { name: 'Deep Red', color: '#8B0000' },
        { name: 'Royal Blue', color: '#4169E1' },
        { name: 'Gold', color: '#FFD700' },
        { name: 'Deep Plum', color: '#4B0082' },
        { name: 'Emerald', color: '#50C878' },
        { name: 'Orange', color: '#FFA500' },
        { name: 'Hot Pink', color: '#FF69B4' },
      ],
    },
    eyeshadow: {
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
      colors: [
        { name: 'Gold', color: '#FFD700' },
        { name: 'Deep Purple', color: '#4B0082' },
        { name: 'Royal Blue', color: '#4169E1' },
        { name: 'Copper', color: '#B87333' },
        { name: 'Fuchsia', color: '#FF00FF' },
        { name: 'Bronze', color: '#CD7F32' },
        { name: 'Emerald', color: '#50C878' },
        { name: 'Plum', color: '#8E4585' },
      ],
    },
    contactLens: {
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80',
      colors: [
        { name: 'Dark Brown', color: '#5C3317' },
        { name: 'Honey', color: '#C8A850' },
        { name: 'Grey', color: '#808080' },
        { name: 'Violet', color: '#8B00FF' },
        { name: 'Green', color: '#228B22' },
        { name: 'Blue', color: '#4169E1' },
      ],
    },
  };
};

const lightColors = ['#FFFFFF','#FFFF00','#FFFFF0','#F7E7CE','#FFB6C1','#E6E6FA','#98FF98','#ADD8E6','#FFDAB9','#FAF0E6','#FFCBA4','#E8B4B8','#E0B0FF','#F8DCC8','#F5D5B8','#F0C8A8','#E8C8B8','#C8A8E8','#FFDB58','#FFFDD0','#FFE4E1'];

const CategoryCard = ({
  emoji, title, image, colors,
}: {
  emoji: string;
  title: string;
  image: string;
  colors: { name: string; color: string }[];
}) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
    <View style={styles.cardBody}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardEmoji}>{emoji}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.swatchRow}>
        {colors.map((item, i) => (
          <View key={i} style={[styles.swatch, {
            backgroundColor: item.color,
            borderWidth: lightColors.includes(item.color) ? 1 : 0,
            borderColor: '#555',
          }]} />
        ))}
      </View>
    </View>
  </View>
);

export default function SkinToneScreen() {
  const [sliderValue, setSliderValue] = useState(20);
  const [gender, setGender] = useState<string | null>(null);
  const skinInfo = getSkinToneInfo(sliderValue);
  const rec = getRecommendations(sliderValue);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, 'users', user.uid));
          if (docSnap.exists()) {
            setGender(docSnap.data().gender);
          }
        } catch (e) {
          console.log('Error fetching user gender', e);
        }
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      {/* Page Border */}
      <View style={styles.pageBorder}>

        {/* Page Header */}
        <Text style={styles.pageTag}>BEAUTY MATCH</Text>
        <Text style={styles.pageTitle}>Skin Tone Finder</Text>

        {/* Gender Badge */}
        {gender === 'male' && (
          <View style={styles.genderBadge}>
            <Text style={styles.genderBadgeText}>👨 Male profile — lipstick & nail polish hidden</Text>
          </View>
        )}

        {/* Skin Tone Selector */}
        <View style={styles.selectorCard}>
          <View style={styles.toneRow}>
            <View style={[styles.toneCircle, { backgroundColor: skinInfo.color }]} />
            <View style={styles.toneInfo}>
              <Text style={styles.toneName}>{skinInfo.name}</Text>
              <Text style={styles.toneHint}>Drag to find your tone</Text>
            </View>
          </View>
          <View style={styles.gradientWrap}>
            <View style={styles.gradientBar}>
              {Array.from({ length: 100 }, (_, i) => (
                <View key={i} style={[styles.gradientSlice, { backgroundColor: getSkinToneInfo(i).color }]} />
              ))}
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sliderValue}
              onValueChange={(v) => setSliderValue(Math.round(v))}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="#C8507A"
            />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>YOUR PALETTE</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* 2 Column Grid */}
        <View style={styles.grid}>
          <View style={styles.col}>
            <CategoryCard emoji="👗" title="Clothing" image={rec.clothes.image} colors={rec.clothes.colors} />
            <CategoryCard emoji="🧴" title="Foundation" image={rec.foundation.image} colors={rec.foundation.colors} />
            <CategoryCard emoji="✨" title="Eyeshadow" image={rec.eyeshadow.image} colors={rec.eyeshadow.colors} />
          </View>
          <View style={styles.col}>
            {gender !== 'male' && (
              <CategoryCard emoji="💄" title="Lipstick" image={rec.lipstick.image} colors={rec.lipstick.colors} />
            )}
            {gender !== 'male' && (
              <CategoryCard emoji="💅" title="Nail Polish" image={rec.nailPolish.image} colors={rec.nailPolish.colors} />
            )}
            <CategoryCard emoji="👁" title="Contact Lens" image={rec.contactLens.image} colors={rec.contactLens.colors} />
          </View>
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

  pageTag: { fontSize: 10, fontWeight: '700', letterSpacing: 3, color: '#C8507A', marginBottom: 4 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: '#FFF0F5', marginBottom: 16, letterSpacing: -0.5 },

  // Gender Badge
  genderBadge: {
    backgroundColor: '#2A1020',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  genderBadgeText: { fontSize: 12, color: '#A08090' },

  // Selector
  selectorCard: {
    backgroundColor: '#2A1020',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  toneRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  toneCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#C8507A',
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  toneInfo: { marginLeft: 14 },
  toneName: { fontSize: 20, fontWeight: '700', color: '#FFF0F5' },
  toneHint: { fontSize: 12, color: '#A08090', marginTop: 2 },

  gradientWrap: {},
  gradientBar: { flexDirection: 'row', height: 16, borderRadius: 8, overflow: 'hidden' },
  gradientSlice: { flex: 1 },
  slider: { width: '100%', height: 36, marginTop: -8 },

  // Divider
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#3D1830' },
  dividerText: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: '#C8507A', marginHorizontal: 10 },

  // Grid
  grid: { flexDirection: 'row', gap: 10 },
  col: { flex: 1, gap: 10 },

  // Card
  card: {
    backgroundColor: '#2A1020',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  cardImage: { width: '100%', height: 100 },
  cardBody: { padding: 10 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardEmoji: { fontSize: 14, marginRight: 6 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#FFF0F5' },
  swatchRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  swatch: {
    width: 22,
    height: 22,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});