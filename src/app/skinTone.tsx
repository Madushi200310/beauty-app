import Slider from '@react-native-community/slider';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebase';

const { width } = Dimensions.get('window');

// ============================================
// HELPER FUNCTIONS
// ============================================

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
        { name: 'Baby Blue', color: '#89CFF0' },
        { name: 'Rose', color: '#FF007F' },
        { name: 'Peach', color: '#FFDAB9' },
        { name: 'Lilac', color: '#C8A8E8' },
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
        { name: 'Blush', color: '#FFB6C1' },
        { name: 'Warm Nude', color: '#D4A88A' },
        { name: 'Soft Rose', color: '#E8A898' },
        { name: 'Baby Pink', color: '#FFB6C1' },
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
        { name: 'Alabaster', color: '#F0E0D0' },
        { name: 'Cream', color: '#F5E6D3' },
        { name: 'Rose Ivory', color: '#EED5C8' },
        { name: 'Warm Ivory', color: '#EEC8A0' },
        { name: 'Natural', color: '#E8B890' },
        { name: 'Sand', color: '#E4B080' },
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
        { name: 'Coral', color: '#FF7F50' },
        { name: 'Peach', color: '#FFDAB9' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'Gold', color: '#FFD700' },
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
        { name: 'Mauve', color: '#E0B0FF' },
        { name: 'Plum', color: '#8E4585' },
        { name: 'Gold', color: '#FFD700' },
        { name: 'Bronze', color: '#CD7F32' },
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
        { name: 'Brown', color: '#8B4513' },
        { name: 'Amber', color: '#FFBF00' },
        { name: 'Honey', color: '#C8A850' },
        { name: 'Teal', color: '#008080' },
        { name: 'Rose', color: '#FF007F' },
        { name: 'Coral', color: '#FF6B6B' },
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
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Rust', color: '#B7410E' },
        { name: 'Olive', color: '#808000' },
        { name: 'Teal', color: '#008080' },
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
        { name: 'Orange Red', color: '#FF4500' },
        { name: 'Cinnamon', color: '#D2691E' },
        { name: 'Caramel', color: '#C68E6B' },
        { name: 'Apricot', color: '#FBCEB1' },
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
        { name: 'Warm Beige', color: '#D4A574' },
        { name: 'Honey', color: '#D4A070' },
        { name: 'Amber', color: '#C89868' },
        { name: 'Camel', color: '#C89060' },
        { name: 'Toffee', color: '#C88858' },
        { name: 'Caramel', color: '#C08050' },
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
        { name: 'Salmon', color: '#FA8072' },
        { name: 'Apricot', color: '#FBCEB1' },
        { name: 'Cinnamon', color: '#D2691E' },
        { name: 'Rose Gold', color: '#B76E79' },
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
        { name: 'Rose Gold', color: '#B76E79' },
        { name: 'Terracotta', color: '#E2725B' },
        { name: 'Cinnamon', color: '#D2691E' },
        { name: 'Rust', color: '#B7410E' },
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
        { name: 'Warm Brown', color: '#A0522D' },
        { name: 'Chestnut', color: '#6B3A2A' },
        { name: 'Gold', color: '#FFD700' },
        { name: 'Copper', color: '#B87333' },
        { name: 'Mahogany', color: '#5C3010' },
        { name: 'Caramel', color: '#C68E6B' },
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
        { name: 'Camel', color: '#C19A6B' },
        { name: 'Maroon', color: '#800000' },
        { name: 'Navy', color: '#000080' },
        { name: 'Khaki', color: '#C3B091' },
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
        { name: 'Rust', color: '#B7410E' },
        { name: 'Copper', color: '#B87333' },
        { name: 'Mahogany', color: '#5C3010' },
        { name: 'Burnt Sienna', color: '#E97451' },
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
        { name: 'Tan', color: '#A05030' },
        { name: 'Mocha', color: '#984828' },
        { name: 'Chestnut', color: '#904020' },
        { name: 'Almond', color: '#8A3F24' },
        { name: 'Sienna', color: '#823B20' },
        { name: 'Cocoa', color: '#7A3518' },
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
        { name: 'Navy', color: '#000080' },
        { name: 'Maroon', color: '#800000' },
        { name: 'Copper', color: '#B87333' },
        { name: 'Teal', color: '#008080' },
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
        { name: 'Cinnamon', color: '#D2691E' },
        { name: 'Mahogany', color: '#5C3010' },
        { name: 'Burnt Orange', color: '#CC5500' },
        { name: 'Sienna', color: '#A0522D' },
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
        { name: 'Chestnut', color: '#6B3A2A' },
        { name: 'Copper', color: '#B87333' },
        { name: 'Gold', color: '#FFD700' },
        { name: 'Mahogany', color: '#5C3010' },
        { name: 'Caramel', color: '#C68E6B' },
        { name: 'Espresso', color: '#4A2C1A' },
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
        { name: 'Magenta', color: '#FF0090' },
        { name: 'Cyan', color: '#00FFFF' },
        { name: 'Violet', color: '#8B00FF' },
        { name: 'Gold', color: '#FFD700' },
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
        { name: 'Mahogany', color: '#5C3010' },
        { name: 'Burgundy', color: '#800020' },
        { name: 'Deep Red', color: '#8B0000' },
        { name: 'Vamp', color: '#4A0A0A' },
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
        { name: 'Chestnut', color: '#4A2410' },
        { name: 'Mocha', color: '#422010' },
        { name: 'Dark Cocoa', color: '#3A1C10' },
        { name: 'Deep Brown', color: '#321808' },
        { name: 'Rich Brown', color: '#2A1408' },
        { name: 'Dark Ebony', color: '#221008' },
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
        { name: 'Cyan', color: '#00FFFF' },
        { name: 'Magenta', color: '#FF0090' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'Rose Gold', color: '#B76E79' },
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
        { name: 'Navy', color: '#000080' },
        { name: 'Silver', color: '#C0C0C0' },
        { name: 'Rose Gold', color: '#B76E79' },
        { name: 'Teal', color: '#008080' },
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
        { name: 'Black', color: '#000000' },
        { name: 'Amber', color: '#FFBF00' },
        { name: 'Hazel', color: '#8E7618' },
        { name: 'Aqua', color: '#00FFFF' },
        { name: 'Coral', color: '#FF6B6B' },
        { name: 'Teal', color: '#008080' },
      ],
    },
  };
};

