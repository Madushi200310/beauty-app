// app/login.tsx
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../firebase';

const { width } = Dimensions.get('window');
const isWide = width > 768; // split layout on tablet/web

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in email and password');
      return;
    }
    if (isSignUp && (!name || !age)) {
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
          email,
          createdAt: new Date().toISOString(),
        });
        Alert.alert('🎉 Welcome!', `Account created successfully! Welcome, ${name}!`);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('👋 Welcome Back!', 'You have logged in successfully!');
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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <View style={[styles.splitContainer, !isWide && styles.splitContainerMobile]}>

        {/* ─────────── LEFT PANEL: Branding / Hero ─────────── */}
        <View style={[styles.leftPanel, !isWide && styles.leftPanelMobile]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          {/* Top Logo */}
          <View style={styles.brandRow}>
            <Text style={styles.brandLogo}>BEAUTY</Text>
            <TouchableOpacity
              style={styles.backToWebsite}
              onPress={() => router.push('/')}
              activeOpacity={0.7}>
              <Text style={styles.backToWebsiteText}>Back to Home →</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Caption */}
          <View style={styles.heroCaption}>
            <Text style={styles.heroCaptionTitle}>
              Find Colors{'\n'}That Match You
            </Text>
            <Text style={styles.heroCaptionSub}>
              Your personal beauty guide — tailored to your skin tone.
            </Text>

            {/* Dots indicator */}
            <View style={styles.dotsRow}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        {/* ─────────── RIGHT PANEL: Form ─────────── */}
        <ScrollView
          style={styles.rightPanel}
          contentContainerStyle={styles.rightPanelContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          <Text style={styles.formTitle}>
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </Text>

          <View style={styles.formSwitchRow}>
            <Text style={styles.formSwitchText}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsSignUp(!isSignUp);
                setAge('');
                setName('');
              }}>
              <Text style={styles.formSwitchLink}>
                {isSignUp ? ' Login' : ' Sign up'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name + Age side by side (sign up only) */}
          {isSignUp && (
            <View style={styles.rowTwo}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.fieldLabel}>FIRST NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.fieldLabel}>AGE</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Age"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>
          )}

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255,255,255,0.25)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="rgba(255,255,255,0.25)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Terms checkbox (sign up only) */}
          {isSignUp && (
            <View style={styles.checkRow}>
              <View style={styles.checkbox} />
              <Text style={styles.checkText}>
                I agree to the <Text style={styles.checkLink}>Terms & Conditions</Text>
              </Text>
            </View>
          )}

          {/* Submit */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>
              {loading ? 'Please wait...' : isSignUp ? 'Create account' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
              <Text style={styles.socialIcon}></Text>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </View>
    </KeyboardAvoidingView>
  );
}

// ============================================
// STYLES — same dark rose theme
// ============================================

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },

  // Outer split container
  splitContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  splitContainerMobile: {
    flexDirection: 'column',
  },

  // ── LEFT PANEL ──
  leftPanel: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1A0A12',
  },
  leftPanelMobile: {
    flex: 0,
    height: 240,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.55,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 10, 18, 0.55)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    zIndex: 2,
  },
  brandLogo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF0F5',
    letterSpacing: 4,
  },
  backToWebsite: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,240,245,0.3)',
    backgroundColor: 'rgba(255,240,245,0.05)',
  },
  backToWebsiteText: {
    fontSize: 11,
    color: '#FFF0F5',
    fontWeight: '600',
  },
  heroCaption: {
    position: 'absolute',
    bottom: 40,
    left: 32,
    right: 32,
    zIndex: 2,
  },
  heroCaptionTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFF0F5',
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  heroCaptionSub: {
    fontSize: 13,
    color: 'rgba(255,240,245,0.7)',
    lineHeight: 20,
    marginBottom: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,240,245,0.3)',
  },
  dotActive: {
    backgroundColor: '#C8507A',
    width: 24,
  },

  // ── RIGHT PANEL ──
  rightPanel: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  rightPanelContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 48,
    paddingVertical: 40,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  formSwitchRow: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  formSwitchText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  formSwitchLink: {
    fontSize: 13,
    color: '#C8507A',
    fontWeight: '600',
  },

  // Form fields
  rowTwo: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: '#FFFFFF',
  },

  // Checkbox
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.6)',
    backgroundColor: 'rgba(200, 80, 122, 0.1)',
  },
  checkText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  checkLink: {
    color: '#C8507A',
    fontWeight: '600',
  },

  // Button
  button: {
    backgroundColor: '#C8507A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(200, 80, 122, 0.35)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  // OR divider
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  orText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.35)',
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  socialIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  socialText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});