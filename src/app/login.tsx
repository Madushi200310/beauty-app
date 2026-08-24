import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from '../firebase';

const { width, height } = Dimensions.get('window');

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        
        {/* ✅ CENTERED CARD */}
        <View style={styles.cardContainer}>
          
          {/* Decorative gradient line at top */}
          <View style={styles.cardAccent} />
          
          <View style={styles.card}>
            
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoEmoji}>💄</Text>
              </View>
              <Text style={styles.title}>Beauty App</Text>
              <Text style={styles.subtitle}>
                {isSignUp ? 'Create your account' : 'Welcome back!'}
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.form}>
              
              {/* Sign Up Extra Fields */}
              {isSignUp && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.fieldLabel}>Full Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your name"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.fieldLabel}>Age</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your age"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      value={age}
                      onChangeText={setAge}
                      keyboardType="numeric"
                      maxLength={3}
                    />
                  </View>
                </>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.fieldLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleAuth}
                disabled={loading}
                activeOpacity={0.7}>
                <Text style={styles.buttonText}>
                  {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Login'}
                </Text>
              </TouchableOpacity>

              {/* Switch between Login/Signup */}
              <TouchableOpacity 
                onPress={() => {
                  setIsSignUp(!isSignUp);
                  setAge('');
                  setName('');
                }}
                style={styles.switchContainer}>
                <Text style={styles.switchText}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </Text>
                <Text style={styles.switchLink}>
                  {isSignUp ? ' Login' : ' Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    backgroundColor: '#0A0A0A',
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // ✅ CENTERED CARD CONTAINER
  cardContainer: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  // Decorative accent line
  cardAccent: {
    height: 3,
    width: 60,
    backgroundColor: '#C8507A',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(200, 80, 122, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 80, 122, 0.2)',
  },
  logoEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '400',
  },

  // Form
  form: {
    gap: 6,
  },
  inputGroup: {
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'normal',
  },

  // Button
  button: {
    backgroundColor: '#C8507A',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    shadowColor: '#C8507A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: { 
    backgroundColor: 'rgba(200, 80, 122, 0.3)',
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Switch
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
  },
  switchLink: {
    color: '#C8507A',
    fontSize: 13,
    fontWeight: '600',
  },
});