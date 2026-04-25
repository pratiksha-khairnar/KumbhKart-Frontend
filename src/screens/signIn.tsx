import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Modal, Pressable, Image,
  ActivityIndicator,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Step = 'phone' | 'otp' | 'success';

const SignIn = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    checkLogin();
  }, [pathname]);

  const checkLogin = async () => {
    const val = await AsyncStorage.getItem('isLoggedIn');
    setIsLoggedIn(val === 'true');
  };

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      setError('Valid 10 digit number daalo!');
      return;
    }
    if (!agreed) {
      setError('Terms & Conditions accept karo!');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Enter 6 digit OTP ');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(async () => {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setLoading(false);
      setStep('success');
    }, 1000);
  };

  const handleClose = () => {
    setModalVisible(false);
    setStep('phone');
    setPhone('');
    setOtp('');
    setError('');
    setAgreed(false);
  };

  return (
    <View style={styles.wrapper}>

      {/* Navbar Button */}
      <TouchableOpacity onPress={() => setDropdownOpen(true)}>
        <Text style={styles.signInText}>
          {isLoggedIn ? 'Hello 👋 ▾' : 'Sign In ▾'}
        </Text>
      </TouchableOpacity>

      {/* ===== DROPDOWN MODAL ===== */}
      <Modal transparent visible={dropdownOpen} animationType="fade" onRequestClose={() => setDropdownOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setDropdownOpen(false)} />
        <View style={styles.dropdown}>

          {isLoggedIn ? (
  <TouchableOpacity style={styles.mainBtn}>
    <Text style={styles.mainBtnText}>Hello</Text>
  </TouchableOpacity>
) : (
            <TouchableOpacity
              style={styles.mainBtn}
              onPress={() => {
                setDropdownOpen(false);
                setModalVisible(true);
              }}
            >
              <Text style={styles.mainBtnText}>Sign In</Text>
            </TouchableOpacity>
          )}

          <View style={styles.dividerLine} />
<TouchableOpacity onPress={() => { setDropdownOpen(false); router.push('/'); }}>
  <Text style={styles.item}>Home</Text>
</TouchableOpacity>          
<TouchableOpacity onPress={() => { setDropdownOpen(false); router.push('/myOrders'); }}>
  <Text style={styles.item}>My Orders</Text>
</TouchableOpacity>          <Text style={styles.item}>My Wishlist</Text>
          <Text style={styles.item}>CK Wholesale</Text>

          {isLoggedIn && (
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={async () => {
                await AsyncStorage.removeItem('isLoggedIn');
                setIsLoggedIn(false);
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      {/* ===== LOGIN POPUP MODAL ===== */}
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={handleClose}>
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>

            {/* ===== PHONE STEP ===== */}
            {step === 'phone' && (
              <>
                <Text style={styles.popupHeading}>Login</Text>

                {/* CK Logo */}
                <Image
                  source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
                  style={styles.popupLogo}
                />

                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.welcomeSubText}>
                  Enter phone number to continue and we will send a verification code to this number.
                </Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Phone Input */}
                <View style={styles.phoneInputBox}>
                  <Text style={styles.phonePrefix}>+91</Text>
                  <TextInput
                    style={styles.phoneField}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#aaa"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="number-pad"
                    maxLength={10}
                  />
                </View>

                {/* Terms Checkbox */}
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAgreed(!agreed)}
                >
                  <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                    {agreed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.termsText}>
                    I Agree to the{' '}
                    <Text style={styles.termsLink}>Terms & Condition</Text>
                    {' '}and{' '}
                    <Text style={styles.termsLink}>Privacy & Policy</Text>
                  </Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  style={[styles.loginBtn, loading && styles.btnDisabled]}
                  onPress={handleSendOtp}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.loginBtnText}>Login To Continue</Text>
                  }
                </TouchableOpacity>
              </>
            )}

            {/* ===== OTP STEP ===== */}
            {step === 'otp' && (
              <>
                <Text style={styles.popupHeading}>Verify OTP</Text>

                <Image
                  source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
                  style={styles.popupLogo}
                />

                <Text style={styles.welcomeText}>Enter OTP</Text>
                <Text style={styles.welcomeSubText}>
                  OTP bheja gaya hai +91 {phone} pe
                </Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TextInput
                  style={styles.otpField}
                  placeholder="• • • • • •"
                  placeholderTextColor="#aaa"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                />

                <TouchableOpacity
                  style={[styles.loginBtn, loading && styles.btnDisabled]}
                  onPress={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.loginBtnText}>Verify OTP</Text>
                  }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setStep('phone'); setError(''); }}>
                  <Text style={styles.changeNum}>← Number change karo</Text>
                </TouchableOpacity>
              </>
            )}

            {/* ===== SUCCESS STEP ===== */}
            {step === 'success' && (
              <>
                <Text style={styles.successEmoji}>🎉</Text>
                <Text style={styles.welcomeText}>Login Successful!</Text>
                <Text style={styles.welcomeSubText}>Welcome to KumbhKart!</Text>

                <TouchableOpacity style={styles.loginBtn} onPress={handleClose}>
                  <Text style={styles.loginBtnText}>Continue Shopping →</Text>
                </TouchableOpacity>
              </>
            )}

          </View>
        </View>
      </Modal>

    </View>
  );
};

