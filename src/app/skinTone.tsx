import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const getSkinToneInfo = (value: number) => {
  if (value < 15) return { name: 'Porcelain', color: '#FFE8D6', undertone: 'Cool' };
  if (value < 25) return { name: 'Fair', color: '#FDDBB4', undertone: 'Cool/Neutral' };
  if (value < 35) return { name: 'Fair Light', color: '#F9C89B', undertone: 'Neutral' };
  if (value < 45) return { name: 'Light', color: '#F5C5A3', undertone: 'Warm/Neutral' };
  if (value < 55) return { name: 'Light Medium', color: '#F0B27A', undertone: 'Warm' };
  if (value < 65) return { name: 'Medium', color: '#E8A87C', undertone: 'Warm' };
  if (value < 70) return { name: 'Medium Tan', color: '#D4956A', undertone: 'Warm' };
  if (value < 75) return { name: 'Tan', color: '#C68642', undertone: 'Warm' };
  if (value < 80) return { name: 'Deep Tan', color: '#B5713A', undertone: 'Warm/Neutral' };
  if (value < 85) return { name: 'Caramel', color: '#A0522D', undertone: 'Warm' };
  if (value < 90) return { name: 'Deep', color: '#8B4513', undertone: 'Cool/Warm' };
  if (value < 95) return { name: 'Rich Deep', color: '#7B3510', undertone: 'Cool' };
  return { name: 'Espresso', color: '#6B3A2A', undertone: 'Cool' };
};

