import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#FF69B4',
      tabBarStyle: { backgroundColor: '#fff' },
      headerStyle: { backgroundColor: '#FF69B4' },
      headerTintColor: '#fff',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="skinTone"
        options={{
          title: 'Skin Tone',
          tabBarIcon: ({ color }) => <Ionicons name="color-palette" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="colorMatch"
        options={{
          title: 'Color Match',
          tabBarIcon: ({ color }) => <Ionicons name="shirt" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}