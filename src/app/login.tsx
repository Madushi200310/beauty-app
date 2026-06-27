import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in email and password');
      return;
    }
    if (isSignUp && (!name || !age || !gender)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          age: parseInt(age),
          gender,
          email,
          createdAt: new Date().toISOString(),
        });
        Alert.alert('🎉 Welcome!', `Account created successfully! Welcome, ${name}!`);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('✅ Welcome Back!', 'You have logged in successfully!');
      }
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          {/* Header */}
          <Text style={styles.emoji}>💄</Text>
          <Text style={styles.title}>Beauty App</Text>
          <Text style={styles.subtitle}>
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </Text>

          {/* Sign Up Extra Fields */}
          {isSignUp && (
            <>
              {/* Name */}
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#6B3A50"
                value={name}
                onChangeText={setName}
              />

              {/* Age */}
              <Text style={styles.fieldLabel}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your age"
                placeholderTextColor="#6B3A50"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                maxLength={3}
              />

              {/* Gender */}
              <Text style={styles.fieldLabel}>Gender</Text>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[styles.genderBtn, gender === 'female' && styles.genderSelected]}
                  onPress={() => setGender('female')}>
                  <Text style={styles.genderEmoji}>👩</Text>
                  <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>Female</Text>
                  {gender === 'female' && <Text style={styles.genderCheck}>✓</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.genderBtn, gender === 'male' && styles.genderSelected]}
                  onPress={() => setGender('male')}>
                  <Text style={styles.genderEmoji}>👨</Text>
                  <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>Male</Text>
                  {gender === 'male' && <Text style={styles.genderCheck}>✓</Text>}
                </TouchableOpacity>
              </View>

              {/* Male notice */}
              {gender === 'male' && (
                <View style={styles.noticeBox}>
                  <Text style={styles.noticeText}>
                    ℹ️ As a male user, lipstick and nail polish recommendations will be hidden from your profile.
                  </Text>
                </View>
              )}
            </>
          )}

          {/* Email */}
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#6B3A50"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#6B3A50"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* Switch */}
          <TouchableOpacity onPress={() => {
            setIsSignUp(!isSignUp);
            setGender(null);
            setAge('');
            setName('');
          }}>
            <Text style={styles.switchText}>
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#1A0A12' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },

  card: {
    backgroundColor: '#2A1020',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#C8507A',
  },

  emoji: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: '#FFF0F5', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#A08090', textAlign: 'center', marginBottom: 24 },

  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#C8507A',
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#1A0A12',
    borderWidth: 1,
    borderColor: '#3D1830',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 15,
    color: '#FFF0F5',
  },

  // Gender
  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  genderBtn: {
    flex: 1,
    backgroundColor: '#1A0A12',
    borderWidth: 1,
    borderColor: '#3D1830',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    position: 'relative',
  },
  genderSelected: {
    borderColor: '#C8507A',
    backgroundColor: '#3D1020',
  },
  genderEmoji: { fontSize: 28, marginBottom: 6 },
  genderText: { fontSize: 14, fontWeight: '600', color: '#A08090' },
  genderTextSelected: { color: '#FFF0F5' },
  genderCheck: {
    position: 'absolute',
    top: 8,
    right: 10,
    color: '#C8507A',
    fontSize: 14,
    fontWeight: '700',
  },

  // Notice
  noticeBox: {
    backgroundColor: '#1A0A12',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3D1830',
  },
  noticeText: { fontSize: 12, color: '#A08090', lineHeight: 18 },

  // Button
  button: {
    backgroundColor: '#C8507A',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: { backgroundColor: '#6B3A50' },
  buttonText: { color: '#FFF0F5', fontSize: 16, fontWeight: '700' },

  switchText: { color: '#C8507A', textAlign: 'center', fontSize: 13 },
});