const getRecommendations = (value: number) => {
  if (value < 35) return {
    clothes: [
      { name: 'Soft Pink', color: '#FFB6C1' },
      { name: 'Light Blue', color: '#ADD8E6' },
      { name: 'Lavender', color: '#E6E6FA' },
      { name: 'Mint', color: '#98FF98' },
      { name: 'Ivory', color: '#FFFFF0' },
      { name: 'Silver', color: '#C0C0C0' },
    ],
    lipstick: [
      { name: 'Nude Pink', color: '#E8B4B8' },
      { name: 'Rose', color: '#FF007F' },
      { name: 'Peach', color: '#FFCBA4' },
      { name: 'Berry', color: '#8B0057' },
      { name: 'Mauve', color: '#E0B0FF' },
    ],
    foundation: [
      { name: 'Porcelain', color: '#F8DCC8' },
      { name: 'Ivory', color: '#F5D5B8' },
      { name: 'Fair Beige', color: '#F0C8A8' },
    ],
    nailPolish: [
      { name: 'Lilac', color: '#C8A8E8' },
      { name: 'Baby Pink', color: '#FFB6C1' },
      { name: 'Nude', color: '#E8C8B8' },
      { name: 'Red', color: '#FF0000' },
      { name: 'White', color: '#FFFFFF' },
    ],
    eyeshadow: [
      { name: 'Champagne', color: '#F7E7CE' },
      { name: 'Soft Brown', color: '#C4A882' },
      { name: 'Pink', color: '#FFB6C1' },
      { name: 'Purple', color: '#800080' },
      { name: 'Silver', color: '#C0C0C0' },
    ],
    contactLens: [
      { name: 'Blue', color: '#4169E1' },
      { name: 'Green', color: '#228B22' },
      { name: 'Grey', color: '#808080' },
      { name: 'Hazel', color: '#8E7618' },
    ],
  };
  if (value < 60) return {
    clothes: [
      { name: 'Coral', color: '#FF7F50' },
      { name: 'Peach', color: '#FFDAB9' },
      { name: 'Warm White', color: '#FAF0E6' },
      { name: 'Sky Blue', color: '#87CEEB' },
      { name: 'Yellow', color: '#FFD700' },
      { name: 'Camel', color: '#C19A6B' },
    ],
    lipstick: [
      { name: 'Coral', color: '#FF6B6B' },
      { name: 'Warm Pink', color: '#FF69B4' },
      { name: 'Peach', color: '#FFCBA4' },
      { name: 'Brick Red', color: '#CB4154' },
      { name: 'Terracotta', color: '#E2725B' },
    ],
    foundation: [
      { name: 'Light Beige', color: '#F0C8A0' },
      { name: 'Warm Ivory', color: '#EEC8A0' },
      { name: 'Natural', color: '#E8B890' },
    ],
    nailPolish: [
      { name: 'Coral', color: '#FF7F50' },
      { name: 'Peach', color: '#FFDAB9' },
      { name: 'Gold', color: '#FFD700' },
      { name: 'Warm Red', color: '#CC3333' },
      { name: 'Orange', color: '#FFA500' },
    ],
    eyeshadow: [
      { name: 'Gold', color: '#FFD700' },
      { name: 'Peach', color: '#FFCBA4' },
      { name: 'Bronze', color: '#CD7F32' },
      { name: 'Copper', color: '#B87333' },
      { name: 'Warm Brown', color: '#964B00' },
    ],
    contactLens: [
      { name: 'Honey', color: '#C8A850' },
      { name: 'Hazel', color: '#8E7618' },
      { name: 'Green', color: '#228B22' },
      { name: 'Brown', color: '#8B4513' },
    ],
  };
  if (value < 78) return {
    clothes: [
      { name: 'Terracotta', color: '#E2725B' },
      { name: 'Olive Green', color: '#808000' },
      { name: 'Mustard', color: '#FFDB58' },
      { name: 'Rust', color: '#B7410E' },
      { name: 'Teal', color: '#008080' },
      { name: 'Burgundy', color: '#800020' },
    ],
    lipstick: [
      { name: 'Terracotta', color: '#E2725B' },
      { name: 'Warm Red', color: '#CC3333' },
      { name: 'Mauve', color: '#E0B0FF' },
      { name: 'Brown Red', color: '#AA4040' },
      { name: 'Nude Brown', color: '#A0785A' },
    ],
    foundation: [
      { name: 'Medium Beige', color: '#D4A574' },
      { name: 'Warm Sand', color: '#C8956C' },
      { name: 'Golden', color: '#C0874C' },
    ],
    nailPolish: [
      { name: 'Terracotta', color: '#E2725B' },
      { name: 'Olive', color: '#808000' },
      { name: 'Bronze', color: '#CD7F32' },
      { name: 'Deep Red', color: '#8B0000' },
      { name: 'Mustard', color: '#FFDB58' },
    ],
    eyeshadow: [
      { name: 'Bronze', color: '#CD7F32' },
      { name: 'Terracotta', color: '#E2725B' },
      { name: 'Gold', color: '#FFD700' },
      { name: 'Warm Brown', color: '#964B00' },
      { name: 'Copper', color: '#B87333' },
    ],
    contactLens: [
      { name: 'Honey', color: '#C8A850' },
      { name: 'Brown', color: '#8B4513' },
      { name: 'Amber', color: '#FFBF00' },
      { name: 'Dark Brown', color: '#5C3317' },
    ],
  };
  return {
    clothes: [
      { name: 'Bright White', color: '#FFFFFF' },
      { name: 'Royal Blue', color: '#4169E1' },
      { name: 'Fuchsia', color: '#FF00FF' },
      { name: 'Bright Yellow', color: '#FFFF00' },
      { name: 'Red', color: '#FF0000' },
      { name: 'Emerald', color: '#50C878' },
    ],
    lipstick: [
      { name: 'Deep Plum', color: '#4B0082' },
      { name: 'Rich Berry', color: '#8B0057' },
      { name: 'Bold Red', color: '#FF0000' },
      { name: 'Dark Brown', color: '#5C3317' },
      { name: 'Fuchsia', color: '#FF00FF' },
    ],
    foundation: [
      { name: 'Deep', color: '#784830' },
      { name: 'Rich', color: '#6B3020' },
      { name: 'Espresso', color: '#5C2810' },
    ],
    nailPolish: [
      { name: 'Fuchsia', color: '#FF00FF' },
      { name: 'Deep Red', color: '#8B0000' },
      { name: 'Royal Blue', color: '#4169E1' },
      { name: 'Gold', color: '#FFD700' },
      { name: 'Deep Plum', color: '#4B0082' },
    ],
    eyeshadow: [
      { name: 'Gold', color: '#FFD700' },
      { name: 'Deep Purple', color: '#4B0082' },
      { name: 'Royal Blue', color: '#4169E1' },
      { name: 'Copper', color: '#B87333' },
      { name: 'Fuchsia', color: '#FF00FF' },
    ],
    contactLens: [
      { name: 'Dark Brown', color: '#5C3317' },
      { name: 'Honey', color: '#C8A850' },
      { name: 'Grey', color: '#808080' },
      { name: 'Violet', color: '#8B00FF' },
    ],
  };
};

const lightColors = ['#FFFFFF','#FFFF00','#FFFFF0','#F7E7CE','#FFB6C1','#E6E6FA','#98FF98','#ADD8E6','#FFDAB9','#FAF0E6','#FFCBA4','#E8B4B8','#E0B0FF','#F8DCC8','#F5D5B8','#F0C8A8','#E8C8B8','#C8A8E8','#FFDB58'];

const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <View style={styles.swatch}>
    <View style={[styles.swatchColor, {
      backgroundColor: color,
      borderWidth: lightColors.includes(color) ? 1 : 0,
      borderColor: '#E0D0D8',
    }]} />
    <Text style={styles.swatchName}>{name}</Text>
  </View>
);

const CategoryBox = ({ emoji, title, items }: {
  emoji: string;
  title: string;
  items: { name: string; color: string }[];
}) => (
  <View style={styles.categoryBox}>
    <View style={styles.categoryHeader}>
      <Text style={styles.categoryEmoji}>{emoji}</Text>
      <Text style={styles.categoryTitle}>{title}</Text>
    </View>
    <View style={styles.swatchWrap}>
      {items.map((item, i) => (
        <ColorSwatch key={i} name={item.name} color={item.color} />
      ))}
    </View>
  </View>
);