const lightColors = [
  '#FFFFFF','#FFFF00','#FFFFF0','#F7E7CE','#FFB6C1','#E6E6FA','#98FF98',
  '#ADD8E6','#FFDAB9','#FAF0E6','#FFCBA4','#E8B4B8','#E0B0FF','#F8DCC8',
  '#F5D5B8','#F0C8A8','#E8C8B8','#C8A8E8','#FFDB58','#FFFDD0','#FFE4E1',
  '#FBCEB1','#F5E6D3','#EED5C8','#E8D5C0','#F0E0D0','#FFE8D6','#FDDBB4',
  '#F9C89B','#F5C5A3','#F0B27A'
];

// ============================================
// ELEGANT COLOR PALETTE COMPONENT
// ============================================

const ColorPalette = ({ colors }: { colors: { name: string; color: string }[] }) => {
  // Show only first 8 colors for cleaner look, with "+X more" badge
  const displayColors = colors.slice(0, 8);
  const remaining = colors.length - 8;

  return (
    <View style={styles.paletteContainer}>
      {displayColors.map((item, i) => (
        <View key={i} style={styles.paletteItem}>
          <View style={[
            styles.paletteSwatch,
            { backgroundColor: item.color },
            lightColors.includes(item.color) && { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
          ]} />
          <Text style={styles.paletteName} numberOfLines={1}>{item.name}</Text>
        </View>
      ))}
      {remaining > 0 && (
        <View style={styles.paletteMore}>
          <Text style={styles.paletteMoreText}>+{remaining}</Text>
        </View>
      )}
    </View>
  );
};

// ============================================
// ELEGANT CATEGORY CARD
// ============================================

const CategoryCard = ({
  emoji,
  title,
  image,
  colors,
}: {
  emoji: string;
  title: string;
  image: string;
  colors: { name: string; color: string }[];
}) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
    <View style={styles.cardOverlay}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardEmoji}>{emoji}</Text>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardCount}>{colors.length} shades</Text>
        </View>
      </View>
      <ColorPalette colors={colors} />
    </View>
  </View>
);

