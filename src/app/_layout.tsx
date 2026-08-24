import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);
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
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: '#FF69B4',
        tabBarStyle: { 
          backgroundColor: '#1A0A12', 
          borderTopColor: '#3D1830',
          borderTopWidth: 1,
        },
        tabBarInactiveTintColor: '#A08090',
        headerStyle: { 
          backgroundColor: '#1A0A12', 
          borderBottomColor: '#3D1830',
          borderBottomWidth: 1,
        },
        headerTintColor: '#FFF0F5',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      {/* Main Tab Screens */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="skinTone"
        options={{
          title: 'Skin Tone',
          tabBarIcon: ({ color }) => <Ionicons name="color-palette" size={24} color={color} />,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="colorMatch"
        options={{
          title: 'Color Match',
          tabBarIcon: ({ color }) => <Ionicons name="shirt" size={24} color={color} />,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerShown: false,
        }}
      />

      {/* Hidden Screens */}
      <Tabs.Screen
        name="clothing"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="foundation"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="eyeshadow"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="lipstick"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="nailPolish"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="contactLens"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="faceShape"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      {/* ✅ NEW: Face Shape Detail Page */}
      <Tabs.Screen
        name="faceShapeDetail"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}