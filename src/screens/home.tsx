import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Sahi Path ka use:
import CartDrawer from './components/Add_to_Cart';

const { width } = Dimensions.get('window');
const ITEMS_PER_ROW = 6;
const CONTAINER_PADDING = 200;
const ITEM_GAP = 15;

const CAT_W = Math.floor(
  (width - CONTAINER_PADDING * 2 - ITEM_GAP * (ITEMS_PER_ROW - 1)) / ITEMS_PER_ROW
);

const Home = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [signInDropdown, setSignInDropdown] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const [loginModal, setLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Cart state
  const [cartVisible, setCartVisible] = useState(false);

  const signInBtnRef = useRef<TouchableOpacity>(null);

  useEffect(() => {
    if (params?.login === '1') {
      setLoginModal(true);
    }
  }, [params?.login]);

  const categories = [
    { name: 'PAPAD', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200' },
    { name: 'SEASONAL', img: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=200' },
    { name: 'INSTANT', img: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
    { name: 'PUJA', img: 'https://images.unsplash.com/photo-1621274220348-41229fac9529?w=200' },
    { name: 'MILLET', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
    { name: 'SNACKS', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c17580?w=200' },
    { name: 'PICKLE', img: 'https://images.unsplash.com/photo-1589113331515-998f26550f8c?w=200' },
    { name: 'MASALA', img: 'https://images.unsplash.com/photo-1596797038530-2c39bb050b12?w=200' },
    { name: 'SWEET', img: 'https://images.unsplash.com/photo-1589113331515-998f26550f8c?w=200' },
    { name: 'GROCERY', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200' },
    { name: 'JEWELLERY', img: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?w=200' },
    { name: 'HOUSEHOLD', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200' },
  ];

  const seasonalTrend = [
    { name: 'HOMEMADE', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200' },
    { name: 'SPECIAL PAPAD', img: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=200' },
    { name: 'SPECIAL SNACK', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c17580?w=200' },
    { name: 'AYURVEDIC', img: 'https://images.unsplash.com/photo-1611073244287-73118018197c?w=200' },
  ];

  const handleSignInPress = () => {
    if (signInBtnRef.current) {
      signInBtnRef.current.measure((_fx, _fy, _w, h, px, py) => {
        setDropdownPos({ top: py + h, right: width - px - _w });
        setSignInDropdown(true);
      });
    }
  };

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

  const handleLoginContinue = async () => {
    if (!termsAccepted || phoneNumber.length < 10) return;
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setLoginModal(false);
    router.push('/myOrders' as any);
  };

  const renderGrid = (data: any[]) => (
    <View style={styles.grid}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { width: CAT_W }]}
          activeOpacity={0.8}
          onPress={() => router.push({ pathname: '/sub-category/[id]', params: { id: item.name } })}
        >
          <View style={[styles.catBox, { width: CAT_W, height: CAT_W }]}>
            <Image source={item.img} style={styles.catImage} contentFit="contain" transition={200} />
          </View>
          <Text style={styles.catLabel} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
            style={styles.logo}
            contentFit="contain"
          />
          <View style={styles.navLinksContainer}>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
              <Text style={styles.navLink}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => router.push({ pathname: '/sub-category/[id]', params: { id: 'PAPAD' } })}
            >
              <Text style={styles.navLink}>Categories</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem}>
              <Text style={styles.navLink}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity
              ref={signInBtnRef}
              style={styles.navItem}
              onPress={handleSignInPress}
            >
              <Text style={styles.navLink}>Sign In</Text>
            </TouchableOpacity>

            {/* Cart Button click par cart open hoga */}
            <TouchableOpacity style={styles.cartBtn} onPress={() => setCartVisible(true)}>
              <Ionicons name="cart" size={26} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SIGN IN DROPDOWN MODAL */}
        <Modal
          visible={signInDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => setSignInDropdown(false)}
        >
          <TouchableWithoutFeedback onPress={() => setSignInDropdown(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={[styles.dropdown, { top: dropdownPos.top, right: dropdownPos.right }]}>
                  <TouchableOpacity
                    style={styles.dropdownSignInBtn}
                    onPress={() => handleDropdownNavigate('/signIn')}
                  >
                    <Text style={styles.dropdownSignInText}>Sign In</Text>
                  </TouchableOpacity>
                  <View style={styles.dropdownDivider} />
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'My Orders', path: '/myOrders' },
                    { label: 'My Wishlist', path: '/myWishlist' },
                    { label: 'CK Wholesale', path: '/kkWholesale' },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.label}
                      style={styles.dropdownItem}
                      onPress={() => handleDropdownNavigate(item.path)}
                    >
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

        {/* LOGIN MODAL */}
        <Modal
          visible={loginModal}
          transparent
          animationType="fade"
          onRequestClose={() => setLoginModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setLoginModal(false)}>
            <View style={styles.loginOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.loginBox}>
                  <Text style={styles.loginTitle}>Login</Text>
                  <TouchableOpacity style={styles.loginCloseBtn} onPress={() => setLoginModal(false)}>
                    <Ionicons name="close" size={20} color="#333" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
                    style={styles.loginLogo}
                    contentFit="contain"
                  />
                  <Text style={styles.loginWelcome}>Welcome!</Text>
                  <Text style={styles.loginSubText}>
                    Enter phone number to continue and we will send a verification code to this number.
                  </Text>
                  <View style={styles.loginInputWrapper}>
                    <View style={styles.loginPhoneRow}>
                      <Text style={styles.loginCountryCode}>+91</Text>
                      <TextInput
                        style={styles.loginPhoneInput}
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                      />
                    </View>
                  </View>
                  <View style={styles.loginTermsRow}>
                    <TouchableOpacity
                      style={styles.loginCheckboxTouch}
                      onPress={() => setTermsAccepted(!termsAccepted)}
                    >
                      <View style={[styles.checkboxBox, termsAccepted && styles.checkboxChecked]}>
                        {termsAccepted && <Ionicons name="checkmark" size={12} color="#fff" />}
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.loginTermsText}>
                      I Agree to the <Text style={styles.loginLink}>Terms & Condition</Text> and <Text style={styles.loginLink}>Privacy & Policy</Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.loginBtn, (!termsAccepted || phoneNumber.length < 10) && styles.loginBtnDisabled]}
                    onPress={handleLoginContinue}
                  >
                    <Text style={styles.loginBtnText}>Login To Continue</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* HERO SECTION */}
        <View style={styles.heroWrapper}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80' }}
            style={styles.heroBg}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroSubText}>Empowering Rural India Through Authentic Flavors</Text>
              <View style={styles.searchBar}>
                <View style={styles.allIndiaBox}>
                  <Text style={styles.allIndiaText}>All India</Text>
                </View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search 1000+ Traditional Products"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* FREE DELIVERY BAR */}
        <View style={styles.deliveryBar}>
          <Text style={styles.deliveryText}>FREE DELIVERY FOR ALL PRODUCTS 🚚</Text>
        </View>

        {/* SHOP BY CATEGORY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SHOP BY CATEGORY</Text>
          <View style={styles.divider} />
          <View style={styles.centeredContainer}>
            {renderGrid(categories)}
          </View>
        </View>

        {/* SEASONAL TREND */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEASONAL TREND</Text>
          <View style={styles.divider} />
          <View style={styles.centeredContainer}>
            {renderGrid(seasonalTrend)}
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerTaglineBox}>
            <Text style={styles.footerTagline}>Chhayakart: Empowered Minds, Flourishing Enterprises</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30, flexWrap: 'wrap' }}>
            <View style={styles.footerCol}>
              <Text style={styles.footerHead}>Get In Touch</Text>
              <Text style={styles.footerText}>Plot No. 21, ZP Colony, Deopur, Dhule 424005</Text>
              <View style={styles.socialRow}>
                <FontAwesome name="facebook-square" size={20} color="white" style={styles.socialIcon} />
                <FontAwesome name="instagram" size={20} color="white" style={styles.socialIcon} />
                <FontAwesome name="linkedin-square" size={20} color="white" style={styles.socialIcon} />
              </View>
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerHead}>Categories</Text>
              <Text style={styles.footerLink}>Season Special</Text>
              <Text style={styles.footerLink}>Instant Food</Text>
              <Text style={styles.footerLink}>Millet Superfood</Text>
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerHead}>Essentials</Text>
              <Text style={styles.footerLink}>Cookies</Text>
              <Text style={styles.footerLink}>Fitness Food</Text>
              <Text style={styles.footerLink}>Mom's Essential</Text>
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerHead}>Chatpata</Text>
              <Text style={styles.footerLink}>Snacks & Namkeen</Text>
              <Text style={styles.footerLink}>Chutney & Masala</Text>
              <Text style={styles.footerLink}>Pickles</Text>
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerHead}>Quick Links</Text>
              <Text style={styles.footerLink}>About Us</Text>
              <Text style={styles.footerLink}>Blog</Text>
              <Text style={styles.footerLink}>Return & Refund</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ADD TO CART DRAWER */}
      <CartDrawer 
        visible={cartVisible} 
        onClose={() => setCartVisible(false)} 
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#db1c07',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'web' ? 0 : 44,
    height: Platform.OS === 'web' ? 76 : 116,
    justifyContent: 'space-between',
    zIndex: 100,
  },
  logo: { width: 56, height: 56 },
  navLinksContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
  navItem: { paddingHorizontal: 18, paddingVertical: 8 },
  navLink: { color: 'white', fontSize: 15, fontWeight: '600' },
  cartBtn: { marginLeft: 24, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 50, padding: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'transparent' },
  dropdown: {
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
  loginOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 32,
    width: Platform.OS === 'web' ? width * 0.45 : width * 0.9,
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
  heroWrapper: { width: '100%', height: 180 },
  heroBg: { width: '100%', height: '100%' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  heroSubText: { color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 12, fontWeight: '700' },
  searchBar: { flexDirection: 'row', backgroundColor: 'white', width: '76%', height: 45, borderRadius: 7, overflow: 'hidden', alignItems: 'center' },
  allIndiaBox: { backgroundColor: '#eee', height: '100%', justifyContent: 'center', paddingHorizontal: 15, borderRightWidth: 1, borderRightColor: '#ddd' },
  allIndiaText: { color: '#333', fontSize: 13, fontWeight: '500' },
  searchInput: { flex: 1, paddingHorizontal: 12, fontSize: 13, height: '100%', color: '#333' },
  searchButton: { backgroundColor: '#db1c07', paddingHorizontal: 20, justifyContent: 'center', height: '100%' },
  searchButtonText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  deliveryBar: { backgroundColor: '#db1c07', padding: 8, alignItems: 'center' },
  deliveryText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  section: { marginTop: 30 },
  sectionTitle: { fontSize: 18, color: '#333', fontWeight: '700', marginLeft: Platform.OS === 'web' ? CONTAINER_PADDING : 20, marginBottom: 8 },
  divider: { height: 1.5, backgroundColor: '#f0f0f0', marginBottom: 20, marginHorizontal: Platform.OS === 'web' ? CONTAINER_PADDING : 20 },
  centeredContainer: { paddingHorizontal: Platform.OS === 'web' ? CONTAINER_PADDING : 20, width: '100%' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: ITEM_GAP },
  card: { alignItems: 'center', marginBottom: 25 },
  catBox: { borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  catImage: { width: '85%', height: '85%' },
  catLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 10, textAlign: 'center', color: '#000', textTransform: 'uppercase' },
  footer: { backgroundColor: '#666', marginTop: 30 },
  footerTaglineBox: { padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#888', alignItems: 'center' },
  footerTagline: { color: 'white', fontSize: 12, textAlign: 'center' },
  footerCol: { minWidth: 150, marginBottom: 20 },
  footerHead: { color: 'white', fontSize: 24, fontWeight: '400', marginBottom: 15, fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  footerText: { color: 'white', fontSize: 12, lineHeight: 18 },
  footerLink: { color: 'white', fontSize: 12, marginBottom: 8 },
  socialRow: { flexDirection: 'row', marginTop: 20 },
  socialIcon: { marginRight: 15 },
});