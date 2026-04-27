import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// ✅ About Dropdown Items
const ABOUT_DROPDOWN = [
  { label: 'About Us',           route: '/about' },
  { label: 'Blog',               route: '/blog' },
  { label: 'Contact Us',         route: '/contact' },
  { label: 'Terms & Conditions', route: '/terms' },
  { label: 'Privacy Policy',     route: '/privacy' },
  { label: 'Return & Refund',    route: '/refund' },
];

const STATS = [
  { icon: 'bag-handle-outline', value: '1000+',     label: 'Products' },
  { icon: 'people-outline',     value: '500+',      label: 'SHG Partners' },
  { icon: 'location-outline',   value: 'Pan India', label: 'Delivery' },
  { icon: 'star-outline',       value: '4.8★',     label: 'Avg Rating' },
];

const VALUES = [
  { icon: 'heart-outline',            title: 'Women Empowerment', desc: 'We connect self-help groups and women entrepreneurs directly with customers, ensuring fair income and growth.' },
  { icon: 'leaf-outline',             title: 'Rural & Organic',   desc: 'Our products come from rural manufacturers who use traditional, chemical-free recipes passed down through generations.' },
  { icon: 'shield-checkmark-outline', title: 'Quality Assured',   desc: 'Every product is hand-picked and quality-checked before reaching your doorstep.' },
  { icon: 'bicycle-outline',          title: 'Free Delivery',     desc: 'We offer free delivery across India on all our products — no minimum order required.' },
];

