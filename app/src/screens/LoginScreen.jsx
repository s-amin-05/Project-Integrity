import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
// Standard CLI vector icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '@/utils/constants';
import { useAuth } from '@/context/AuthContext';

export const LoginScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signUp, googleSignIn } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    if (isSignUp && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      Alert.alert('Google Sign In Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Dark Header Background */}
      <View style={styles.headerBackground}>
        <View style={styles.headerContent}>
          <View style={styles.shieldOutline}>
            <MaterialCommunityIcons name="shield-lock" size={42} color="white" />
          </View>
          <Text style={styles.brandTitle}>Project INTEGRITY</Text>
          <Text style={styles.brandSubtitle}>CIVIC AUDIT PLATFORM</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexOne}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Main White Card */}
          <View style={styles.whiteCard}>
            <Text style={styles.welcomeText}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.subWelcomeText}>
              Secure access to civic infrastructure data.
            </Text>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputFieldWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="name@example.com"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <MaterialCommunityIcons name="email-outline" size={22} color="#94A3B8" />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordHeader}>
                <Text style={styles.inputLabel}>Password</Text>
                {!isSignUp && (
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.inputFieldWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={22} 
                    color="#94A3B8" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {isSignUp && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputFieldWrapper}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
              </View>
            )}

            {/* Login Button */}
            <TouchableOpacity style={styles.mainButton} onPress={handleAuth}>
              <Text style={styles.mainButtonText}>
                {isSignUp ? 'Sign Up' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR CONTINUE WITH</Text>
              <View style={styles.line} />
            </View>

            {/* Google Button */}
            <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
              <Ionicons name="logo-google" size={18} color="#333" style={{ marginRight: 12 }} />
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Footer Toggle */}
            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              style={styles.footerLink}
            >
              <Text style={styles.footerText}>
                {isSignUp ? 'Already have an account? ' : 'New to Integrity? '}
                <Text style={styles.footerActionText}>
                  {isSignUp ? 'Sign In' : 'Create an Account'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#162130', // Navy blue from header
  },
  flexOne: {
    flex: 1,
  },
  headerBackground: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 40,
  },
  shieldOutline: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  brandTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 4,
  },
  scrollContent: {
    flexGrow: 1,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  subWelcomeText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 18,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 8,
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
  },
  mainButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // Add shadow for that "floating" look
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    fontSize: 11,
    color: '#94A3B8',
    marginHorizontal: 10,
    fontWeight: '700',
  },
  googleBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleBtnText: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '600',
  },
  footerLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
  },
  footerActionText: {
    color: '#10B981',
    fontWeight: 'bold',
  },
});