// ============================================
// MAIN SCREEN COMPONENT
// ============================================

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

  const getCategories = () => {
    const categories = [
      { id: 'clothes', emoji: '👗', title: 'Clothing', data: rec.clothes },
      { id: 'foundation', emoji: '🧴', title: 'Foundation', data: rec.foundation },
      { id: 'eyeshadow', emoji: '✨', title: 'Eyeshadow', data: rec.eyeshadow },
    ];

    if (gender !== 'male') {
      categories.push(
        { id: 'lipstick', emoji: '💄', title: 'Lipstick', data: rec.lipstick },
        { id: 'nailPolish', emoji: '💅', title: 'Nail Polish', data: rec.nailPolish }
      );
    }

    categories.push({ id: 'contactLens', emoji: '👁', title: 'Contact Lens', data: rec.contactLens });
    return categories;
  };

  const categories = getCategories();

  // Split into rows of 2 for better visual balance
  const rows = [];
  for (let i = 0; i < categories.length; i += 2) {
    rows.push(categories.slice(i, i + 2));
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>

      <View style={styles.pageBorder}>

        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTag}>BEAUTY MATCH</Text>
          <Text style={styles.pageTitle}>Skin Tone Finder</Text>
          <Text style={styles.pageSubtitle}>Discover your perfect palette</Text>
        </View>

        {/* Gender Badge */}
        {gender === 'male' && (
          <View style={styles.genderBadge}>
            <Text style={styles.genderBadgeText}>👨 Male profile — lipstick & nail polish hidden</Text>
          </View>
        )}

        {/* Skin Tone Selector - Minimal & Elegant */}
        <View style={styles.selectorCard}>
          <View style={styles.toneRow}>
            <View style={[styles.toneCircle, { backgroundColor: skinInfo.color }]} />
            <View style={styles.toneInfo}>
              <Text style={styles.toneName}>{skinInfo.name}</Text>
              <Text style={styles.toneUndertone}>{skinInfo.undertone} undertone</Text>
            </View>
            <View style={styles.toneValue}>
              <Text style={styles.toneValueText}>{sliderValue}</Text>
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

        {/* Elegant Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerDot} />
          <Text style={styles.dividerText}>Your Palette</Text>
          <View style={styles.dividerDot} />
          <View style={styles.dividerLine} />
        </View>

        {/* 2 CARDS PER ROW - Clean & Elegant */}
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.gridRow}>
            {row.map((category) => (
              <View key={category.id} style={styles.col}>
                <CategoryCard 
                  emoji={category.emoji}
                  title={category.title}
                  image={category.data.image}
                  colors={category.data.colors}
                />
              </View>
            ))}
            {row.length < 2 && (
              <View style={[styles.col, styles.emptyCol]} />
            )}
          </View>
        ))}

      </View>
    </ScrollView>
  );
}

// ============================================
// ELEGANT STYLES
// ============================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  content: { padding: 16, paddingBottom: 48 },

  pageBorder: {
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.3)',
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#0A0A0A',
  },

  headerSection: {
    marginBottom: 20,
  },
  pageTag: { 
    fontSize: 10, 
    fontWeight: '700', 
    letterSpacing: 4, 
    color: '#C8507A', 
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  pageTitle: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#FFFFFF', 
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '400',
  },

  genderBadge: {
    backgroundColor: 'rgba(200, 80, 122, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.2)',
  },
  genderBadgeText: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },

  // Elegant Selector
  selectorCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  toneRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
  },
  toneCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#C8507A',
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  toneInfo: { 
    marginLeft: 16,
    flex: 1,
  },
  toneName: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#FFFFFF',
    marginBottom: 2,
  },
  toneUndertone: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '400',
  },
  toneValue: {
    backgroundColor: 'rgba(200, 80, 122, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.2)',
  },
  toneValueText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C8507A',
  },

  gradientWrap: {
    position: 'relative',
  },
  gradientBar: { 
    flexDirection: 'row', 
    height: 20, 
    borderRadius: 12, 
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  gradientSlice: { flex: 1 },
  slider: { 
    width: '100%', 
    height: 40, 
    marginTop: -12,
  },
  thumbStyle: {
    width: 24,
    height: 24,
    backgroundColor: '#C8507A',
    borderRadius: 12,
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  // Elegant Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  dividerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C8507A',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
  },

  // 2 Cards Per Row - Clean Layout
  gridRow: { 
    flexDirection: 'row', 
    gap: 12,
    marginBottom: 12,
  },
  col: { 
    flex: 1,
  },
  emptyCol: {
    opacity: 0,
  },

  // Elegant Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardImage: { 
    width: '100%', 
    height: 120,
    opacity: 0.8,
  },
  cardOverlay: {
    padding: 14,
    backgroundColor: 'rgba(10,10,10,0.95)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 18,
    marginRight: 10,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardCount: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '400',
  },

  // Minimal Color Palette
  paletteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paletteItem: {
    alignItems: 'center',
    width: (width - 100) / 6, // Responsive sizing
  },
  paletteSwatch: {
    width: 36,
    height: 36,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  paletteName: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.3)',
    marginTop: 3,
    textAlign: 'center',
    maxWidth: 36,
  },
  paletteMore: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(200, 80, 122, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.2)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paletteMoreText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#C8507A',
  },
});