const TEAM = [
  { name: 'Pratiksha Khairnar', role: 'Founder & CEO',  img: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Shraddha Patil',    role: 'Co-Founder',      img: 'https://i.pravatar.cc/150?img=45' },
  { name: 'Rahul Deshmukh',    role: 'Operations Head', img: 'https://i.pravatar.cc/150?img=12' },
];

const FOOTER_CATEGORIES  = ['Season Special', 'Instant Food', 'Millet Superfood', 'Organic Foodgrain', 'Puja & Prasad'];
const FOOTER_ESSENTIALS  = ['Cookies', 'Fitness Food', "Mom's Essential"];
const FOOTER_CHATPATA    = ['Snacks & Namkeen', 'Chutney & Masala', 'Pickels'];
const FOOTER_QUICK_LINKS = ['About Us', 'Blog', 'Chhayakart Terms', 'Chhayakart Policies', 'Return & Refund'];

const SOCIAL = [
  { icon: 'logo-facebook',  url: 'https://facebook.com' },
  { icon: 'logo-instagram', url: 'https://instagram.com' },
  { icon: 'logo-linkedin',  url: 'https://linkedin.com' },
  { icon: 'logo-youtube',   url: 'https://youtube.com' },
  { icon: 'logo-twitter',   url: 'https://twitter.com' },
];

export default function AboutScreen() {
  const router = useRouter();
  
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

  return (
    <View style={styles.container}>

      {/* ═══════════ NAVBAR with BOTH DROPDOWNS ═══════════ */}
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

          {/* ✅ About Us Dropdown */}
          <View ref={aboutBtnRef} collapsable={false}>
            <TouchableOpacity style={styles.aboutBtn} onPress={openAboutDropdown}>
              <Text style={[styles.navLink, styles.activeNavLink]}>About Us</Text>
              <Ionicons
                name={aboutDropdownVisible ? 'chevron-up' : 'chevron-down'}
                size={13}
                color="white"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>

          {/* ✅ Sign In Dropdown */}
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

      {/* ═══════════ PAGE CONTENT (UNCHANGED) ═══════════ */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>About KumbhKart</Text>
          <Text style={styles.heroSubtitle}>
            Empowering Self-Help Groups, Women Entrepreneurs & Rural Manufacturers across India
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          {STATS.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={28} color="#db1c07" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* OUR STORY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <View style={styles.sectionUnderline} />
          <Text style={styles.storyText}>
            KumbhKart was born from a simple belief — that the hardworking women of India's
            self-help groups and rural communities deserve a platform to reach every kitchen in the country.
          </Text>
          <Text style={styles.storyText}>
            We started by partnering with local SHGs in Maharashtra, bringing authentic homemade
            papads, kurdai, seviyan, and snacks to customers who value quality, tradition, and taste.
            Today, we proudly deliver 1000+ products pan-India, with every purchase directly supporting a woman entrepreneur.
          </Text>
        </View>

        {/* OUR VALUES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.sectionUnderline} />
          <View style={styles.valuesGrid}>
            {VALUES.map((val, i) => (
              <View key={i} style={styles.valueCard}>
                <View style={styles.valueIconBox}>
                  <Ionicons name={val.icon as any} size={28} color="#db1c07" />
                </View>
                <Text style={styles.valueTitle}>{val.title}</Text>
                <Text style={styles.valueDesc}>{val.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ═══════════ FOOTER (UNCHANGED) ═══════════ */}
        <View style={styles.footerTagline}>
          <Text style={styles.footerTaglineText}>
            Chhayakart: Empowered Minds, Flourishing Enterprises: Cultivating Success, Growing Together
          </Text>
        </View>

        <View style={styles.footerMain}>
          <View style={styles.footerGrid}>

            {/* Get In Touch */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Get In Touch</Text>
              <Text style={styles.footerAddress}>
                Plot No. 21, ZP Colony,{'\n'}Near Dutt Mandir Chowk,{'\n'}Deopur, Dhule 424005
              </Text>
              <Text style={styles.footerEmail}>Email: contact@chhayakart.com</Text>
              <View style={styles.socialRow}>
                {SOCIAL.map((s, i) => (
                  <TouchableOpacity key={i} style={styles.socialIcon} onPress={() => Linking.openURL(s.url)}>
                    <Ionicons name={s.icon as any} size={20} color="#fff" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Categories */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Categories</Text>
              {FOOTER_CATEGORIES.map(item => <Text key={item} style={styles.footerLink}>{item}</Text>)}
            </View>

            {/* Essentials */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Essentials</Text>
              {FOOTER_ESSENTIALS.map(item => <Text key={item} style={styles.footerLink}>{item}</Text>)}
            </View>

            {/* Chatpata */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Chatpata</Text>
              {FOOTER_CHATPATA.map(item => <Text key={item} style={styles.footerLink}>{item}</Text>)}
            </View>

            {/* Quick Links */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Quick Links</Text>
              {FOOTER_QUICK_LINKS.map(item => <Text key={item} style={styles.footerLink}>{item}</Text>)}
            </View>

          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>
            Copyright © 2023. All Right Reserved By{' '}
            <Text style={styles.copyrightBrand}>Chhayakart</Text>
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },

  /* NAVBAR */
  header: {
    backgroundColor: '#db1c07',
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 0 : 44,
    height: Platform.OS === 'web' ? 76 : 116,
    justifyContent: 'space-between',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 8,
  },
  logo: { width: 52, height: 52 },
  navLinksContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
  navItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8 },
  navLink: { color: 'white', fontSize: 15, fontWeight: '600' },
  activeNavLink: {
    textDecorationLine: 'underline',
    opacity: 0.85,
  },
  
  // About Us Button with Dropdown
  aboutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  
  cartBtn: { marginLeft: 16, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: 8 },

  /* ABOUT DROPDOWN STYLES */
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

  /* SIGN IN DROPDOWN STYLES */
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

  /* LOGIN MODAL STYLES */
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

  /* HERO */
  heroBanner: { backgroundColor: '#db1c07', paddingVertical: 40, paddingHorizontal: 30, alignItems: 'center' },
  heroTitle: { fontSize: 32, fontWeight: '800', color: 'white', textAlign: 'center', marginBottom: 12 },
  heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 23, maxWidth: 500 },

  /* STATS */
  statsRow: {
    flexDirection: 'row', backgroundColor: '#fff',
    paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'space-around',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 3,
  },
  statCard: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 20, fontWeight: '800', color: '#222', marginTop: 6 },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },

  /* SECTIONS */
  section: { backgroundColor: '#fff', marginTop: 12, paddingVertical: 28, paddingHorizontal: 28 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#1a1a1a', marginBottom: 6 },
  sectionUnderline: { width: 50, height: 3, backgroundColor: '#db1c07', borderRadius: 2, marginBottom: 20 },
  storyText: { fontSize: 15, color: '#444', lineHeight: 25, marginBottom: 14 },

  /* VALUES */
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  valueCard: { width: '46%', backgroundColor: '#fff9f5', borderRadius: 10, padding: 18, borderWidth: 1, borderColor: '#fde8d8' },
  valueIconBox: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#fff0e6', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  valueTitle: { fontSize: 15, fontWeight: '700', color: '#222', marginBottom: 6 },
  valueDesc: { fontSize: 13, color: '#666', lineHeight: 20 },

  /* TEAM */
  teamRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 },
  teamCard: { alignItems: 'center', width: 140 },
  teamAvatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10, borderWidth: 3, borderColor: '#db1c07' },
  teamName: { fontSize: 14, fontWeight: '700', color: '#222', textAlign: 'center' },
  teamRole: { fontSize: 12, color: '#888', marginTop: 3, textAlign: 'center' },

  /* FOOTER */
  footerTagline: { backgroundColor: '#3a3a3a', paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center' },
  footerTaglineText: { color: '#ccc', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  footerMain: { backgroundColor: '#2d2d2d', paddingVertical: 36, paddingHorizontal: 28 },
  footerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 24 },
  footerCol: { minWidth: 140, flex: 1 },
  footerColTitle: { color: '#ffffff', fontSize: 17, fontWeight: '700', marginBottom: 14, fontStyle: 'italic' },
  footerAddress: { color: '#aaa', fontSize: 13, lineHeight: 22, marginBottom: 10 },
  footerEmail: { color: '#aaa', fontSize: 13, marginBottom: 16, textDecorationLine: 'underline' },
  footerLink: { color: '#bbb', fontSize: 13, marginBottom: 10, lineHeight: 20 },
  socialRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  socialIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#444', justifyContent: 'center', alignItems: 'center' },
  copyright: { backgroundColor: '#222', paddingVertical: 14, alignItems: 'center' },
  copyrightText: { color: '#888', fontSize: 13 },
  copyrightBrand: { color: '#db1c07', fontWeight: '700' },
});