import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// ✅ About Dropdown Items (Same as HomeScreen)
const ABOUT_DROPDOWN = [
  { label: 'About Us',           route: '/about' },
  { label: 'Blog',               route: '/blog' },
  { label: 'Contact Us',         route: '/contact' },
  { label: 'Terms & Conditions', route: '/terms' },
  { label: 'Privacy Policy',     route: '/privacy' },
  { label: 'Return & Refund',    route: '/refund' },
];

const ContactUs = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // ✅ About Dropdown State
  const [aboutDropdownVisible, setAboutDropdownVisible] = useState(false);
  const [aboutBtnLayout, setAboutBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const aboutBtnRef = useRef<View>(null);

  // ✅ Sign In Dropdown State
  const [signInDropdown, setSignInDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const signInBtnRef = useRef<TouchableOpacity>(null);

  // ✅ Login Modal State
  const [loginModal, setLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ✅ Open About Dropdown
  const openAboutDropdown = () => {
    if (aboutBtnRef.current) {
      aboutBtnRef.current.measure((_fx, _fy, width, height, px, py) => {
        setAboutBtnLayout({ x: px, y: py, width, height });
        setAboutDropdownVisible(true);
      });
    }
  };

  // ✅ Sign In Dropdown Open
  const handleSignInPress = () => {
    if (signInBtnRef.current) {
      signInBtnRef.current.measure((_fx, _fy, _w, h, px, py) => {
        setDropdownPos({ top: py + h, right: (typeof window !== 'undefined' ? window.innerWidth : 400) - px - _w });
        setSignInDropdown(true);
      });
    }
  };

  // ✅ Sign In Dropdown Navigation
  const handleDropdownNavigate = async (path: string) => {
    setSignInDropdown(false);
    if (path === '/signIn') {
      setLoginModal(true);
    } else if (path === '/myOrders') {
      const val = await AsyncStorage.getItem('isLoggedIn');
      if (val === 'true') {
        router.push('/myOrders' as any);
      } else {
        setLoginModal(true);
      }
    } else {
      router.push(path as any);
    }
  };

  // ✅ Login Continue
  const handleLoginContinue = async () => {
    if (!termsAccepted || phoneNumber.length < 10) return;
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setLoginModal(false);
    router.push('/myOrders' as any);
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:contact@chhayakart.com');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/chhayakart');
  };

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Your message has been sent! We will contact you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#db1c07" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ============================== */}
        {/* SECTION 1 — NAVBAR WITH BOTH DROPDOWNS */}
        {/* ============================== */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.navLinksContainer}>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
              <Text style={styles.navLink}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/sub-category/31-papad')}>
              <Text style={styles.navLink}>Categories</Text>
            </TouchableOpacity>
            
            {/* ✅ About Us — Dropdown trigger */}
            <View ref={aboutBtnRef} collapsable={false}>
              <TouchableOpacity style={styles.aboutBtn} onPress={openAboutDropdown}>
                <Text style={styles.navLink}>About Us</Text>
                <Ionicons
                  name={aboutDropdownVisible ? 'chevron-up' : 'chevron-down'}
                  size={13}
                  color="white"
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>
            
            {/* ✅ Sign In — Dropdown trigger */}
            <TouchableOpacity ref={signInBtnRef} style={styles.navItem} onPress={handleSignInPress}>
              <Text style={styles.navLink}>Sign In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/cart')}>
              <Ionicons name="cart" size={26} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ✅ ABOUT DROPDOWN MODAL */}
        <Modal
          visible={aboutDropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setAboutDropdownVisible(false)}
        >
          <Pressable style={styles.backdrop} onPress={() => setAboutDropdownVisible(false)}>
            <View
              style={[
                styles.aboutDropdownMenu,
                { top: aboutBtnLayout.y + aboutBtnLayout.height + 4, left: aboutBtnLayout.x },
              ]}
            >
              {ABOUT_DROPDOWN.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.aboutDropdownItem,
                    index < ABOUT_DROPDOWN.length - 1 && styles.aboutDropdownBorder,
                  ]}
                  onPress={() => {
                    setAboutDropdownVisible(false);
                    router.push(item.route as any);
                  }}
                >
                  <Text style={styles.aboutDropdownText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

        {/* ✅ SIGN IN DROPDOWN MODAL */}
        <Modal visible={signInDropdown} transparent animationType="fade" onRequestClose={() => setSignInDropdown(false)}>
          <TouchableWithoutFeedback onPress={() => setSignInDropdown(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={[styles.signInDropdown, { top: dropdownPos.top, right: dropdownPos.right }]}>
                  <TouchableOpacity style={styles.dropdownSignInBtn} onPress={() => handleDropdownNavigate('/signIn')}>
                    <Text style={styles.dropdownSignInText}>Sign In</Text>
                  </TouchableOpacity>
                  <View style={styles.dropdownDivider} />
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'My Orders', path: '/myOrders' },
                    { label: 'My Wishlist', path: '/myWishlist' },
                    { label: 'CK Wholesale', path: '/kkWholesale' },
                  ].map((item) => (
                    <TouchableOpacity key={item.label} style={styles.dropdownItem} onPress={() => handleDropdownNavigate(item.path)}>
                      <Text style={styles.dropdownItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                  <View style={styles.dropdownItem}>
                    <Text style={styles.dropdownItemText}>
                      Chhaya Purse{'  '}
                      <Text style={styles.comingSoonText}>(Coming Soon)</Text>
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* ✅ LOGIN MODAL */}
        <Modal visible={loginModal} transparent animationType="fade" onRequestClose={() => setLoginModal(false)}>
          <TouchableWithoutFeedback onPress={() => setLoginModal(false)}>
            <View style={styles.loginOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.loginBox}>
                  <Text style={styles.loginTitle}>Login</Text>
                  <TouchableOpacity style={styles.loginCloseBtn} onPress={() => setLoginModal(false)}>
                    <Ionicons name="close" size={20} color="#333" />
                  </TouchableOpacity>
                  <Image source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }} style={styles.loginLogo} resizeMode="contain" />
                  <Text style={styles.loginWelcome}>Welcome!</Text>
                  <Text style={styles.loginSubText}>Enter phone number to continue and we will send a verification code to this number.</Text>
                  <View style={styles.loginInputWrapper}>
                    <View style={styles.loginPhoneRow}>
                      <Text style={styles.loginCountryCode}>+91</Text>
                      <TextInput style={styles.loginPhoneInput} keyboardType="phone-pad" maxLength={10} value={phoneNumber} onChangeText={setPhoneNumber} />
                    </View>
                  </View>
                  <View style={styles.loginTermsRow}>
                    <TouchableOpacity style={styles.loginCheckboxTouch} onPress={() => setTermsAccepted(!termsAccepted)}>
                      <View style={[styles.checkboxBox, termsAccepted && styles.checkboxChecked]}>
                        {termsAccepted && <Ionicons name="checkmark" size={12} color="#fff" />}
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.loginTermsText}>
                      I Agree to the <Text style={styles.loginLink}>Terms & Condition</Text> and <Text style={styles.loginLink}>Privacy & Policy</Text>
                    </Text>
                  </View>
                  <TouchableOpacity style={[styles.loginBtn, (!termsAccepted || phoneNumber.length < 10) && styles.loginBtnDisabled]} onPress={handleLoginContinue}>
                    <Text style={styles.loginBtnText}>Login To Continue</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.sectionGap} />

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>We'd Love to Hear From You! 💬</Text>
          <Text style={styles.heroSubtitle}>
            We would be happy to assist you with any information you may need
          </Text>
        </View>

        {/* Contact Options */}
        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactDetail}>contact@chhayakart.com</Text>
            <Text style={styles.contactAction}>Send Email →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard} onPress={handleInstagramPress}>
            <Text style={styles.contactIcon}>📷</Text>
            <Text style={styles.contactTitle}>Instagram</Text>
            <Text style={styles.contactDetail}>@chhayakart</Text>
            <Text style={styles.contactAction}>Follow us →</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Send us a Message</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={styles.galleryTitle}>Our Gallery 📸</Text>
          <View style={styles.galleryGrid}>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🛒</Text>
              <Text style={styles.galleryLabel}>Fresh Groceries</Text>
            </View>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🌾</Text>
              <Text style={styles.galleryLabel}>Farm Fresh</Text>
            </View>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🥬</Text>
              <Text style={styles.galleryLabel}>Organic</Text>
            </View>
            <View style={styles.galleryItem}>
              <Text style={styles.galleryEmoji}>🚚</Text>
              <Text style={styles.galleryLabel}>Fast Delivery</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },

  sectionGap: {
    height: 10,
    backgroundColor: '#EFEFEF',
  },

  /* ---- NAVBAR ---- */
  header: {
    backgroundColor: '#db1c07',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'web' ? 0 : 44,
    height: Platform.OS === 'web' ? 76 : 116,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  logo: { 
    width: 56, 
    height: 56 
  },
  navLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  navItem: { 
    paddingHorizontal: 18, 
    paddingVertical: 8 
  },
  navLink: { 
    color: 'white', 
    fontSize: 15, 
    fontWeight: '600', 
    letterSpacing: 0.4 
  },
  
  // ✅ About Us Button with Dropdown
  aboutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  
  cartBtn: {
    marginLeft: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 50,
    padding: 8,
  },

  /* ✅ ABOUT DROPDOWN STYLES */
  backdrop: { flex: 1, backgroundColor: 'transparent' },
  aboutDropdownMenu: {
    position: 'absolute',
    width: 210,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    zIndex: 1000,
  },
  aboutDropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  aboutDropdownBorder: { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  aboutDropdownText: { fontSize: 14, color: '#333', fontWeight: '500' },

  /* ✅ SIGN IN DROPDOWN STYLES */
  modalOverlay: { flex: 1, backgroundColor: 'transparent' },
  signInDropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    minWidth: 230,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dropdownSignInBtn: {
    backgroundColor: '#db1c07',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dropdownSignInText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  dropdownDivider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 8 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 20 },
  dropdownItemText: { fontSize: 14, color: '#333', fontWeight: '500' },
  comingSoonText: { color: '#db1c07', fontSize: 12, fontWeight: '400' },

  /* ✅ LOGIN MODAL STYLES */
  loginOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center' },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 32,
    width: Platform.OS === 'web' ? 450 : '90%',
    maxWidth: 580,
    alignItems: 'center',
    position: 'relative',
  },
  loginTitle: { alignSelf: 'flex-start', fontSize: 18, fontWeight: '700', color: '#222', marginBottom: 24 },
  loginCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginLogo: { width: 80, height: 80, marginBottom: 18 },
  loginWelcome: { fontSize: 22, fontWeight: '700', color: '#222', marginBottom: 8 },
  loginSubText: { fontSize: 13, color: '#777', textAlign: 'center', marginBottom: 28, lineHeight: 20, paddingHorizontal: 10 },
  loginInputWrapper: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
  },
  loginPhoneRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 54 },
  loginCountryCode: { fontSize: 16, color: '#333', marginRight: 10, fontWeight: '500' },
  loginPhoneInput: { flex: 1, fontSize: 16, color: '#333', height: '100%' },
  loginTermsRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 28, gap: 10 },
  loginCheckboxTouch: { padding: 2 },
  checkboxBox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: { backgroundColor: '#4CAF86', borderColor: '#4CAF86' },
  loginTermsText: { fontSize: 13, color: '#444', flexShrink: 1 },
  loginLink: { color: '#2E8B57', fontWeight: '600' },
  loginBtn: { backgroundColor: '#4CAF86', width: '100%', height: 54, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  loginBtnDisabled: { backgroundColor: '#92D4B5' },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },

  /* ---- Hero Section ---- */
  heroSection: {
    backgroundColor: '#db1c07',
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },

  /* ---- Contact Options ---- */
  contactOptions: {
    padding: 16,
    gap: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contactAction: {
    fontSize: 14,
    color: '#db1c07',
    fontWeight: '600',
  },

  /* ---- Form Section ---- */
  formSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#db1c07',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* ---- Gallery Section ---- */
  gallerySection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  galleryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  galleryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default ContactUs;