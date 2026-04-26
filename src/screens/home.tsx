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

const { width } = Dimensions.get('window');

const ABOUT_DROPDOWN = [
  { label: 'About Us',           route: '/about' },
  { label: 'Blog',               route: '/blog' },
  { label: 'Contact Us',         route: '/contact' },
  { label: 'Terms & Conditions', route: '/terms' },
  { label: 'Privacy Policy',     route: '/privacy' },
  { label: 'Return & Refund',    route: '/refund' },
];

const HomeScreen = () => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [btnLayout, setBtnLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const aboutBtnRef = useRef<View>(null);

  const openDropdown = () => {
    if (aboutBtnRef.current) {
      aboutBtnRef.current.measure((_fx, _fy, width, height, px, py) => {
        setBtnLayout({ x: px, y: py, width, height });
        setDropdownVisible(true);
      });
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* 1. HEADER */}
      <View style={styles.header}>

        {/* Logo */}
        <Image
          source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/ck_logo_white_1.png' }}
          style={styles.logo}
        />

        {/* Nav Links */}
        <View style={styles.navLinksContainer}>

          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.navLink}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/sub-category/31-papad')}>
            <Text style={styles.navLink}>Categories</Text>
          </TouchableOpacity>

          {/* ✅ About Us — Dropdown trigger */}
          <View ref={aboutBtnRef} collapsable={false}>
            <TouchableOpacity style={styles.aboutBtn} onPress={openDropdown}>
              <Text style={styles.navLink}>About Us</Text>
              <Ionicons
                name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
                size={13}
                color="white"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/signin')}>
            <Text style={styles.navLink}>Sign In</Text>
          </TouchableOpacity>

        </View>

        {/* Cart Icon */}
        <TouchableOpacity style={{ marginLeft: 20 }}>
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>

      </View>

      {/* ✅ DROPDOWN MODAL */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setDropdownVisible(false)}>
          <View
            style={[
              styles.dropdownMenu,
              { top: btnLayout.y + btnLayout.height + 4, left: btnLayout.x },
            ]}
          >
            {ABOUT_DROPDOWN.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.dropdownItem,
                  index < ABOUT_DROPDOWN.length - 1 && styles.dropdownBorder,
                ]}
                onPress={() => {
                  setDropdownVisible(false);
                  router.push(item.route as any);
                }}
              >
                <Text style={styles.dropdownText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* 2. HERO SECTION */}
      <ImageBackground
        source={{ uri: 'https://www.chhayakart.com/cdn/shop/files/banner_1_web.jpg' }}
        style={styles.heroSection}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroText}>
            Self-Help Groups, Women Entrepreneurs & Rural Manufacturers Products
          </Text>
          <View style={styles.searchBarContainer}>
            <View style={styles.dropdownBox}>
              <Text style={styles.dropdownText2}>All India</Text>
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Delivering 1000+ Products Across India"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* 3. FREE DELIVERY BAR */}
      <View style={styles.deliveryBar}>
        <Text style={styles.deliveryText}>FREE DELIVERY FOR ALL PRODUCTS 🚚</Text>
      </View>

      {/* 4. SHOP BY CATEGORY */}
      <View style={styles.categorySection}>
        <Text style={styles.categoryHeading}>SHOP BY CATEGORY</Text>
        <View style={styles.headingUnderline} />
        <View style={styles.categoryGrid}>
          {[
            { id: 1, title: 'PAPAD',    img: 'https://www.chhayakart.com/cdn/shop/files/papad.png' },
            { id: 2, title: 'SEASONAL', img: 'https://www.chhayakart.com/cdn/shop/files/seasonal.png' },
            { id: 3, title: 'INSTANT',  img: 'https://www.chhayakart.com/cdn/shop/files/instant.png' },
            { id: 4, title: 'PUJA',     img: 'https://www.chhayakart.com/cdn/shop/files/puja.png' },
            { id: 5, title: 'MILLET',   img: 'https://www.chhayakart.com/cdn/shop/files/millet.png' },
            { id: 6, title: 'SNACKS',   img: 'https://www.chhayakart.com/cdn/shop/files/snacks.png' },
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => router.push(`/sub-category/${item.id}-${item.title.toLowerCase()}`)}
            >
              <View style={styles.imageBox}>
                <Image source={{ uri: item.img }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#F36D00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  logo: { width: 45, height: 45, resizeMode: 'contain' },
  navLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  navLink: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 20,
  },
  aboutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },

  /* ---- DROPDOWN ---- */
  backdrop: { flex: 1, backgroundColor: 'transparent' },
  dropdownMenu: {
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
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  dropdownBorder: { borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  dropdownText: { fontSize: 14, color: '#333', fontWeight: '500' },

  /* ---- HERO ---- */
  heroSection: { width: '100%', height: 260 },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  heroText: { color: 'white', fontSize: 15, textAlign: 'center', marginBottom: 20, fontWeight: '400' },
  searchBarContainer: {
    flexDirection: 'row', backgroundColor: 'white',
    width: '100%', height: 45, borderRadius: 4, overflow: 'hidden',
  },
  dropdownBox: {
    width: 80, backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center',
    borderRightWidth: 1, borderRightColor: '#ddd',
  },
  dropdownText2: { fontSize: 12, color: '#333' },
  searchInput: { flex: 1, paddingHorizontal: 15, fontSize: 13 },
  searchButton: { backgroundColor: '#F36D00', width: 80, justifyContent: 'center', alignItems: 'center' },
  searchButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

  /* ---- DELIVERY ---- */
  deliveryBar: { backgroundColor: '#F36D00', paddingVertical: 12, alignItems: 'center' },
  deliveryText: { color: 'white', fontWeight: '700', fontSize: 14 },

  /* ---- CATEGORIES ---- */
  categorySection: { padding: 20 },
  categoryHeading: { fontSize: 18, fontWeight: '500', color: '#333' },
  headingUnderline: { height: 1, backgroundColor: '#ddd', marginTop: 8, marginBottom: 20 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: { width: '31%', alignItems: 'center', marginBottom: 20 },
  imageBox: {
    width: '100%', aspectRatio: 1,
    borderWidth: 1, borderColor: '#eee',
    justifyContent: 'center', alignItems: 'center',
    padding: 10, borderRadius: 4,
  },
  categoryImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  categoryTitle: { marginTop: 10, fontWeight: 'bold', fontSize: 12, color: '#000' },
});