export default SignIn;

const ORANGE = '#F36D00';
const GREEN = '#2ecc71';

const styles = StyleSheet.create({
  wrapper: { justifyContent: "center" },
  signInText: { color: "white", fontSize: 13, fontWeight: "500" },

  // Dropdown
  overlay: { flex: 1, backgroundColor: "transparent" },
  dropdown: {
    position: "absolute", top: 95, right: 10, width: 220,
    backgroundColor: "white", borderRadius: 10, padding: 12, elevation: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8,
  },
  mainBtn: { backgroundColor: ORANGE, padding: 12, borderRadius: 8, marginBottom: 8 },
  mainBtnText: { color: "white", textAlign: "center", fontWeight: "bold", fontSize: 15 },
  dividerLine: { height: 1, backgroundColor: '#eee', marginBottom: 6 },
  item: { paddingVertical: 10, paddingHorizontal: 5, fontSize: 14, color: '#333', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  coming: { color: ORANGE, fontSize: 12 },
  helloBox: { backgroundColor: '#fff5ee', padding: 12, borderRadius: 8, marginBottom: 8, alignItems: 'center' },
  helloText: { fontSize: 18, fontWeight: 'bold', color: ORANGE },
  helloSubText: { fontSize: 12, color: '#888', marginTop: 2 },
  logoutBtn: { marginTop: 10, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ffccaa', alignItems: 'center' },
  logoutText: { color: ORANGE, fontWeight: 'bold', fontSize: 14 },

  // Popup Modal
  popupOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  popupBox: {
    backgroundColor: 'white', borderRadius: 16,
    padding: 24, width: '100%', maxWidth: 480,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute', top: 14, right: 14,
    width: 30, height: 30, borderRadius: 15,
    borderWidth: 1, borderColor: '#ddd',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: '#555' },
  popupHeading: { fontSize: 18, fontWeight: 'bold', color: '#222', alignSelf: 'flex-start', marginBottom: 16 },
  popupLogo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 12 },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 6 },
  welcomeSubText: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 20 },
  errorText: { color: 'red', fontSize: 13, marginBottom: 10, textAlign: 'center' },

  // Phone Input
  phoneInputBox: {
    flexDirection: 'row', width: '100%',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    backgroundColor: '#f5f5f5', marginBottom: 16, overflow: 'hidden',
  },
  phonePrefix: { padding: 14, fontSize: 15, color: '#333', borderRightWidth: 1, borderRightColor: '#ddd' },
  phoneField: { flex: 1, padding: 14, fontSize: 15, color: '#333' },

  // Checkbox
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '100%' },
  checkbox: {
    width: 18, height: 18, borderWidth: 1.5, borderColor: '#aaa',
    borderRadius: 3, marginRight: 8, alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: GREEN, borderColor: GREEN },
  checkmark: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  termsText: { fontSize: 13, color: '#555', flex: 1 },
  termsLink: { color: GREEN, fontWeight: '500' },

  // Login Button
  loginBtn: {
    backgroundColor: GREEN, borderRadius: 8,
    paddingVertical: 14, width: '100%', alignItems: 'center', marginTop: 4,
  },
  btnDisabled: { backgroundColor: '#aaa' },
  loginBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  // OTP
  otpField: {
    width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 14, fontSize: 24, textAlign: 'center',
    letterSpacing: 8, backgroundColor: '#f5f5f5', marginBottom: 16,
  },
  changeNum: { color: ORANGE, marginTop: 16, fontSize: 13 },

  // Success
  successEmoji: { fontSize: 60, marginBottom: 16, marginTop: 10 },
});