import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';

export default function Layout() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        router.replace('/login');
      }
    });
    return unsubscribe;
  }, []);

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
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}