export default function SkinToneScreen() {
  const [sliderValue, setSliderValue] = useState(20);
  const skinInfo = getSkinToneInfo(sliderValue);
  const rec = getRecommendations(sliderValue);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      {/* Page Title */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTag}>BEAUTY MATCH</Text>
        <Text style={styles.pageTitle}>Skin Tone Finder</Text>
      </View>

      {/* Three Column Layout */}
      <View style={styles.threeCol}>

        {/* ── Column 1: Skin Tone Picker ── */}
        <View style={styles.colLeft}>
          <Text style={styles.colLabel}>TONE</Text>

          {/* Preview circle */}
          <View style={[styles.toneCircle, { backgroundColor: skinInfo.color }]} />
          <Text style={styles.toneName}>{skinInfo.name}</Text>
          <View style={styles.undertonePill}>
            <Text style={styles.undertoneText}>{skinInfo.undertone}</Text>
          </View>

          {/* Vertical gradient bar */}
          <View style={styles.verticalGradientWrap}>
            <View style={styles.verticalGradient}>
              {Array.from({ length: 100 }, (_, i) => (
                <View
                  key={i}
                  style={[styles.gradientSlice, { backgroundColor: getSkinToneInfo(99 - i).color }]}
                />
              ))}
            </View>
            <Slider
              style={styles.verticalSlider}
              minimumValue={0}
              maximumValue={100}
              value={sliderValue}
              onValueChange={(v) => setSliderValue(Math.round(v))}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="#C8507A"
              inverted
            />
          </View>

          <View style={styles.toneScaleLabels}>
            <Text style={styles.toneScaleLabel}>Deep</Text>
            <Text style={styles.toneScaleLabel}>Fair</Text>
          </View>
        </View>

        {/* ── Column 2: Clothing, Foundation, Eyeshadow ── */}
        <View style={styles.colMid}>
          <Text style={styles.colLabel}>STYLE</Text>
          <CategoryBox emoji="👗" title="Clothing" items={rec.clothes} />
          <CategoryBox emoji="🧴" title="Foundation" items={rec.foundation} />
          <CategoryBox emoji="✨" title="Eyeshadow" items={rec.eyeshadow} />
        </View>

        {/* ── Column 3: Lipstick, Nail Polish, Contact Lens ── */}
        <View style={styles.colRight}>
          <Text style={styles.colLabel}>MAKEUP</Text>
          <CategoryBox emoji="💄" title="Lipstick" items={rec.lipstick} />
          <CategoryBox emoji="💅" title="Nail Polish" items={rec.nailPolish} />
          <CategoryBox emoji="👁" title="Contact Lens" items={rec.contactLens} />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0A12' },
  content: { paddingBottom: 48 },

  // Page Header
  pageHeader: { paddingHorizontal: 20, paddingTop: 36, paddingBottom: 20 },
  pageTag: { fontSize: 10, fontWeight: '700', letterSpacing: 3, color: '#C8507A', marginBottom: 6 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#FFF0F5', letterSpacing: -0.5 },

  // Three Column Layout
  threeCol: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 10,
    alignItems: 'flex-start',
  },

  // Column 1 — narrow skin tone
  colLeft: {
    width: 80,
    alignItems: 'center',
  },
  colLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#C8507A',
    marginBottom: 10,
  },
  toneCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#C8507A',
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  toneName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF0F5',
    textAlign: 'center',
    marginBottom: 6,
  },
  undertonePill: {
    backgroundColor: '#3D1830',
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 14,
  },
  undertoneText: { fontSize: 8, color: '#C8507A', fontWeight: '600', textAlign: 'center' },

  // Vertical Slider
  verticalGradientWrap: {
    height: 220,
    width: 40,
    alignItems: 'center',
    position: 'relative',
  },
  verticalGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 16,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  gradientSlice: { flex: 1 },
  verticalSlider: {
    width: 220,
    height: 40,
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
    top: 90,
  },
  toneScaleLabels: {
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toneScaleLabel: { fontSize: 9, color: '#A08090' },

  // Columns 2 & 3
  colMid: { flex: 1 },
  colRight: { flex: 1 },

  // Category Box
  categoryBox: {
    backgroundColor: '#2A1020',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryEmoji: { fontSize: 14, marginRight: 6 },
  categoryTitle: { fontSize: 12, fontWeight: '700', color: '#FFF0F5' },

  // Swatches
  swatchWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  swatch: { alignItems: 'center', width: 40 },
  swatchColor: {
    width: 34,
    height: 34,
    borderRadius: 10,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  swatchName: { fontSize: 8, color: '#A08090', textAlign: 'center', fontWeight: '500' },
});