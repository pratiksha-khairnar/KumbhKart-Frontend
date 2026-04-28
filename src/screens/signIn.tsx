import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal, Pressable,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from "react-native";

type Step = 'phone' | 'otp' | 'success';

const SignIn = () => {
    const [redirectPath, setRedirectPath] = useState('');
  
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
      <Modal
        transparent
        visible={dropdownOpen}
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setDropdownOpen(false)}
        />

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

          {/* Home */}
          <TouchableOpacity onPress={() => {
            setDropdownOpen(false);
            router.push('/');
          }}>
            <Text style={styles.item}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
  setDropdownOpen(false);

  if (!isLoggedIn) {
    setRedirectPath('/myOrders'); // 👈 save karo kaha jana hai
    setModalVisible(true);
    return;
  }

  router.push('/myOrders');
}}>
  <Text style={styles.item}>My Orders</Text>
</TouchableOpacity>

          {/* My Wishlist */}
          <TouchableOpacity onPress={() => {
            setDropdownOpen(false);
            router.push('/myWishlist');
          }}>
            <Text style={styles.item}>My Wishlist</Text>
          </TouchableOpacity>

          {/* Wholesale */}
          <TouchableOpacity onPress={() => {
            setDropdownOpen(false);
            router.push('/kkWholesale');
          }}>
            <Text style={styles.item}>KK Wholesale</Text>
          </TouchableOpacity>

          {/* Logout */}
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

      {/* ===== LOGIN POPUP ===== */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>

            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>

            {step === 'phone' && (
              <>
                <Text style={styles.popupHeading}>Login</Text>

                <Image
                  source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
                  style={styles.popupLogo}
                />

                <Text style={styles.welcomeText}>Welcome!</Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.phoneInputBox}>
                  <Text style={styles.phonePrefix}>+91</Text>
                  <TextInput
                    style={styles.phoneField}
                    placeholder="Enter mobile number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="number-pad"
                    maxLength={10}
                  />
                </View>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAgreed(!agreed)}
                >
                  <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                    {agreed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.termsText}>
                    I Agree to Terms & Policy
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={handleSendOtp}
                >
                  <Text style={styles.loginBtnText}>Login</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 'otp' && (
              <>
                <Text style={styles.popupHeading}>Verify OTP</Text>

                <TextInput
                  style={styles.otpField}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                />

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={handleVerifyOtp}
                >
                  <Text style={styles.loginBtnText}>Verify</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 'success' && (
              <>
                <Text style={styles.successEmoji}>🎉</Text>
                <Text style={styles.welcomeText}>Login Successful!</Text>

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={handleClose}
                >
                  <Text style={styles.loginBtnText}>Continue</Text>
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
  signInText: { color: "white", fontSize: 13 },

  overlay: { flex: 1 },
  dropdown: {
    position: "absolute",
    top: 95,
    right: 10,
    width: 220,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
  },

  mainBtn: { backgroundColor: ORANGE, padding: 10, borderRadius: 6 },
  mainBtnText: { color: "white", textAlign: "center" },

  dividerLine: { height: 1, backgroundColor: "#eee", marginVertical: 8 },
  item: { paddingVertical: 10 },

  logoutBtn: { marginTop: 10 },
  logoutText: { color: ORANGE },

  popupOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  popupBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },

  closeBtn: { position: "absolute", right: 10, top: 10 },
  closeBtnText: { fontSize: 16 },

  popupHeading: { fontSize: 18, fontWeight: "bold" },
  popupLogo: { width: 80, height: 80, alignSelf: "center" },

  welcomeText: { textAlign: "center", marginVertical: 10 },
  errorText: { color: "red" },

  phoneInputBox: { flexDirection: "row", borderWidth: 1 },
  phonePrefix: { padding: 10 },
  phoneField: { flex: 1 },

  checkboxRow: { flexDirection: "row", alignItems: "center" },
  checkbox: { width: 18, height: 18, borderWidth: 1 },
  checkboxChecked: { backgroundColor: GREEN },
  checkmark: { color: "white" },
  termsText: { marginLeft: 5 },

  loginBtn: { backgroundColor: GREEN, padding: 12, marginTop: 10 },
  loginBtnText: { color: "white", textAlign: "center" },

  otpField: { borderWidth: 1, padding: 10 },

  successEmoji: { fontSize: 40, textAlign: "center" },
});